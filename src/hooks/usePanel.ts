// src/hooks/usePanel.ts
import { useAppContext } from '../context/AppContext'
import { type AppPanel, type AppHome } from '../../shared/types'
import { useHelpPanel } from './useHelpPanel'

export const usePanel = () => {
  const {
    activePanel,
    setActivePanel,
    activeHome,
    setActiveHome,
    setHelpPanel,
    isTransitioning,
    setIsTransitioning,
    isHelpOpen
  } = useAppContext()

  const { closeHelp } = useHelpPanel()

  const switchPanel = (newPanel: AppPanel) => {
    if (isTransitioning) return

    setIsTransitioning(true)

    if (isHelpOpen) {
      closeHelp()

      setTimeout(() => {
        if (newPanel === activePanel) {
          setActivePanel(activeHome)
          setHelpPanel(activeHome)
        } else {
          setActivePanel(activeHome)
          setTimeout(() => {
            setActivePanel(newPanel)
            setHelpPanel(newPanel)
          }, 600)
        }

        setTimeout(() => {
          setIsTransitioning(false)
        }, 600)
      }, 1000)
    } else {
      if (newPanel === activePanel) {
        setActivePanel(activeHome)
        setHelpPanel(activeHome)
      } else {
        setActivePanel(activeHome)
        setTimeout(() => {
          setActivePanel(newPanel)
          setHelpPanel(newPanel)
        }, 600)
      }

      setTimeout(() => {
        setIsTransitioning(false)
      }, 600)
    }
  }

  const switchHome = (newHome: AppHome) => {
    if (isTransitioning) return

    setIsTransitioning(true)

    // If help is open, close first
    if (isHelpOpen) {
      closeHelp()

      setTimeout(() => {
        if (newHome === activeHome) {
          // Already active
          setTimeout(() => setIsTransitioning(false), 600)
        } else {
          setActivePanel(newHome)
          setActiveHome(newHome)
          setTimeout(() => setIsTransitioning(false), 600)
        }
      }, 1000)
    } else {
      if (newHome === activeHome) {
        setTimeout(() => setIsTransitioning(false), 600)
      } else {
        setActivePanel(newHome)
        setActiveHome(newHome)
        setTimeout(() => setIsTransitioning(false), 600)
      }
    }
  }

  return {
    switchPanel,
    switchHome,
  }
}
