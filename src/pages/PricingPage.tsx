import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { PLANS } from '../constants'
import Button from '../components/ui/Button'
import FAQAccordion from '../components/sections/FAQAccordion'

const comparisonFeatures = [
  { label: 'AI Visibility Score (0–100)', single: true, pro: true, opt: true },
  { label: 'Number of AI models analyzed', single: '1', pro: '7', opt: '7' },
  { label: 'Technical structure audit', single: true, pro: true, opt: true },
  { label: 'Content & schema analysis', single: true, pro: true, opt: true },
  { label: 'Trust & accessibility check', single: true, pro: true, opt: true },
  { label: 'AI readability assessment', single: true, pro: true, opt: true },
  { label: 'Citation readiness score', single: true, pro: true, opt: true },
  { label: 'Prioritized recommendations', single: false, pro: true, opt: true },
  { label: 'Implementation guidance', single: false, pro: true, opt: true },
  { label: 'Entity optimization plan', single: false, pro: true, opt: true },
  { label: 'Estimated visibility uplift', single: false, pro: true, opt: true },
  { label: 'AI-generated homepage rewrite', single: false, pro: false, opt: true },
  { label: 'Optimized landing pages', single: false, pro: false, opt: true },
  { label: 'Generated schema markup', single: false, pro: false, opt: true },
  { label: 'Downloadable output package', single: false, pro: false, opt: true },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={18} className="text-[#10b981] mx-auto" />
  if (value === false) return <X size={18} className="text-[#cbd5e1] mx-auto" />
  return <span className="text-sm font-semibold text-[#0f3460]">{value}</span>
}

export default function PricingPage() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-[#0a1628] py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Pay Per Report
          </h1>
          <p className="text-white/60 text-lg">
            No subscriptions. No monthly fees. Buy the analysis you need, when you need it.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map(plan => {
              const isHighlighted = plan.id === 'professional'
              const isSelected = selected === plan.id
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelected(plan.id)}
                  className={`relative rounded-2xl cursor-pointer transition-all duration-200 flex flex-col ${
                    isHighlighted
                      ? 'bg-[#0f3460] border-2 border-[#1a4f8a] shadow-xl text-white'
                      : isSelected
                      ? 'bg-white border-2 border-[#0f3460] shadow-lg'
                      : 'bg-white border border-[#e2e8f0] hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {isHighlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10b981] text-white text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8 flex-1">
                    <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isHighlighted ? 'text-white/50' : 'text-[#94a3b8]'}`}>
                      {plan.name}
                    </div>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className={`text-5xl font-bold ${isHighlighted ? 'text-white' : 'text-[#0a1628]'}`} style={{ fontFamily: 'var(--font-heading)' }}>
                        ${plan.price}
                      </span>
                    </div>
                    <p className={`text-sm mb-6 ${isHighlighted ? 'text-white/60' : 'text-[#64748b]'}`}>{plan.description}</p>
                    <ul className="space-y-2.5">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-start gap-2">
                          <Check size={14} className="mt-0.5 text-[#10b981] shrink-0" />
                          <span className={`text-sm ${isHighlighted ? 'text-white/80' : 'text-[#475569]'}`}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 pt-0">
                    <Button variant={isHighlighted ? 'accent' : 'primary'} fullWidth size="lg">
                      Get Started — ${plan.price}
                    </Button>
                    <p className={`text-center text-xs mt-3 ${isHighlighted ? 'text-white/40' : 'text-[#94a3b8]'}`}>
                      Secure payment via Stripe
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#0a1628] mb-10" style={{ fontFamily: 'var(--font-heading)' }}>
            Full Feature Comparison
          </h2>
          <div className="border border-[#e2e8f0] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 bg-[#0a1628] text-white text-sm">
              <div className="p-4 font-medium text-white/50">Feature</div>
              {PLANS.map(p => (
                <div key={p.id} className={`p-4 text-center font-semibold border-l border-white/10 ${p.id === 'professional' ? 'text-[#10b981]' : ''}`}>
                  {p.name.split(' ')[0]}
                </div>
              ))}
            </div>
            {comparisonFeatures.map((row, i) => (
              <div key={row.label} className={`grid grid-cols-4 border-b border-[#e2e8f0] last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}`}>
                <div className="p-4 text-sm text-[#334155] flex items-center gap-1">
                  {row.label}
                </div>
                <div className="p-4 flex items-center justify-center border-l border-[#e2e8f0]">
                  <Cell value={row.single} />
                </div>
                <div className="p-4 flex items-center justify-center border-l border-[#e2e8f0] bg-[#0f3460]/3">
                  <Cell value={row.pro} />
                </div>
                <div className="p-4 flex items-center justify-center border-l border-[#e2e8f0]">
                  <Cell value={row.opt} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#0a1628] mb-10" style={{ fontFamily: 'var(--font-heading)' }}>
            Pricing FAQ
          </h2>
          <FAQAccordion />
        </div>
      </section>
    </div>
  )
}
