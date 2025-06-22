import { useAppContext } from '@context/AppContext/AppContext'

export const useDebugLogger = () => {
  const { debugMode } = useAppContext()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debugLog = (...args: any[]) => {
    if (debugMode) {
      console.log('[debug]', ...args)
    }
  }

  return debugLog
}
