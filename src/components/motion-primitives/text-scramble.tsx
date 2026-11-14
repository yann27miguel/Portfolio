// Motion Primitives — Text Scramble (https://motion-primitives.com/docs/text-scramble)
// Letters shuffle through random characters before settling. Re-runs on hover.
import { useCallback, useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/{}#'

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  className,
  as: Tag = 'span',
}: {
  children: string
  duration?: number
  speed?: number
  className?: string
  as?: 'span' | 'h1' | 'p'
}) {
  const [text, setText] = useState(children)
  const running = useRef(false)

  const scramble = useCallback(() => {
    if (running.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    running.current = true
    const steps = duration / speed
    let step = 0
    const id = window.setInterval(() => {
      const progress = step / steps
      setText(
        children
          .split('')
          .map((c, i) => (c === ' ' || progress * children.length > i ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(''),
      )
      step++
      if (step > steps) {
        window.clearInterval(id)
        setText(children)
        running.current = false
      }
    }, speed * 1000)
  }, [children, duration, speed])

  useEffect(() => {
    scramble()
  }, [scramble])

  return (
    <Tag className={className} onMouseEnter={scramble} aria-label={children}>
      <span aria-hidden>{text}</span>
    </Tag>
  )
}
