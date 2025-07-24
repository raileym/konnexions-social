// src/hooks/useProfilePanel.ts
import { useAppContext } from '@context/AppContext/AppContext'
import { useCallback, useEffect, useRef } from 'react'
import { useNavbarTop } from './useNavbarTop'

export const useProfilePanel = () => {
  const profilePanelFirstFocusRef = useRef<HTMLFormElement | null>(null)
  const profilePanelRef = useRef<HTMLDivElement | null>(null)
  const profilePanelTabIndexRef = useRef<number>(-1)

  const { isProfileOpen, setIsProfileOpen } = useAppContext()

  const { openNavbarTop, closeNavbarTop } = useNavbarTop()
  
  const {
    isTransitioning,
    setIsTransitioning
  } = useAppContext()

  const openProfile = useCallback(() => {
    if (isTransitioning) return

    console.log('openProfile will now happen')

    setIsTransitioning(true)
    setIsProfileOpen(true)

    closeNavbarTop()

    setTimeout(() => {
      profilePanelTabIndexRef.current = 0
      setIsTransitioning(false)
    }, 300)
  }, [closeNavbarTop, isTransitioning, setIsProfileOpen, setIsTransitioning])

  const closeProfile = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsProfileOpen(false)

    setTimeout(() => {
      profilePanelTabIndexRef.current = -1
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
    profilePanelTabIndex: profilePanelTabIndexRef.current,
    openProfile,
    closeProfile
  }
}
