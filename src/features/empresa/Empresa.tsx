import { withMotion } from '@/lib/with-motion'
import { PILLARS } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { FillText } from '@/components/ui/FillText'
import { Spotlight } from '@/components/ui/Spotlight'

/** Quiénes somos. Sin divisor de corrientes: ese motivo vive solo en el hero. */
function Empresa() {
  return (
    <section id="empresa" className="bg-navy py-24">
      <div className="gutter mx-auto grid max-w-[1180px] gap-14 md:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <SectionHead meta="Ingeniería integrada" label="Empresa">¿Quién responde cuando fallan las interfaces?</SectionHead>
          <FillText text="Detección, potencia, control, redes y accesos comparten canalizaciones, energía y criticidad." className="mt-6 max-w-[48ch] text-2xl leading-snug font-medium text-white" />
          <p className="mt-4 max-w-[52ch] text-lg text-soft">Cuando los diseña un mismo equipo, las interfaces se resuelven en ingeniería, no en terreno. <b className="font-semibold text-ice">wcurrents responde</b> del diagnóstico al mantenimiento.</p>
        </Reveal>
        <div className="grid gap-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <Spotlight className="grid grid-cols-[48px_1fr] gap-x-4 rounded-2xl border border-pac/25 bg-deep p-5 shadow-card transition hover:-translate-y-1 hover:border-ice/60 hover:shadow-[0_24px_50px_-14px_#000,0_0_28px_-8px_#006986]">
                <span className="row-span-2 grid size-12 place-items-center rounded-xl border border-ice bg-cer shadow-neon"><p.icon size={22} /></span>
                <b className="text-lg font-semibold">{p.title}</b>
                <p className="text-[15px] text-soft">{p.text}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default withMotion(Empresa)
