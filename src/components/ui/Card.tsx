import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

export default function Card({ children, className = '', hover, padding = 'md' }: CardProps) {
  const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' }
  return (
    <div
      className={`bg-white rounded-xl border border-[#e2e8f0] shadow-sm ${hover ? 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200' : ''} ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  )
}
