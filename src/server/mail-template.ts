import type { ContactInput } from '../lib/contact-schema'
import { phoneDisplay } from '../lib/fields'

/** Correo de aviso interno de una solicitud de cotización. HTML para clientes de correo: tablas, estilos en línea, sin fuentes web. */
export type QuoteMeta = { siteUrl: string; now?: Date }

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
const NAVY = '#1B3B4F', DEEP = '#0F2431', CER = '#006986', ICE = '#9fd0e0', TERRA = '#8F2A1C', INK = '#16232B', MUTED = '#5B6B75', LINE = '#DDE5E9', BG = '#EEF2F4'

export const isUrgent = (plazo: string) => plazo.startsWith('Urgente')

export function renderQuoteMail(d: Pick<ContactInput, 'disciplinas' | 'sector' | 'plazo' | 'nombre' | 'telefono' | 'email'>, { siteUrl, now = new Date() }: QuoteMeta) {
  const urgent = isUrgent(d.plazo)
  const fecha = now.toLocaleString('es-CL', { timeZone: 'America/Santiago', dateStyle: 'long', timeStyle: 'short' })
  const subject = `${urgent ? '[Urgente] ' : ''}Cotización web · ${d.nombre} · ${d.sector}`

  const text = [
    `Nueva solicitud de cotización${urgent ? ' (URGENTE)' : ''}`,
    '',
    `Nombre: ${d.nombre}`,
    `Celular: ${phoneDisplay(d.telefono)}`,
    `Correo: ${d.email}`,
    `Sector: ${d.sector}`,
    `Plazo: ${d.plazo}`,
    `Disciplinas: ${d.disciplinas.join(', ')}`,
    '',
    `Recibida el ${fecha} (hora de Chile) desde ${siteUrl}`,
    'Responda a este correo para escribirle directamente al solicitante.',
  ].join('\n')

  const row = (k: string, v: string) =>
    `<tr><td style="padding:12px 0;border-top:1px solid ${LINE};width:120px;font:600 11px/1.4 Menlo,Consolas,monospace;letter-spacing:.08em;text-transform:uppercase;color:${MUTED};vertical-align:top">${esc(k)}</td><td style="padding:12px 0;border-top:1px solid ${LINE};font:15px/1.5 Arial,Helvetica,sans-serif;color:${INK}">${v}</td></tr>`
  const chip = (t: string, bg: string, fg: string) =>
    `<span style="display:inline-block;margin:0 6px 6px 0;padding:4px 10px;border-radius:999px;background:${bg};color:${fg};font:600 13px/1.4 Arial,Helvetica,sans-serif">${esc(t)}</span>`
  const mailto = `mailto:${encodeURIComponent(d.email)}?subject=${encodeURIComponent('Su solicitud de cotización · wcurrents')}`

  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${BG}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(d.nombre)} · ${esc(d.sector)} · ${esc(d.plazo)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:14px;overflow:hidden;border:1px solid ${LINE}">
  <tr><td style="background:${NAVY};padding:22px 28px;border-bottom:3px solid ${CER}">
    <img src="${esc(siteUrl)}/img/wordmark.png" alt="wcurrents" height="26" style="display:block;height:26px;width:auto;border:0;color:#fff;font:700 20px Arial,sans-serif">
  </td></tr>
  <tr><td style="padding:28px 28px 8px">
    <div style="font:600 11px/1.4 Menlo,Consolas,monospace;letter-spacing:.1em;text-transform:uppercase;color:${CER}">Nueva solicitud de cotización</div>
    <h1 style="margin:8px 0 10px;font:700 26px/1.2 Arial,Helvetica,sans-serif;color:${DEEP}">${esc(d.nombre)}</h1>
    <div>${urgent ? chip('Urgente · menos de 1 mes', TERRA, '#fff') : chip(d.plazo, '#E3EEF2', NAVY)}${chip(d.sector, '#E3EEF2', NAVY)}</div>
  </td></tr>
  <tr><td style="padding:8px 28px 4px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('Celular', `<a href="tel:+56${esc(d.telefono)}" style="color:${CER};text-decoration:none;font-weight:600">${esc(phoneDisplay(d.telefono))}</a> &nbsp;<a href="https://wa.me/56${esc(d.telefono)}" style="color:${MUTED};font-size:13px">WhatsApp</a>`)}
      ${row('Correo', `<a href="mailto:${esc(d.email)}" style="color:${CER};text-decoration:none;font-weight:600">${esc(d.email)}</a>`)}
      ${row('Disciplinas', d.disciplinas.map((x) => chip(x, '#fff', NAVY).replace('background:#fff', `background:#fff;border:1px solid ${ICE}`)).join(''))}
      ${row('Sector', esc(d.sector))}
      ${row('Plazo', esc(d.plazo))}
    </table>
  </td></tr>
  <tr><td align="left" style="padding:20px 28px 28px">
    <a href="${mailto}" style="display:inline-block;padding:13px 22px;border-radius:8px;background:${TERRA};color:#fff;font:700 15px/1 Arial,Helvetica,sans-serif;text-decoration:none">Responder a ${esc(d.nombre.split(' ')[0])}</a>
  </td></tr>
  <tr><td style="padding:16px 28px;background:#F6F9FA;border-top:1px solid ${LINE};font:12px/1.6 Arial,Helvetica,sans-serif;color:${MUTED}">
    Recibida el ${esc(fecha)} (hora de Chile) desde <a href="${esc(siteUrl)}" style="color:${MUTED}">${esc(siteUrl.replace(/^https?:\/\//, ''))}</a>.<br>Si responde a este correo, la respuesta llega directo al solicitante.
  </td></tr>
</table></td></tr></table></body></html>`

  return { subject, text, html }
}
