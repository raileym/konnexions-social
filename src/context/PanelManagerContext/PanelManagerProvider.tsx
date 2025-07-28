import { useState, useCallback, useRef } from 'react'
import type { PanelManagerContextType, PanelControl, ActivePanel } from '@cknTypes/types'
import { PanelManagerContext } from './PanelManagerContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'

export const PanelManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const registry = useRef<Map<ActivePanel, PanelControl>>(new Map())
  const supportPanels = useRef<Set<ActivePanel>>(new Set([
    ACTIVE_PANEL.LESSON_BAR,
    ACTIVE_PANEL.NAVBAR_BOTTOM,
    ACTIVE_PANEL.SELECT_MARKETING_PREFERENCES,
    ACTIVE_PANEL.INPUT_CUSTOM_PARICIPANT_LIST,
    ACTIVE_PANEL.BASIC_CREATE_COMPONENTS
  ]))

  const [currentPanel, setCurrentPanel] = useState<ActivePanel>(ACTIVE_PANEL.MDX)
  const [currentFocus, setCurrentFocus] = useState<ActivePanel>(ACTIVE_PANEL.MDX)

  const registerPanel = useCallback((name: ActivePanel, control: PanelControl) => {
    const isSupportPanel = supportPanels.current.has(name)
    if (!isSupportPanel) {
      // console.log('[PanelManagerProvider] registerPanel:', name)
    }
    registry.current.set(name, control)
  }, [])

  const unregisterPanel = useCallback((name: ActivePanel) => {
    // console.log('[PanelManagerProvider] unregisterPanel:', name)
    registry.current.delete(name)
  }, [])

  const closePanel = useCallback((name: ActivePanel) => {
    console.log('[PanelManagerProvider] closePanel:', name)
    const entry = registry.current.get(name)
    if (entry?.close) entry.close()
    setCurrentPanel(ACTIVE_PANEL.MDX)
  }, [])


  const openPanel = useCallback((name: ActivePanel) => {
    const isSupportPanel = supportPanels.current.has(name)
    
    // Close all other panels first
    if (!isSupportPanel) {
      registry.current.forEach((_, key) => {
        if (key !== name) {
          closePanel(key)
        }
      })
      setCurrentPanel(name)
    }
    
    // Now open requested panel
    console.log('[PanelManagerProvider] openPanel:', name)
    const entry = registry.current.get(name)
    if (entry?.open) entry.open()
  }, [closePanel])

  const focusPanel = useCallback((name: ActivePanel) => {
    console.log('[PanelManagerProvider] focusPanel:', name)
    const entry = registry.current.get(name)
    if (entry?.focus) entry.focus()

    setCurrentFocus(name)
  }, [])

  const togglePanel = useCallback((name: ActivePanel) => {
    console.log('[PanelManagerProvider] togglePanel:', name)
    const isOpen = currentPanel === name
    if (isOpen) {
      closePanel(name)
    } else {
      openPanel(name)
    }
  }, [currentPanel, closePanel, openPanel])

  const togglePanelWithFocus = useCallback((name: ActivePanel) => {
    console.log('[PanelManagerProvider] togglePanelWithFocus:', name)
    const isOpen = currentPanel === name
    if (isOpen) {
      closePanel(name)
    } else {
      openPanel(name)
      focusPanel(name)
    }
  }, [currentPanel, closePanel, openPanel, focusPanel])

  const closeAllPanels = useCallback(() => {
    console.log('[PanelManagerProvider] closeAllPanels')
    registry.current.forEach((_, name) => {
      closePanel(name)
    })
    setCurrentPanel(ACTIVE_PANEL.MDX)
  }, [closePanel])

  const isPanelOpen = useCallback((name: ActivePanel) => {
    console.log('[PanelManagerProvider] isPanelOpen:', name)

    const result = currentPanel === name
    return result
  }, [currentPanel])

  const isPanelFocus = useCallback((name: ActivePanel) => {
    console.log('[PanelManagerProvider] isPanelFocus:', name)

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
