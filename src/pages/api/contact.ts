import type { APIRoute } from 'astro'
import { handleContact } from '@/server/contact'
import { ResendMailer } from '@/server/mailer'

export const prerender = false

// Límite simple por IP (en memoria; en serverless es "mejor esfuerzo"). Para algo más firme: Turnstile o un límite en el borde.
const hits = new Map<string, number[]>()
const WINDOW = 10 * 60_000, MAX = 5
function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX
}
const json = (body: unknown, status: number) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (limited(clientAddress)) return json({ ok: false, error: 'Demasiados intentos. Intente más tarde.' }, 429)
  let raw: unknown
  try { raw = await request.json() } catch { return json({ ok: false, error: 'Solicitud no válida' }, 400) }

  const key = import.meta.env.RESEND_API_KEY
  const to = import.meta.env.CONTACT_TO
  const from = import.meta.env.CONTACT_FROM
  if (!key || !to || !from) {
    console.error('contact: faltan variables de entorno (RESEND_API_KEY, CONTACT_TO, CONTACT_FROM)')
    return json({ ok: false, error: 'Servicio de correo no configurado' }, 500)
  }
  const r = await handleContact(raw, new ResendMailer(key), { to, from })
  return json(r.body, r.status)
}
