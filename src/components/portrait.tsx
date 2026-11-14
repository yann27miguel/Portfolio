import { motion } from 'motion/react'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

const SRC = 'images/yann-portrait.webp'

/**
 * Yann's cut-out photo on a theme-aware backdrop.
 * - `capsule`: tall pill that sits inside the hero headline, sized in em so it scales with the type.
 * - `arch`: larger arched frame for the contact section.
 */
export function Portrait({ variant, className }: { variant: 'capsule' | 'arch'; className?: string }) {
  const { t } = useI18n()
  return (
    <motion.span
      whileHover={{ rotate: variant === 'capsule' ? -4 : 0, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className={cn(
        'relative isolate inline-block shrink-0 overflow-hidden align-bottom',
        variant === 'capsule' ? 'h-[0.86em] w-[0.66em] rounded-full' : 'aspect-[4/5] rounded-t-full rounded-b-3xl',
        className,
      )}
      style={{ background: 'var(--portrait-bg)', boxShadow: '0 0 0 1px var(--portrait-ring), 0 18px 40px -18px var(--portrait-ring)' }}
    >
      <img
        src={SRC}
        alt={t('portrait.alt')}
        width={480}
        height={611}
        decoding="async"
        className={cn(
          'absolute left-1/2 h-auto max-w-none -translate-x-1/2 select-none',
          variant === 'capsule' ? 'top-[9%] w-[155%]' : 'top-[7%] w-[104%]',
        )}
        draggable={false}
      />
    </motion.span>
  )
}
