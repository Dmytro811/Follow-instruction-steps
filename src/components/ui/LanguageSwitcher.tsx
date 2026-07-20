import { Globe } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

interface LanguageSwitcherProps {
  isDark?: boolean
}

export default function LanguageSwitcher({ isDark = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'uk' ? 'en' : 'uk')}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
        isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-[#f8fafc] hover:bg-[#e8f0fb] text-[#0f3460]'
      }`}
      aria-label="Switch language"
    >
      <Globe size={16} />
      <span>{language === 'uk' ? 'УКР' : 'EN'}</span>
    </button>
  )
}
