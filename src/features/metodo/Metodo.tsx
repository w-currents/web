import { withMotion } from '@/lib/with-motion'
import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { STEPS } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'

/** Siete pasos sobre una línea que se "carga" con el scroll. */
function Metodo() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 22 })
  return (
    <section id="metodo" className="bg-bone py-24 text-ink">
      <div className="gutter mx-auto max-w-[1180px]">
        <SectionHead meta="7 hitos verificables" label="Método" light>De la visita a terreno a la puesta en marcha: siete hitos verificables.</SectionHead>
        <ol ref={ref} className="relative mt-14 grid gap-8 pl-12 lg:grid-cols-7 lg:gap-4 lg:pt-12 lg:pl-0">
          {/* línea base y línea que se carga */}
          <span className="absolute top-2 bottom-2 left-[19px] w-0.5 bg-ink/15 lg:inset-x-0 lg:top-[19px] lg:bottom-auto lg:left-0 lg:h-0.5 lg:w-auto" />
          <motion.span style={{ scaleY: p }} className="absolute top-2 bottom-2 left-[19px] w-0.5 origin-top bg-cer shadow-[0_0_12px_#006986] lg:hidden" />
          <motion.span style={{ scaleX: p }} className="absolute inset-x-0 top-[19px] hidden h-0.5 origin-left bg-cer shadow-[0_0_12px_#006986] lg:block" />
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative">
              <Reveal delay={i * 0.06}>
                <span className="absolute top-0 -left-12 grid size-10 place-items-center rounded-xl border border-cer bg-white text-cer shadow-[0_8px_20px_-8px_#006986] lg:static lg:-mt-12 lg:mb-4"><s.icon size={18} /></span>
                <div className="font-mono text-xs text-cer">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="mt-1 font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-1.5 text-sm text-ink/70">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default withMotion(Metodo)
