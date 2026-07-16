import { useState } from 'react'
import { Mail, MessageSquare, Clock, CheckCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-16">
      <section className="bg-[#0a1628] py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Get in Touch
          </h1>
          <p className="text-white/60 text-lg">Questions about AI visibility, enterprise plans, or partnerships — we're here.</p>
        </div>
      </section>

      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-5">
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5">
                <div className="w-9 h-9 bg-[#e8f0fb] rounded-lg flex items-center justify-center mb-3">
                  <Mail size={18} className="text-[#0f3460]" />
                </div>
                <h3 className="font-bold text-[#0a1628] mb-1">Email</h3>
                <p className="text-sm text-[#64748b]">hello@seoai.com</p>
                <p className="text-sm text-[#64748b]">support@seoai.com</p>
              </div>
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5">
                <div className="w-9 h-9 bg-[#e8f0fb] rounded-lg flex items-center justify-center mb-3">
                  <Clock size={18} className="text-[#0f3460]" />
                </div>
                <h3 className="font-bold text-[#0a1628] mb-1">Response Time</h3>
                <p className="text-sm text-[#64748b]">We respond within 24 hours on business days.</p>
              </div>
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5">
                <div className="w-9 h-9 bg-[#e8f0fb] rounded-lg flex items-center justify-center mb-3">
                  <MessageSquare size={18} className="text-[#0f3460]" />
                </div>
                <h3 className="font-bold text-[#0a1628] mb-1">Have a quick question?</h3>
                <p className="text-sm text-[#64748b] mb-2">Check our FAQ for instant answers.</p>
                <Link to="/faq" className="text-sm font-semibold text-[#0f3460] hover:text-[#10b981] transition-colors">
                  Browse FAQ →
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2 bg-white border border-[#e2e8f0] rounded-2xl p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={28} className="text-[#10b981]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0a1628] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    Message received!
                  </h2>
                  <p className="text-[#64748b]">We'll get back to you at {form.email} within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-[#0a1628] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    Send a Message
                  </h2>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0f3460] transition-colors"
                          placeholder="Sarah Chen"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1.5">
                          Business Email
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0f3460] transition-colors"
                          placeholder="sarah@company.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1.5">
                        Company
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                        className="w-full border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0f3460] transition-colors"
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1.5">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className="w-full border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0f3460] transition-colors resize-none"
                        placeholder="Tell us about your website and what you're trying to achieve…"
                      />
                    </div>
                    <Button type="submit" size="lg" fullWidth>Send Message</Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
