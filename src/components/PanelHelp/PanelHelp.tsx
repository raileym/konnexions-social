import React, { useRef, useState } from 'react'
import { usePanelBase } from '@hooks/usePanelBase'
import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'

const HELP_PANEL_WIDTH_PERCENT = 'w-40'
const HELP_PANEL_TRANSLATE_X = 'translate-x-60'

const PanelHelp: React.FC = () => {
  const firstFocusRef = useRef<HTMLDivElement | null>(null)
  const [tabIndex, setTabIndex] = useState(-1)

  const { helpPanel } = useAppContext()

  const { ref, isOpen, translateX } = usePanelBase(
    ACTIVE_PANEL.HELP,
    HELP_PANEL_TRANSLATE_X,
    {
      onOpen: () => {
        setTabIndex(0)
        setTimeout(() => {
          firstFocusRef.current?.focus()
        }, 250)
      },
      onClose: () => {
        setTabIndex(-1)
      }
    }
  )

  return (
    <div
      ref={ref}
      className={`panel-right-short panel-help absolute bl b--background bw1 z-3 top-0 left-10 w-90 h-100 bg-green on-background pt5 transition-transform ${translateX}`}
    >
      <div tabIndex={-1} className="two h-100 w-100 overflow-y-auto">
        <div className={`pa4 ${HELP_PANEL_WIDTH_PERCENT} mb5`}>
          <h2 className="f3 pa3 mt5">Help Panel for {helpPanel}</h2>
          <p className="pl3">This panel slides in and out correctly based on context.</p>
          <div ref={firstFocusRef} tabIndex={tabIndex} style={{ height: '100em' }} className="bg-blue focus-visible:bg-red focus:bg-cyan" />
        </div>
      </div>
    </div>
  )
}

export default PanelHelp
