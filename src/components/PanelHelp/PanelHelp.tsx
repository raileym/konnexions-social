import React, { useEffect, useRef } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { SCREEN } from '@cknTypes/constants'
import { useActivePanel } from '@hooks/useActivePanel'

const HELP_PANEL_WIDTH_PERCENT = 'w-40'
const HELP_PANEL_TRANSLATE_X = 'translate-x-60'

const PanelHelp: React.FC = () => {
  const PanelHelpRef = useRef<HTMLDivElement>(null);
  
  const { isHelpOpen, helpPanel, screenState } = useAppContext()
  const { closePanel, refs } = useActivePanel()
  
  const translateX = isHelpOpen ? HELP_PANEL_TRANSLATE_X : 'translate-x-full'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // cXonsole.log('Click detected, checking if outside Help Panel ...')
      
      if (
        PanelHelpRef.current &&
        !PanelHelpRef.current.contains(event.target as Node)
      ) {
        // cXonsole.log('Click is outside Help Panel, closing Help Panel')
        
        // Don't interfere with the event - let it complete naturally
        // Close panel on next tick
        requestAnimationFrame(() => {
          closePanel('help');
        });
      } else {
        // cXonsole.log('Click is inside Help Panel or ref not available')
      }
    }

    if (isHelpOpen) {
      // cXonsole.log('Adding listener for click outside Help Panel')
      
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, { 
          capture: false // Listen in bubbling phase, after other handlers
        });
      }, 150); // Slightly longer delay

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
        // cXonsole.log('Removing listener for click outside Help Panel')
      };
    }
  }, [isHelpOpen, closePanel]);

  return (
    <div 
      ref={refs.help}
      className={`panel-right-short panel-help absolute bl b--background bw1 z-3 top-0 left-10 w-90 h-100 bg-green on-background pt5 transition-transform ${translateX}`}
    >
      <div className="h-100 w-100 overflow-y-auto" tabIndex={screenState[SCREEN.HELP] ? 0 : -1} aria-disabled={!screenState[SCREEN.HELP]}>
        <div className={`pa4 ${HELP_PANEL_WIDTH_PERCENT} mb5`}>
          <h2 className="f3 pa3 mt5">Help Panel for {helpPanel}</h2>
          <p className="pl3">This panel slides in and out correctly based on context.</p>
          <div style={{height: '100em'}} className="bg-blue" />
        </div>
      </div>
    </div>
  )  
}

export default PanelHelp