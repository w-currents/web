import { useState } from 'react'
import type { ContactInput } from './contact-schema'

export type ContactStatus = 'idle' | 'sending' | 'ok' | 'error'

/** Envía el formulario a /api/contact y expone el estado para la interfaz. */
export function useContactForm() {
  const [status, setStatus] = useState<ContactStatus>('idle')
  const [error, setError] = useState('')
  async function submit(values: ContactInput) {
    setStatus('sending'); setError('')
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(values) })
      const data = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!r.ok || !data.ok) throw new Error(data.error || 'No pudimos enviar su solicitud.')
      setStatus('ok')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error de red. Intente de nuevo.'); setStatus('error')
    }
  }
  return { status, error, submit, reset: () => { setStatus('idle'); setError('') } }
}
