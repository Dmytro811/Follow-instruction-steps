import { Brain, Target, TrendingUp, Shield, Zap, Eye } from 'lucide-react'

const benefits = [
  {
    icon: Brain,
    title: 'AI Understands You',
    description:
      'When ChatGPT or Gemini get asked about solutions in your category, your website becomes the authoritative reference they cite.',
  },
  {
    icon: Target,
    title: 'Precise Diagnosis',
    description:
      'Our engine identifies exactly which signals AI models use to evaluate trustworthiness, authority, and recommendation-worthiness.',
  },
  {
    icon: TrendingUp,
    title: 'Measurable Growth',
    description:
      'Track your AI Visibility Score before and after optimization. See real improvements in how often AI recommends your business.',
  },
  {
    icon: Shield,
    title: 'Trust & Authority',
    description:
      'AI assistants favor entities with clear expertise, consistent signals, and well-structured content. We help you build all three.',
  },
  {
    icon: Zap,
    title: 'Instant Analysis',
    description:
      'Submit your URL and get a comprehensive AI visibility report in minutes, not weeks. No waiting for agency proposals.',
  },
  {
    icon: Eye,
    title: 'Multi-Model Coverage',
    description:
      'Different AI models rank websites differently. Our analysis covers ChatGPT, Claude, Gemini, Perplexity, Copilot, Meta AI, and Grok.',
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#e8f0fb] rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 bg-[#0f3460] rounded-full" />
            <span className="text-xs font-semibold text-[#0f3460] uppercase tracking-wide">Why It Matters</span>
          </div>
          <h2 className="text-4xl font-bold text-[#0a1628] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            The Search Landscape Has Shifted
          </h2>
          <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
            Over 40% of information queries now go to AI assistants first. If AI doesn't know your website, your customers don't find you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group p-6 rounded-xl border border-[#e2e8f0] hover:border-[#0f3460]/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 bg-[#e8f0fb] group-hover:bg-[#0f3460] rounded-lg flex items-center justify-center mb-4 transition-colors">
                <b.icon size={20} className="text-[#0f3460] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-base font-semibold text-[#0a1628] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {b.title}
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
