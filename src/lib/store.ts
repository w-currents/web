import { atom } from 'nanostores'
import { useStore as useNano } from '@nanostores/react'

/**
 * Estado compartido entre islas de Astro (cada sección hidrata por separado, por eso no usamos Context).
 * service: disciplina activa en Servicios · quoteSvc: disciplinas preseleccionadas en el cotizador.
 */
const $service = atom(0)
const $quoteSvc = atom<number[]>([])

export function useStore() {
  const service = useNano($service)
  const quoteSvc = useNano($quoteSvc)
  return {
    service,
    setService: (i: number) => $service.set(i),
    quoteSvc,
    toggleQuoteSvc: (i: number) => $quoteSvc.set($quoteSvc.get().includes(i) ? $quoteSvc.get().filter((x) => x !== i) : [...$quoteSvc.get(), i]),
    addQuoteSvc: (i: number) => { if (!$quoteSvc.get().includes(i)) $quoteSvc.set([...$quoteSvc.get(), i]) },
    setQuoteSvc: (v: number[]) => $quoteSvc.set(v),
  }
}
