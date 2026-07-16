import { useState } from 'react'
import { Search, Clock, ArrowRight } from 'lucide-react'

const categories = ['All', 'GEO Strategy', 'Technical', 'AI Models', 'Case Studies', 'Industry News']

const posts = [
  {
    id: 1,
    title: "Why ChatGPT Recommends Your Competitors (And How to Change That)",
    excerpt: "Understanding the ranking signals LLMs use to select recommended sources — and a practical framework for optimizing each one.",
    category: 'GEO Strategy',
    date: 'Jul 12, 2026',
    readTime: '8 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop&auto=format',
  },
  {
    id: 2,
    title: "The Entity Optimization Playbook for AI Visibility",
    excerpt: "AI models think in entities, not keywords. Here's how to build clear entity associations that help models understand your brand.",
    category: 'Technical',
    date: 'Jul 8, 2026',
    readTime: '12 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=340&fit=crop&auto=format',
  },
  {
    id: 3,
    title: "Schema Markup for LLMs: What Actually Works in 2026",
    excerpt: "Not all schema markup improves AI visibility. We tested 14 schema types across 7 AI models to find which ones move the needle.",
    category: 'Technical',
    date: 'Jul 3, 2026',
    readTime: '10 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop&auto=format',
  },
  {
    id: 4,
    title: "Gemini vs. Claude vs. ChatGPT: How Each AI Evaluates Websites",
    excerpt: "Each major AI model weighs trust, content quality, and technical signals differently. Here's what we found after analyzing 1,200 websites.",
    category: 'AI Models',
    date: 'Jun 28, 2026',
    readTime: '14 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=600&h=340&fit=crop&auto=format',
  },
  {
    id: 5,
    title: "Generative Engine Optimization: The Complete 2026 Guide",
    excerpt: "Everything you need to know about GEO — from fundamental concepts to advanced implementation strategies for enterprise websites.",
    category: 'GEO Strategy',
    date: 'Jun 20, 2026',
    readTime: '20 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop&auto=format',
  },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = posts.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    (search === '' || p.title.toLowerCase().includes(search.toLowerCase()))
  )

  const featured = filtered.find(p => p.featured)
  const rest = filtered.filter(p => !p.featured)

  return (
    <div className="pt-16">
      <section className="bg-[#0a1628] py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            AI Visibility Blog
          </h1>
          <p className="text-white/60">Strategy, research, and insights on optimizing for AI assistants.</p>
          <div className="mt-6 max-w-md mx-auto relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 text-sm"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#0f3460] text-white'
                    : 'bg-white border border-[#e2e8f0] text-[#64748b] hover:border-[#0f3460]/30 hover:text-[#0f3460]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured */}
          {featured && (
            <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden mb-8 hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-[#94a3b8] h-48 md:h-auto">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-[#0f3460] uppercase tracking-wide mb-2">Featured · {featured.category}</span>
                  <h2 className="text-2xl font-bold text-[#0a1628] mb-3 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                    {featured.title}
                  </h2>
                  <p className="text-[#64748b] text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#94a3b8] flex items-center gap-1">
                      <Clock size={12} /> {featured.readTime} · {featured.date}
                    </span>
                    <button className="text-sm font-semibold text-[#0f3460] hover:text-[#10b981] flex items-center gap-1 transition-colors">
                      Read <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map(post => (
              <div key={post.id} className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="bg-[#94a3b8] h-40">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-[#0f3460] uppercase tracking-wide">{post.category}</span>
                  <h3 className="font-bold text-[#0a1628] mt-1 mb-2 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#64748b] leading-relaxed mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#94a3b8] flex items-center gap-1">
                      <Clock size={11} /> {post.readTime} · {post.date}
                    </span>
                    <button className="text-xs font-semibold text-[#0f3460] hover:text-[#10b981] flex items-center gap-1 transition-colors">
                      Read <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
