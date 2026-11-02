import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return <><motion.span style={{ opacity }} className="inline-block">{children}</motion.span>{' '}</>
}

/** Párrafo que se "llena" de izquierda a derecha, palabra a palabra, mientras se hace scroll. */
export function FillText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'end 78%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
      </span>
    </p>
  )
}
