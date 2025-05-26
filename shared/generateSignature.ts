import { createHash } from 'crypto'

export const generateSignature = (value: string): string => {
  const hash = createHash('sha256').update(value).digest('hex')
  return hash
}
