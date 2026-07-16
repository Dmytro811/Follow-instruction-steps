import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Download, ChevronDown, ChevronUp, AlertTriangle,
  AlertCircle, Info, CheckCircle2, ExternalLink, ArrowLeft
} from 'lucide-react'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const scoreCategories = [
  { label: 'Content Quality', score: 78, status: 'good', description: 'Content is well-structured but lacks specific AI-friendly formatting patterns in key sections.', impact: 'medium', recommendation: 'Add explicit question-answer pairs in your main service pages. AI models prefer content structured as direct answers.', key: 'content' },
  { label: 'Technical Structure', score: 91, status: 'excellent', description: 'Excellent technical foundation. Clean HTML, fast loading, and proper use of HTML5 semantic elements.', impact: 'low', recommendation: 'Minor: ensure all images have descriptive alt text that includes entity context.', key: 'technical' },
  { label: 'Accessibility', score: 84, status: 'good', description: 'Good accessibility score. ARIA labels present on most interactive elements. Some contrast issues detected.', impact: 'medium', recommendation: 'Fix 3 color contrast issues on secondary text. Add missing ARIA labels to icon-only buttons.', key: 'accessibility' },
  { label: 'Schema Markup', score: 65, status: 'needs-work', description: 'Organization schema is present but incomplete. Product and FAQ schema are missing on key pages.', impact: 'high', recommendation: 'Implement FAQPage schema on your FAQ page. Add Product schema to pricing page. Complete Organization schema with founder details.', key: 'schema' },
  { label: 'Semantic HTML', score: 88, status: 'good', description: 'Strong use of semantic HTML5 elements. Heading hierarchy is logical and consistent throughout the site.', impact: 'low', recommendation: 'Replace 2 instances of div-based navigation with nav elements. Add article tags to blog posts.', key: 'semantic' },
  { label: 'Trust Signals', score: 72, status: 'needs-work', description: 'Author information is missing on blog posts. About page lacks team photos and credentials.', impact: 'high', recommendation: 'Add author bios with credentials to all blog content. Include expert author schema markup. Add customer logos with permission.', key: 'trust' },
  { label: 'Performance', score: 93, status: 'excellent', description: 'Excellent Core Web Vitals. LCP 1.2s, FID <50ms, CLS 0.02. Page speed well optimized.', impact: 'low', recommendation: 'Preload critical fonts. Implement resource hints for external dependencies.', key: 'performance' },
  { label: 'Entity Optimization', score: 58, status: 'needs-work', description: 'Brand entity is not clearly defined. Industry entities and topic associations are fragmented across the site.', impact: 'high', recommendation: 'Create a dedicated /about page that clearly defines your company entity with consistent naming, founding date, and category.', key: 'entities' },
  { label: 'Citation Readiness', score: 61, status: 'needs-work', description: 'Limited use of verifiable claims, statistics, or citable facts. AI models prefer sources with checkable information.', impact: 'high', recommendation: 'Add sourced statistics to your content. Include publication dates on all articles. Create a data-backed resources page.', key: 'citations' },
  { label: 'AI Readability', score: 76, status: 'good', description: 'Content is generally clear but uses industry jargon in several sections. AI models prefer direct, factual language.', impact: 'medium', recommendation: 'Simplify technical explanations with plain-language summaries. Add TL;DR sections at the top of long articles.', key: 'aiReadability' },
]

const overallScore = 82

function ScoreColor(score: number) {
  return score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : score >= 40 ? '#f97316' : '#ef4444'
}

function IssueItem({ item, isOpen, onToggle }: { item: typeof scoreCategories[0]; isOpen: boolean; onToggle: () => void }) {
  const statusStyles = {
    excellent: { badge: 'success' as const, icon: CheckCircle2, iconColor: 'text-[#10b981]' },
    good: { badge: 'info' as const, icon: Info, iconColor: 'text-blue-500' },
    'needs-work': { badge: 'warning' as const, icon: AlertTriangle, iconColor: 'text-amber-500' },
    critical: { badge: 'error' as const, icon: AlertCircle, iconColor: 'text-red-500' },
  }
  const style = statusStyles[item.status as keyof typeof statusStyles]

  return (
    <div className="border border-[#e2e8f0] rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center gap-4 p-4 hover:bg-[#f8fafc] transition-colors text-left"
        onClick={onToggle}
      >
        <style.icon size={18} className={style.iconColor} />
        <span className="flex-1 font-semibold text-sm text-[#0a1628]">{item.label}</span>
        <Badge variant={style.badge}>{item.status.replace('-', ' ')}</Badge>
        <div className="w-16 text-right">
          <span className="text-base font-bold" style={{ color: ScoreColor(item.score) }}>{item.score}</span>
          <span className="text-xs text-[#94a3b8]">/100</span>
        </div>
        {isOpen ? <ChevronUp size={16} className="text-[#94a3b8]" /> : <ChevronDown size={16} className="text-[#94a3b8]" />}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-[#f1f5f9] pt-4 space-y-4">
          <ProgressBar value={item.score} height={8} showValue={false} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-1.5">Finding</div>
              <p className="text-sm text-[#475569] leading-relaxed">{item.description}</p>
            </div>
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-4">
              <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1.5">Recommendation</div>
              <p className="text-sm text-emerald-800 leading-relaxed">{item.recommendation}</p>
              <div className="mt-2">
                <Badge variant={item.impact === 'high' ? 'error' : item.impact === 'medium' ? 'warning' : 'success'}>
                  {item.impact} impact
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ReportPage() {
  useParams()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const circumference = 2 * Math.PI * 52
  const offset = circumference - (overallScore / 100) * circumference

  return (
    <div className="pt-16 min-h-screen bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className="flex items-center gap-1 text-sm text-[#64748b] hover:text-[#0f3460]">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex items-start gap-5">
              {/* Score ring */}
              <div className="relative">
                <svg width="120" height="120" className="-rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#10b981" strokeWidth="10"
                    strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[#0a1628]">{overallScore}</span>
                  <span className="text-xs text-[#94a3b8]">/ 100</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-[#94a3b8] mb-1">AI Visibility Report</div>
                <h1 className="text-xl font-bold text-[#0a1628] mb-1 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  dataflow.io
                  <ExternalLink size={14} className="text-[#94a3b8]" />
                </h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="success">Score: Good</Badge>
                  <Badge variant="outline">Professional Multi-AI</Badge>
                  <Badge variant="outline">Jul 14, 2026</Badge>
                  <Badge variant="outline">7 AI Models</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-start shrink-0">
              <Button variant="outline" size="sm">
                <Download size={14} /> Export PDF
              </Button>
              <Link to="/pricing">
                <Button size="sm">Re-analyze</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Score grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {scoreCategories.map(cat => (
            <div key={cat.key} className="bg-white border border-[#e2e8f0] rounded-xl p-3 text-center">
              <div className="text-xl font-bold mb-0.5" style={{ color: ScoreColor(cat.score), fontFamily: 'var(--font-heading)' }}>
                {cat.score}
              </div>
              <div className="text-xs text-[#64748b] leading-tight">{cat.label}</div>
            </div>
          ))}
        </div>

        {/* Detailed breakdown */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#0a1628] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Detailed Analysis
          </h2>
          <div className="space-y-2">
            {scoreCategories.map((item, i) => (
              <IssueItem
                key={item.key}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
