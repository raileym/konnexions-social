// src/hooks/useProfilePanel.ts
import { useAppContext } from '@context/AppContext/AppContext'
import { useCallback, useEffect, useRef } from 'react'
import { useNavbarTop } from './useNavbarTop'

export const useProfilePanel = () => {
  const profilePanelFirstFocusRef = useRef<HTMLButtonElement | null>(null)
  const profilePanelRef = useRef<HTMLDivElement | null>(null)

  const {
    isProfileOpen,
    setIsProfileOpen,
    isTransitioning,
    setIsTransitioning
  } = useAppContext()

  const { openNavbarTop, closeNavbarTop } = useNavbarTop()
  
  const openProfile = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsProfileOpen(true)

    closeNavbarTop()

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }, [closeNavbarTop, isTransitioning, setIsProfileOpen, setIsTransitioning])

  const closeProfile = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsProfileOpen(false)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)

    openNavbarTop()

  }, [isTransitioning, openNavbarTop, setIsProfileOpen, setIsTransitioning])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profilePanelRef.current &&
        !profilePanelRef.current.contains(event.target as Node)
      ) {
        requestAnimationFrame(() => {
          closeProfile()
        })
      }
    }

    if (isProfileOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
      }, 150)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [closeProfile, isProfileOpen])

  return {
    profilePanelRef,
    profilePanelFirstFocusRef,
    openProfile,
    closeProfile
  }
}
