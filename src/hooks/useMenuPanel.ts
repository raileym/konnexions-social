import { useAppContext } from '@context/AppContext/AppContext'
import { useRef, useCallback, useEffect } from 'react'

export const useMenuPanel = () => {
  const menuPanelFirstFocusRef = useRef<HTMLButtonElement | null>(null)
  const menuPanelRef = useRef<HTMLDivElement | null>(null)
  const menuPanelTabIndexRef = useRef<number>(-1)

  const { isMenuOpen, setIsMenuOpen } = useAppContext()
  const { isTransitioning, setIsTransitioning } = useAppContext()

  const openMenu = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsMenuOpen(true)

    // delay tabIndex and focus until visible
    setTimeout(() => {
      menuPanelTabIndexRef.current = 0

      requestAnimationFrame(() => {
        menuPanelFirstFocusRef.current?.focus()
        console.log('✅ Focused first button after opening')
      })

      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning, setIsMenuOpen, setIsTransitioning])

  const closeMenu = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsMenuOpen(false)

    setTimeout(() => {
      menuPanelTabIndexRef.current = -1
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning, setIsMenuOpen, setIsTransitioning])

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
    menuPanelTabIndex: menuPanelTabIndexRef.current,
    openMenu,
    closeMenu
  }
}
