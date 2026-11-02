import { withMotion } from '@/lib/with-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, MapPin, Phone, User } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { contactSchema, PLAZOS, SECTORS, type ContactInput } from '@/lib/contact-schema'
import { emailInput, nameInput, phoneInput } from '@/lib/fields'
import { useContactForm } from '@/lib/useContactForm'
import { CONTACT, SERVICES } from '@/content/site'
import { cn } from '@/lib/cn'
import { useStore } from '@/lib/store'
import { track } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'
import { SectionHead } from '@/components/ui/SectionHead'

type Form = Pick<ContactInput, 'sector' | 'plazo' | 'nombre' | 'telefono' | 'email'>
// Validación por pasos del formulario visible; el esquema completo se revalida al enviar y en el servidor.
const schema = contactSchema.pick({ sector: true, plazo: true, nombre: true, telefono: true, email: true })

const input = 'rounded-xl border border-pac/40 bg-navy px-4 py-3 text-base shadow-[inset_0_2px_6px_#0006] outline-none transition focus:border-ice focus:shadow-neon aria-invalid:border-[#ff9b8a]'
const chip = (on: boolean) => cn('cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium transition', on ? 'border-ice bg-cer shadow-neon' : 'border-pac/40 bg-white/5 hover:bg-white/10')

/** Contacto + cotizador de 3 pasos. Envía a /api/contact (validación compartida + Resend en el servidor). */
function Cotizador() {
  const { quoteSvc, toggleQuoteSvc } = useStore()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const [step, setStep] = useState(0)
  const { status, error, submit } = useContactForm()
  const done = status === 'ok'
  const f = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { nombre: '', telefono: '', email: '' } })
  const { watch, setValue, register, formState: { errors }, trigger, handleSubmit } = f
  const honeypot = useRef<HTMLInputElement>(null)
  const sector = watch('sector'), plazo = watch('plazo')

  const next = async () => {
    if (step === 0 && !quoteSvc.length) return
    if (step === 1 && !(await trigger(['sector', 'plazo']))) return
    track('cotizador_paso', { paso: step + 1 })
    setStep((s) => s + 1)
  }

  return (
    <section id="cotizar" ref={ref} className="relative isolate overflow-hidden py-24">
      <motion.img src="/img/fondo-fibra.webp" alt="" style={{ y: bgY }} className="absolute inset-x-0 -top-[10%] -z-20 h-[120%] w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-ink/95 via-deep/90 to-cer/60" />
      <div className="gutter mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHead meta="Cotización técnica" label="Contacto">¿Qué sistema necesita su operación?</SectionHead>
          <p className="mt-6 max-w-[46ch] text-soft">Un ingeniero revisa su requerimiento y responde con un alcance preliminar.</p>
          <ul className="mt-8 grid gap-3 text-[15px]">
            <li className="flex items-center gap-3"><User size={18} className="text-ice" />{CONTACT.name}</li>
            <li className="flex items-center gap-3"><Mail size={18} className="text-ice" />{CONTACT.email}</li>
            <li className="flex items-center gap-3"><Phone size={18} className="text-ice" />{CONTACT.phone}</li>
            <li className="flex items-center gap-3"><MapPin size={18} className="text-ice" />{CONTACT.place}</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit((v) => submit({ ...v, disciplinas: quoteSvc.map((i) => SERVICES[i].title), website: honeypot.current?.value ?? '' }))} className="rounded-2xl border border-pac/40 bg-deep/90 p-6 shadow-[0_30px_70px_-20px_#000,0_0_40px_-14px_#006986] backdrop-blur-md sm:p-8" noValidate>
          {done ? (
            <div className="grid place-items-center gap-3 py-10 text-center">
              <CheckCircle2 size={44} className="text-ice neon" />
              <h3 className="text-xl font-semibold">Solicitud recibida</h3>
              <p className="text-soft">Un ingeniero revisará su requerimiento y le responderá al correo indicado.</p>
            </div>
          ) : (
            <>
              <ol className="mb-6 flex gap-2" aria-label="Pasos">
                {['Disciplinas', 'Contexto', 'Contacto'].map((t, i) => (
                  <li key={t} className={cn('flex-1 border-t-2 pt-2 font-mono text-xs uppercase tracking-wider', i <= step ? 'border-ice text-ice' : 'border-pac/25 text-silver/60')}>{i + 1}. {t}</li>
                ))}
              </ol>

              {step === 0 && (
                <fieldset>
                  <legend className="mb-3 font-semibold">¿Qué disciplinas requiere?</legend>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s, i) => <button type="button" key={s.n} aria-pressed={quoteSvc.includes(i)} onClick={() => toggleQuoteSvc(i)} className={chip(quoteSvc.includes(i))}>{s.short}</button>)}
                  </div>
                  {!quoteSvc.length && <p className="mt-3 text-xs text-silver/70">Seleccione al menos una.</p>}
                </fieldset>
              )}
              {step === 1 && (
                <div className="grid gap-5">
                  <fieldset>
                    <legend className="mb-3 font-semibold">Sector</legend>
                    <div className="flex flex-wrap gap-2">{SECTORS.map((x) => <button type="button" key={x} aria-pressed={sector === x} onClick={() => setValue('sector', x, { shouldValidate: true })} className={chip(sector === x)}>{x}</button>)}</div>
                    {errors.sector && <p className="mt-2 text-xs text-[#ff9b8a]">{errors.sector.message}</p>}
                  </fieldset>
                  <fieldset>
                    <legend className="mb-3 font-semibold">Plazo</legend>
                    <div className="flex flex-wrap gap-2">{PLAZOS.map((x) => <button type="button" key={x} aria-pressed={plazo === x} onClick={() => setValue('plazo', x, { shouldValidate: true })} className={chip(plazo === x)}>{x}</button>)}</div>
                    {errors.plazo && <p className="mt-2 text-xs text-[#ff9b8a]">{errors.plazo.message}</p>}
                  </fieldset>
                </div>
              )}
              {step === 2 && (
                <div className="grid gap-4">
                  <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
                  <label className="grid gap-1.5 text-sm font-medium">Nombre y apellido
                    <input type="text" autoComplete="name" maxLength={80} placeholder="Ana Pérez" aria-invalid={!!errors.nombre}
                      {...register('nombre', { onChange: (e) => { e.target.value = nameInput(e.target.value) } })} className={input} />
                    {errors.nombre && <span className="text-xs text-[#ff9b8a]">{errors.nombre.message}</span>}
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium">Celular
                    <span className="flex items-stretch">
                      <span className="grid place-items-center rounded-l-xl border border-r-0 border-pac/40 bg-white/5 px-3.5 font-mono text-sm text-ice">+56</span>
                      <input type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={11} placeholder="9 1234 5678" aria-invalid={!!errors.telefono}
                        {...register('telefono', { onChange: (e) => { e.target.value = phoneInput(e.target.value) } })} className={cn(input, 'min-w-0 flex-1 rounded-l-none')} />
                    </span>
                    {errors.telefono && <span className="text-xs text-[#ff9b8a]">{errors.telefono.message}</span>}
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium">Correo
                    <input type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={254} placeholder="nombre@empresa.cl" aria-invalid={!!errors.email}
                      {...register('email', { onChange: (e) => { e.target.value = emailInput(e.target.value) } })} className={input} />
                    {errors.email && <span className="text-xs text-[#ff9b8a]">{errors.email.message}</span>}
                  </label>
                </div>
              )}

              {status === 'error' && <p role="alert" className="mt-4 text-sm text-[#ff9b8a]">{error}</p>}
              <div className="mt-7 flex justify-between gap-3">
                <Button type="button" v="s" size="sm" onClick={() => setStep((s) => s - 1)} className={cn(step === 0 && 'invisible')}><ArrowLeft size={15} />Atrás</Button>
                {step < 2
                  ? <Button type="button" onClick={next} disabled={step === 0 && !quoteSvc.length}>Siguiente <ArrowRight size={16} /></Button>
                  : <Button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}</Button>}
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

export default withMotion(Cotizador)
