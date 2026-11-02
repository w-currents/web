import { withMotion } from '@/lib/with-motion'
import { motion, useScroll, useTransform, type Variants } from 'motion/react'
import { useRef } from 'react'
import { Lazo } from '@/features/lazo/Lazo'
import { Bus } from '@/components/ui/Bus'
import { ButtonLink } from '@/components/ui/Button'
import { scrollToId } from '@/lib/scroll'

const TITLE = ['Ingeniería', 'para', 'Infraestructura', 'Crítica']
const word: Variants = { hidden: { y: 36, opacity: 0, filter: 'blur(12px)' }, show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' } } }
const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }

/**
 * Hero. Escritorio: escenario 16:9 en unidades cqw (todo escala con el ancho).
 * Móvil: versión vertical. El lazo de control (Lazo.tsx) ilustra evento → control → respuesta.
 */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yEng = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yPat = useTransform(scrollYProgress, [0, 1], [0, -30])
  const yIso = useTransform(scrollYProgress, [0, 1], [0, 40])
  const go = (id: string) => (e: React.MouseEvent) => { if (scrollToId(id)) e.preventDefault() }

  return (
    <header id="inicio" ref={ref} className="overflow-hidden bg-navy">
      {/* ===== Escritorio ===== */}
      <div className="relative mx-auto hidden aspect-video max-w-[1500px] overflow-hidden bg-navy text-white [container-type:inline-size] md:block">
        <motion.img src="/img/pattern.png" alt="" style={{ y: yPat, left: '-3cqw', top: '-2cqw', width: '62cqw' }} className="pointer-events-none absolute opacity-55" />
        <div className="absolute top-0 right-0 bottom-0 bg-linear-to-br from-cer via-[#2d8aa4] to-[#5aa3b8]" style={{ width: '44cqw', clipPath: 'polygon(14% 0,100% 0,100% 100%,0 100%)' }} />
        <motion.img src="/img/isotipo.png" alt="" style={{ y: yIso, right: '3cqw', top: '8cqw', width: '12cqw' }} className="pointer-events-none absolute drop-shadow-[0_1cqw_2cqw_#0a3a4a88]" />
        <motion.img initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: 'easeOut' }} src="/img/ingeniero.webp" alt="Ingeniero de wcurrents con casco y tablet" style={{ y: yEng, right: '6cqw', height: '42cqw' }} className="pointer-events-none absolute bottom-0 z-[4] w-auto drop-shadow-[0_1cqw_2cqw_#0008]" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy via-navy/80 via-[28%] to-transparent to-[56%]" />
        <Bus className="pointer-events-none absolute inset-0 z-[3] size-full" w={1000} h={562.5} trunkY={490} branches={2} gap={16} joinXs={[260, 420]} trunkPackets={false} packets={false} />

        <div className="absolute z-[6]" style={{ left: '5cqw', top: '9cqw', width: '38cqw' }}>
          <div className="label-mono text-ice" style={{ fontSize: '.95cqw' }}>Ingeniería de sistemas críticos · Chile</div>
          <motion.h1 variants={list} initial="hidden" animate="show" className="font-semibold tracking-[-.03em] [text-shadow:0_.3cqw_1.6cqw_#0007]" style={{ fontSize: '4.3cqw', lineHeight: 1, margin: '1.2cqw 0 1.4cqw' }}>
            {TITLE.map((w) => <motion.span key={w} variants={word} className="mr-[.25em] inline-block">{w}</motion.span>)}
          </motion.h1>
          <p className="text-soft" style={{ fontSize: '1.3cqw', maxWidth: '32cqw' }}>Diseño, suministro, integración y mantenimiento de sistemas críticos para minería, energía e industria.</p>
          <div className="flex" style={{ gap: '1cqw', marginTop: '2cqw' }}>
            <ButtonLink v="w" href="/#empresa" onClick={go('empresa')} style={{ fontSize: '1.1cqw', padding: '.85cqw 1.6cqw' }}>Conocer wcurrents</ButtonLink>
            <ButtonLink v="s" href="/#servicios" onClick={go('servicios')} style={{ fontSize: '1.1cqw', padding: '.85cqw 1.6cqw' }}>Explorar disciplinas</ButtonLink>
          </div>
        </div>

        <Lazo />
      </div>

      {/* ===== Móvil ===== */}
      <div className="pt-[76px] md:hidden">
        <div className="relative h-[250px] overflow-hidden">
          <img src="/img/pattern.png" alt="" className="absolute -top-2.5 -left-7 w-[420px] opacity-50" />
          <div className="absolute inset-y-0 right-0 w-[56%] bg-linear-to-br from-cer to-[#4f9bb0] [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]" />
          <img src="/img/isotipo.png" alt="" className="absolute top-3.5 right-3.5 w-22" />
          <img src="/img/ingeniero.webp" alt="Ingeniero de wcurrents con casco y tablet" className="absolute right-6.5 bottom-0 h-[226px] w-auto drop-shadow-[0_8px_14px_#0008]" />
        </div>
        <div className="gutter pt-5 pb-2">
          <div className="label-mono text-ice">Ingeniería de sistemas críticos · Chile</div>
          <h1 className="my-3 mt-2 text-[34px] leading-none font-semibold tracking-[-.035em]">Ingeniería para Infraestructura Crítica</h1>
          <p className="text-base text-soft">Diseño, suministro, integración y mantenimiento de sistemas críticos para minería, energía e industria.</p>
          <div className="mt-5 grid gap-2.5">
            <ButtonLink v="w" href="/#empresa" onClick={go('empresa')}>Conocer wcurrents</ButtonLink>
            <ButtonLink v="s" href="/#servicios" onClick={go('servicios')}>Explorar disciplinas</ButtonLink>
          </div>
          <Bus className="mt-5.5 block h-14 w-full" w={400} h={56} trunkY={46} branches={2} gap={14} />
        </div>
      </div>
    </header>
  )
}

export default withMotion(Hero)
