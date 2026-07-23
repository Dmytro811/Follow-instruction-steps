import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Globe, ArrowRight, AlertCircle } from 'lucide-react'
import { PLANS } from '../constants'
import Button from '../components/ui/Button'
import { validateUrl, normalizeUrl } from '../utils/validation'

export default function AnalyzePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const preselectedPlanId = location.state?.selectedPlanId

  const [websiteUrl, setWebsiteUrl] = useState('')
  const [selectedPlan, setSelectedPlan] = useState<string>(preselectedPlanId || 'professional')
  const [error, setError] = useState('')
  const [isValidating, setIsValidating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!websiteUrl.trim()) {
      setError('Please enter your website URL.')
      return
    }

    const formattedUrl = normalizeUrl(websiteUrl)
    const validation = validateUrl(formattedUrl)

    if (!validation.valid) {
      setError(validation.error || 'Invalid URL.')
      return
    }

    setIsValidating(true)

    try {
      const plan = PLANS.find(p => p.id === selectedPlan)
      navigate('/payment', {
        state: {
          plan,
          websiteUrl: formattedUrl,
        },
      })
    } catch (err) {
      setError('Failed to validate the website. Please try again.')
      setIsValidating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f3460] to-[#0a1628] pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#e8f0fb]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Globe size={32} className="text-[#e8f0fb]" />
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Analyze Your Website
          </h1>

          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Discover how AI models perceive your website and receive a detailed
            report with actionable recommendations.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* URL Input */}
            <div>
              <label htmlFor="url" className="block text-sm font-semibold text-[#0a1628] mb-3">
                Website URL
              </label>

              <div className="relative">
                <Globe
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                />

                <input
                  type="text"
                  id="url"
                  value={websiteUrl}
                  onChange={(e) => {
                    setWebsiteUrl(e.target.value)
                    setError('')
                  }}
                  placeholder="https://your-website.com"
                  className="w-full pl-12 pr-4 py-4 border-2 border-[#e2e8f0] rounded-xl focus:outline-none focus:border-[#0f3460] focus:ring-4 focus:ring-[#e8f0fb] transition-all text-[#0a1628] placeholder:text-[#94a3b8]"
                  required
                />
              </div>

              {error && (
                <div className="mt-3 flex items-start gap-2 text-red-600 text-sm">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Plan Selection */}
            <div>
              <label className="block text-sm font-semibold text-[#0a1628] mb-4">
                Choose a Pricing Plan
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PLANS.map((plan) => {
                  const isSelected = selectedPlan === plan.id
                  const isPopular = plan.id === 'professional'

                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative cursor-pointer rounded-xl p-5 border-2 transition-all ${
                        isSelected
                          ? 'border-[#0f3460] bg-[#e8f0fb] shadow-md'
                          : 'border-[#e2e8f0] bg-white hover:border-[#94a3b8]'
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#10b981] text-white text-xs font-bold px-3 py-1 rounded-full">
                          Most Popular
                        </div>
                      )}

                      <div className="text-center">
                        <div className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-2">
                          {plan.name}
                        </div>

                        <div className="text-3xl font-bold text-[#0a1628] mb-1">
                          ${plan.price}
                        </div>

                        <div className="text-xs text-[#64748b]">
                          {plan.description}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Selected Plan Details */}
            {selectedPlan && (
              <div className="bg-[#f8fafc] rounded-xl p-6">
                <h3 className="font-semibold text-[#0a1628] mb-3">
                  What's included in the{' '}
                  {PLANS.find(p => p.id === selectedPlan)?.name} plan:
                </h3>

                <ul className="space-y-2">
                  {PLANS.find(p => p.id === selectedPlan)?.features
                    .slice(0, 5)
                    .map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-[#475569]"
                      >
                        <span className="text-[#10b981] mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}

                  {PLANS.find(p => p.id === selectedPlan)!.features.length > 5 && (
                    <li className="text-sm text-[#94a3b8] italic">
                      + {PLANS.find(p => p.id === selectedPlan)!.features.length - 5}{' '}
                      more features
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={isValidating || !websiteUrl.trim()}
              >
                {isValidating ? (
                  <span>Validating...</span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Continue to Payment
                    <ArrowRight size={18} />
                  </span>
                )}
              </Button>

              <p className="text-center text-xs text-[#94a3b8] mt-4">
                Secure payments powered by Stripe • Your analysis will begin
                immediately after payment confirmation.
              </p>
            </div>
          </form>
        </div>

        {/* Trust Signals */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="text-white/80">
            <div className="text-2xl font-bold mb-1">7</div>
            <div className="text-sm text-white/60">AI Models</div>
          </div>

          <div className="text-white/80">
            <div className="text-2xl font-bold mb-1">24–48 hrs</div>
            <div className="text-sm text-white/60">Report Delivery</div>
          </div>

          <div className="text-white/80">
            <div className="text-2xl font-bold mb-1">100%</div>
            <div className="text-sm text-white/60">Money-Back Guarantee</div>
          </div>
        </div>
      </div>
    </div>
  )
}