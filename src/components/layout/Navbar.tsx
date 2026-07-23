import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import Button from '../ui/Button'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../locales/translations'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { t } = useLanguage()

  const NAV_LINKS = [
    { label: t(translations.nav.services), href: '/services' },
    { label: t(translations.nav.pricing), href: '/pricing' },
   // { label: t(translations.nav.caseStudies), href: '/case-studies' },
    { label: t(translations.nav.about), href: '/about' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  const isDark = pathname === '/' && !scrolled

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || pathname !== '/'
          ? 'bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/20' : 'bg-[#0f3460]'} transition-colors`}>
            <Zap size={16} className={isDark ? 'text-white' : 'text-white'} />
          </div>
          <span
            className={`font-bold text-lg tracking-tight ${isDark ? 'text-white' : 'text-[#0a1628]'}`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            SEO<span className={isDark ? 'text-emerald-400' : 'text-[#10b981]'}>AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? isDark ? 'text-white bg-white/10' : 'text-[#0f3460] bg-[#e8f0fb]'
                  : isDark
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-[#475569] hover:text-[#0f3460] hover:bg-[#f8fafc]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher isDark={isDark} />
          <Link to="/pricing">
            <Button size="sm" variant={isDark ? 'accent' : 'primary'}>
              {t(translations.nav.analyzeWebsite)}
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-lg ${isDark ? 'text-white hover:bg-white/10' : 'text-[#0a1628] hover:bg-[#f1f5f9]'}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#e2e8f0] px-4 py-4 space-y-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === link.href
                  ? 'text-[#0f3460] bg-[#e8f0fb]'
                  : 'text-[#475569] hover:text-[#0f3460] hover:bg-[#f8fafc]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#e2e8f0] flex flex-col gap-2">
            <Link to="/dashboard" className="block px-3 py-2 text-sm font-medium text-[#475569]">
              {t(translations.nav.signIn)}
            </Link>
            <Link to="/pricing">
              <Button size="sm" fullWidth>{t(translations.nav.analyzeWebsite)}</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
