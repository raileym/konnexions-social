// src/hooks/useSettingsPanel.ts
import type { IsSettingsOpen } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'
import { useState } from 'react'

export const useSettingsPanel = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<IsSettingsOpen>(false)

  const {
    isTransitioning,
    setIsTransitioning
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

  return { isSettingsOpen, openSettings, closeSettings }
}
