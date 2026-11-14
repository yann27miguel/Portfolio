// Magic UI — Animated Theme Toggler (https://magicui.design/docs/components/animated-theme-toggler)
// Switches day/night with a circular reveal that grows from the button (View Transitions API).
import { useRef } from 'react'
import { flushSync } from 'react-dom'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AnimatedThemeToggler({
  isDark,
  onToggle,
  className,
  labels = { day: 'Day', night: 'Night', toDay: 'Switch to day mode', toNight: 'Switch to night mode' },
}: {
  isDark: boolean
  onToggle: () => void
  className?: string
  labels?: { day: string; night: string; toDay: string; toNight: string }
}) {
  const ref = useRef<HTMLButtonElement>(null)

  const toggle = async () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }
    if (!doc.startViewTransition || reduce || !ref.current) {
      onToggle()
      return
    }
    const t = doc.startViewTransition(() => flushSync(onToggle))
    try {
      await t.ready
    } catch {
      return
    }
    const { top, left, width, height } = ref.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 650, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label={isDark ? labels.toDay : labels.toNight}
      className={cn(
        'relative inline-flex h-10 items-center gap-2 rounded-full border bg-card px-3.5 text-sm font-semibold transition-colors hover:border-foreground/30',
        className,
      )}
    >
      {isDark ? <Moon className="size-4 text-accent" /> : <Sun className="size-4 text-accent" />}
      <span className="hidden sm:inline">{isDark ? labels.night : labels.day}</span>
    </button>
  )
}
