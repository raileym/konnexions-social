/* eslint-disable react-refresh/only-export-components */
// context/AppContext.tsx
import React, { createContext, useContext, useState } from 'react'

export type AppPanel = 'home' | 'settings' | 'help' | 'keys'

type AppContextType = {
  activePanel: AppPanel
  setActivePanel: (panel: AppPanel) => void
  gcpKey: string
  setGcpKey: (key: string) => void
  openAiKey: string
  setOpenAiKey: (key: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePanel, setActivePanel] = useState<AppPanel>('home')
  const [gcpKey, setGcpKey] = useState('')
  const [openAiKey, setOpenAiKey] = useState('')

  return (
    <AppContext.Provider value={{ activePanel, setActivePanel, gcpKey, setGcpKey, openAiKey, setOpenAiKey }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('AppContext must be used within AppProvider')
  return ctx
}
