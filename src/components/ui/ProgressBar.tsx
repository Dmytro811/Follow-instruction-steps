interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  color?: string
  height?: number
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  color,
  height = 6,
}: ProgressBarProps) {
  const pct = Math.min(100, (value / max) * 100)
  const barColor = color ?? (pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : pct >= 40 ? '#f97316' : '#ef4444')

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between mb-1.5">
          {label && <span className="text-sm text-[#64748b]">{label}</span>}
          {showValue && <span className="text-sm font-semibold" style={{ color: barColor }}>{value}</span>}
        </div>
      )}
      <div className="w-full bg-[#e2e8f0] rounded-full overflow-hidden" style={{ height }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  )
}
