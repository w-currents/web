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

const X = { in: 9, plc: 26, out: 43 } // cqw
const Y = '49cqw'
const RED = '#ff6b5b'
const AMBER = '#ffc94a'
const GREEN = '#5df2b0'

/**
 * Lazo de control del hero (escritorio, unidades cqw).
 * Evento → señal → centro de control wcurrents (procesa) → respuesta en otro color → actuador.
 * Semáforo sobre el PLC: rojo (condición), ámbar (procesando), verde (resuelto).
 * phase: 0 espera · 1 señal viaja · 2 procesa · 3 respuesta viaja · 4 resuelto
 */
export function Lazo() {
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
  }, [reduce, animate])

  const c = CASOS[i]
  const solved = phase === 4
  const led = (on: boolean, color: string) => ({ background: on ? color : '#ffffff22', boxShadow: on ? `0 0 .7cqw ${color}` : 'none' })
  const node = 'absolute z-[5]'
  const pos = (x: number) => ({ left: `${x}cqw`, top: Y, translate: '-50% -50%' })
  const cap = (x: number) => ({ left: `${x}cqw`, top: 'calc(49cqw + 2.6cqw)', translate: '-50% 0', width: '15cqw' })

  return (
    <div ref={scope} aria-hidden={false} className="pointer-events-none absolute inset-0 z-[5]">
      {/* Señales */}
      <div className="pk-in absolute z-[4] rounded-[.3cqw] bg-white opacity-0 shadow-neon-strong" style={{ ...pos(X.in), width: '1.8cqw', height: '.9cqw' }} />
      <div className="pk-out absolute z-[4] rounded-[.3cqw] opacity-0" style={{ ...pos(X.plc), width: '1.8cqw', height: '.9cqw', background: GREEN, boxShadow: `0 0 1.2cqw ${GREEN}` }} />

      {/* Entrada: sensor del evento */}
      <div className={node} style={pos(X.in)}>
        <div className="grid place-items-center rounded-[.55cqw] border border-ice bg-deep shadow-neon" style={{ width: '2.8cqw', height: '2.8cqw' }}>
          <span className="rounded-full transition-colors duration-300" style={{ width: '1cqw', height: '1cqw', ...led(true, solved ? GREEN : RED) }} />
        </div>
      </div>

      {/* Centro de control wcurrents: semáforo + procesamiento */}
      <div className={node} style={pos(X.plc)}>
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center rounded-full border border-ice/40 bg-deep" style={{ top: '-3.2cqw', gap: '.45cqw', padding: '.4cqw .7cqw' }}>
          {[[phase <= 1, RED], [phase === 2, AMBER], [phase >= 3, GREEN]].map(([on, col], n) => (
            <span key={n} className="rounded-full transition-all duration-150" style={{ width: '.8cqw', height: '.8cqw', ...led(on as boolean, col as string) }} />
          ))}
        </div>
        <div className={cn('relative grid place-items-center rounded-full border bg-deep transition-[box-shadow,border-color] duration-200', phase === 2 ? 'border-white shadow-neon-strong' : 'border-ice shadow-neon')} style={{ width: '3.8cqw', height: '3.8cqw' }}>
          <img src="/img/isotipo.png" alt="" style={{ width: '2cqw' }} />
          {phase === 2 && <span className="absolute inset-[-.35cqw] animate-spin rounded-full border-transparent" style={{ borderWidth: '.22cqw', borderTopColor: AMBER, borderRightColor: AMBER, animationDuration: '.45s' }} />}
        </div>
      </div>

      {/* Salida: actuador */}
      <div className={node} style={pos(X.out)}>
        <div className="grid place-items-center rounded-[.55cqw] border transition-all duration-300" style={{ width: '2.8cqw', height: '2.8cqw', background: solved ? '#0b5c47' : '#0F2431', borderColor: solved ? GREEN : '#9fd0e066', boxShadow: solved ? `0 0 1.6cqw -.2cqw ${GREEN}` : 'none' }}>
          <span className="rounded-full transition-colors duration-300" style={{ width: '1cqw', height: '1cqw', ...led(solved, GREEN) }} />
        </div>
      </div>

      {/* Leyendas */}
      <div className="absolute text-center" style={cap(X.in)}>
        <div className="font-mono tracking-widest text-ice/70 uppercase" style={{ fontSize: '.7cqw' }}>Evento</div>
        <AnimatePresence mode="wait"><motion.div key={c.evento} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="font-medium text-white" style={{ fontSize: '1cqw', marginTop: '.2cqw' }}>{c.evento}</motion.div></AnimatePresence>
      </div>
      <div className="absolute text-center" style={cap(X.plc)}>
        <div className="font-mono tracking-widest text-ice/70 uppercase" style={{ fontSize: '.7cqw' }}>Control</div>
        <div className="font-medium text-white" style={{ fontSize: '1cqw', marginTop: '.2cqw' }}>wcurrents</div>
      </div>
      <div className="absolute text-center" style={cap(X.out)}>
        <div className="font-mono tracking-widest text-ice/70 uppercase" style={{ fontSize: '.7cqw' }}>Respuesta</div>
        <AnimatePresence mode="wait"><motion.div key={c.accion} initial={{ opacity: 0 }} animate={{ opacity: solved ? 1 : 0.35 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="font-medium" style={{ fontSize: '1cqw', marginTop: '.2cqw', color: solved ? GREEN : '#fff' }}>{c.accion}</motion.div></AnimatePresence>
      </div>
    </div>
  )
}
