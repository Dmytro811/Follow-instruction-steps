import { type ReactNode, type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

  const variants = {
    primary:
      'bg-[#0f3460] text-white hover:bg-[#0a2444] focus-visible:ring-[#0f3460] shadow-sm hover:shadow-md',
    secondary:
      'bg-[#e8f0fb] text-[#0f3460] hover:bg-[#d4e4f7] focus-visible:ring-[#0f3460]',
    ghost:
      'text-[#0f3460] hover:bg-[#e8f0fb] focus-visible:ring-[#0f3460]',
    outline:
      'border border-[#0f3460] text-[#0f3460] hover:bg-[#0f3460] hover:text-white focus-visible:ring-[#0f3460]',
    accent:
      'bg-[#10b981] text-white hover:bg-[#059669] focus-visible:ring-[#10b981] shadow-sm hover:shadow-md',
  }

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3.5',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
