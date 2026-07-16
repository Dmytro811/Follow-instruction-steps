import Hero from '../components/sections/Hero'
import Benefits from '../components/sections/Benefits'
import AIWorkflow from '../components/sections/AIWorkflow'
import Comparison from '../components/sections/Comparison'
import PricingCards from '../components/sections/PricingCards'
import Testimonials from '../components/sections/Testimonials'
import FAQAccordion from '../components/sections/FAQAccordion'
import NewsletterCTA from '../components/sections/NewsletterCTA'
import FinalCTA from '../components/sections/FinalCTA'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <AIWorkflow />
      <Comparison />

      {/* Case study teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#0a1628]" style={{ fontFamily: 'var(--font-heading)' }}>
                Real Results, Real Businesses
              </h2>
              <p className="text-[#64748b] mt-1">See how companies have transformed their AI visibility.</p>
            </div>
            <Link to="/case-studies" className="flex items-center gap-1 text-sm font-semibold text-[#0f3460] hover:text-[#10b981] transition-colors">
              All case studies <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { company: 'Dataflow.io', industry: 'SaaS / Workflow Automation', before: 34, after: 82, lift: '+141%' },
              { company: 'Meridian Agency', industry: 'Digital Marketing Agency', before: 51, after: 89, lift: '+75%' },
              { company: 'Circe Commerce', industry: 'E-commerce / DTC', before: 28, after: 74, lift: '+164%' },
            ].map(cs => (
              <div key={cs.company} className="border border-[#e2e8f0] rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="text-xs text-[#94a3b8] uppercase tracking-wide mb-1">{cs.industry}</div>
                <h3 className="font-bold text-[#0a1628] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{cs.company}</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#ef4444]">{cs.before}</div>
                    <div className="text-xs text-[#94a3b8]">Before</div>
                  </div>
                  <div className="flex-1 h-px bg-[#e2e8f0] relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-[#10b981] bg-white px-1">
                      {cs.lift}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#10b981]">{cs.after}</div>
                    <div className="text-xs text-[#94a3b8]">After</div>
                  </div>
                </div>
                <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#ef4444] via-[#f59e0b] to-[#10b981] rounded-full" style={{ width: `${cs.after}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0a1628] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Simple, Transparent Pricing
            </h2>
            <p className="text-[#64748b]">Pay per report. No subscriptions. No hidden fees.</p>
          </div>
          <PricingCards />
        </div>
      </section>

      <Testimonials />

      {/* FAQ section */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0a1628] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <NewsletterCTA />
      <FinalCTA />
    </>
  )
}
