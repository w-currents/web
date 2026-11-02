import { AnimatePresence, motion, useAnimate, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

/** Eventos de planta y la respuesta automática del sistema. Cada uno resume una disciplina sin nombrarla. */
const CASOS = [
  { evento: 'Nivel alto en sumidero', accion: 'Bombas en marcha' },
  { evento: 'Humo en sala eléctrica', accion: 'Extinción activada' },
  { evento: 'Pérdida de alimentación', accion: 'Respaldo en línea' },
  { evento: 'Acceso no autorizado', accion: 'Alarma y registro activos' },
  { evento: 'Enlace de datos caído', accion: 'Ruta redundante activa' },
]

/** Geometría en cqw. k escala tamaños y tipografía; en móvil el lazo ocupa todo el ancho de su contenedor. */
const DESKTOP = { k: 1, x: { in: 9, plc: 26, out: 43 }, y: 49, capW: 15 }
const MOBILE = { k: 3.4, x: { in: 16, plc: 50, out: 84 }, y: 19, capW: 31 }
const RED = '#ff6b5b'
const AMBER = '#ffc94a'
const GREEN = '#5df2b0'

/**
 * Lazo de control del hero (escritorio, unidades cqw).
 * Evento → señal → centro de control wcurrents (procesa) → respuesta en otro color → actuador.
 * Semáforo sobre el PLC: rojo (condición), ámbar (procesando), verde (resuelto).
 * phase: 0 espera · 1 señal viaja · 2 procesa · 3 respuesta viaja · 4 resuelto
 */
export function Lazo({ mobile = false }: { mobile?: boolean }) {
  const { k, x: X, y: Y, capW } = mobile ? MOBILE : DESKTOP
  const u = (n: number) => `${+(n * k).toFixed(2)}cqw`
  const reduce = useReducedMotion()
  const [scope, animate] = useAnimate()
  const [phase, setPhase] = useState(reduce ? 4 : 0)
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    let alive = true
    const wait = (s: number) => new Promise<void>((r) => setTimeout(r, s * 1000))
    ;(async () => {
      await wait(1.8)
      let k = 0
      while (alive) {
        setI(k % CASOS.length); setPhase(0)
        await wait(0.9)
        setPhase(1)
        await animate('.pk-in', { left: [`${X.in}cqw`, `${X.plc}cqw`, `${X.plc}cqw`], opacity: [1, 1, 0], scale: [1, 1, 0.3] }, { duration: 0.67, times: [0, 0.82, 1], ease: 'easeIn' })
        if (!alive) return
        setPhase(2)
        await wait(0.55)
        setPhase(3)
        await animate('.pk-out', { left: [`${X.plc}cqw`, `${X.out}cqw`, `${X.out}cqw`], opacity: [1, 1, 0], scale: [1, 1, 0.3] }, { duration: 0.62, times: [0, 0.8, 1], ease: 'easeOut' })
        setPhase(4)
        await wait(2.4)
        k++
      }
    })()
    return () => { alive = false }
  }, [reduce, animate, X])

  const c = CASOS[i]
  const solved = phase === 4
  const led = (on: boolean, color: string) => ({ background: on ? color : '#ffffff22', boxShadow: on ? `0 0 ${u(.7)} ${color}` : 'none' })
  const node = 'absolute z-[5]'
  const pos = (x: number) => ({ left: `${x}cqw`, top: `${Y}cqw`, translate: '-50% -50%' })
  const cap = (x: number) => ({ left: `${x}cqw`, top: `${Y + 2.6 * k}cqw`, translate: '-50% 0', width: `${capW}cqw` })

  return (
    <div ref={scope} aria-hidden={false} className="pointer-events-none absolute inset-0 z-[5]">
      {mobile && <div className="absolute h-px bg-linear-to-r from-ice/10 via-ice/40 to-ice/10" style={{ left: `${X.in}cqw`, width: `${X.out - X.in}cqw`, top: `${Y}cqw` }} />}
      {/* Señales */}
      <div className="pk-in absolute z-[4] bg-white opacity-0 shadow-neon-strong" style={{ ...pos(X.in), width: u(1.8), height: u(.9), borderRadius: u(.3) }} />
      <div className="pk-out absolute z-[4] opacity-0" style={{ ...pos(X.plc), width: u(1.8), height: u(.9), borderRadius: u(.3), background: GREEN, boxShadow: `0 0 ${u(1.2)} ${GREEN}` }} />

      {/* Entrada: sensor del evento */}
      <div className={node} style={pos(X.in)}>
        <div className="grid place-items-center border border-ice bg-deep shadow-neon" style={{ width: u(2.8), height: u(2.8), borderRadius: u(.55) }}>
          <span className="rounded-full transition-colors duration-300" style={{ width: u(1), height: u(1), ...led(true, solved ? GREEN : RED) }} />
        </div>
      </div>

      {/* Centro de control wcurrents: semáforo + procesamiento */}
      <div className={node} style={pos(X.plc)}>
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center rounded-full border border-ice/40 bg-deep" style={{ top: u(-3.2), gap: u(.45), padding: `${u(.4)} ${u(.7)}` }}>
          {[[phase <= 1, RED], [phase === 2, AMBER], [phase >= 3, GREEN]].map(([on, col], n) => (
            <span key={n} className="rounded-full transition-all duration-150" style={{ width: u(.8), height: u(.8), ...led(on as boolean, col as string) }} />
          ))}
        </div>
        <div className={cn('relative grid place-items-center rounded-full border bg-deep transition-[box-shadow,border-color] duration-200', phase === 2 ? 'border-white shadow-neon-strong' : 'border-ice shadow-neon')} style={{ width: u(3.8), height: u(3.8) }}>
          <img src="/img/isotipo.png" alt="" style={{ width: u(2) }} />
          {phase === 2 && <span className="absolute animate-spin rounded-full border-transparent" style={{ inset: u(-.35), borderWidth: u(.22), borderTopColor: AMBER, borderRightColor: AMBER, animationDuration: '.45s' }} />}
        </div>
      </div>

      {/* Salida: actuador */}
      <div className={node} style={pos(X.out)}>
        <div className="grid place-items-center border transition-all duration-300" style={{ width: u(2.8), height: u(2.8), borderRadius: u(.55), background: solved ? '#0b5c47' : '#0F2431', borderColor: solved ? GREEN : '#9fd0e066', boxShadow: solved ? `0 0 ${u(1.6)} ${u(-.2)} ${GREEN}` : 'none' }}>
          <span className="rounded-full transition-colors duration-300" style={{ width: u(1), height: u(1), ...led(solved, GREEN) }} />
        </div>
      </div>

      {/* Leyendas */}
      <div className="absolute text-center" style={cap(X.in)}>
        <div className="font-mono tracking-widest text-ice/70 uppercase" style={{ fontSize: u(.7) }}>Evento</div>
        <AnimatePresence mode="wait"><motion.div key={c.evento} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="font-medium text-white" style={{ fontSize: u(1), marginTop: u(.2) }}>{c.evento}</motion.div></AnimatePresence>
      </div>
      <div className="absolute text-center" style={cap(X.plc)}>
        <div className="font-mono tracking-widest text-ice/70 uppercase" style={{ fontSize: u(.7) }}>Control</div>
        <div className="font-medium text-white" style={{ fontSize: u(1), marginTop: u(.2) }}>wcurrents</div>
      </div>
      <div className="absolute text-center" style={cap(X.out)}>
        <div className="font-mono tracking-widest text-ice/70 uppercase" style={{ fontSize: u(.7) }}>Respuesta</div>
        <AnimatePresence mode="wait"><motion.div key={c.accion} initial={{ opacity: 0 }} animate={{ opacity: solved ? 1 : 0.35 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="font-medium" style={{ fontSize: u(1), marginTop: u(.2), color: solved ? GREEN : '#fff' }}>{c.accion}</motion.div></AnimatePresence>
      </div>
    </div>
  )
}
