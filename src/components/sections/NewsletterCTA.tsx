import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Button from '../ui/Button'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="py-20 bg-[#0f3460]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          Stay Ahead of AI Search Changes
        </h2>
        <p className="text-white/60 mb-8">
          Get weekly insights on AI visibility, GEO strategies, and LLM optimization. Trusted by 8,200+ marketing leaders.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-[#10b981]">
            <CheckCircle size={20} />
            <span className="font-medium">You're in! Check your inbox.</span>
          </div>
        ) : (
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 text-sm"
            />
            <Button type="submit" variant="accent">
              Subscribe <ArrowRight size={15} />
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
