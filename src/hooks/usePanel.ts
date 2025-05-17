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
  
    closeHelp()

    if (newPanel === activePanel) {
      setIsTransitioning(true)

      setActivePanel(APP_PANEL.HOME)
      setHelpPanel(APP_PANEL.HOME)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 600)
    } else {
      setIsTransitioning(true)
    
      setActivePanel(APP_PANEL.HOME)
    
      setTimeout(() => {
        setActivePanel(newPanel)
        setHelpPanel(newPanel)
        setIsTransitioning(false)
      }, 600) // match your CSS transition duration
    }
  }

  return { switchPanel }
}
