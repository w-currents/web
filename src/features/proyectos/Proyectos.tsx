import { withMotion } from '@/lib/with-motion'
import { motion, useInView } from 'motion/react'
import { Plus, Hand } from 'lucide-react'
import { useRef, useState } from 'react'
import { CASES } from '@/content/site'
import { cn } from '@/lib/cn'
import { SectionHead } from '@/components/ui/SectionHead'
import { Stamp } from '@/components/ui/Stamp'

/** Tiras que se expanden: desktop en horizontal, móvil apilado como acordeón. */
function Proyectos() {
  const [open, setOpen] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const seen = useInView(listRef, { once: true, margin: '-40px' })
  return (
    <section id="proyectos" className="bg-navy py-24">
      <div className="gutter mx-auto max-w-[1180px]">
        <SectionHead meta="3 casos de referencia" label="Proyectos">Donde detener la planta cuesta producción.</SectionHead>
        <p className="mt-6 flex items-center gap-2 text-sm text-ice lg:hidden"><Hand size={16} className="animate-pulse" />Toque una operación para ver alcance y resultado</p>
        <div ref={listRef} className="mt-4 lg:mt-10 flex h-[520px] gap-3 max-lg:h-auto max-lg:flex-col">
          {CASES.map((c, i) => {
            const on = i === open
            return (
              <motion.article key={c.id} initial={{ clipPath: 'inset(0 0 100% 0 round 16px)' }} animate={{ clipPath: seen ? 'inset(0 0 0% 0 round 16px)' : 'inset(0 0 100% 0 round 16px)' }} transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} onClick={() => setOpen(i)} onMouseEnter={() => window.matchMedia('(hover:hover) and (min-width:1024px)').matches && setOpen(i)} className={cn('relative cursor-pointer overflow-hidden rounded-2xl border border-pac/30 shadow-card transition-[flex] duration-500 max-lg:min-h-[104px]', on ? 'flex-[5] max-lg:min-h-[420px]' : 'flex-1')}>
                <img src={c.img} alt={c.alt} className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-ink/95 via-ink/60 to-ink/30" />
                <Stamp className="top-3 right-3" />
                {!on && (
                  <span aria-hidden="true" className="pointer-events-none absolute right-4 bottom-4 flex items-center gap-2 lg:hidden">
                    <span className="text-xs font-semibold tracking-wide text-white/90">Ver caso</span>
                    <span className="relative grid size-9 place-items-center rounded-full border border-ice bg-cer text-white shadow-neon">
                      <span className="absolute inset-0 animate-ping-soft rounded-full border border-ice" />
                      <Plus size={18} />
                    </span>
                  </span>
                )}
{!on && (
                  <button aria-expanded={false} className="absolute inset-x-0 bottom-0 cursor-pointer p-5 pr-36 text-left lg:inset-y-0 lg:pr-6 lg:right-auto lg:rotate-180 lg:p-6 lg:[writing-mode:vertical-rl]">
                    <span className="label-mono block text-ice">{c.sector}</span>
                    <span className="mt-1 block text-lg font-semibold tracking-tight">{c.title}</span>
                  </button>
                )}
                {on && (
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <span className="label-mono block text-ice">{c.sector}</span>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight">{c.title}</h3>
                    <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
                      {([['Desafío', c.desafio], ['Solución', c.solucion], ['Resultado', c.resultado]] as const).map(([k, v]) => (
                        <div key={k}><dt className="label-mono text-ice">{k}</dt><dd className="mt-1 text-soft">{v}</dd></div>
                      ))}
                    </dl>
                  </div>
                )}
              </motion.article>
            )
          })}
        </div>
        <p className="mt-4 text-xs text-silver/70">Fotografías referenciales. Se reemplazarán por registro propio de cada obra.</p>
      </div>
    </section>
  )
}

export default withMotion(Proyectos)
