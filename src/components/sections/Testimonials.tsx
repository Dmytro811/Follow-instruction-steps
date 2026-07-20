import { Star } from 'lucide-react'

// ЗАМІНІТЬ ВІДГУКИ НА РЕАЛЬНІ ВІД ВАШИХ КЛІЄНТІВ:
// name - ім'я клієнта
// role - посада клієнта
// company - назва компанії клієнта
// content - текст відгуку (що саме допоміг ваш сервіс, які результати отримали)
// rating - оцінка від 1 до 5
// avatar - ініціали (або можна додати photo: 'шлях/до/фото.jpg')
const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Head of Growth',
    company: 'Dataflow.io',
    content:
      "Within 3 weeks of implementing the recommendations, ChatGPT started citing us in answers about workflow automation. Our inbound leads from AI-referred traffic tripled.",
    rating: 5,
    avatar: 'SC',
  },
  {
    name: 'Marcus Williams',
    role: 'Founder & CEO',
    company: 'Novu Labs',
    content:
      "The analysis was eye-opening. We had an 82% technical score but only 31% AI readability. The report told us exactly why Perplexity wasn't recommending us and how to fix it.",
    rating: 5,
    avatar: 'MW',
  },
  {
    name: 'Elena Kovacs',
    role: 'SEO Director',
    company: 'Meridian Agency',
    content:
      "We run this for every client before starting GEO work. The multi-model analysis is the most comprehensive AI visibility tool I've seen. Our clients see real results.",
    rating: 5,
    avatar: 'EK',
  },
  // ДОДАЙТЕ БІЛЬШЕ ВІДГУКІВ ТУТ
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0a1628] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Trusted by Growth Teams
          </h2>
          <p className="text-[#64748b]">
            Companies using SEO AI see measurable improvements in AI-driven visibility.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map(t => (
            <div
              key={t.name}
              className="break-inside-avoid bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-[#334155] leading-relaxed mb-4">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0f3460] rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0a1628]">{t.name}</div>
                  <div className="text-xs text-[#94a3b8]">{t.role}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
