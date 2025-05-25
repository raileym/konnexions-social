import { useState } from 'react'

export const usePersistentState = <T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValueInternal] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) as T : defaultValue
    } catch (err) {
      console.error(`Failed to load ${key} from localStorage:`, err)
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
