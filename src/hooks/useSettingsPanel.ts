// src/hooks/useSettingsPanel.ts
import { useAppContext } from '@context/AppContext/AppContext'

export const useSettingsPanel = () => {
  const {
    isTransitioning,
    setIsTransitioning,
    setIsSettingsOpen
  } = useAppContext()

  const openSettings = () => {
    if (isTransitioning) return

    // cXnsole.log('Inside openSettings')

    setIsTransitioning(true)
    setIsSettingsOpen(true)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  const closeSettings = () => {
    if (isTransitioning) return

    // cXnsole.log('Inside closeSettings')
    
    setIsTransitioning(true)
    setIsSettingsOpen(false)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  return { openSettings, closeSettings }
}
