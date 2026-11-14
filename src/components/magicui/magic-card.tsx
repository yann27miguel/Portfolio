// Magic UI — Magic Card (https://magicui.design/docs/components/magic-card)
// A soft spotlight follows the pointer across the card and lights up its border.
import { useCallback, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

export function MagicCard({
  children,
  className,
  size = 260,
}: {
  children: React.ReactNode
  className?: string
  size?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(-size)
  const y = useMotionValue(-size)

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      x.set(e.clientX - r.left)
      y.set(e.clientY - r.top)
    },
    [x, y],
  )
  const reset = useCallback(() => {
    x.set(-size)
    y.set(-size)
  }, [x, y, size])

  const fill = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, var(--spot), transparent 100%)`
  const edge = useMotionTemplate`radial-gradient(${size * 0.8}px circle at ${x}px ${y}px, var(--primary), var(--border) 100%)`

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={cn('group relative rounded-[inherit]', className)}>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] p-px" style={{ background: edge }}>
        <div className="size-full rounded-[inherit] bg-card" />
      </motion.div>
      <motion.div aria-hidden className="pointer-events-none absolute inset-px rounded-[inherit]" style={{ background: fill }} />
      <div className="relative">{children}</div>
    </div>
  )
}
