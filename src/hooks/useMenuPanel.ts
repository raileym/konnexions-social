// src/hooks/useMenuPanel.ts
import type { IsHelpOpen } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'
import { useState } from 'react'

export const useMenuPanel = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<IsHelpOpen>(false)
  
  const {
    isTransitioning,
    setIsTransitioning
  } = useAppContext()

  const openMenu = () => {
    if (isTransitioning) return

    // cXnsole.log('Inside openMenu')

    setIsTransitioning(true)
    setIsMenuOpen(true)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  const closeMenu = () => {
    if (isTransitioning) return

    // cXnsole.log('Inside closeMenu')
    
    setIsTransitioning(true)
    setIsMenuOpen(false)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  return { isMenuOpen, openMenu, closeMenu }
}
