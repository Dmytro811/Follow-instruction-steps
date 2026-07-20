import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, ArrowRight, Download } from 'lucide-react'
import Button from '../components/ui/Button'

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'failed'>('loading')

  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent')
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret')

    if (!paymentIntent || !paymentIntentClientSecret) {
      setPaymentStatus('failed')
      return
    }

    // TODO: Підтвердіть статус платежу через ваш n8n webhook
    // Webhook повинен перевірити payment_intent через Stripe API
    const verifyPayment = async () => {
      try {
        // const response = await fetch('YOUR_N8N_WEBHOOK_URL/verify-payment', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     payment_intent: paymentIntent,
        //     client_secret: paymentIntentClientSecret
        //   }),
        // })
        // const data = await response.json()
        // if (data.status === 'succeeded') {
        //   setPaymentStatus('success')
        // } else {
        //   setPaymentStatus('failed')
        // }

        // ДЕМО: автоматично встановлюємо успіх
        setTimeout(() => {
          setPaymentStatus('success')
        }, 1000)
      } catch (error) {
        console.error('Payment verification error:', error)
        setPaymentStatus('failed')
      }
    }

    verifyPayment()
  }, [searchParams])

  if (paymentStatus === 'loading') {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f3460] mx-auto mb-4" />
          <p className="text-[#64748b]">Перевіряємо статус платежу...</p>
        </div>
      </div>
    )
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-[#e2e8f0] rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-red-500 text-3xl">✕</div>
          </div>
          <h1 className="text-2xl font-bold text-[#0a1628] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Помилка платежу
          </h1>
          <p className="text-[#64748b] mb-6">
            На жаль, не вдалося обробити ваш платіж. Спробуйте ще раз або зв'яжіться з підтримкою.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/pricing">
              <Button fullWidth>Спробувати знову</Button>
            </Link>
            <Link to="/contact">
              <Button fullWidth variant="outline">Зв'язатися з підтримкою</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-[#e2e8f0] rounded-xl p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-[#10b981]" />
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-[#0a1628] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Оплата успішна!
        </h1>
        <p className="text-[#64748b] mb-6">
          Дякуємо за покупку. Чек надіслано на вашу електронну пошту.
        </p>

        {/* Info */}
        <div className="bg-[#f8fafc] rounded-lg p-4 mb-6 text-left">
          <div className="text-xs text-[#94a3b8] mb-1">ID транзакції</div>
          <div className="font-mono text-sm text-[#0a1628] break-all">
            {searchParams.get('payment_intent') || 'N/A'}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link to="/dashboard">
            <Button fullWidth>
              <span className="flex items-center justify-center gap-2">
                Перейти до Dashboard <ArrowRight size={16} />
              </span>
            </Button>
          </Link>
          <button className="flex items-center justify-center gap-2 text-sm text-[#64748b] hover:text-[#0f3460] transition-colors">
            <Download size={14} />
            Завантажити чек
          </button>
        </div>
      </div>
    </div>
  )
}
