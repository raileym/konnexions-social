// src/hooks/useProfilePanel.ts
import type { IsProfileOpen } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useProfilePanel = () => {
  const [isProfileOpen, setIsProfileOpen] = useState<IsProfileOpen>(false)

  const profilePanelFirstFocusRef = useRef<HTMLFormElement | null>(null)
  const profilePanelRef = useRef<HTMLDivElement | null>(null)
  const profilePanelTabIndexRef = useRef<number>(-1)

  const {
    isTransitioning,
    setIsTransitioning
  } = useAppContext()

  const openProfile = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsProfileOpen(true)

    setTimeout(() => {
      profilePanelTabIndexRef.current = 0
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning, setIsTransitioning])

  const closeProfile = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsProfileOpen(false)

    setTimeout(() => {
      profilePanelTabIndexRef.current = -1
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning, setIsTransitioning])

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
    profilePanelTabIndex: profilePanelTabIndexRef.current,
    profilePanelRef,
    profilePanelFirstFocusRef,
    isProfileOpen,
    openProfile,
    closeProfile
  }
}
