// Origin UI — Textarea with characters left (https://originui.com/textarea)
import * as React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export function TextareaWithLimit({
  maxLength,
  value,
  className,
  counterText = (n) => `${n} characters left`,
  ...props
}: React.ComponentProps<'textarea'> & { maxLength: number; value: string; counterText?: (left: number) => string }) {
  const counterId = React.useId()
  const left = maxLength - value.length
  return (
    <div>
      <Textarea maxLength={maxLength} value={value} aria-describedby={counterId} className={className} {...props} />
      <p
        id={counterId}
        className={cn('mt-2 text-right text-xs tabular-nums text-muted-foreground', left < 40 && 'text-foreground font-semibold')}
        role="status"
        aria-live="polite"
      >
        {counterText(left)}
      </p>
    </div>
  )
}
