/**
 * Eventos de analítica, independientes del proveedor.
 * Si no hay proveedor cargado (desarrollo o sin variables de entorno) no hace nada.
 * Nunca enviar datos personales (nombre, correo, teléfono) como propiedades.
 */
type Props = Record<string, string | number | boolean>
declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void
    clarity?: (...args: unknown[]) => void
  }
}

export function track(event: string, props?: Props) {
  if (typeof window === 'undefined') return
  try {
    window.plausible?.(event, props ? { props } : undefined)
    window.clarity?.('event', event)
  } catch { /* la analítica jamás debe romper la página */ }
}
