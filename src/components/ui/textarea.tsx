// shadcn/ui — Textarea (https://ui.shadcn.com/docs/components/textarea)
import * as React from 'react'
import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-32 w-full rounded-lg border border-input bg-card px-3.5 py-3 text-base outline-none transition-[color,box-shadow] placeholder:text-muted-foreground/80 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
