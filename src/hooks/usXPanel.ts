// src/hooks/usePanel.ts
import { useAppContext } from '@context/AppContext/AppContext'
import { type ActivePanel, type ActiveHome } from '@cknTypes/types'
import { useActivePanel } from './useActivePanel'

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

  const { closePanel } = useActivePanel()

  const switchPanel = (newPanel: ActivePanel) => {
    if (isTransitioning) return

    setIsTransitioning(true)

    // cXonsole.log('new active panel', newPanel)
    if (isHelpOpen) {
      closePanel('help')

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
        // console.log('YEP! RIGHT HERE IS THE PROBLEM.')
        // setActivePanel(activeHome)
        // setHelpPanel(activeHome)
      } else {
        // console.log('NOPE! NOT THE PROBLEM: MOVING TO', newPanel)
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
      closePanel('help')

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
