import { cva, type VariantProps } from 'class-variance-authority'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/** Variantes: p = CTA terracota, w = blanco, s = contorno. El terracota se reserva para CTA. */
export const button = cva(
  'inline-flex items-center justify-center gap-2 border border-transparent font-semibold transition duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40 cursor-pointer',
  {
    variants: {
      v: {
        p: 'bg-terra text-[#fff] shadow-cta hover:bg-[#a5311f] hover:shadow-[0_10px_30px_-6px_#c8402bcc,0_0_22px_#c8402b66]',
        w: 'bg-white text-ink shadow-[0_10px_28px_-10px_#fff6] hover:bg-bone hover:shadow-[0_10px_34px_-8px_#fff8,0_0_24px_#9fd0e055]',
        s: 'border-white/45 text-white hover:bg-white/10 hover:shadow-neon',
      },
      size: { md: 'px-5.5 py-3 text-[15px]', sm: 'px-4.5 py-2.5 text-sm rounded-[10px]' },
    },
    defaultVariants: { v: 'p', size: 'md' },
  },
)

type Common = VariantProps<typeof button> & { className?: string }
export function Button({ v, size, className, ...p }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(button({ v, size }), className)} {...p} />
}
export function ButtonLink({ v, size, className, ...p }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn(button({ v, size }), className)} {...p} />
}
