import React, { useEffect, useRef } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { useHelpPanel } from '@hooks/useHelpPanel' // Assuming you have this hook

const HELP_PANEL_WIDTH_PERCENT = 'w-40'     // could be 'w-60', 'w-80', etc.
const HELP_PANEL_TRANSLATE_X = 'translate-x-60' // must match the right offset

const PanelHelp: React.FC = () => {
  const PanelHelpRef = useRef<HTMLDivElement>(null);
  
  const { helpPanel, isHelpOpen } = useAppContext()
  const { closeHelp } = useHelpPanel() // Assuming you have this hook with closeHelp function
  
  const translateX = isHelpOpen ? HELP_PANEL_TRANSLATE_X : 'translate-x-full'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      console.log('Click detected, checking if outside Help Panel ...')
      
      if (
        PanelHelpRef.current &&
        !PanelHelpRef.current.contains(event.target as Node)
      ) {
        console.log('Click is outside Help Panel, closing Help Panel')
        closeHelp();
      } else {
        console.log('Click is inside Help Panel or ref not available')
      }
    }

    if (isHelpOpen) {
      console.log('Adding listener for click outside Help Panel')
      // Add a small delay to prevent immediate closure if the same click that opened the help
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
        console.log('Removing listener for click outside Help Panel')
      };
    }
  }, [isHelpOpen, closeHelp]);

  return (
    <div 
      ref={PanelHelpRef}
      className={`panel-right panel-help absolute bl b--black bw1 z-3 top-0 left-10 w-90 h-100 bg-green white pt5 transition-transform ${translateX}`}
    >
      <div className="h-100 w-100 overflow-y-auto">
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