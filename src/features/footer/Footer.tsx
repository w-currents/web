import { CONTACT, NAV } from '@/content/site'
import { scrollToId } from '@/lib/scroll'

export function Footer() {
  return (
    <footer className="border-t border-pac/20 bg-ink py-12">
      <div className="gutter mx-auto flex max-w-[1180px] flex-wrap items-start justify-between gap-8">
        <div>
          <img src="/img/wordmark.png" alt="wcurrents" className="h-6 w-auto" />
          <p className="mt-3 max-w-[34ch] text-sm text-silver">Ingeniería para Infraestructura Crítica.</p>
        </div>
        <nav aria-label="Pie" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {NAV.map((n) => <a key={n.id} href={`/#${n.id}`} onClick={(e) => { if (scrollToId(n.id)) e.preventDefault() }} className="text-silver hover:text-white">{n.label}</a>)}
        </nav>
        <div className="text-sm text-silver"><div>{CONTACT.email}</div><div>{CONTACT.phone}</div><div>{CONTACT.place}</div></div>
      </div>
      <p className="gutter mx-auto mt-8 max-w-[1180px] font-mono text-xs text-silver/50">© {new Date().getFullYear()} wcurrents</p>
    </footer>
  )
}
