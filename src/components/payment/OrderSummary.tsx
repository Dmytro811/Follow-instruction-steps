import { Lock, Check, Globe } from 'lucide-react'

interface OrderSummaryProps {
  plan: {
    name: string
    price: number
    features: string[]
  }
  websiteUrl?: string
}

export default function OrderSummary({ plan, websiteUrl }: OrderSummaryProps) {
  const vat = plan.price * 0.2
  const total = plan.price + vat

  return (
    <div className="lg:col-span-1">
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 sticky top-8">
        <h2
          className="text-lg font-bold text-[#0a1628] mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Order Summary
        </h2>

        {/* Website URL */}
        {websiteUrl && (
          <div className="mb-4 p-3 bg-[#e8f0fb] rounded-lg">
            <div className="flex items-center gap-2 text-xs text-[#64748b] mb-1">
              <Globe size={12} />
              <span className="uppercase tracking-wide">
                Website to Analyze
              </span>
            </div>

            <div className="text-sm font-medium text-[#0f3460] truncate">
              {websiteUrl}
            </div>
          </div>
        )}

        <div className="bg-[#f8fafc] rounded-lg p-4 mb-4">
          <div className="font-semibold text-[#0a1628] mb-2">
            {plan.name}
          </div>

          <ul className="space-y-1.5 mb-3">
            {plan.features.slice(0, 5).map((feature: string, i: number) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-[#64748b]"
              >
                <Check
                  size={14}
                  className="text-[#10b981] mt-0.5 shrink-0"
                />
                <span>{feature}</span>
              </li>
            ))}

            {plan.features.length > 5 && (
              <li className="text-xs text-[#94a3b8] italic pl-5">
                + {plan.features.length - 5} more features
              </li>
            )}
          </ul>

          <div className="text-2xl font-bold text-[#0a1628]">
            ${plan.price}
          </div>
        </div>

        <div className="border-t border-[#e2e8f0] pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#64748b]">Subtotal</span>
            <span className="font-medium text-[#0a1628]">
              ${plan.price}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#64748b]">VAT (20%)</span>
            <span className="font-medium text-[#0a1628]">
              ${vat.toFixed(2)}
            </span>
          </div>

          <div className="border-t border-[#e2e8f0] pt-2 flex justify-between text-base">
            <span className="font-semibold text-[#0a1628]">Total</span>
            <span className="font-bold text-[#0a1628]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#94a3b8]">
          <Lock size={12} />
          <span>Secure payment powered by Stripe</span>
        </div>
      </div>
    </div>
  )
}