import { describe, expect, it, vi } from 'vitest'
import { handleContact } from '../src/server/contact'
import { renderQuoteMail } from '../src/server/mail-template'
import type { Mailer } from '../src/server/mailer'

const env = { to: 'cdiaz@w-currents.cl', from: 'wcurrents <cotizaciones@w-currents.cl>', siteUrl: 'https://w-currents.cl' }
const valid = { disciplinas: ['Telecomunicaciones'], sector: 'Minería', plazo: '1 a 3 meses', nombre: 'Ana Pérez', telefono: '9 1234 5678', email: 'ana@minera.cl', website: '' }
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
  it('rechaza HTML en el nombre antes de enviar', async () => {
    const m = mailer()
    const r = await handleContact({ ...valid, nombre: '<img src=x onerror=alert(1)>' }, m, env)
    expect(r.status).toBe(400)
    expect(m.send).not.toHaveBeenCalled()
  })
  it('responde 500 si el proveedor falla', async () => {
    const m = { send: vi.fn().mockRejectedValue(new Error('boom')) }
    const r = await handleContact(valid, m, env)
    expect(r.status).toBe(500)
  })
})

describe('renderQuoteMail', () => {
  it('escapa HTML aunque llegue a la plantilla', () => {
    const r = renderQuoteMail({ disciplinas: ['<b>x</b>'], sector: 'Otro', plazo: '1 a 3 meses', nombre: '<img src=x onerror=alert(1)>', telefono: '912345678', email: 'a@b.cl' }, { siteUrl: 'https://w-currents.cl' })
    expect(r.html).not.toContain('<img src=x')
    expect(r.html).not.toContain('<b>x')
    expect(r.html).toContain('&lt;img src=x')
  })
  const d: Parameters<typeof renderQuoteMail>[0] = { disciplinas: ['Telecomunicaciones', 'Seguridad electrónica'], sector: 'Minería', plazo: 'Urgente (< 1 mes)', nombre: 'Ana Pérez', telefono: '912345678', email: 'ana@minera.cl' }
  it('marca como urgente en asunto, texto y HTML', () => {
    const r = renderQuoteMail(d, { siteUrl: 'https://w-currents.cl', now: new Date('2026-11-02T15:00:00Z') })
    expect(r.subject).toBe('[Urgente] Cotización web · Ana Pérez · Minería')
    expect(r.text).toContain('URGENTE')
    expect(r.html).toContain('Urgente · menos de 1 mes')
    expect(r.html).toContain('Telecomunicaciones')
    expect(r.html).toContain('mailto:ana%40minera.cl')
  })
  it('sin urgencia no antepone etiqueta', () => {
    const r = renderQuoteMail({ ...d, plazo: '1 a 3 meses' }, { siteUrl: 'https://w-currents.cl' })
    expect(r.subject).toBe('Cotización web · Ana Pérez · Minería')
    expect(r.html).not.toContain('URGENTE')
  })
})
