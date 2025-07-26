import { createContext, useContext } from 'react'
import type { PanelManagerContextType } from '@cknTypes/types'

export const PanelManagerContext = createContext<PanelManagerContextType | null>(null)

export const usePanelManager = () => {
  const context = useContext(PanelManagerContext)
  if (!context) throw new Error('PanelManagerContext not found')
  return context
}
