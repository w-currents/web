import type { ReactNode, MouseEvent } from 'react'
import { cn } from '@/lib/cn'

/** Tarjeta con foco de luz que sigue al cursor (profundidad sin cargar el layout). */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <div onMouseMove={move} className={cn('group relative overflow-hidden', className)}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(260px circle at var(--x,50%) var(--y,50%), #9fd0e026, transparent 70%)' }} />
      <div className="relative contents">{children}</div>
    </div>
  )
}
