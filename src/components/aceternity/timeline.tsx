// Aceternity UI — Timeline (https://ui.aceternity.com/components/timeline)
// The rail fills in as you scroll, and each step lights up when the fill reaches it.
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export interface TimelineEntry {
  title: string
  content: React.ReactNode
}

function Step({ item }: { item: TimelineEntry }) {
  const ref = useRef<HTMLLIElement>(null)
  // 0 → 1 while this step's top passes the 60% → 50% line of the viewport. Stays at 1 once passed.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 62%', 'start 50%'] })
  const dotScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 1])

  return (
    <li ref={ref} className="relative flex gap-5 pb-14 last:pb-2 md:gap-10">
      <div className="sticky top-24 z-10 flex h-fit w-28 shrink-0 items-start gap-4 self-start md:w-44">
        <span className="relative z-10 mt-1 flex size-[22px] shrink-0 items-center justify-center rounded-full border-2 bg-background">
          <motion.span style={{ scale: dotScale }} className="size-2.5 rounded-full bg-accent" />
        </span>
        <motion.span
          style={{ opacity: textOpacity }}
          className="text-lg leading-tight font-bold tracking-tight tabular-nums md:text-2xl"
        >
          {item.title}
        </motion.span>
      </div>
      <motion.div style={{ opacity: textOpacity }} className="min-w-0 flex-1">
        {item.content}
      </motion.div>
    </li>
  )
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(() => setHeight(ref.current?.getBoundingClientRect().height ?? 0))
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 50%', 'end 50%'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, height])
  const glow = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  return (
    <div ref={containerRef} className="relative w-full">
      <ol ref={ref}>
        {data.map((item) => (
          <Step key={item.title} item={item} />
        ))}
      </ol>
      <div aria-hidden style={{ height }} className="absolute top-0 left-[10px] w-[2px] overflow-hidden rounded-full bg-border">
        <motion.div
          style={{ height: fill, opacity: glow }}
          className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-primary via-primary to-accent"
        />
      </div>
    </div>
  )
}
