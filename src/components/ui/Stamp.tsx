import { cn } from '@/lib/cn'

/** Sello discreto de marca sobre fotos: logo pequeño en pastilla oscura, legible sobre cualquier imagen. */
export function Stamp({ className }: { className?: string }) {
  return (
    <span className={cn('pointer-events-none absolute z-10 rounded-md bg-ink/65 px-2 py-1.5 shadow-[0_4px_14px_-4px_#000] ring-1 ring-white/15 backdrop-blur-sm', className)}>
      <img src="/img/wordmark.png" alt="" className="block h-2.5 w-auto" />
    </span>
  )
}
