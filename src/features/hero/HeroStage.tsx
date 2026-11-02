import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { withMotion } from '@/lib/with-motion'
import { Lazo } from '@/features/lazo/Lazo'
import { Bus } from '@/components/ui/Bus'

/** Capas visuales del hero de escritorio (escenario 16:9 en cqw). Se hidrata solo en pantallas md+. El texto vive en Hero.astro. */
function HeroStage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yEng = useTransform(scrollYProgress, [0, 1], [0, 50]) // baja con el scroll: el borde inferior lo recorta y no deja hueco
  const yPat = useTransform(scrollYProgress, [0, 1], [0, -30])
  const yIso = useTransform(scrollYProgress, [0, 1], [0, 40])
  return (
    <div ref={ref} className="absolute inset-0">
      <motion.img src="/img/pattern.png" alt="" style={{ y: yPat, left: '-3cqw', top: '-2cqw', width: '62cqw' }} className="pointer-events-none absolute opacity-55" />
      <div className="absolute top-0 right-0 bottom-0 bg-linear-to-br from-cer via-[#2d8aa4] to-[#5aa3b8]" style={{ width: '44cqw', clipPath: 'polygon(14% 0,100% 0,100% 100%,0 100%)' }} />
      <motion.img src="/img/isotipo.png" alt="" style={{ y: yIso, right: '3cqw', top: '8cqw', width: '12cqw' }} className="pointer-events-none absolute drop-shadow-[0_1cqw_2cqw_#0a3a4a88]" />
      <motion.img initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: 'easeOut' }} src="/img/ingeniero.webp" alt="Ingeniero de wcurrents con casco y tablet" style={{ y: yEng, right: '6cqw', height: '42cqw' }} className="pointer-events-none absolute bottom-0 z-[4] w-auto drop-shadow-[0_1cqw_2cqw_#0008]" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy via-navy/80 via-[28%] to-transparent to-[56%]" />
      <Bus className="pointer-events-none absolute inset-0 z-[3] size-full" w={1000} h={562.5} trunkY={490} branches={2} gap={16} joinXs={[260, 420]} trunkPackets={false} packets={false} />
      <Lazo />
    </div>
  )
}

export default withMotion(HeroStage)
