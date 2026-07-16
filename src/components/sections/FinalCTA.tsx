import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

export default function FinalCTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-[#0a1628] to-[#0f3460] rounded-3xl p-12 sm:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/10 rounded-full blur-3xl" />
          <div className="relative">
            <h2
              className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Is Your Website Invisible to AI?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Find out in minutes. Run your first analysis and get an AI Visibility Score with actionable improvements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <Button variant="accent" size="lg">
                  Run Free Analysis <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
