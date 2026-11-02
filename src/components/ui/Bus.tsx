import { useReducedMotion } from 'motion/react'
import { useId } from 'react'

type Props = {
  /** Tamaño del viewBox */
  w: number
  h: number
  /** Y del troncal (la pista principal, donde van los nodos) */
  trunkY: number
  /** Pistas que bajan a unirse al troncal con un codo a 45° (se apilan hacia arriba) */
  branches?: number
  /** Separación vertical entre pistas */
  gap?: number
  /** X donde cada rama se une al troncal (por defecto, a la mitad) */
  joinXs?: number[]
  /** false si el troncal lleva su propio recorrido animado (ej. el hero) */
  trunkPackets?: boolean
  /** false: pistas sin paquetes propios (el hero cuenta su propia historia) */
  packets?: boolean
  className?: string
}

/**
 * Motivo de marca: pistas de circuito / red industrial.
 * Un troncal + ramas con codos a 45° que se unen en pads, y "paquetes" de datos
 * que viajan por ellas (SVG animateMotion nativo, sin JS por frame).
 */
export function Bus({ w, h, trunkY, branches = 2, gap = 16, joinXs, trunkPackets = true, packets = true, className }: Props) {
  const id = useId()
  const reduce = useReducedMotion()

  // Troncal
  const trunk = `M0 ${trunkY} H${w}`
  // Ramas: cada una entra por la izquierda, corre recta y baja a 45° hasta el troncal
  const joins = Array.from({ length: branches }, (_, i) => ({
    y: trunkY - gap * (i + 1),
    // x = donde el codo EMPIEZA; el codo termina en joinXs[i] sobre el troncal
    x: joinXs ? joinXs[i] - gap * (i + 1) : w * (0.5 + i * 0.07),
  }))
  const branchPaths = joins.map(({ y, x }) => `M0 ${y} H${x} L${x + (trunkY - y)} ${trunkY} H${w}`)
  const all = [trunk, ...branchPaths]

  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={w} y2="0">
          <stop offset="0" stopColor="#9fd0e0" stopOpacity=".85" />
          <stop offset=".65" stopColor="#9fd0e0" stopOpacity=".4" />
          <stop offset="1" stopColor="#9fd0e0" stopOpacity=".05" />
        </linearGradient>
      </defs>

      {/* pistas */}
      <g fill="none" stroke={`url(#${id})`} strokeWidth="1.3" strokeLinejoin="round">
        {all.map((d, i) => <path key={i} d={d} strokeWidth={i === 0 ? 1.8 : 1.2} />)}
      </g>

      {/* pads: inicio de cada rama y unión con el troncal */}
      <g fill="#1B3B4F" stroke="#9fd0e0" strokeWidth="1.2">
        {joins.map(({ y, x }, i) => (
          <g key={i}>
            <circle cx="5" cy={y} r="2.6" />
            <circle cx={x + (trunkY - y)} cy={trunkY} r="2.6" />
          </g>
        ))}
        <circle cx="5" cy={trunkY} r="2.6" />
      </g>

      {/* paquetes de datos */}
      {!reduce && packets && (
        <g className="neon">
          {all.map((d, i) =>
            (i === 0 && !trunkPackets ? [] : [0, 1]).map((k) => {
              const dur = 5.2 + i * 0.9
              return (
                <rect key={`${i}-${k}`} x="-5" y="-2.4" width="10" height="4.8" rx="1.4" fill={(i + k) % 2 ? '#9fd0e0' : '#fff'}>
                  <animateMotion dur={`${dur}s`} begin={`${-(dur / 2) * k - i * 1.3}s`} repeatCount="indefinite" rotate="auto" path={d} />
                </rect>
              )
            }),
          )}
        </g>
      )}
    </svg>
  )
}
