// src/hooks/useHelpPanel.ts
import type { IsHelpOpen } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'
import { useState } from 'react'

export const useHelpPanel = () => {
  const [isHelpOpen, setIsHelpOpen] = useState<IsHelpOpen>(false)

  const {
    isTransitioning,
    setIsTransitioning
  } = useAppContext()

  const openHelp = () => {
    if (isTransitioning) return

    // cXnsole.log('Inside openHelp')

    setIsTransitioning(true)
    setIsHelpOpen(true)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  const closeHelp = () => {
    if (isTransitioning) return

    // cXnsole.log('Inside closeHelp')
    
    setIsTransitioning(true)
    setIsHelpOpen(false)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  return { isHelpOpen, openHelp, closeHelp }
}
