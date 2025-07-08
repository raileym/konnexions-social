// src/hooks/useProfilePanel.ts
import { useAppContext } from '@context/AppContext/AppContext'

export const useProfilePanel = () => {
  const {
    isTransitioning,
    setIsTransitioning,
    setIsProfileOpen
  } = useAppContext()

  const openProfile = () => {
    if (isTransitioning) return

    // cXnsole.log('Inside openProfile')

    setIsTransitioning(true)
    setIsProfileOpen(true)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  const closeProfile = () => {
    if (isTransitioning) return

    // cXnsole.log('Inside closeProfile')
    
    setIsTransitioning(true)
    setIsProfileOpen(false)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  return { openProfile, closeProfile }
}
