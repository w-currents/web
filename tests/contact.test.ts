import { describe, expect, it, vi } from 'vitest'
import { handleContact } from '../src/server/contact'
import type { Mailer } from '../src/server/mailer'

const env = { to: 'cdiaz@w-currents.cl', from: 'wcurrents <cotizaciones@w-currents.cl>' }
const valid = { disciplinas: ['Telecomunicaciones'], sector: 'Minería', plazo: '1 a 3 meses', nombre: 'Ana Pérez', email: 'ana@minera.cl', website: '' }
const mailer = () => ({ send: vi.fn().mockResolvedValue(undefined) }) satisfies Mailer

describe('handleContact', () => {
  it('envía un correo con los datos válidos', async () => {
    const m = mailer()
    const r = await handleContact(valid, m, env)
    expect(r.status).toBe(200)
    expect(m.send).toHaveBeenCalledOnce()
    expect(m.send.mock.calls[0][0]).toMatchObject({ to: env.to, replyTo: 'ana@minera.cl' })
  })
  it('rechaza datos inválidos sin enviar', async () => {
    const m = mailer()
    const r = await handleContact({ ...valid, email: 'no-es-correo', disciplinas: [] }, m, env)
    expect(r.status).toBe(400)
    expect(r.body.fields).toHaveProperty('email')
    expect(m.send).not.toHaveBeenCalled()
  })
  it('descarta robots (honeypot) sin enviar y sin avisar', async () => {
    const m = mailer()
    const r = await handleContact({ ...valid, website: 'http://spam.example' }, m, env)
    expect(r.status).toBe(200)
    expect(m.send).not.toHaveBeenCalled()
  })
  it('escapa HTML en el cuerpo del correo', async () => {
    const m = mailer()
    await handleContact({ ...valid, nombre: '<img src=x onerror=alert(1)>' }, m, env)
    expect(m.send.mock.calls[0][0].html).not.toContain('<img')
  })
  it('responde 500 si el proveedor falla', async () => {
    const m = { send: vi.fn().mockRejectedValue(new Error('boom')) }
    const r = await handleContact(valid, m, env)
    expect(r.status).toBe(500)
  })
})
