import Lenis from 'lenis'

let lenis: Lenis | null = null

/** Inicia el scroll suave (Lenis). Se omite si el usuario pidió reducir movimiento. */
export function startSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ duration: 1.1 })
  let raf = 0
  const loop = (t: number) => { lenis?.raf(t); raf = requestAnimationFrame(loop) }
  raf = requestAnimationFrame(loop)
  return () => { cancelAnimationFrame(raf); lenis?.destroy(); lenis = null }
}

/** Baja a una sección de la página actual descontando la barra flotante. Devuelve false si el id no está aquí (el enlace navega a /#id). */
export function scrollToId(id: string): boolean {
  const el = document.getElementById(id)
  if (!el) return false
  if (lenis) lenis.scrollTo(el, { offset: -70 })
  else el.scrollIntoView({ behavior: 'smooth' })
  return true
}
