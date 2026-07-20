import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { ArrowLeft } from 'lucide-react'
import CheckoutForm from '../components/payment/CheckoutForm'
import OrderSummary from '../components/payment/OrderSummary'

// ВАЖЛИВО: Замініть на ваш публічний Stripe ключ
// Отримайте його на https://dashboard.stripe.com/apikeys
const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE')

export default function PaymentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedPlan = location.state?.plan || {
    name: 'Professional Multi-AI',
    price: 149,
    features: ['7 AI models analysis', 'Comprehensive report', 'Priority support'],
  }

  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // TODO: Підключіть ваш n8n webhook для створення Stripe Payment Intent
    // Webhook повинен:
    // 1. Отримати amount та plan від клієнта
    // 2. Створити Payment Intent через Stripe API
    // 3. Повернути clientSecret

    const createPaymentIntent = async () => {
      try {
        // Приклад запиту до вашого n8n webhook:
        const response = await fetch('YOUR_N8N_WEBHOOK_URL/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: selectedPlan.price * 120, // ціна в центах з ПДВ (20%)
            currency: 'usd',
            plan: selectedPlan.name,
          }),
        })

        const data = await response.json()

        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
        } else {
          setError('Не вдалося ініціалізувати платіж')
        }
      } catch (err) {
        console.error('Payment initialization error:', err)
        setError('Помилка з\'єднання з сервером')
      } finally {
        setLoading(false)
      }
    }

    // ДЕМО: Симулюємо отримання clientSecret
    // В продакшені видаліть це і розкоментуйте createPaymentIntent()
    setTimeout(() => {
      // Це тестовий секрет - НЕ ВИКОРИСТОВУЙТЕ в продакшені
      setClientSecret('pi_test_secret_demo')
      setLoading(false)
    }, 1000)

    // Розкоментуйте для реальної роботи:
    // createPaymentIntent()
  }, [selectedPlan])

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

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#64748b] hover:text-[#0f3460] mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Назад</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <OrderSummary plan={selectedPlan} />

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-8">
              <h1 className="text-2xl font-bold text-[#0a1628] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Дані для оплати
              </h1>

              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f3460]" />
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {!loading && !error && clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm
                    amount={(selectedPlan.price * 1.2).toFixed(2)}
                    planName={selectedPlan.name}
                  />
                </Elements>
              )}

              {!loading && !error && !clientSecret && (
                <div className="text-center py-12">
                  <p className="text-[#64748b]">Не вдалося завантажити форму оплати</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
