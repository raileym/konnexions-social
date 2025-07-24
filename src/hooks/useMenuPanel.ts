// src/hooks/useMenuPanel.ts
import type { IsHelpOpen } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'
import { useRef, useState, useCallback, useEffect } from 'react'

export const useMenuPanel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<IsHelpOpen>(false)

  const menuPanelFirstFocusRef = useRef<HTMLButtonElement | null>(null)
  const menuPanelRef = useRef<HTMLDivElement | null>(null)
  const menuPanelTabIndex = useRef<number>(-1)

  const {
    isTransitioning,
    setIsTransitioning
  } = useAppContext()

  const openMenu = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsMenuOpen(true)

    setTimeout(() => {
      menuPanelTabIndex.current = 0
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning, setIsTransitioning])

  const closeMenu = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsMenuOpen(false)

    setTimeout(() => {
      menuPanelTabIndex.current = -1
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning, setIsTransitioning])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuPanelRef.current &&
        !menuPanelRef.current.contains(event.target as Node)
      ) {
        requestAnimationFrame(() => {
          closeMenu()
        })
      }
    }

    if (isMenuOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, { capture: false })
      }, 150)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [isMenuOpen, closeMenu])

  return {
    menuPanelFirstFocusRef,
    menuPanelRef,
    menuPanelTabIndex,
    isMenuOpen,
    openMenu,
    closeMenu
  }
}
