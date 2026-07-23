import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import { api } from '../services/api'

export default function PaymentSuccessPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [analysisId, setAnalysisId] = useState<string | null>(null)

  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent')
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret')

    if (!paymentIntent || !paymentIntentClientSecret) {
      setPaymentStatus('failed')
      return
    }

    const verifyPaymentAndStartAnalysis = async () => {
      try {
        // 1. Верифікуємо платіж через n8n
        const verifyResult = await api.verifyPayment(paymentIntent, paymentIntentClientSecret)

        if (verifyResult.status === 'succeeded') {
          setPaymentStatus('success')

          // 2. Запускаємо аналіз після успішної оплати
          try {
            const analysisResult = await api.startAnalysis(
              paymentIntent,
              verifyResult.websiteUrl,
              verifyResult.plan
            )

            if (analysisResult.analysisId) {
              setAnalysisId(analysisResult.analysisId)

              // Автоматично редіректимо на dashboard через 3 секунди
              setTimeout(() => {
                navigate(`/dashboard?analysisId=${analysisResult.analysisId}`)
              }, 3000)
            }
          } catch (analysisError) {
            console.error('Failed to start analysis:', analysisError)
            // Платіж успішний, але аналіз не запустився - користувач може спробувати пізніше
          }
        } else {
          setPaymentStatus('failed')
        }
      } catch (error) {
        console.error('Payment verification error:', error)
        setPaymentStatus('failed')
      }
    }

    verifyPaymentAndStartAnalysis()
  }, [searchParams, navigate])

  if (paymentStatus === 'loading') {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-[#0f3460] mx-auto mb-4" />
          <p className="text-[#64748b] text-lg mb-2">Перевіряємо статус платежу...</p>
          <p className="text-[#94a3b8] text-sm">Зачекайте, будь ласка</p>
        </div>
      </div>
    )
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-[#e2e8f0] rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#0a1628] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Помилка платежу
          </h1>
          <p className="text-[#64748b] mb-6">
            На жаль, не вдалося обробити ваш платіж. Спробуйте ще раз або зв'яжіться з підтримкою.
          </p>
          <div className="flex flex-col gap-3">
            <Button fullWidth onClick={() => navigate('/analyze')}>
              Спробувати знову
            </Button>
            <Button fullWidth variant="outline" onClick={() => navigate('/contact')}>
              Зв'язатися з підтримкою
            </Button>
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
          Дякуємо за покупку. Чек надіслано на вашу електронну пошту. Аналіз вашого сайту розпочато.
        </p>

        {/* Info */}
        <div className="bg-[#f8fafc] rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 gap-3 text-left">
            <div>
              <div className="text-xs text-[#94a3b8] mb-1">ID транзакції</div>
              <div className="font-mono text-xs text-[#0a1628] break-all bg-white px-3 py-2 rounded border border-[#e2e8f0]">
                {searchParams.get('payment_intent') || 'N/A'}
              </div>
            </div>
            {analysisId && (
              <div>
                <div className="text-xs text-[#94a3b8] mb-1">ID аналізу</div>
                <div className="font-mono text-xs text-[#0a1628] break-all bg-white px-3 py-2 rounded border border-[#e2e8f0]">
                  {analysisId}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Auto redirect message */}
        {analysisId && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-sm text-blue-900">
              <Loader2 size={14} className="animate-spin" />
              <span>Автоматичний перехід до Dashboard через 3 сек...</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {analysisId ? (
            <Button fullWidth onClick={() => navigate(`/dashboard?analysisId=${analysisId}`)}>
              <span className="flex items-center justify-center gap-2">
                Перейти до Dashboard <ArrowRight size={16} />
              </span>
            </Button>
          ) : (
            <Button fullWidth onClick={() => navigate('/')}>
              <span className="flex items-center justify-center gap-2">
                На головну <ArrowRight size={16} />
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
