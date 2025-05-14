/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react'
import { type AppPanelValue, type AppContextType, APP_PANEL } from '../cknTypes/types/types'

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePanel, setActivePanel] = useState<AppPanelValue>(APP_PANEL.HOME)
  const [gcpKey, setGcpKey] = useState('')
  const [openAiKey, setOpenAiKey] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handlePanelSwitch = (newPanel: AppPanelValue) => {
    if (isTransitioning) return
  
    if (newPanel === activePanel) {
      setIsTransitioning(true)

      setActivePanel('home')

      setTimeout(() => {
        setIsTransitioning(false)
      }, 600)
    } else {
      setIsTransitioning(true)
    
      setActivePanel('home')
    
      setTimeout(() => {
        setActivePanel(newPanel)
        setIsTransitioning(false)
      }, 600) // match your CSS transition duration
    }
  }
  
  return (
    <AppContext.Provider value={{
      activePanel,
      setActivePanel,
      gcpKey,
      setGcpKey,
      openAiKey,
      setOpenAiKey,
      switchPanel: handlePanelSwitch
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('AppContext must be used within AppProvider')
  return ctx
}
