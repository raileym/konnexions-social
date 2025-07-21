import { useEffect, useRef } from 'react'
import { PROFILE_PANEL_TRANSLATE_X, PROFILE_PANEL_WIDTH_PERCENT } from '@cknTypes/constants'
import PanelProfileComponents from '@components/PanelProfile/PanelProfileComponents'
import { useAppContext } from '@context/AppContext/AppContext'
import { useProfilePanel } from '@hooks/useProfilePanel'

const PanelProfile = () => {
  const PanelProfileRef = useRef<HTMLDivElement>(null);
  
  const { isProfileOpen } = useAppContext()
  const { closeProfile } = useProfilePanel()

  const translateX = isProfileOpen ? PROFILE_PANEL_TRANSLATE_X : 'translate-x-full'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // cXonsole.log('Click detected, checking if outside Profile Panel ...')
      
      if (
        PanelProfileRef.current &&
        !PanelProfileRef.current.contains(event.target as Node)
      ) {
        // cXonsole.log('Click is outside Profile Panel, closing Profile Panel')
        
        // Don't interfere with the event - let it complete naturally
        // Close panel on next tick
        requestAnimationFrame(() => {
          closeProfile();
        });
      } else {
        // cXonsole.log('Click is inside Profile Panel or ref not available')
      }
    }

    if (isProfileOpen) {
      // cXonsole.log('Adding listener for click outside Profile Panel')
      
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, { 
          capture: false // Listen in bubbling phase, after other handlers
        });
      }, 150); // Slightly longer delay

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
        // cXonsole.log('Removing listener for click outside Profile Panel')
      };
    }
  }, [isProfileOpen, closeProfile]);

  return (
    <>
      <div 
        ref={PanelProfileRef}
        className={`panel-right-short panel-profile absolute bl b--black bw1 z-3 top-0 left-10 w-90 h-100 bg-tertiary pt5 white transition-transform ${translateX}`}
      >
        <div className="h-100 w-100 overflow-y-auto">
          <div className={`pa4X ${PROFILE_PANEL_WIDTH_PERCENT} mb5`}>
            <PanelProfileComponents />
          </div>
        </div>
      </div>      
    </>
  )
}

export default PanelProfile