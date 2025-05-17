// src/hooks/usePanel.ts
import { useAppContext } from '../context/AppContext'
import { APP_PANEL, type AppPanelValue } from '../cknTypes/types/types'
import { useHelpPanel } from './useHelpPanel'

export const usePanel = () => {
  const {
    activePanel,
    setActivePanel,
    setHelpPanel,
    isTransitioning,
    setIsTransitioning,
  } = useAppContext()

  const { closeHelp } = useHelpPanel()
  
  const switchPanel = (newPanel: AppPanelValue) => {
    if (isTransitioning) return
  
    setIsTransitioning(true)
  
    // 1. Close Help Panel first (if open)
    closeHelp()
  
    // 2. Then wait a bit before continuing transition
    setTimeout(() => {
      if (newPanel === activePanel) {
        setActivePanel(APP_PANEL.HOME)
        setHelpPanel(APP_PANEL.HOME)
      } else {
        setActivePanel(APP_PANEL.HOME)
        setTimeout(() => {
          setActivePanel(newPanel)
          setHelpPanel(newPanel)
        }, 600) // Main panel transition after Help is fully closed
      }
  
      setTimeout(() => {
        setIsTransitioning(false)
      }, 600)
    }, 1000) // Delay to let Help visually exit first
  }  

  return { switchPanel }
}
