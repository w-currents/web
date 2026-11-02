import { SplitText } from './SplitText'
import { cn } from '@/lib/cn'

/** Encabezado de sección: etiqueta con dato de la sección y título grande. */
export function SectionHead({ meta, label, children, light, className }: { meta: string; label: string; children: string; light?: boolean; className?: string }) {
  return (
    <div className={className}>
      <div className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[13px] font-medium tracking-[.14em] uppercase', light ? 'text-cer' : 'text-ice')}>
        <span className="font-semibold">{label}</span>
        <span aria-hidden className="opacity-50">·</span>
        <span className="opacity-80">{meta}</span>
      </div>
      <SplitText text={children} className="mt-5 max-w-[22ch] text-[clamp(36px,6vw,60px)] leading-[1.02] font-semibold tracking-[-.035em] text-balance" />
    </div>
  )
}
