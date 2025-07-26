import React from 'react'
import { usePanelBase } from '@hooks/usePanelBase'
import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'

const HELP_PANEL_WIDTH_PERCENT = 'w-40'
const HELP_PANEL_TRANSLATE_X = 'translate-x-60'

const PanelHelp: React.FC = () => {
  const { helpPanel } = useAppContext()

  const { ref, isOpen, translateX } = usePanelBase(
    ACTIVE_PANEL.HELP,
    HELP_PANEL_TRANSLATE_X
  )

  return (
    <div
      ref={ref}
      className={`panel-right-short panel-help absolute bl b--background bw1 z-3 top-0 left-10 w-90 h-100 bg-green on-background pt5 transition-transform ${translateX}`}
    >
      <div className="h-100 w-100 overflow-y-auto" tabIndex={0} aria-disabled={!isOpen}>
        <div className={`pa4 ${HELP_PANEL_WIDTH_PERCENT} mb5`}>
          <h2 className="f3 pa3 mt5">Help Panel for {helpPanel}</h2>
          <p className="pl3">This panel slides in and out correctly based on context.</p>
          <div style={{ height: '100em' }} className="bg-blue" />
        </div>
      </div>
    </div>
  )
}

export default PanelHelp
