import { Brain, Shield, Zap, Globe, Target, Users } from 'lucide-react'

// ВСТАВТЕ ІНФОРМАЦІЮ ПРО ВАШУ КОМАНДУ:
// name - ім'я члена команди
// role - посада
// bio - короткий опис досвіду та експертизи
// photo - шлях до фото (додайте фото у папку src/assets/team/ і вкажіть шлях, наприклад: '/assets/team/artem.jpg')
const team = [
  {
    name: 'Artem Polylyk',
    role: 'Co-founder & CEO',
    bio: 'Former Head of SEO at HubSpot. 12 years in search optimization, early researcher in LLM citation behavior.',
    photo: '' // ДОДАЙТЕ ШЛЯХ ДО ФОТО
  },
  {
    name: 'Dmytro Nazaruk',
    role: 'Co-founder & Chief AI Officer',
    bio: 'PhD in NLP from Stanford. Led AI ranking research at a major search engine. Built our AI analysis engine.',
    photo: '' // ДОДАЙТЕ ШЛЯХ ДО ФОТО
  },
]

const values = [
  { icon: Brain, title: 'AI-First Thinking', description: 'Every decision we make starts with how AI models will interpret and evaluate the result.' },
  { icon: Shield, title: 'Scientific Rigor', description: 'Our scoring methodology is based on empirical research, not speculation or vendor claims.' },
  { icon: Zap, title: 'Speed Over Perfection', description: 'We ship actionable insights fast. The landscape changes weekly — so do we.' },
  { icon: Globe, title: 'Transparency', description: 'We explain every score, every recommendation, and every methodology decision.' },
  { icon: Target, title: 'Outcome Focused', description: 'Success means your AI Visibility Score goes up and your business gets recommended more.' },
  { icon: Users, title: 'Customer Partnership', description: 'We treat every customer analysis as a research opportunity that improves the platform.' },
]

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="bg-[#0a1628] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            We're Building the Infrastructure<br />for AI-Driven Discovery
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            SEO AI was founded in 2024 by a team of search engineers and AI researchers who saw the shift coming — and built the tools to help businesses survive and thrive through it.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      {/* ЗМІНІТЬ ОПИС КОМПАНІЇ ТУТ: */}
      {/* Відредагуйте текст у секціях "Our Mission" та "How AI Search Works" відповідно до вашого бізнесу */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0a1628] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Our Mission</h2>
              {/* ВІДРЕДАГУЙТЕ ТЕКСТ МІСІЇ КОМПАНІЇ */}
              <p className="text-[#475569] leading-relaxed mb-4">
                To give every business — from solo founders to enterprise teams — the tools to understand and improve their visibility in the AI-powered information ecosystem.
              </p>
              <p className="text-[#475569] leading-relaxed">
                We believe that AI assistants should surface the best, most relevant businesses — and we're building the platform to make that measurable and actionable.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#0a1628] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>How AI Search Works</h2>
              {/* ВІДРЕДАГУЙТЕ ОПИС ВАШОГО СЕРВІСУ/ПРОДУКТУ */}
              <p className="text-[#475569] leading-relaxed mb-4">
                When a user asks ChatGPT or Gemini for a recommendation, the model draws on its training data, retrieval-augmented generation, and real-time web search to decide which sources to cite.
              </p>
              <p className="text-[#475569] leading-relaxed">
                Businesses with clear entity definitions, structured content, strong trust signals, and high AI readability are cited more often. We measure and improve all of these factors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0a1628] text-center mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white border border-[#e2e8f0] rounded-xl p-5">
                <div className="w-9 h-9 bg-[#e8f0fb] rounded-lg flex items-center justify-center mb-3">
                  <v.icon size={18} className="text-[#0f3460]" />
                </div>
                <h3 className="font-bold text-[#0a1628] mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>{v.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0a1628] text-center mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
            The Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(member => (
              <div key={member.name} className="flex flex-col items-center text-center p-6 border border-[#e2e8f0] rounded-xl bg-white hover:shadow-lg transition-shadow">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-[#e2e8f0]"
                  />
                ) : (
                  <div className="w-24 h-24 bg-[#0f3460] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div className="font-bold text-[#0a1628] text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{member.name}</div>
                <div className="text-xs text-[#10b981] font-semibold mb-3">{member.role}</div>
                <p className="text-sm text-[#64748b] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
