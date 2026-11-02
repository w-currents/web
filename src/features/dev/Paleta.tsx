import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

const OPTS = [
  { k: 'a', name: 'A · Marino', hint: '60 marino · 30 profundo · 10 cian' },
  { k: 'b', name: 'B · Ink cálido', hint: 'Violeta casi negro con bloques castaño' },
  { k: 'c', name: 'C · Cerulean y papel', hint: 'Cerulean profundo alternado con papel' },
  { k: 'd', name: 'D · Hueso cálido', hint: 'Claro dominante, marrón y tinta' },
  { k: 'e', name: 'E · Ink y Pacific', hint: 'Frío sobrio, plata y Pacific Blue' },
  { k: 'f', name: 'F · Bloques de marca', hint: 'Cada sección con su color de marca' },
] as const

/** Selector de paleta del boceto. Cambia data-palette en <html>; los tokens se redefinen en index.css. */
function Paleta() {
  const [k, setK] = useState<string>(() => new URLSearchParams(location.search).get('paleta') ?? 'a')
  useEffect(() => {
    document.documentElement.dataset.palette = k
    const u = new URL(location.href)
    k === 'a' ? u.searchParams.delete('paleta') : u.searchParams.set('paleta', k)
    history.replaceState(null, '', u)
  }, [k])
  return (
    <div role="group" aria-label="Paleta de color del boceto" className="fixed bottom-4 left-4 z-[80] flex flex-wrap gap-1 rounded-xl border border-white/20 bg-black/70 p-1 text-xs text-white shadow-float backdrop-blur max-sm:bottom-20">
      {OPTS.map((o) => (
        <button key={o.k} title={o.hint} aria-pressed={k === o.k} onClick={() => setK(o.k)} className={cn('cursor-pointer rounded-lg px-2.5 py-1.5 font-semibold transition', k === o.k ? 'bg-white text-black' : 'hover:bg-white/15')}>{o.name}</button>
      ))}
    </div>
  )
}
export default Paleta
