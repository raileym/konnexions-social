// src/hooks/useHelpPanel.ts
import { useAppContext } from '@context/AppContext/AppContext'
import { useCallback, useEffect, useRef } from 'react'
import { useNavbarTop } from './useNavbarTop'

export const useHelpPanel = () => {
  const helpPanelFirstFocusRef = useRef<HTMLButtonElement | null>(null)
  const helpPanelRef = useRef<HTMLDivElement | null>(null)
  const helpPanelTabIndexRef = useRef<number>(-1)

  const { openNavbarTop, closeNavbarTop } = useNavbarTop()
  const { isHelpOpen, setIsHelpOpen } = useAppContext()

  const {
    isTransitioning,
    setIsTransitioning
  } = useAppContext()

  const openHelp = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsHelpOpen(true)

    closeNavbarTop()

    setTimeout(() => {
      helpPanelTabIndexRef.current = 0
      setIsTransitioning(false)

      // Focus the first element after panel opens
      if (helpPanelFirstFocusRef.current !== null) {
        helpPanelFirstFocusRef.current.focus()
      }
    }, 300)
  }, [closeNavbarTop, isTransitioning, setIsTransitioning])

  const closeHelp = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsHelpOpen(false)

    setTimeout(() => {
      helpPanelTabIndexRef.current = -1
      setIsTransitioning(false)
    }, 300)

    openNavbarTop()

  }, [isTransitioning, openNavbarTop, setIsTransitioning])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        helpPanelRef.current &&
        !helpPanelRef.current.contains(event.target as Node)
      ) {
        requestAnimationFrame(() => {
          closeHelp()
        })
      }
    }

    if (isHelpOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
      }, 150)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [closeHelp, isHelpOpen])

  return {
    helpPanelRef,
    helpPanelFirstFocusRef,
    helpPanelTabIndex: helpPanelTabIndexRef.current,
    openHelp,
    closeHelp
  }
}
