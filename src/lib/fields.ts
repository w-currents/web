/** Reglas y normalizadores de campos. Los usa el formulario (para filtrar mientras se escribe) y el esquema (para validar en navegador y servidor). */

/** Celular chileno: 9 dígitos que parten con 9. Acepta "+56 9 1234 5678", "56912345678", "9-1234-5678", etc. */
export function phoneDigits(raw: string): string {
  let d = raw.replace(/\D/g, '')
  // Un celular válido parte con 9, así que un "56" inicial siempre es el prefijo del país (pegado o tecleado).
  if (d.startsWith('56')) d = d.slice(2)
  return d
}
/** Solo dígitos, espacios, paréntesis y guiones; un "+" solo al inicio y nunca un "-" inicial (negativos). */
export const PHONE_CHARS = /^(?!-)\+?[\d\s()-]+$/
export const isChileanMobile = (d: string) => /^9\d{8}$/.test(d)
/** Rechaza números evidentemente falsos: 999999999, 911111111. */
export const isRepeated = (d: string) => /^9(\d)\1{7}$/.test(d)
/** "912345678" → "9 1234 5678" (formato de entrada y de visualización). */
export const formatPhone = (d: string) => [d.slice(0, 1), d.slice(1, 5), d.slice(5, 9)].filter(Boolean).join(' ')
export const phoneInput = (raw: string) => formatPhone(phoneDigits(raw).slice(0, 9))
export const phoneDisplay = (d: string) => `+56 ${formatPhone(d)}`

/** Nombre: letras (con tildes y ñ), espacios, apóstrofe, punto y guion. Sin números ni símbolos. */
export const NAME_ALLOWED = /^[\p{L}][\p{L}\s'’.-]*$/u
export const nameInput = (raw: string) => raw.replace(/[^\p{L}\s'’.-]/gu, '').replace(/^[\s'’.-]+/u, '').replace(/\s{2,}/g, ' ')
export const nameClean = (raw: string) => raw.trim().replace(/\s+/g, ' ')
export const letterCount = (s: string) => (s.match(/\p{L}/gu) ?? []).length

/** Correo: sin espacios y en minúsculas. */
export const emailInput = (raw: string) => raw.replace(/\s/g, '').toLowerCase()
