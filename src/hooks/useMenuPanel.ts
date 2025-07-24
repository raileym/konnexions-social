import { useAppContext } from '@context/AppContext/AppContext'
import { useRef, useCallback, useEffect } from 'react'
import { useNavbarTop } from './useNavbarTop'

export const useMenuPanel = () => {
  const menuPanelFirstFocusRef = useRef<HTMLButtonElement | null>(null)
  const menuPanelRef = useRef<HTMLDivElement | null>(null)

  const {
    isMenuOpen,
    setIsMenuOpen,
    isTransitioning,
    setIsTransitioning
  } = useAppContext()

  const { openNavbarTop, closeNavbarTop } = useNavbarTop()
  
  const openMenu = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsMenuOpen(true)

    closeNavbarTop()

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }, [closeNavbarTop, isTransitioning, setIsMenuOpen, setIsTransitioning])

  const closeMenu = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsMenuOpen(false)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)

    openNavbarTop()

  }, [isTransitioning, openNavbarTop, setIsMenuOpen, setIsTransitioning])

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
    openMenu,
    closeMenu
  }
}
