import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'

import { cn } from '@/lib/utils'

function ToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-muted p-1',
        className,
      )}
      {...props}
    />
  )
}

function ToggleGroupItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors outline-none data-[state=on]:bg-card data-[state=on]:text-foreground data-[state=on]:shadow-sm focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
