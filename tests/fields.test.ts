import { describe, expect, it } from 'vitest'
import { contactSchema } from '../src/lib/contact-schema'
import { emailInput, nameInput, phoneInput } from '../src/lib/fields'

const base = { disciplinas: ['Telecomunicaciones'], sector: 'Minería', plazo: '1 a 3 meses', nombre: 'Ana Pérez', telefono: '912345678', email: 'ana@minera.cl' }
const ok = (o: object) => contactSchema.safeParse({ ...base, ...o })
const err = (o: object, k: string) => { const r = ok(o); return !r.success && r.error.issues.some((i) => i.path[0] === k) }

describe('celular', () => {
  it.each(['912345678', '9 1234 5678', '+56 9 1234 5678', '56912345678', '(9) 1234-5678'])('acepta %s y lo normaliza', (v) => {
    const r = ok({ telefono: v }); expect(r.success && r.data.telefono).toBe('912345678')
  })
  it.each(['12345678', '812345678', '9123456789', '91234567', 'nueve', '9123abc78', '-912345678', '999999999', '911111111', '', '+57 9 1234 5678'])('rechaza %s', (v) => {
    expect(err({ telefono: v }, 'telefono')).toBe(true)
  })
})
describe('nombre', () => {
  it.each(['Ana Pérez', "María José O'Higgins", 'Ñuñoa Núñez-Soto', 'Jean-Luc Picard Jr.'])('acepta %s', (v) => expect(ok({ nombre: v }).success).toBe(true))
  it.each(['A', '1234', 'Ana 2', 'Ana <b>', '--', 'ana@correo.cl', ''])('rechaza %s', (v) => expect(err({ nombre: v }, 'nombre')).toBe(true))
  it('limpia espacios', () => { const r = ok({ nombre: '  Ana   Pérez ' }); expect(r.success && r.data.nombre).toBe('Ana Pérez') })
})
describe('correo', () => {
  it.each(['a@b.cl', 'ana.perez+cot@minera.cl'])('acepta %s', (v) => expect(ok({ email: v }).success).toBe(true))
  it.each(['sin-arroba', 'a@b', 'a b@c.cl', 'a@@b.cl', '@b.cl', 'a@b..cl', ''])('rechaza %s', (v) => expect(err({ email: v }, 'email')).toBe(true))
  it('pasa a minúsculas y recorta', () => { const r = ok({ email: '  Ana@Minera.CL ' }); expect(r.success && r.data.email).toBe('ana@minera.cl') })
})
describe('filtros al escribir', () => {
  it('celular: solo dígitos, máx. 9, formato y quita +56', () => {
    expect(phoneInput('abc9x1234-5678999')).toBe('9 1234 5678')
    expect(phoneInput('+56 9 8765 4321')).toBe('9 8765 4321')
    expect(phoneInput('-9')).toBe('9')
    // tecleando "+56 9 8765 4321" carácter por carácter
    let v = ''; for (const c of '+56 9 8765 4321') v = phoneInput(v + c)
    expect(v).toBe('9 8765 4321')
  })
  it('nombre: sin números ni símbolos', () => { expect(nameInput('Ana 123 Pérez!')).toBe('Ana Pérez'); expect(nameInput('  -Ana')).toBe('Ana') })
  it('correo: sin espacios, minúsculas', () => expect(emailInput(' Ana @X.cl ')).toBe('ana@x.cl'))
})
