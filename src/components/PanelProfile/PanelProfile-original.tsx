import {
  ACTIVE_PANEL,
  PROFILE_PANEL_TRANSLATE_X,
  PROFILE_PANEL_WIDTH_PERCENT,
} from '@cknTypes/constants'
import PanelProfileComponents from '@components/PanelProfile/PanelProfileComponents'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'
import { useEffect, useRef, useState } from 'react'

const PanelProfile = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [translateX, setTranslateX] = useState<string>('translate-x-full')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { registerPanel, unregisterPanel } = usePanelManager()

  const openPanel = () => {
    setIsOpen(true)
    setTranslateX(PROFILE_PANEL_TRANSLATE_X)
  }
  
  const closePanel = () => {
    setIsOpen(false)
    setTranslateX('translate-x-full')
  }

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closePanel()
      }
    }

    document.addEventListener('click', handleClickOutside, { capture: true })

    return () => {
      document.removeEventListener('click', handleClickOutside, { capture: true })
    }
  }, [isOpen])

  useEffect(() => {
    registerPanel(ACTIVE_PANEL.PROFILE, {
      open: ()  => openPanel(),
      close: () => closePanel(),
      isOpen
    })

    return () => {
      unregisterPanel(ACTIVE_PANEL.PROFILE)
    }
  }, [isOpen, registerPanel, unregisterPanel])

  return (
    <div
      ref={ref}
      className={`panel-right-short panel-profile absolute bl b--background bw1 z-3 top-0 left-10 w-90 h-100 pt5 transition-transform ${translateX}`}
    >
      <div tabIndex={-1} aria-disabled={!isOpen} className="four h-100 w-100 overflow-y-auto">
        <div className={`pa4X ${PROFILE_PANEL_WIDTH_PERCENT} mb5`}>
          <PanelProfileComponents />
        </div>
      </div>
    </div>
  )
}

export default PanelProfile
