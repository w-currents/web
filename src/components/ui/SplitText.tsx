import { motion, type Variants } from 'motion/react'

const box: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const word: Variants = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

/** Título que entra palabra por palabra con desenfoque y caída suave. "\n" separa líneas. */
export function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.h2 aria-label={text.replace('\n', ' ')} className={className} variants={box} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
      {text.split('\n').map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(' ').map((w, i) => (
            <span key={i}>
              <motion.span variants={word} className="inline-block will-change-[filter,transform]">{w}</motion.span>{' '}
            </span>
          ))}
        </span>
      ))}
    </motion.h2>
  )
}
