import { useState, useCallback, useRef } from 'react'
import type { PanelManagerContextType, PanelControl, ActivePanel } from '@cknTypes/types'
import { PanelManagerContext } from './PanelManagerContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'

export const PanelManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPanel, setCurrentPanel] = useState<ActivePanel>(ACTIVE_PANEL.MDX)

  const registry = useRef<Map<ActivePanel, PanelControl>>(new Map())

  const registerPanel = useCallback((name: ActivePanel, control: PanelControl) => {
    // cXnsole.log('[PanelManagerProvider] registerPanel:', name)
    registry.current.set(name, control)
  }, [])

  const unregisterPanel = useCallback((name: ActivePanel) => {
    // cXnsole.log('[PanelManagerProvider] unregisterPanel:', name)
    registry.current.delete(name)
  }, [])

  const openPanel = useCallback((name: ActivePanel) => {
    // cXnsole.log('[PanelManagerProvider] openPanel:', name)

    // Close all other panels first
    registry.current.forEach((entry, key) => {
      if (key !== name && entry?.close) {
        // cXnsole.log(`Auto-closing other panel: ${key}`)
        entry.close()
      }
    })

    // Now open requested panel
    const entry = registry.current.get(name)
    if (entry?.open) entry.open()

    setCurrentPanel(name)
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
      // cXnsole.log(`[PanelManagerProvider] togglePanel: closing ${name}`)
      closePanel(name)
    } else {
      // cXnsole.log(`[PanelManagerProvider] togglePanel: opening ${name}`)
      openPanel(name)
    }
  }, [currentPanel, closePanel, openPanel])

  const closeAllPanels = useCallback(() => {
    // cXnsole.log('[PanelManagerProvider] closeAllPanels')
    registry.current.forEach((entry, name) => {
      if (entry?.close) {
        // cXnsole.log(`Closing Panel: ${name}`)
        entry.close()
      }
    })
    setCurrentPanel(ACTIVE_PANEL.MDX)
  }, [])

  const isPanelOpen = useCallback((who: string, name: ActivePanel) => {
    const result = currentPanel === name
    // cXnsole.log(`[${who}] isPanelOpen(${name}): ${result ? 'OPEN' : 'CLOSED'}`)
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
