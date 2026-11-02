import { z } from 'zod'
import { isChileanMobile, isRepeated, letterCount, NAME_ALLOWED, nameClean, PHONE_CHARS, phoneDigits } from './fields'

/** Fuente única de verdad del formulario: valida en el navegador y de nuevo en el servidor. */
export const SECTORS = ['Minería', 'Energía', 'Industria', 'Otro'] as const
export const PLAZOS = ['Urgente (< 1 mes)', '1 a 3 meses', 'Más de 3 meses'] as const

export const contactSchema = z.object({
  disciplinas: z.array(z.string().min(1).max(60)).min(1, 'Seleccione al menos una disciplina').max(10),
  sector: z.enum(SECTORS, { error: 'Seleccione un sector' }),
  plazo: z.enum(PLAZOS, { error: 'Seleccione un plazo' }),
  nombre: z.string().transform(nameClean).pipe(
    z.string()
      .min(2, 'Ingrese su nombre')
      .max(80, 'Nombre demasiado largo')
      .regex(NAME_ALLOWED, 'Use solo letras, sin números ni símbolos')
      .refine((v) => letterCount(v) >= 2, 'Ingrese su nombre'),
  ),
  /** Se guarda normalizado: 9 dígitos (sin +56 ni espacios). */
  telefono: z.string().max(25, 'Número no válido')
    .refine((v) => PHONE_CHARS.test(v), 'Use solo números')
    .transform(phoneDigits)
    .refine(isChileanMobile, 'Ingrese un celular chileno de 9 dígitos que parta con 9')
    .refine((v) => !isRepeated(v), 'Número no válido'),
  email: z.string().transform((v) => v.trim().toLowerCase()).pipe(
    z.string().min(1, 'Ingrese su correo').max(254, 'Correo demasiado largo').pipe(z.email('Correo no válido')),
  ),
  /** Campo trampa: las personas no lo ven; si llega con texto es un robot (el servidor lo descarta en silencio). */
  website: z.string().max(300).optional().default(''),
})
export type ContactInput = z.infer<typeof contactSchema>
