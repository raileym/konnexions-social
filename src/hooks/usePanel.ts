// src/hooks/usePanel.ts
import { useAppContext } from '@context/AppContext/AppContext'
import { type ActivePanel, type ActiveHome } from '@cknTypes/types'
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

  const switchPanel = (newPanel: ActivePanel) => {
    if (isTransitioning) return

    setIsTransitioning(true)

    // cXonsole.log('new active panel', newPanel)
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
        setActivePanel(newPanel)
        setHelpPanel(newPanel)
        // setActivePanel(activeHome)
        // setTimeout(() => {
        //   setActivePanel(newPanel)
        //   setHelpPanel(newPanel)
        // }, 600)
      }

      setTimeout(() => {
        setIsTransitioning(false)
      }, 600)
    }
  }

  const switchHome = (newHome: ActiveHome) => {
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
