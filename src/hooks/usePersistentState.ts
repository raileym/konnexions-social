import { useState } from 'react'

type IsValid<T> = (value: unknown) => value is T

export const usePersistentState = <T>(
  key: string,
  defaultValue: T,
  isValid?: IsValid<T>
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValueInternal] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const raw = localStorage.getItem(key)
      const parsed = raw ? JSON.parse(raw) : null

      if (raw === null) {
        return defaultValue
      }

      if (isValid && !isValid(parsed)) {
        console.warn(`Invalid localStorage value for key "${key}"`)
        return defaultValue
      }

      return parsed as T
    } catch {
      return defaultValue
    }
  })

  const setValue: React.Dispatch<React.SetStateAction<T>> = newValue => {
    setValueInternal(prev => {
      const next = typeof newValue === 'function'
        ? (newValue as (prevState: T) => T)(prev)
        : newValue
      try {
        localStorage.setItem(key, JSON.stringify(next))
      } catch (err) {
        console.error(`Failed to save ${key} to localStorage:`, err)
      }
      return next
    })
  }

  return [value, setValue]
}
