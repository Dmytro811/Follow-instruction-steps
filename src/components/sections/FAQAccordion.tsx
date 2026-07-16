import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: "What is AI Visibility and why does it matter?",
    a: "AI Visibility measures how well your website is understood and trusted by AI language models like ChatGPT, Claude, and Gemini. When users ask AI assistants for recommendations, the models cite sources they consider authoritative and well-structured. Without AI optimization, your business may be invisible in this rapidly growing channel.",
  },
  {
    q: "How is this different from traditional SEO?",
    a: "Traditional SEO focuses on ranking in Google's search index through keywords, backlinks, and crawlability. AI Visibility Optimization (GEO) focuses on making your content understandable, trustworthy, and citable by large language models. The signals are different: schema markup, entity clarity, semantic HTML, trust signals, and citation readiness matter far more than keyword density.",
  },
  {
    q: "Which AI models does the analysis cover?",
    a: "The Single plan covers one model of your choice. The Professional and Optimization plans cover all 7: ChatGPT, Claude, Gemini, Perplexity, Microsoft Copilot, Meta AI, and Grok. Each model evaluates websites differently, and our scoring reflects those differences.",
  },
  {
    q: "How long does an analysis take?",
    a: "Most analyses complete within 5–15 minutes depending on website size. You'll receive a real-time progress indicator and a notification when your report is ready.",
  },
  {
    q: "What does the AI Visibility Score mean?",
    a: "The score is a 0–100 composite metric across 10 dimensions: Content Quality, Technical Structure, Accessibility, Schema Markup, Semantic HTML, Trust Signals, Performance, Entity Optimization, Citation Readiness, and AI Readability. Higher scores mean AI models are more likely to understand, trust, and recommend your website.",
  },
  {
    q: "How do payments work?",
    a: "We use Stripe for secure payment processing. After selecting a plan and entering your website URL, you'll complete payment through a secure Stripe checkout. Your analysis begins immediately after confirmation.",
  },
  {
    q: "Can I re-analyze my website after making improvements?",
    a: "Yes. Each purchase covers one full analysis report. You can purchase additional analyses at any time. Many customers run monthly analyses to track their progress after implementing recommendations.",
  },
  {
    q: "Is my website data kept private?",
    a: "We only analyze publicly accessible content on your website — the same content visible to any user or web crawler. We do not access any private or authenticated pages. Your report data is stored securely and never shared with third parties.",
  },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-[#e2e8f0] rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-5 text-left hover:bg-[#f8fafc] transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-sm font-semibold text-[#0a1628] pr-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {faq.q}
            </span>
            {open === i ? (
              <Minus size={16} className="text-[#0f3460] shrink-0" />
            ) : (
              <Plus size={16} className="text-[#94a3b8] shrink-0" />
            )}
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm text-[#64748b] leading-relaxed border-t border-[#e2e8f0] pt-4">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
