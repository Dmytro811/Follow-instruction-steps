import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js'
import { Lock } from 'lucide-react'
import Button from '../ui/Button'

interface CheckoutFormProps {
  amount: string
  planName: string
}

export default function CheckoutForm({ amount, planName }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

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

    // TODO: Відправте email та planName на ваш n8n webhook перед підтвердженням платежу
    // Це дозволить зберегти інформацію про замовлення
    try {
      // await fetch('YOUR_N8N_WEBHOOK_URL/save-order', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, plan: planName, amount }),
      // })
    } catch (err) {
      console.error('Order save error:', err)
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
        receipt_email: email,
      },
    })

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'Помилка обробки платежу')
      } else {
        setMessage('Несподівана помилка. Спробуйте ще раз.')
      }
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Email */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-[#0a1628] mb-2">
          Email для чеку
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8f0fb]"
          placeholder="your@email.com"
        />
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
          <span>Обробка платежу...</span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Lock size={16} />
            Оплатити ${amount}
          </span>
        )}
      </Button>

      <p className="text-xs text-[#64748b] text-center mt-4">
        Платіж обробляється через захищений сервіс Stripe
      </p>
    </form>
  )
}
