import { useState, useCallback, useRef } from 'react'
import type { PanelManagerContextType, PanelControl, ActivePanel } from '@cknTypes/types'
import { PanelManagerContext } from './PanelManagerContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'

export const PanelManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPanel, setCurrentPanel] = useState<ActivePanel>(ACTIVE_PANEL.MDX)

  const registry = useRef<Map<ActivePanel, PanelControl>>(new Map())

  const registerPanel = useCallback((name: ActivePanel, control: PanelControl) => {
    console.log('[PanelManagerProvider] registerPanel:', name)
    registry.current.set(name, control)
  }, [])

  const unregisterPanel = useCallback((name: ActivePanel) => {
    console.log('[PanelManagerProvider] unregisterPanel:', name)
    registry.current.delete(name)
  }, [])

  const openPanel = useCallback((name: ActivePanel) => {
    console.log('[PanelManagerProvider] openPanel:', name)

    // Close all other panels first
    registry.current.forEach((entry, key) => {
      if (key !== name && entry?.close) {
        console.log(`Auto-closing other panel: ${key}`)
        entry.close()
      }
    })

    // Now open requested panel
    const entry = registry.current.get(name)
    if (entry?.open) entry.open()

    setCurrentPanel(name)
  }, [])

  const closePanel = useCallback((name: ActivePanel) => {
    console.log('[PanelManagerProvider] closePanel:', name)
    const entry = registry.current.get(name)
    if (entry?.close) entry.close()
    setCurrentPanel(prev => (prev === name ? ACTIVE_PANEL.MDX : prev))
  }, [])

  const togglePanel = useCallback((name: ActivePanel) => {
    const isOpen = currentPanel === name

    if (isOpen) {
      console.log(`[PanelManagerProvider] togglePanel: closing ${name}`)
      closePanel(name)
    } else {
      console.log(`[PanelManagerProvider] togglePanel: opening ${name}`)
      openPanel(name)
    }
  }, [currentPanel, closePanel, openPanel])

  const closeAllPanels = useCallback(() => {
    console.log('[PanelManagerProvider] closeAllPanels')
    registry.current.forEach((entry, name) => {
      if (entry?.close) {
        console.log(`Closing Panel: ${name}`)
        entry.close()
      }
    })
    setCurrentPanel(ACTIVE_PANEL.MDX)
  }, [])

  const isPanelOpen = useCallback((who: string, name: ActivePanel) => {
    const result = currentPanel === name
    console.log(`[${who}] isPanelOpen(${name}): ${result ? 'OPEN' : 'CLOSED'}`)
    return result
  }, [currentPanel])

  const value: PanelManagerContextType = {
    openPanel,
    closePanel,
    closeAllPanels,
    togglePanel, // ✅ new
    isPanelOpen,
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
