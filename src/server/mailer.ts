import { Resend } from 'resend'

export type Mail = { to: string; from: string; replyTo?: string; subject: string; text: string; html: string }

/** Puerto de salida del correo: hoy Resend; cambiar de proveedor es escribir otra implementación. */
export interface Mailer { send(mail: Mail): Promise<void> }

export class ResendMailer implements Mailer {
  private client: Resend
  constructor(apiKey: string) { this.client = new Resend(apiKey) }
  async send({ to, from, replyTo, subject, text, html }: Mail) {
    const { error } = await this.client.emails.send({ to, from, replyTo, subject, text, html })
    if (error) throw new Error(`Resend: ${error.message}`)
  }
}
