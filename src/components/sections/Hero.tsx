import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Search, ChevronDown, CheckCircle, Loader2 } from 'lucide-react'
import { AI_PLATFORMS, PLANS } from '../../constants'
import Button from '../ui/Button'

export default function Hero() {
  const navigate = useNavigate()
  const [url, setUrl] = useState('')
  const [plan, setPlan] = useState<string>('professional')
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault()
    if (!url) return
    setAnalyzing(true)
    setProgress(0)
    const steps = [15, 35, 55, 72, 88, 100]
    for (const s of steps) {
      await new Promise(r => setTimeout(r, 500))
      setProgress(s)
    }
    await new Promise(r => setTimeout(r, 300))
    navigate('/dashboard')
  }

  return (
    <section className="relative min-h-screen bg-[#0a1628] overflow-hidden flex flex-col">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#0f3460]/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#10b981]/10 blur-[100px] pointer-events-none" />

      <div className="relative flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />
            <span className="text-xs font-medium text-white/70 tracking-wide uppercase">
              The Future of Search Optimization
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Make Your Website{' '}
            <span className="relative">
              <span className="text-[#10b981]">Visible to AI</span>
              <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                <path d="M0 3 Q25 0 50 2 Q75 4 100 1" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.5" />
              </svg>
            </span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
            ChatGPT, Claude, Gemini, and Perplexity decide which businesses to recommend.
            Find out if yours makes the cut — and exactly how to get there.
          </p>

          {/* Analyzer */}
          {!analyzing ? (
            <form onSubmit={handleAnalyze} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#10b981]/50 focus:bg-white/8 transition-all text-sm"
                    required
                  />
                </div>
                <Button type="submit" variant="accent" size="lg" className="shrink-0">
                  Analyze Now <ArrowRight size={16} />
                </Button>
              </div>

              {/* Plan selector */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs text-white/40">Plan:</span>
                {PLANS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                      plan === p.id
                        ? 'bg-[#0f3460] text-white border border-[#1a4f8a]'
                        : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/20 hover:text-white/70'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 size={18} className="text-[#10b981] animate-spin" />
                <span className="text-sm text-white font-medium">
                  {progress < 30 ? 'Crawling website structure…' :
                   progress < 60 ? 'Running AI visibility analysis…' :
                   progress < 90 ? 'Evaluating content & schema…' :
                   'Finalizing report…'}
                </span>
                <span className="ml-auto text-xs font-mono text-[#10b981]">{progress}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0f3460] to-[#10b981] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {AI_PLATFORMS.slice(0, 4).map((ai, i) => (
                  <span key={ai.id} className={`text-xs px-2 py-1 rounded-md font-mono ${progress > i * 20 ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-white/5 text-white/30'}`}>
                    {progress > i * 20 ? <CheckCircle size={10} className="inline mr-1" /> : null}
                    {ai.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto w-full">
          {[
            { value: '12,400+', label: 'Websites Analyzed' },
            { value: '7', label: 'AI Models Supported' },
            { value: '94%', label: 'Score Improvement Rate' },
            { value: '3.2×', label: 'Avg. AI Mention Increase' },
          ].map(stat => (
            <div key={stat.label} className="text-center p-4 bg-white/3 border border-white/8 rounded-xl">
              <div className="text-2xl font-bold text-white mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust logos */}
        <div className="mt-10 text-center">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-5">
            Trusted by marketing teams at
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40">
            {['Shopify', 'HubSpot', 'Webflow', 'Notion', 'Vercel', 'Linear'].map(name => (
              <span key={name} className="text-white text-sm font-semibold tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="flex justify-center pb-6">
        <a href="#benefits" className="text-white/20 hover:text-white/40 transition-colors animate-bounce">
          <ChevronDown size={24} />
        </a>
      </div>
    </section>
  )
}
