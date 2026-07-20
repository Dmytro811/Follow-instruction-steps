import { TrendingUp } from 'lucide-react'

// ЗАМІНІТЬ КЕЙСИ НА РЕАЛЬНІ ПРОЕКТИ:
// company - назва компанії клієнта
// industry - індустрія/сфера діяльності
// logo - логотип (ініціали або можна додати logoImage: 'шлях/до/лого.png')
// challenge - опис проблеми, з якою звернувся клієнт
// solution - що ви зробили для вирішення проблеми
// before - показник "до" (наприклад, score, продажі, трафік)
// after - показник "після" роботи з вами
// metrics - детальні метрики результатів (label - назва метрики, before - значення до, after - значення після, unit - одиниці виміру)
const cases = [
  {
    company: 'Dataflow.io',
    industry: 'SaaS / Workflow Automation',
    logo: 'DF',
    challenge: 'Despite strong Google rankings for workflow automation keywords, Dataflow.io was virtually invisible to AI assistants. ChatGPT and Perplexity consistently recommended competitors when users asked about automation tools.',
    solution: 'Implemented full entity optimization, added comprehensive FAQ schema, restructured content with explicit question-answer formatting, and improved trust signals with author E-E-A-T markup.',
    before: 34,
    after: 82,
    metrics: [
      { label: 'AI Visibility Score', before: '34', after: '82', unit: '/100' },
      { label: 'AI-referred inbound leads', before: '4/mo', after: '38/mo', unit: '' },
      { label: 'ChatGPT mentions/week', before: '0', after: '12', unit: '' },
    ],
  },
  // ДОДАЙТЕ БІЛЬШЕ КЕЙСІВ ТУТ
  // Приклад структури:
  // {
  //   company: 'Назва компанії',
  //   industry: 'Індустрія',
  //   logo: 'НК',
  //   challenge: 'Опис проблеми клієнта...',
  //   solution: 'Опис вашого рішення...',
  //   before: 30,
  //   after: 85,
  //   metrics: [
  //     { label: 'Метрика 1', before: '10', after: '50', unit: '/100' },
  //     { label: 'Метрика 2', before: '5/mo', after: '25/mo', unit: '' },
  //   ],
  // },
]

export default function CaseStudiesPage() {
  return (
    <div className="pt-16">
      <section className="bg-[#0a1628] py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Case Studies
          </h1>
          <p className="text-white/60 text-lg">Real companies, real results. See how AI Visibility Optimization drives measurable growth.</p>
        </div>
      </section>

      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {cases.map((cs) => (
            <div key={cs.company} className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-sm">
              <div className="p-8 border-b border-[#e2e8f0] flex flex-col md:flex-row justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0f3460] rounded-xl flex items-center justify-center text-white font-bold text-sm">
                    {cs.logo}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0a1628]" style={{ fontFamily: 'var(--font-heading)' }}>{cs.company}</h2>
                    <p className="text-sm text-[#94a3b8]">{cs.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#ef4444]">{cs.before}</div>
                    <div className="text-xs text-[#94a3b8]">Before</div>
                  </div>
                  <TrendingUp size={20} className="text-[#10b981]" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#10b981]">{cs.after}</div>
                    <div className="text-xs text-[#94a3b8]">After</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-6 border-b md:border-b-0 md:border-r border-[#e2e8f0]">
                  <h3 className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-3">Challenge</h3>
                  <p className="text-sm text-[#475569] leading-relaxed">{cs.challenge}</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-3">Solution</h3>
                  <p className="text-sm text-[#475569] leading-relaxed">{cs.solution}</p>
                </div>
              </div>

              <div className="p-6 bg-[#f8fafc] border-t border-[#e2e8f0]">
                <h3 className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-4">Results</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {cs.metrics.map(m => (
                    <div key={m.label} className="bg-white border border-[#e2e8f0] rounded-xl p-4">
                      <div className="text-xs text-[#94a3b8] mb-2">{m.label}</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-[#94a3b8] line-through">{m.before}</span>
                        <span className="text-lg font-bold text-[#10b981]">{m.after}{m.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
