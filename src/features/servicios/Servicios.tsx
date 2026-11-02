import { withMotion } from '@/lib/with-motion'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { ArrowRight, Check, Clock } from 'lucide-react'
import { FACTS, MARCO, SERVICES } from '@/content/site'
import { cn } from '@/lib/cn'
import { scrollToId } from '@/lib/scroll'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { SectionHead } from '@/components/ui/SectionHead'
import { Stamp } from '@/components/ui/Stamp'

/** Lista vertical a la izquierda; foto con detalle a la derecha (cross-fade). */
function Servicios() {
  const { service, setService, addQuoteSvc } = useStore()
  const s = SERVICES[service]
  const f = FACTS[service]
  const m = MARCO[service]
  const secRef = useRef<HTMLElement>(null)
  const seen = useInView(secRef, { once: true, margin: '-80px' })
  return (
    <section ref={secRef} id="servicios" className="overflow-x-clip bg-deep py-24">
      <div className="gutter mx-auto max-w-[1180px]">
        <SectionHead meta="6 disciplinas" label="Servicios">{"Seis disciplinas.\nUna sola arquitectura."}</SectionHead>
        <div className="mt-10 grid gap-8 lg:hidden">
          <div role="tablist" aria-label="Disciplinas" className="relative grid content-start gap-2 lg:sticky lg:top-24 lg:self-start before:absolute before:top-6 before:bottom-6 before:left-[27px] before:w-px before:bg-pac/30 max-lg:grid-cols-2 max-lg:gap-2 max-lg:before:hidden">
            {SERVICES.map((x, i) => (
              <button key={x.n} role="tab" aria-selected={i === service} onClick={() => setService(i)} className={cn('relative flex cursor-pointer items-center gap-2.5 rounded-xl border p-2 pr-2.5 text-left text-[15px] leading-tight transition max-lg:border-pac/25 max-lg:bg-white/5 max-sm:text-[15px]', i === service ? 'border-pac/50 bg-white/8 shadow-card' : 'border-transparent hover:bg-white/5')}>
                <span className={cn('grid size-[34px] shrink-0 place-items-center rounded-[9px] border transition', i === service ? 'border-ice bg-cer shadow-neon' : 'border-pac/40 bg-navy')}><x.icon size={17} /></span>
                <span className="min-w-0 font-semibold tracking-tight"><span className="sm:hidden">{x.short}</span><span className="max-sm:hidden">{x.title}</span></span>
              </button>
            ))}
          </div>
          <motion.div initial={{ clipPath: 'inset(0 100% 0 0 round 16px)' }} animate={{ clipPath: seen ? 'inset(0 0% 0 0 round 16px)' : 'inset(0 100% 0 0 round 16px)' }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative flex flex-col overflow-hidden rounded-2xl border border-pac/30 bg-deep shadow-card">
            <div className="relative h-52 shrink-0 sm:h-64">
              <AnimatePresence mode="popLayout">
                <motion.img key={s.img} src={s.img} alt={s.alt} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 size-full object-cover" />
              </AnimatePresence>
              <div className="absolute inset-0 bg-linear-to-t from-deep via-transparent to-transparent" />
              <Stamp className="top-3 right-3" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={s.n} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
                <div>
                  <div className="label-mono text-ice">{MARCO[service].ref}</div>
                  <h3 className="mt-1.5 text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-lg font-medium text-ice">{s.q}</p>
                  <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-soft">{s.desc}</p>
                  <ul className="mt-4 grid gap-1.5 text-sm">
                    {s.items.map((it) => <li key={it} className="flex items-start gap-2"><Check size={15} className="mt-0.5 shrink-0 text-ice" />{it}</li>)}
                  </ul>
                  <Button className="mt-5" onClick={() => { addQuoteSvc(service); scrollToId('cotizar') }}>Cotizar esta disciplina <ArrowRight size={16} /></Button>
                </div>
                <div className="grid content-start gap-3">
                  {f.facts.map((x) => (
                    <figure key={x.v + x.l} className="rounded-xl border border-pac/30 bg-white/5 p-4">
                      <div className="label-mono text-ice">{x.intl ? 'Referencia internacional' : 'Dato nacional'}</div>
                      <div className="mt-1 text-3xl font-semibold tracking-tight text-white">{x.v}</div>
                      <p className="mt-1 text-sm leading-snug text-soft">{x.l}</p>
                      <figcaption className="mt-2 border-t border-pac/20 pt-2 text-xs text-pac">
                        Fuente: <a href={x.url} target="_blank" rel="noreferrer" className="underline decoration-pac/40 underline-offset-2 hover:text-ice">{x.src}</a> · {x.year}
                      </figcaption>
                    </figure>
                  ))}
                  <div className="rounded-xl border border-dashed border-pac/30 p-4">
                    <div className="label-mono flex items-center gap-1.5 text-ice"><Clock size={13} />¿Qué define el alcance?</div>
                    <p className="mt-1.5 text-sm leading-snug text-soft">{f.plazo}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Escritorio: formato editorial. Pestañas arriba, artículo a la izquierda, foto a sangre a la derecha. */}
        <div className="mt-12 max-lg:hidden">
          <div role="tablist" aria-label="Disciplinas" className="grid grid-cols-6 border-b border-pac/25">
            {SERVICES.map((x, i) => (
              <button key={x.n} role="tab" aria-selected={i === service} onClick={() => setService(i)} className={cn('group relative flex cursor-pointer items-center gap-2.5 px-1 pt-1 pb-4 text-left text-[14px] font-semibold tracking-tight transition', i === service ? 'text-white' : 'text-pac hover:text-white')}>
                <span className={cn('grid size-8 shrink-0 place-items-center rounded-lg border transition', i === service ? 'border-ice bg-cer shadow-neon' : 'border-pac/40 bg-navy')}><x.icon size={16} /></span>
                <span className="leading-tight">{x.title}</span>
                {i === service && <motion.span layoutId="svc-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-ice shadow-neon" />}
              </button>
            ))}
          </div>
          <div className="relative mt-10">
            <AnimatePresence mode="wait">
              <motion.article key={s.n} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="relative z-10 max-w-[54%] py-2">
                <div className="label-mono text-ice">{MARCO[service].ref}</div>
                <h3 className="mt-3 max-w-[16ch] text-[44px] leading-[1.05] font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-5 max-w-[34ch] text-2xl leading-snug font-medium text-ice">{s.q}</p>
                <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed text-soft">{s.desc}</p>
                <ul className="mt-6 grid max-w-[58ch] gap-2 text-[15px]">
                  {s.items.map((it) => <li key={it} className="flex items-start gap-2.5"><Check size={16} className="mt-1 shrink-0 text-ice" />{it}</li>)}
                </ul>
                <div className="mt-7 grid max-w-[58ch] grid-cols-2 gap-6">
                  <div className="border-l-2 border-pac/50 pl-4">
                    <div className="label-mono text-pac">Qué exige · {m.ref}</div>
                    <p className="mt-1.5 text-sm leading-snug text-soft">{m.exige}</p>
                  </div>
                  <div className="border-l-2 border-ice pl-4 shadow-[-8px_0_16px_-12px_var(--color-ice)]">
                    <div className="label-mono text-ice">Qué entrega wcurrents</div>
                    <p className="mt-1.5 text-sm leading-snug text-white">{m.entrega}</p>
                  </div>
                </div>
                <div className="mt-8 grid gap-x-8 gap-y-5 border-t border-pac/25 pt-6" style={{ gridTemplateColumns: `repeat(${Math.min(f.facts.length, 2)}, minmax(0, 1fr))` }}>
                  {f.facts.map((x) => (
                    <figure key={x.v + x.l}>
                      <div className="label-mono text-pac">{x.intl ? 'Referencia internacional' : 'Dato nacional'}</div>
                      <div className="mt-1 text-[28px] leading-tight font-semibold tracking-tight text-white">{x.v}</div>
                      <p className="mt-1 text-sm leading-snug text-soft">{x.l}</p>
                      <figcaption className="mt-1.5 text-xs text-pac">Fuente: <a href={x.url} target="_blank" rel="noreferrer" className="underline decoration-pac/40 underline-offset-2 hover:text-ice">{x.src}</a> · {x.year}</figcaption>
                    </figure>
                  ))}
                </div>
                <p className="mt-6 flex max-w-[58ch] items-start gap-2 text-sm leading-snug text-soft"><Clock size={15} className="mt-0.5 shrink-0 text-ice" /><span><b className="font-semibold text-white">¿Qué define el alcance?</b> {f.plazo}</span></p>
                <Button className="mt-7" onClick={() => { addQuoteSvc(service); scrollToId('cotizar') }}>Cotizar esta disciplina <ArrowRight size={16} /></Button>
              </motion.article>
            </AnimatePresence>
            {/* Foto integrada al fondo de la sección: sus bordes se funden con el color de la sección */}
            <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: seen ? 1 : 0, scale: seen ? 1 : 1.04 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} aria-hidden className="pointer-events-none absolute inset-y-[-24px] right-[-4%] w-[62%]">
              <div className="absolute inset-0" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 38%, #000 82%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%)', WebkitMaskComposite: 'source-in', maskImage: 'linear-gradient(to right, transparent 0%, #000 38%, #000 82%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%)', maskComposite: 'intersect' }}>
                <AnimatePresence mode="popLayout">
                  <motion.img key={s.img} src={s.img} alt="" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="absolute inset-0 size-full object-cover" />
                </AnimatePresence>
              </div>
            </motion.div>
            <Stamp className="right-6 bottom-2 z-10" />
            <div className="label-mono absolute right-6 bottom-12 z-10 rounded-md bg-ink/70 px-2.5 py-1 text-ice backdrop-blur">{s.alt}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default withMotion(Servicios)
