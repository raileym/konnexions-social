import { useEffect, useRef } from 'react'
import { TERMS_AND_CONDITIONS_PANEL_TRANSLATE_X, TERMS_AND_CONDITIONS_PANEL_WIDTH_PERCENT } from '@cknTypes/constants'
import PanelTermsAndConditionsComponents from '@components/PanelTermsAndConditions/PanelTermsAndConditionsComponents'
import { useAppContext } from '@context/AppContext/AppContext'
import { useTermsAndConditionsPanel } from '@hooks/useTermsAndConditionsPanel'

const PanelTermsAndConditions = () => {
  const PanelTermsAndConditionsRef = useRef<HTMLDivElement>(null);
  
  const { isTermsAndConditionsOpen } = useAppContext()
  const { closeTermsAndConditions } = useTermsAndConditionsPanel()

  const translateX = isTermsAndConditionsOpen ? TERMS_AND_CONDITIONS_PANEL_TRANSLATE_X : 'translate-x-full'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      console.log('Click detected, checking if outside TermsAndConditions Panel ...')
      
      if (
        PanelTermsAndConditionsRef.current &&
        !PanelTermsAndConditionsRef.current.contains(event.target as Node)
      ) {
        console.log('Click is outside TermsAndConditions Panel, closing TermsAndConditions Panel')
        
        // Don't interfere with the event - let it complete naturally
        // Close panel on next tick
        requestAnimationFrame(() => {
          closeTermsAndConditions();
        });
      } else {
        console.log('Click is inside TermsAndConditions Panel or ref not available')
      }
    }

    if (isTermsAndConditionsOpen) {
      console.log('Adding listener for click outside TermsAndConditions Panel')
      
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, { 
          capture: false // Listen in bubbling phase, after other handlers
        });
      }, 150); // Slightly longer delay

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
        console.log('Removing listener for click outside TermsAndConditions Panel')
      };
    }
  }, [isTermsAndConditionsOpen, closeTermsAndConditions]);

  return (
    <>
      <div 
        ref={PanelTermsAndConditionsRef}
        className={`panel-right panel-profile absolute bl b--black bw1 z-3 top-0 left-10 w-90 h-100 bg-yellow pt5 white transition-transform ${translateX}`}
      >
        <div className="h-100 w-100 overflow-y-auto">
          <div className={`pa4X ${TERMS_AND_CONDITIONS_PANEL_WIDTH_PERCENT} mb5`}>
            <PanelTermsAndConditionsComponents />
          </div>
        </div>
      </div>      
    </>
  )
}

export default PanelTermsAndConditions