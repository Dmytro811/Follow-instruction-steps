import { useState } from 'react'
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js'
import { Lock } from 'lucide-react'
import Button from '../ui/Button'

// planName, paymentIntentId, websiteUrl, and planId aren't needed inside
// this component (the Payment Intent already carries that context on the
// backend), but are kept in the props so PaymentPage can pass them without
// a separate prop-filtering step if they're needed here later.
interface CheckoutFormProps {
  amount: string
  planName: string
  paymentIntentId: string
  websiteUrl: string
  planId: string
}

export default function CheckoutForm({ amount }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()

  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setMessage('')

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
        receipt_email: email,
      },
    })

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'Payment processing failed.')
      } else {
        setMessage('An unexpected error occurred. Please try again.')
      }
      setIsProcessing(false)
    }
    // Stripe automatically redirects to return_url after successful payment
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Email */}
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#0a1628] mb-2"
        >
          Email for Receipt & Notifications
        </label>

        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8f0fb] focus:border-[#0f3460] transition-all"
          placeholder="your@email.com"
        />

        <p className="text-xs text-[#94a3b8] mt-2">
          We'll send your receipt and the report link to this email address.
        </p>
      </div>

      {/* Stripe Payment Element */}
      <div className="mb-6">
        <PaymentElement id="payment-element" />
      </div>

      {/* Error message */}
      {message && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
          <p className="text-red-600 text-sm">{message}</p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        size="lg"
        disabled={isProcessing || !stripe || !elements || !email}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            Processing Payment...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Lock size={16} />
            Pay ${amount}
          </span>
        )}
      </Button>

      <p className="text-xs text-[#64748b] text-center mt-4">
        Your payment is securely processed by Stripe. Your AI website analysis
        will begin automatically once the payment has been successfully
        completed.
      </p>
    </form>
  )
}