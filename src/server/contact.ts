import { z } from 'zod'
import { contactSchema } from '@/lib/contact-schema'
import type { Mailer } from './mailer'
import { renderQuoteMail } from './mail-template'

export type ContactEnv = { to: string; from: string; siteUrl: string }
export type ContactResult = { status: 200 | 400 | 500; body: { ok: boolean; error?: string; fields?: Record<string, string[]> } }

/** Lógica pura del formulario (sin Astro ni red): valida, descarta robots y arma el correo. Es lo que se prueba. */
export async function handleContact(raw: unknown, mailer: Mailer, env: ContactEnv): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) return { status: 400, body: { ok: false, error: 'Datos no válidos', fields: z.flattenError(parsed.error).fieldErrors } }
  const d = parsed.data
  // Robot: respondemos como si hubiera funcionado, sin enviar nada.
  if (d.website) return { status: 200, body: { ok: true } }

  const { subject, text, html } = renderQuoteMail(d, { siteUrl: env.siteUrl })
  try {
    await mailer.send({ to: env.to, from: env.from, replyTo: d.email, subject, text, html })
  } catch (e) {
    console.error('contact: fallo al enviar', e instanceof Error ? e.message : e)
    return { status: 500, body: { ok: false, error: 'No pudimos enviar su solicitud. Intente de nuevo o escríbanos por WhatsApp.' } }
  }
  return { status: 200, body: { ok: true } }
}
