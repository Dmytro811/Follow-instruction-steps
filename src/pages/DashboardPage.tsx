import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Clock, FileText, Download, AlertCircle, Loader2 } from 'lucide-react'
import Button from '../components/ui/Button'
import { api } from '../services/api'

interface AnalysisData {
  status: 'pending' | 'analyzing' | 'complete' | 'failed'
  progress?: number
  pdfUrl?: string
  error?: string
  websiteUrl?: string
  plan?: string
  analysisId?: string
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [data, setData] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)

  const analysisId = searchParams.get('analysisId')

  useEffect(() => {
    if (!analysisId) {
      setError('Аналіз ID не знайдено')
      setLoading(false)
      return
    }

    let intervalId: NodeJS.Timeout

    const fetchReport = async () => {
      try {
        const result = await api.getReport(analysisId)
        setData({
          ...result,
          analysisId,
        })

        // Якщо аналіз завершено або провалено, зупиняємо polling
        if (result.status === 'complete' || result.status === 'failed') {
          if (intervalId) clearInterval(intervalId)
        }
      } catch (err) {
        console.error('Failed to fetch report:', err)
        setError('Не вдалося завантажити дані аналізу')
        if (intervalId) clearInterval(intervalId)
      } finally {
        setLoading(false)
      }
    }

    // Перший запит
    fetchReport()

    // Polling кожні 10 секунд для оновлення статусу
    intervalId = setInterval(fetchReport, 10000)

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [analysisId])

  const handleDownloadPDF = async () => {
    if (!analysisId) return

    setDownloading(true)
    try {
      const blob = await api.downloadPDF(analysisId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `seo-analysis-${analysisId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Failed to download PDF:', err)
      alert('Не вдалося завантажити PDF. Спробуйте ще раз.')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-[#0f3460] mx-auto mb-4" />
          <p className="text-[#64748b]">Завантаження даних...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-[#e2e8f0] rounded-xl p-8 text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#0a1628] mb-2">Помилка</h1>
          <p className="text-[#64748b] mb-6">{error || 'Щось пішло не так'}</p>
          <Button fullWidth onClick={() => navigate('/analyze')}>
            Повернутися до аналізу
          </Button>
        </div>
      </div>
    )
  }

  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'text-[#f59e0b]',
      bgColor: 'bg-[#fef3c7]',
      title: 'Очікування',
      description: 'Ваш аналіз знаходиться в черзі',
    },
    analyzing: {
      icon: Loader2,
      color: 'text-[#0f3460]',
      bgColor: 'bg-[#e8f0fb]',
      title: 'Аналіз в процесі',
      description: 'AI моделі аналізують ваш сайт',
    },
    complete: {
      icon: CheckCircle2,
      color: 'text-[#10b981]',
      bgColor: 'bg-[#d1fae5]',
      title: 'Аналіз завершено',
      description: 'Ваш звіт готовий до завантаження',
    },
    failed: {
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      title: 'Помилка аналізу',
      description: data.error || 'Виникла помилка під час аналізу',
    },
  }

  const config = statusConfig[data.status]
  const StatusIcon = config.icon

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Status Card */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className={`w-16 h-16 ${config.bgColor} rounded-2xl flex items-center justify-center shrink-0`}>
              <StatusIcon size={32} className={`${config.color} ${data.status === 'analyzing' ? 'animate-spin' : ''}`} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#0a1628] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {config.title}
              </h1>
              <p className="text-[#64748b] text-lg mb-4">{config.description}</p>

              {/* Progress Bar */}
              {data.status === 'analyzing' && data.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-[#64748b] mb-2">
                    <span>Прогрес аналізу</span>
                    <span className="font-semibold">{data.progress}%</span>
                  </div>
                  <div className="w-full bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#0f3460] h-full rounded-full transition-all duration-500"
                      style={{ width: `${data.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Analysis Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {data.websiteUrl && (
                  <div>
                    <div className="text-xs text-[#94a3b8] uppercase tracking-wide mb-1">Website</div>
                    <div className="text-sm text-[#0a1628] font-medium truncate">{data.websiteUrl}</div>
                  </div>
                )}
                {data.plan && (
                  <div>
                    <div className="text-xs text-[#94a3b8] uppercase tracking-wide mb-1">Plan</div>
                    <div className="text-sm text-[#0a1628] font-medium">{data.plan}</div>
                  </div>
                )}
                {analysisId && (
                  <div className="md:col-span-2">
                    <div className="text-xs text-[#94a3b8] uppercase tracking-wide mb-1">Analysis ID</div>
                    <div className="text-sm text-[#0a1628] font-mono bg-[#f8fafc] px-3 py-2 rounded-lg truncate">
                      {analysisId}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {data.status === 'complete' && (
          <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText size={24} className="text-[#0f3460]" />
              <h2 className="text-xl font-bold text-[#0a1628]">Ваш звіт готовий</h2>
            </div>
            <p className="text-[#64748b] mb-6">
              Завантажте PDF звіт з детальним аналізом вашого сайту та рекомендаціями для покращення видимості в AI.
            </p>
            <Button
              size="lg"
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="w-full md:w-auto"
            >
              {downloading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Завантаження...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Download size={18} />
                  Завантажити PDF звіт
                </span>
              )}
            </Button>
          </div>
        )}

        {/* Info Messages */}
        {data.status === 'pending' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-blue-900 text-sm">
              💡 Ваш аналіз розпочнеться найближчим часом. Зазвичай це займає кілька хвилин. Ви можете закрити цю
              сторінку — ми надішлемо email коли звіт буде готовий.
            </p>
          </div>
        )}

        {data.status === 'analyzing' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-blue-900 text-sm">
              🤖 AI моделі зараз аналізують ваш сайт. Процес може зайняти від 15 хвилин до 2 годин в залежності від
              розміру сайту. Сторінка автоматично оновлюється кожні 10 секунд.
            </p>
          </div>
        )}

        {data.status === 'failed' && (
          <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-lg p-8">
            <h3 className="text-lg font-semibold text-[#0a1628] mb-4">Що робити далі?</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm text-[#475569]">
                <span className="text-[#0f3460]">•</span>
                <span>Переконайтеся, що ваш сайт доступний і не заблокований для ботів</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#475569]">
                <span className="text-[#0f3460]">•</span>
                <span>Зверніться до нашої підтримки для детальної інформації про помилку</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#475569]">
                <span className="text-[#0f3460]">•</span>
                <span>Ми повернемо кошти, якщо проблема на нашій стороні</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" onClick={() => navigate('/contact')}>
                Зв'язатися з підтримкою
              </Button>
              <Button variant="outline" onClick={() => navigate('/analyze')}>
                Спробувати ще раз
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
