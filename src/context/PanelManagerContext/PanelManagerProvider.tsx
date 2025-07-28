import { useState, useCallback, useRef } from 'react'
import type { PanelManagerContextType, PanelControl, ActivePanel } from '@cknTypes/types'
import { PanelManagerContext } from './PanelManagerContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'

export const PanelManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const registry = useRef<Map<ActivePanel, PanelControl>>(new Map())
  const supportPanels = useRef<Set<ActivePanel>>(new Set([ACTIVE_PANEL.LESSON_BAR, ACTIVE_PANEL.NAVBAR_BOTTOM, ACTIVE_PANEL.SELECT_MARKETING_PREFERENCES]))

  const [currentPanel, setCurrentPanel] = useState<ActivePanel>(ACTIVE_PANEL.MDX)
  const [currentFocus, setCurrentFocus] = useState<ActivePanel>(ACTIVE_PANEL.MDX)

  const registerPanel = useCallback((name: ActivePanel, control: PanelControl) => {
    // cXnsole.log('[PanelManagerProvider] registerPanel:', name)
    registry.current.set(name, control)
  }, [])

  const unregisterPanel = useCallback((name: ActivePanel) => {
    // cXnsole.log('[PanelManagerProvider] unregisterPanel:', name)
    registry.current.delete(name)
  }, [])

  const openPanel = useCallback((name: ActivePanel) => {
    const isSupportPanel = supportPanels.current.has(name)

    // Close all other panels first
    if (!isSupportPanel) {
      registry.current.forEach((entry, key) => {
        if (key !== name && entry?.close) {
          entry.close()
        }
      })

      setCurrentPanel(name)
    }

    // Now open requested panel
    const entry = registry.current.get(name)
    if (entry?.open) entry.open()
  }, [])

  const focusPanel = useCallback((name: ActivePanel) => {
    // Now focus requested panel
    const entry = registry.current.get(name)
    if (entry?.focus) entry.focus()

    setCurrentFocus(name)
  }, [])

  const closePanel = useCallback((name: ActivePanel) => {
    console.log('[PanelManagerProvider] closing panel:', name)
    const entry = registry.current.get(name)
    if (entry?.close) entry.close()
    // setCurrentPanel(prev => (prev === name ? ACTIVE_PANEL.MDX : prev))

    console.log('set new current panel', ACTIVE_PANEL.MDX)
    setCurrentPanel(ACTIVE_PANEL.MDX)
  }, [])

  const togglePanel = useCallback((name: ActivePanel) => {
    const isOpen = currentPanel === name

    if (isOpen) {
      closePanel(name)
    } else {
      openPanel(name)
    }
  }, [currentPanel, closePanel, openPanel])

  const togglePanelWithFocus = useCallback((name: ActivePanel) => {
    const isOpen = currentPanel === name

    if (isOpen) {
      closePanel(name)
    } else {
      openPanel(name)
      focusPanel(name)
    }
  }, [currentPanel, closePanel, openPanel, focusPanel])

  const closeAllPanels = useCallback(() => {
    // cXnsole.log('[PanelManagerProvider] closeAllPanels')
    registry.current.forEach((entry) => {
      if (entry?.close) {
        // cXnsole.log(`Closing Panel: ${name}`)
        entry.close()
      }
    })
    setCurrentPanel(ACTIVE_PANEL.MDX)
  }, [])

  const isPanelOpen = useCallback((name: ActivePanel) => {
    const result = currentPanel === name
    return result
  }, [currentPanel])

  const isPanelFocus = useCallback((name: ActivePanel) => {
    const result = currentFocus === name
    return result
  }, [currentFocus])

  const value: PanelManagerContextType = {
    openPanel,
    closePanel,
    focusPanel,
    closeAllPanels,
    togglePanel,
    togglePanelWithFocus,
    isPanelOpen,
    isPanelFocus,
    registerPanel,
    unregisterPanel,
    currentPanel,
  }

  return (
    <PanelManagerContext.Provider value={value}>
      {children}
    </PanelManagerContext.Provider>
  )
}
