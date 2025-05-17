// src/hooks/useHelpPanel.ts
import { useAppContext } from '../context/AppContext'

export const useHelpPanel = () => {
  const {
    isTransitioning,
    setIsTransitioning,
    setIsHelpOpen
  } = useAppContext()

  const openHelp = () => {
    if (isTransitioning) return

    console.log('Inside openHelp')

    setIsTransitioning(true)
    setIsHelpOpen(true)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  const closeHelp = () => {
    if (isTransitioning) return

    console.log('Inside closeHelp')
    
    setIsTransitioning(true)
    setIsHelpOpen(false)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  return { openHelp, closeHelp }
}
