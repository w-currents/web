import { withMotion } from '@/lib/with-motion'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { useReducedMotion } from 'motion/react'
import { BadgeCheck, Factory } from 'lucide-react'
import { CERTS } from '@/content/site'
import { cn } from '@/lib/cn'

type Item = (typeof CERTS)[number]

/** Fila continua y arrastrable (Embla + AutoScroll). Se detiene al pasar el cursor; con "reducir movimiento" queda estática. */
function Fila({ items, kind, speed, backward }: { items: Item[]; kind: Item['kind']; speed: number; backward?: boolean }) {
  const reduce = useReducedMotion()
  // Se repite el contenido hasta cubrir el ancho, para que el bucle no muestre huecos
  const loop = Array.from({ length: Math.ceil(12 / items.length) }, () => items).flat()
  const [ref] = useEmblaCarousel(
    { loop: !reduce, dragFree: true, align: 'start', watchDrag: !reduce },
    reduce ? [] : [AutoScroll({ speed, direction: backward ? 'backward' : 'forward', stopOnInteraction: false, stopOnMouseEnter: true, startDelay: 0 })],
  )
  const cert = kind === 'cert'
  return (
    <div ref={ref} className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex touch-pan-y">
        {loop.map((c, i) => (
          <div key={`${c.name}-${i}`} className="mr-4 shrink-0 py-3">
            <span className={cn('flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold tracking-tight shadow-card', cert ? 'border-ice/60 bg-cer/30 shadow-[0_10px_30px_-10px_#006986]' : 'border-pac/30 bg-navy')}>
              {cert ? <BadgeCheck size={16} className="text-ice" /> : <Factory size={16} className="text-silver/70" />}
              {c.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Dos filas en sentidos opuestos: certificaciones arriba, fabricantes abajo. Cada fila se explica sola. */
function Certificaciones() {
  const certs = CERTS.filter((c) => c.kind === 'cert')
  const fabs = CERTS.filter((c) => c.kind === 'fab')
  return (
    <section id="certificaciones" aria-label="Certificaciones y fabricantes" className="border-y border-pac/20 bg-deep py-8">
      <div className="gutter mx-auto max-w-[1180px] label-mono text-ice">Certificaciones</div>
      <Fila items={certs} kind="cert" speed={0.4} />
      <div className="gutter mx-auto mt-2 max-w-[1180px] label-mono text-ice">Fabricantes</div>
      <Fila items={fabs} kind="fab" speed={0.45} backward />
    </section>
  )
}

export default withMotion(Certificaciones)
