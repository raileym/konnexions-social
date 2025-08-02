import { usePanelBase } from '@hooks/usePanelBase'
import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL, TABINDEX_NEVER } from '@cknTypes/constants'

const HELP_PANEL_WIDTH_PERCENT = 'w-40'
const HELP_PANEL_TRANSLATE_X = 'translate-x-60'

const PanelHelp = () => {

  const { helpPanel } = useAppContext()

  const { ref, tabIndex, ariaDisabled, ariaHidden, firstFocusDivRef, translateX, isOpen, isMounted } = usePanelBase({
    panelName: ACTIVE_PANEL.HELP,
    translateXOpen: HELP_PANEL_TRANSLATE_X,
    translateXClose: 'translate-x-full'
  })

  return (
    <div
      className={`
        panel-help panel-right-short absolute bl b--background bw1 z-3 top-0 left-10 w-90 h-100 bg-green on-background pt5 transition-transform
        ${translateX}
        ${isOpen ? 'panel-visible' : 'panel-hiddenX'}
        ${!isMounted ? 'dn' : ''}`}
      ref={ref}
      aria-hidden={ariaHidden}
      aria-disabled={ariaDisabled}
      tabIndex={tabIndex}
      inert={!isOpen}
      // style={{top: '4rem'}}
    >
      <div tabIndex={TABINDEX_NEVER} className="ba b--red bw2 two h-100 w-100 overflow-y-auto pt4X">
        <div className={`pa4 ${HELP_PANEL_WIDTH_PERCENT} mb5X`}>
          <h2 className="f3 pa3 mt5">Help Panel for {helpPanel}</h2>
          <p className="pl3">This panel slides in and out correctly based on context.</p>
          <div ref={firstFocusDivRef} inert={!isOpen} tabIndex={tabIndex} aria-disabled={ariaDisabled} style={{ height: '20rem' }} className="bg-blue focus:bg-cyan" />
        </div>
      </div>
    </div>
  )
}

export default PanelHelp
