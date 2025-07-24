// src/hooks/useProfilePanel.ts
import type { IsProfileOpen } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'
import { useState } from 'react'

export const useProfilePanel = () => {

  const [isProfileOpen, setIsProfileOpen] = useState<IsProfileOpen>(false)
  
  const {
    isTransitioning,
    setIsTransitioning
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

  return { isProfileOpen, openProfile, closeProfile }
}
