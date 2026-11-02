import { withMotion } from '@/lib/with-motion'
import { Lazo } from './Lazo'

/** Lazo de control para móvil. Se hidrata solo en pantallas < md. */
function LazoMobile() { return <Lazo mobile /> }

export default withMotion(LazoMobile)
