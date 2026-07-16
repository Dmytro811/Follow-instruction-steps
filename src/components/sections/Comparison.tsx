import { Check, X, ArrowRight } from 'lucide-react'

const rows = [
  { label: 'Optimizes for Google rankings', traditional: true, geo: false },
  { label: 'Optimizes for AI recommendations', traditional: false, geo: true },
  { label: 'Keyword-based approach', traditional: true, geo: false },
  { label: 'Entity & semantic understanding', traditional: false, geo: true },
  { label: 'Backlink-focused authority', traditional: true, geo: false },
  { label: 'Trust signals for AI models', traditional: false, geo: true },
  { label: 'Schema markup for search crawlers', traditional: true, geo: true },
  { label: 'AI readability scoring', traditional: false, geo: true },
  { label: 'Citation readiness analysis', traditional: false, geo: true },
  { label: 'Conversational query coverage', traditional: false, geo: true },
]

export default function Comparison() {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0a1628] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Traditional SEO vs. AI Visibility
          </h2>
          <p className="text-[#64748b] max-w-xl mx-auto">
            The optimization strategies that dominated the last decade don't work for the next one.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-3 bg-[#0a1628] text-white">
            <div className="p-4 text-sm font-medium text-white/50">Feature</div>
            <div className="p-4 text-sm font-semibold text-center border-l border-white/10">
              Traditional SEO
            </div>
            <div className="p-4 text-sm font-semibold text-center border-l border-white/10 text-[#10b981]">
              AI Visibility (GEO)
            </div>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'} border-b border-[#e2e8f0] last:border-0`}
            >
              <div className="p-4 text-sm text-[#334155] flex items-center">{row.label}</div>
              <div className="p-4 flex justify-center items-center border-l border-[#e2e8f0]">
                {row.traditional ? (
                  <Check size={18} className="text-[#10b981]" />
                ) : (
                  <X size={18} className="text-[#cbd5e1]" />
                )}
              </div>
              <div className="p-4 flex justify-center items-center border-l border-[#e2e8f0]">
                {row.geo ? (
                  <Check size={18} className="text-[#10b981]" />
                ) : (
                  <X size={18} className="text-[#cbd5e1]" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Evolution */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          {['Traditional SEO', 'Generative Engine Optimization', 'AI Visibility Optimization'].map((label, i, arr) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`px-4 py-2.5 rounded-xl text-sm font-semibold ${i === arr.length - 1 ? 'bg-[#0f3460] text-white' : 'bg-white border border-[#e2e8f0] text-[#64748b]'}`}>
                {label}
              </div>
              {i < arr.length - 1 && <ArrowRight size={16} className="text-[#10b981] shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
