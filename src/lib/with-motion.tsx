import { MotionConfig } from 'motion/react'
import type { ComponentType } from 'react'

/** Cada isla de Astro hidrata por separado: aquí se repite la configuración global de motion (respeta "reducir movimiento"). */
export function withMotion<P extends object>(Component: ComponentType<P>) {
  return function Island(props: P) {
    return <MotionConfig reducedMotion="user"><Component {...props} /></MotionConfig>
  }
}
