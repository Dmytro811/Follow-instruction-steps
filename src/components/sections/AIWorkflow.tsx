import { Globe, Cpu, BarChart3, FileText, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Globe,
    step: '01',
    title: 'Submit Your Website',
    description: 'Enter your URL and select the analysis plan. We support any publicly accessible website.',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'AI Analysis Engine',
    description: 'Our AI agents crawl your site and evaluate it against the criteria each major AI model uses to recommend sources.',
  },
  {
    icon: BarChart3,
    step: '03',
    title: 'Score & Benchmark',
    description: 'Receive your AI Visibility Score across 10 dimensions. See exactly where you rank versus competitors.',
  },
  {
    icon: FileText,
    step: '04',
    title: 'Detailed Report',
    description: 'Get a prioritized list of issues and recommendations — what to fix, why it matters, and how to do it.',
  },
  {
    icon: Rocket,
    step: '05',
    title: 'Optimize & Re-analyze',
    description: "Implement fixes and re-run the analysis to track your score improvement. Watch your AI mentions grow.",
  },
]

export default function AIWorkflow() {
  return (
    <section className="py-24 bg-[#0a1628] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at center, #ffffff 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wide">How It Works</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            From URL to Actionable Insights
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Our fully automated AI workflow delivers enterprise-grade analysis in minutes.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div key={step.step} className="relative text-center">
                <div className="inline-flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 bg-[#0f3460] border border-white/10 rounded-2xl flex items-center justify-center mx-auto">
                      <step.icon size={28} className="text-[#10b981]" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#10b981] rounded-full text-xs font-bold text-white flex items-center justify-center" style={{ fontFamily: 'var(--font-code)' }}>
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/40 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
