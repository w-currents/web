/** Vista previa local del correo de cotización (no envía nada). Uso: npx vite-node scripts/preview-mail.ts <carpeta-salida> <urlBase> */
import { mkdirSync, writeFileSync } from 'node:fs'
import { renderQuoteMail } from '../src/server/mail-template'

const [out = 'preview', base = 'http://localhost:5173'] = process.argv.slice(2)
mkdirSync(out, { recursive: true })
const now = new Date('2026-11-02T15:42:00Z')
const casos = {
  urgente: { disciplinas: ['Protección contra incendios', 'Electricidad e instrumentación', 'Automatización industrial'], sector: 'Minería', plazo: 'Urgente (< 1 mes)', nombre: 'Camila Rojas Vergara', telefono: '987654321', email: 'camila.rojas@mineraejemplo.cl' },
  normal: { disciplinas: ['Telecomunicaciones'], sector: 'Energía', plazo: '1 a 3 meses', nombre: 'Andrés Soto', telefono: '912345678', email: 'asoto@energiaejemplo.cl' },
} as const
for (const [k, d] of Object.entries(casos)) {
  const r = renderQuoteMail({ ...d, disciplinas: [...d.disciplinas] } as never, { siteUrl: base, now })
  writeFileSync(`${out}/${k}.html`, r.html)
  writeFileSync(`${out}/${k}.txt`, `Asunto: ${r.subject}\n\n${r.text}`)
}
console.log('listo')
