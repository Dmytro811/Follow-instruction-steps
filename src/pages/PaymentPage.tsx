import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import CheckoutForm from '../components/payment/CheckoutForm'
import OrderSummary from '../components/payment/OrderSummary'
import { api } from '../services/api'

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY'
)

export default function PaymentPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedPlan = location.state?.plan
  const websiteUrl = location.state?.websiteUrl

  const [clientSecret, setClientSecret] = useState('')
  const [paymentIntentId, setPaymentIntentId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!selectedPlan || !websiteUrl) {
      setError(
        'Missing plan or website URL. Please start the process again.'
      )
      setLoading(false)
      return
    }

    const createPaymentIntent = async () => {
      try {
        const amountInCents = Math.round(selectedPlan.price * 100)

        const result = await api.createPaymentIntent(
          amountInCents,
          'usd',
          selectedPlan.id,
          websiteUrl
        )

        if (result.clientSecret && result.paymentIntentId) {
          setClientSecret(result.clientSecret)
          setPaymentIntentId(result.paymentIntentId)
        } else {
          setError(
            'Failed to initialize the payment. Please try again.'
          )
        }
      } catch (err) {
        console.error('Payment initialization error:', err)
        setError(
          'Unable to connect to the server. Please check your n8n configuration.'
        )
      } finally {
        setLoading(false)
      }
    }

    createPaymentIntent()
  }, [selectedPlan, websiteUrl])

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#0f3460',
      colorBackground: '#ffffff',
      colorText: '#0a1628',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  }

  const options = {
    clientSecret,
    appearance,
  }

  if (!selectedPlan || !websiteUrl) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-[#e2e8f0] rounded-xl p-8 text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />

          <h1 className="text-2xl font-bold text-[#0a1628] mb-2">
            Missing Information
          </h1>

          <p className="text-[#64748b] mb-6">
            We couldn't find your selected plan or website URL.
          </p>

          <button
            onClick={() => navigate('/analyze')}
            className="w-full px-6 py-3 bg-[#0f3460] text-white rounded-lg hover:bg-[#1a4f8a] transition-colors"
          >
            Return to Analysis
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#64748b] hover:text-[#0f3460] mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <OrderSummary
            plan={selectedPlan}
            websiteUrl={websiteUrl}
          />

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-8">
              <h1
                className="text-2xl font-bold text-[#0a1628] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Payment Details
              </h1>

              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f3460]" />
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <AlertCircle
                      size={18}
                      className="text-red-600 mt-0.5 shrink-0"
                    />
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {!loading && !error && clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm
                    amount={selectedPlan.price.toFixed(2)}
                    planName={selectedPlan.name}
                    paymentIntentId={paymentIntentId}
                    websiteUrl={websiteUrl}
                    planId={selectedPlan.id}
                  />
                </Elements>
              )}

              {!loading && !error && !clientSecret && (
                <div className="text-center py-12">
                  <p className="text-[#64748b]">
                    Failed to load the payment form.
                  </p>

                  <button
                    onClick={() => navigate('/analyze')}
                    className="mt-4 text-[#0f3460] hover:underline text-sm"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}