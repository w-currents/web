import { withMotion } from '@/lib/with-motion'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as Dialog from '@radix-ui/react-dialog'
import { ChevronDown, MapPin, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NAV, SERVICES, CONTACT } from '@/content/site'
import { ButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { scrollToId } from '@/lib/scroll'
import { useActiveSection } from '@/lib/useActiveSection'
import { useStore } from '@/lib/store'

/** Franja de utilidades (se va con el scroll) + barra flotante centrada (queda fija). */
function Nav() {
  const { setService } = useStore()
  const active = useActiveSection(NAV.map((n) => n.id))
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const go = (id: string) => (e: React.MouseEvent) => { setOpen(false); if (scrollToId(id)) e.preventDefault() }

  return (
    <>
      <div className="border-b border-pac/15 bg-deep text-xs text-silver">
        <div className="gutter mx-auto flex h-9 max-w-[1180px] items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider"><MapPin size={12} />Santiago · cobertura nacional</span>
          <span className="flex gap-5">
            <a className="hidden hover:text-white sm:inline" href="/#cotizar" onClick={go('cotizar')}>Proveedores</a>
            <a className="hidden hover:text-white sm:inline" href="/#cotizar" onClick={go('cotizar')}>Trabaja con nosotros</a>
            <a className="hover:text-white" href="/#cotizar" onClick={go('cotizar')}>{CONTACT.phone}</a>
          </span>
        </div>
      </div>

      {/* Contenedor de alto 0: la barra flota sobre el hero y se queda pegada arriba */}
      <div className="sticky top-[env(safe-area-inset-top,0px)] z-50 h-0">
        <NavigationMenu.Root
          aria-label="Principal"
          className={cn(
            'tema-oscuro absolute left-1/2 flex h-[62px] w-[min(1120px,calc(100%-32px))] -translate-x-1/2 items-center justify-between rounded-2xl border border-pac/30 pr-3 pl-5.5 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300',
            scrolled ? 'top-2.5 bg-deep/95 shadow-[0_22px_50px_-14px_#000,0_0_26px_-6px_#006986aa,0_2px_0_#ffffff14_inset]' : 'top-3.5 bg-deep/70 shadow-float',
          )}
        >
          <a href="/#inicio" onClick={go('inicio')} aria-label="wcurrents, inicio"><img src="/img/wordmark.png" alt="wcurrents" className="block h-5 w-auto" /></a>

          <NavigationMenu.List className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 text-[14.5px] font-medium md:flex">
            {NAV.map((n) =>
              n.id === 'servicios' ? (
                <NavigationMenu.Item key={n.id}>
                  <NavigationMenu.Trigger className={cn('group flex cursor-pointer items-center gap-1 rounded-[10px] px-3.5 py-2.5 transition hover:bg-white/10', active === n.id && 'shadow-[inset_0_-2px_0_var(--color-ice)]')}>
                    Servicios <ChevronDown size={14} className="transition group-data-[state=open]:rotate-180" />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="data-[state=open]:animate-pop">
                    <ul className="grid w-[640px] grid-cols-2 gap-1 p-3">
                      {SERVICES.map((s, i) => (
                        <li key={s.n}>
                          <NavigationMenu.Link asChild>
                            <a href="/#servicios" onClick={(e) => { setService(i); if (scrollToId('servicios')) e.preventDefault() }} className="grid grid-cols-[42px_1fr] items-center gap-x-3 rounded-xl p-3 transition hover:bg-white/10">
                              <span className="row-span-2 grid size-[42px] place-items-center rounded-[10px] border border-ice bg-cer shadow-neon"><s.icon size={20} /></span>
                              <b className="text-[14.5px] font-semibold tracking-tight">{s.title}</b>
                              <small className="text-xs leading-snug text-soft">{s.items.slice(0, 2).join(' · ')}</small>
                            </a>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              ) : (
                <NavigationMenu.Item key={n.id}>
                  <NavigationMenu.Link href={`/#${n.id}`} onClick={go(n.id)} className={cn('block rounded-[10px] px-3.5 py-2.5 transition hover:bg-white/10', active === n.id && 'bg-white/10 shadow-[inset_0_-2px_0_var(--color-ice)]')}>
                    {n.label}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ),
            )}
          </NavigationMenu.List>

          <div className="flex items-center gap-2.5">
            <ButtonLink size="sm" href="/#cotizar" onClick={go('cotizar')}>Cotizar</ButtonLink>
            {/* Menú móvil: panel Radix Dialog */}
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger aria-label="Abrir menú" className="grid size-[42px] cursor-pointer place-items-center rounded-[10px] border border-pac/40 bg-white/5 md:hidden"><Menu size={20} /></Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm data-[state=open]:animate-pop" />
                <Dialog.Content className="tema-oscuro gutter fixed inset-x-0 top-0 z-[70] mx-auto mt-3 grid w-[min(1120px,calc(100%-32px))] gap-1 rounded-2xl border border-pac/40 bg-deep p-4 shadow-card data-[state=open]:animate-pop">
                  <div className="mb-2 flex items-center justify-between">
                    <Dialog.Title className="sr-only">Menú</Dialog.Title>
                    <img src="/img/wordmark.png" alt="wcurrents" className="h-5 w-auto" />
                    <Dialog.Close aria-label="Cerrar menú" className="grid size-[42px] cursor-pointer place-items-center rounded-[10px] border border-pac/40"><X size={20} /></Dialog.Close>
                  </div>
                  {NAV.map((n) => <a key={n.id} href={`/#${n.id}`} onClick={go(n.id)} className="rounded-[10px] px-3 py-3.5 text-lg font-medium hover:bg-white/10">{n.label}</a>)}
                  <ButtonLink href="/#cotizar" onClick={go('cotizar')} className="mt-2">Cotizar proyecto</ButtonLink>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          {/* Viewport: aquí Radix muestra el desplegable, centrado bajo la barra */}
          <div className="absolute top-full left-1/2 mt-4 -translate-x-1/2">
            <NavigationMenu.Viewport className="relative h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) overflow-hidden rounded-2xl border border-pac/40 bg-deep/95 shadow-[0_30px_60px_-16px_#000e,0_0_40px_-12px_#006986cc] backdrop-blur-xl transition-[width,height] duration-200 data-[state=closed]:hidden" />
          </div>
        </NavigationMenu.Root>
      </div>
    </>
  )
}

export default withMotion(Nav)
