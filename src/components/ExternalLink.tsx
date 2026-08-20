import type { ReactNode } from 'react'
import { ExternalLink as ExternalLinkIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function ExternalLink({
  href,
  children,
  className,
  iconClassName,
}: {
  href: string
  children: ReactNode
  className?: string
  iconClassName?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('inline-flex items-center gap-1', className)}
    >
      {children}
      <ExternalLinkIcon className={cn('h-3 w-3 shrink-0', iconClassName)} aria-hidden="true" />
    </a>
  )
}
