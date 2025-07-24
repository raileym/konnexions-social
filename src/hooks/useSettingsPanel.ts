// src/hooks/useSettingsPanel.ts
import type { IsSettingsOpen } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'
import { useRef, useState, useCallback, useEffect } from 'react'

export const useSettingsPanel = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<IsSettingsOpen>(false)

  const settingsPanelRef = useRef<HTMLDivElement | null>(null)
  const settingsPanelFirstFocusRef = useRef<HTMLButtonElement | null>(null)
  const settingsPanelTabIndexRef = useRef<number>(-1)

  const {
    isTransitioning,
    setIsTransitioning
  } = useAppContext()

  const openSettings = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsSettingsOpen(true)

    setTimeout(() => {
      settingsPanelTabIndexRef.current = 0
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning, setIsTransitioning])

  const closeSettings = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsSettingsOpen(false)

    setTimeout(() => {
      settingsPanelTabIndexRef.current = -1
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning, setIsTransitioning])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(event.target as Node)
      ) {
        requestAnimationFrame(() => {
          closeSettings()
        })
      }
    }

    if (isSettingsOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, { capture: false })
      }, 150)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [isSettingsOpen, closeSettings])

  return {
    settingsPanelFirstFocus: settingsPanelFirstFocusRef.current,
    settingsPanelRef,
    settingsPanelTabIndexRef,
    isSettingsOpen,
    openSettings,
    closeSettings
  }
}
