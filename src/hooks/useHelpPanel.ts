// src/hooks/useHelpPanel.ts
import type { IsHelpOpen } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useHelpPanel = () => {
  const [isHelpOpen, setIsHelpOpen] = useState<IsHelpOpen>(false)

  const helpPanelFirstFocusRef = useRef<HTMLButtonElement | null>(null)
  const helpPanelRef = useRef<HTMLDivElement | null>(null)
  const helpPanelTabIndexRef = useRef<number>(-1)

  const {
    isTransitioning,
    setIsTransitioning
  } = useAppContext()

  const openHelp = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsHelpOpen(true)

    setTimeout(() => {
      helpPanelTabIndexRef.current = 0
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning, setIsTransitioning])

  const closeHelp = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsHelpOpen(false)

    setTimeout(() => {
      helpPanelTabIndexRef.current = -1
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning, setIsTransitioning])

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
    helpPanelFirstFocus: helpPanelFirstFocusRef.current,
    helpPanelRef,
    helpPanelTabIndexRef,
    isHelpOpen,
    openHelp,
    closeHelp
  }
}
