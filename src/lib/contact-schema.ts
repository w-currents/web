import { z } from 'zod'

/** Fuente única de verdad del formulario: valida en el navegador y de nuevo en el servidor. */
export const SECTORS = ['Minería', 'Energía', 'Industria', 'Otro'] as const
export const PLAZOS = ['Urgente (< 1 mes)', '1 a 3 meses', 'Más de 3 meses'] as const

export const contactSchema = z.object({
  disciplinas: z.array(z.string().min(1).max(60)).min(1, 'Seleccione al menos una disciplina').max(10),
  sector: z.enum(SECTORS, { error: 'Seleccione un sector' }),
  plazo: z.enum(PLAZOS, { error: 'Seleccione un plazo' }),
  nombre: z.string().trim().min(2, 'Ingrese su nombre').max(120),
  email: z.email('Correo no válido').max(160),
  /** Campo trampa: las personas no lo ven; si llega con texto es un robot (el servidor lo descarta en silencio). */
  website: z.string().max(300).optional().default(''),
})
export type ContactInput = z.infer<typeof contactSchema>
