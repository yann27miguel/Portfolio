// Motion Primitives — Morphing Dialog (https://motion-primitives.com/docs/morphing-dialog)
// The clicked element grows into the dialog using a shared layout animation.
import * as React from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, MotionConfig, motion, type Transition } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Ctx = {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  uniqueId: string
  triggerRef: React.RefObject<HTMLButtonElement | null>
}
const MorphingDialogContext = React.createContext<Ctx | null>(null)
const useDialog = () => {
  const ctx = React.useContext(MorphingDialogContext)
  if (!ctx) throw new Error('MorphingDialog parts must be used inside <MorphingDialog>')
  return ctx
}

const DEFAULT_TRANSITION: Transition = { type: 'spring', bounce: 0.08, duration: 0.38 }

export function MorphingDialog({ children, transition = DEFAULT_TRANSITION }: { children: React.ReactNode; transition?: Transition }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const uniqueId = React.useId()
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  return (
    <MorphingDialogContext.Provider value={{ isOpen, setIsOpen, uniqueId, triggerRef }}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </MorphingDialogContext.Provider>
  )
}

export function MorphingDialogTrigger({ children, className, ariaLabel }: { children: React.ReactNode; className?: string; ariaLabel?: string }) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog()
  return (
    <motion.button
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-label={ariaLabel}
      className={cn('relative block w-full cursor-pointer text-left', className)}
      style={{ borderRadius: 16 }}
    >
      {children}
    </motion.button>
  )
}

export function MorphingDialogContainer({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useDialog()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  React.useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, setIsOpen])

  if (!mounted) return null
  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-[#0F2733]/40 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">{children}</div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export function MorphingDialogContent({ children, className, labelledBy }: { children: React.ReactNode; className?: string; labelledBy?: string }) {
  const { uniqueId, triggerRef } = useDialog()
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const trigger = triggerRef.current
    const focusables = () =>
      Array.from(el.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'))
    focusables()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const f = focusables()
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    el.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('keydown', onKey)
      trigger?.focus()
    }
  }, [triggerRef])

  return (
    <motion.div
      ref={ref}
      layoutId={`dialog-${uniqueId}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className={cn('pointer-events-auto relative overflow-hidden', className)}
      style={{ borderRadius: 24 }}
    >
      {children}
    </motion.div>
  )
}

export function MorphingDialogClose({ className, label = 'Close' }: { className?: string; label?: string }) {
  const { setIsOpen } = useDialog()
  return (
    <motion.button
      type="button"
      onClick={() => setIsOpen(false)}
      aria-label={label}
      className={cn('absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full hover:bg-foreground/10', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.15 } }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
    >
      <X className="size-5" />
    </motion.button>
  )
}
