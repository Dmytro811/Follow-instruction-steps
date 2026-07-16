import { Link } from 'react-router-dom'
import { Check, Star } from 'lucide-react'
import { PLANS } from '../../constants'
import Button from '../ui/Button'

export default function PricingCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${compact ? '' : 'max-w-5xl mx-auto'}`}>
      {PLANS.map((plan) => {
        const isHighlighted = plan.id === 'professional'
        return (
          <div
            key={plan.id}
            className={`relative rounded-2xl flex flex-col ${
              isHighlighted
                ? 'bg-[#0f3460] text-white border-2 border-[#1a4f8a] shadow-xl scale-[1.02]'
                : 'bg-white border border-[#e2e8f0] shadow-sm'
            }`}
          >
            {isHighlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#10b981] text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Star size={10} fill="currentColor" /> Most Popular
                </span>
              </div>
            )}

            <div className="p-6 flex-1">
              <h3
                className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isHighlighted ? 'text-white/60' : 'text-[#64748b]'}`}
              >
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-4xl font-bold ${isHighlighted ? 'text-white' : 'text-[#0a1628]'}`} style={{ fontFamily: 'var(--font-heading)' }}>
                  ${plan.price}
                </span>
                <span className={`text-sm ${isHighlighted ? 'text-white/50' : 'text-[#94a3b8]'}`}>/report</span>
              </div>
              <p className={`text-sm mb-6 ${isHighlighted ? 'text-white/60' : 'text-[#64748b]'}`}>
                {plan.description}
              </p>

              <ul className="space-y-3">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={15} className={`mt-0.5 shrink-0 ${isHighlighted ? 'text-[#10b981]' : 'text-[#10b981]'}`} />
                    <span className={`text-sm ${isHighlighted ? 'text-white/80' : 'text-[#475569]'}`}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 pt-0">
              <Link to="/pricing">
                <Button
                  variant={isHighlighted ? 'accent' : 'outline'}
                  fullWidth
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
