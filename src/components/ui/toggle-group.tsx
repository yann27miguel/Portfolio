// shadcn/ui — Toggle Group, built on Radix Toggle Group
import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cn } from '@/lib/utils'

function ToggleGroup({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn('inline-flex flex-wrap items-center gap-1 rounded-full border bg-card p-1', className)}
      {...props}
    />
  )
}

function ToggleGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        'inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold text-muted-foreground transition-colors outline-none',
        'hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40',
        'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
