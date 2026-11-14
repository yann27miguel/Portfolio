// Magic UI — Number Ticker (https://magicui.design/docs/components/number-ticker)
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

export function NumberTicker({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { damping: 40, stiffness: 120 })
  const inView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, mv, value])

  useEffect(
    () =>
      spring.on('change', (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toString()
      }),
    [spring],
  )

  return (
    <span ref={ref} className={cn('inline-block tabular-nums', className)} aria-label={String(value)}>
      0
    </span>
  )
}
