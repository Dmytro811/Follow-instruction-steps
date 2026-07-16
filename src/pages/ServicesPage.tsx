import {
  Brain, Code2, FileSearch, Link2, Layers, Accessibility,
  Gauge, Tag, AlignLeft, Globe, ShieldCheck, Sparkles
} from 'lucide-react'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'

const services = [
  {
    icon: Brain,
    title: 'AI Visibility Optimization',
    description:
      'Optimize your website to be understood, trusted, and recommended by ChatGPT, Claude, Gemini, and other major AI assistants.',
    details: ['AI recommendation signal analysis', 'LLM trust factor evaluation', 'Citation readiness scoring', 'Multi-model visibility testing'],
  },
  {
    icon: Globe,
    title: 'Generative Engine Optimization (GEO)',
    description:
      'The next evolution of SEO. Align your content strategy with how generative AI systems discover and surface information.',
    details: ['Conversational query optimization', 'AI-first content architecture', 'Entity-based keyword mapping', 'Semantic topic clustering'],
  },
  {
    icon: FileSearch,
    title: 'Content Optimization',
    description:
      'Make your content machine-readable and AI-interpretable. Structure information so language models can extract and cite it accurately.',
    details: ['Content clarity scoring', 'Factual density analysis', 'Readability for AI systems', 'Structured answer formatting'],
  },
  {
    icon: Tag,
    title: 'Schema Markup & Structured Data',
    description:
      'Implement the structured data signals that help AI models understand your business, products, and credibility.',
    details: ['Organization & LocalBusiness schema', 'Product & FAQ schema', 'Review & Rating markup', 'BreadcrumbList & SiteLinks'],
  },
  {
    icon: AlignLeft,
    title: 'Semantic HTML Optimization',
    description:
      'Clean, meaningful HTML structure that communicates context to AI crawlers and improves interpretability scores.',
    details: ['Heading hierarchy audit', 'Landmark element review', 'Content sectioning analysis', 'HTML5 semantic elements'],
  },
  {
    icon: Accessibility,
    title: 'Accessibility Optimization',
    description:
      'Accessibility signals correlate with AI trustworthiness scores. ARIA compliance and accessible design improve your AI visibility.',
    details: ['WCAG 2.2 compliance check', 'ARIA label audit', 'Color contrast analysis', 'Keyboard navigation review'],
  },
  {
    icon: Code2,
    title: 'Technical SEO & Performance',
    description:
      'A technically sound website performs better with AI crawlers and traditional search engines alike.',
    details: ['Core Web Vitals analysis', 'Crawlability audit', 'Page speed optimization', 'Mobile-first indexing'],
  },
  {
    icon: Layers,
    title: 'Entity Optimization',
    description:
      'AI models think in entities, not keywords. Build clear entity associations that help AI understand who you are and what you do.',
    details: ['Brand entity definition', 'Knowledge graph alignment', 'Author entity signals', 'Topic entity mapping'],
  },
  {
    icon: Link2,
    title: 'Website Architecture & Internal Linking',
    description:
      'A logical site structure helps AI models build an accurate mental model of your content and authority.',
    details: ['Information architecture review', 'Internal link signal analysis', 'Silo structure optimization', 'Orphan page detection'],
  },
  {
    icon: ShieldCheck,
    title: 'Trust Signal Analysis',
    description:
      'AI models evaluate trust based on E-E-A-T signals, author clarity, and verifiable information. We surface every gap.',
    details: ['E-E-A-T signal audit', 'Author bio completeness', 'Contact & about page review', 'Policy page assessment'],
  },
  {
    icon: Gauge,
    title: 'AI Readability Scoring',
    description:
      'Beyond human readability, we measure how easily AI systems can extract key information from your pages.',
    details: ['Sentence structure analysis', 'Information density scoring', 'Question-answer pair detection', 'Fact-claim clarity'],
  },
  {
    icon: Sparkles,
    title: 'AI Website Optimization Package',
    description:
      'Our flagship service. AI automatically generates an optimized version of your website with improved pages, schema, and content.',
    details: ['Full page rewrites', 'Optimized metadata generation', 'FAQ generation', 'Schema markup creation'],
    highlight: true,
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <section className="bg-[#0a1628] py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            AI Visibility Services
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Every service is designed for one goal: making your website the source AI systems recommend.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(svc => (
              <div
                key={svc.title}
                className={`rounded-xl p-6 border ${svc.highlight ? 'bg-[#0f3460] border-[#1a4f8a] text-white' : 'bg-white border-[#e2e8f0] hover:shadow-md hover:-translate-y-0.5'} transition-all`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${svc.highlight ? 'bg-white/10' : 'bg-[#e8f0fb]'}`}>
                  <svc.icon size={20} className={svc.highlight ? 'text-[#10b981]' : 'text-[#0f3460]'} />
                </div>
                {svc.highlight && (
                  <span className="text-xs font-bold text-[#10b981] uppercase tracking-wide mb-2 block">Flagship Service</span>
                )}
                <h3 className={`font-bold text-base mb-2 ${svc.highlight ? 'text-white' : 'text-[#0a1628]'}`} style={{ fontFamily: 'var(--font-heading)' }}>
                  {svc.title}
                </h3>
                <p className={`text-sm mb-4 leading-relaxed ${svc.highlight ? 'text-white/60' : 'text-[#64748b]'}`}>{svc.description}</p>
                <ul className="space-y-1.5">
                  {svc.details.map(d => (
                    <li key={d} className={`text-xs flex items-center gap-2 ${svc.highlight ? 'text-white/70' : 'text-[#64748b]'}`}>
                      <span className={`w-1 h-1 rounded-full shrink-0 ${svc.highlight ? 'bg-[#10b981]' : 'bg-[#94a3b8]'}`} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#0a1628] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Ready to Get Your AI Visibility Score?
          </h2>
          <p className="text-[#64748b] mb-8">
            Start with any plan. Get a comprehensive analysis in minutes.
          </p>
          <Link to="/pricing">
            <Button size="lg">View Pricing</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
