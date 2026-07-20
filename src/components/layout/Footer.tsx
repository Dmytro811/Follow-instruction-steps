import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../locales/translations'

export default function Footer() {
  const { t } = useLanguage()

  const links = {
    [t(translations.footer.product)]: [
      { label: t(translations.nav.services), href: '/services' },
      { label: t(translations.nav.pricing), href: '/pricing' },
      { label: t(translations.nav.caseStudies), href: '/case-studies' },
    ],
    [t(translations.footer.company)]: [
      { label: t(translations.nav.about), href: '/about' },
      { label: t(translations.nav.contact), href: '/contact' },
      { label: t(translations.nav.faq), href: '/faq' },
    ],
    [t(translations.footer.legal)]: [
      { label: t(translations.footer.privacyPolicy), href: '#' },
      { label: t(translations.footer.termsOfService), href: '#' },
      { label: t(translations.footer.cookiePolicy), href: '#' },
    ],
  }
  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0f3460] rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                SEO<span className="text-[#10b981]">AI</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-6">
              {t(translations.footer.description)}
            </p>
            {/* ВСТАВТЕ СЮДИ ПОСИЛАННЯ НА ВАШІ СОЦІАЛЬНІ МЕРЕЖІ */}
            {/* Замініть '#' на реальні посилання: Instagram, Facebook, LinkedIn, Twitter */}
            
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} SEO AI. {t(translations.footer.allRightsReserved)}.
          </p>
          <p className="text-xs text-white/40">
            AI Visibility Platform · Generative Engine Optimization · LLM Optimization
          </p>
        </div>
      </div>
    </footer>
  )
}
