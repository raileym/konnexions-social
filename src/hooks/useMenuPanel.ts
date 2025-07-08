// src/hooks/useMenuPanel.ts
import { useAppContext } from '@context/AppContext/AppContext'

export const useMenuPanel = () => {
  const {
    isTransitioning,
    setIsTransitioning,
    setIsMenuOpen
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

  return { openMenu, closeMenu }
}
