import type { FC, ReactNode } from 'react'

type Props = {
  level: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  children: ReactNode
  id?: string
  role?: string
  ariaLabelledBy?: string
  ariaLabel?: string
}

export const HeadingMdx: FC<Props> = ({ level, className = '', children, id, role, ariaLabel = '' }) => {
  const ignoreChild=<div aria-hidden={true}>{children}</div>
  if (level === 1) return <h1 id={id} className={className} role={role} aria-label={ariaLabel}>{ignoreChild}</h1>
  if (level === 2) return <h2 id={id} className={className} role={role} aria-label={ariaLabel}>{ignoreChild}</h2>
  if (level === 3) return <h3 id={id} className={className} role={role} aria-label={ariaLabel}>{ignoreChild}</h3>
  if (level === 4) return <h4 id={id} className={className} role={role} aria-label={ariaLabel}>{ignoreChild}</h4>
  if (level === 5) return <h5 id={id} className={className} role={role} aria-label={ariaLabel}>{ignoreChild}</h5>
  return <h6 id={id} className={className} role={role} aria-label={ariaLabel}>{ignoreChild}</h6>
}
