import { withMotion } from '@/lib/with-motion'
import * as Tooltip from '@radix-ui/react-tooltip'
import { motion } from 'motion/react'
import { FaWhatsapp } from 'react-icons/fa6'
import { CONTACT } from '@/content/site'

/** Botón flotante de WhatsApp con anillo de pulso y tooltip. */
function WhatsApp() {
  const href = `https://wa.me/${CONTACT.wa}?text=${encodeURIComponent('Hola, quiero cotizar un proyecto con wcurrents.')}`
  return (
    <Tooltip.Provider delayDuration={100}><Tooltip.Root>
      <Tooltip.Trigger asChild>
        <motion.a href={href} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4, type: 'spring', stiffness: 300, damping: 15 }} whileHover={{ scale: 1.1 }}
          className="fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-[75] grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-8px_#000,0_0_26px_#25D36688]">
          <span className="absolute inset-0 animate-wring rounded-full border-2 border-[#25D366]" />
          <FaWhatsapp size={30} />
        </motion.a>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="left" sideOffset={10} className="z-[90] rounded-lg bg-white px-3 py-2 text-sm font-medium text-ink shadow-float">Consulte a un ingeniero por WhatsApp<Tooltip.Arrow className="fill-white" /></Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root></Tooltip.Provider>
  )
}

export default withMotion(WhatsApp)
