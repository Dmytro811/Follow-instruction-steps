import FAQAccordion from '../components/sections/FAQAccordion'
import NewsletterCTA from '../components/sections/NewsletterCTA'
import { Link } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'

const categories = [
  { label: 'AI Visibility & GEO', anchor: '#ai-visibility' },
  { label: 'Analysis & Reports', anchor: '#analysis' },
  { label: 'Pricing & Payments', anchor: '#pricing' },
  { label: 'Privacy & Security', anchor: '#privacy' },
]

export default function FAQPage() {
  return (
    <div className="pt-16">
      <section className="bg-[#0a1628] py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-white/60 text-lg">
            Everything you need to know about AI Visibility Optimization and SEO AI.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Quick nav */}
            <div className="md:col-span-1">
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 sticky top-24">
                <h3 className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-3">Categories</h3>
                <ul className="space-y-1.5">
                  {categories.map(cat => (
                    <li key={cat.label}>
                      <a href={cat.anchor} className="text-sm text-[#64748b] hover:text-[#0f3460] transition-colors block py-0.5">
                        {cat.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-[#e2e8f0]">
                  <p className="text-xs text-[#94a3b8] mb-2">Still have questions?</p>
                  <Link to="/contact" className="flex items-center gap-1.5 text-sm font-semibold text-[#0f3460] hover:text-[#10b981] transition-colors">
                    <MessageSquare size={14} /> Contact us
                  </Link>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="md:col-span-3">
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </div>
  )
}
