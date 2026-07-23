import type { AnalysisPlan } from '../types'

export const AI_PLATFORMS = [
  { id: 'chatgpt', name: 'ChatGPT', color: '#10a37f' },
  { id: 'claude', name: 'Claude', color: '#d97706' },
  { id: 'gemini', name: 'Gemini', color: '#4285f4' },
  { id: 'perplexity', name: 'Perplexity', color: '#20b2aa' },
  { id: 'copilot', name: 'Microsoft Copilot', color: '#0078d4' },
  { id: 'meta-ai', name: 'Meta AI', color: '#0668e1' },
  { id: 'grok', name: 'Grok', color: '#1d1d1d' },
]

export const PLANS: AnalysisPlan[] = [
  {
    id: 'single',
    name: 'Single AI Analysis',
    price: 49,
    description: 'Analyze your website visibility for one AI model.',
    features: [
      'AI Visibility Score (0–100)',
      'Technical structure audit',
      'Content analysis',
      'Schema markup review',
      'Trust signal evaluation',
      'Semantic HTML audit',
      'Accessibility check',
      'AI readability assessment',
      'Citation readiness',
      'Detected weaknesses report',
    ],
  },
  {
    id: 'professional',
    name: 'Professional Multi-AI',
    price: 149,
    description: 'Multi-model analysis with prioritized recommendations.',
    features: [
      'Everything in Single AI',
      'All 7 AI models analyzed',
      'Prioritized recommendations',
      'Implementation guidance',
      'Suggested content fixes',
      'Schema recommendations',
      'Metadata optimization',
      'Internal linking suggestions',
      'Entity optimization',
      'Estimated visibility uplift',
    ],
  },
  {
    id: 'optimization',
    name: 'AI Website Optimization',
    price: 499,
    description: 'Full AI-powered website rewrite and optimization.',
    features: [
      'Everything in Professional',
      'AI-generated homepage rewrite',
      'Optimized landing pages',
      'Improved headings & metadata',
      'Schema markup generation',
      'Better semantic HTML',
      'Generated FAQs',
      'Improved trust signals',
      'CTAs & internal link optimization',
      'Downloadable output package',
    ],
  },
]

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  //{ label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
]

export const SCORE_CATEGORIES = [
  { key: 'content', label: 'Content Quality' },
  { key: 'technical', label: 'Technical Structure' },
  { key: 'accessibility', label: 'Accessibility' },
  { key: 'schema', label: 'Schema Markup' },
  { key: 'semanticHtml', label: 'Semantic HTML' },
  { key: 'trust', label: 'Trust Signals' },
  { key: 'performance', label: 'Performance' },
  { key: 'entities', label: 'Entity Optimization' },
  { key: 'citations', label: 'Citation Readiness' },
  { key: 'aiReadability', label: 'AI Readability' },
] as const
