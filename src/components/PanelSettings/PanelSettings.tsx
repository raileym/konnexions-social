import React, { useEffect, useRef } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { useSettingsPanel } from '@hooks/useSettingsPanel';
import { useThemeContext } from '@context/ThemeContext/ThemeContext';
import { SCREEN } from '@cknTypes/constants';
// import { COLOR_PALETTE } from '@cknTypes/constants';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

const SETTINGS_PANEL_WIDTH_PERCENT = 'w-40'     // could be 'w-60', 'w-80', etc.
const SETTINGS_PANEL_TRANSLATE_X = 'translate-x-60' // must match the right offset

const PanelSettings: React.FC = () => {
  const PanelSettingsRef = useRef<HTMLDivElement>(null);
  
  const { screenState } = useAppContext()
  const { theme, setTheme } = useThemeContext()
 
  const { isSettingsOpen, closeSettings } = useSettingsPanel()

  const translateX = isSettingsOpen ? SETTINGS_PANEL_TRANSLATE_X : 'translate-x-full'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // cXonsole.log('Click detected, checking if outside Settings Panel ...')
      
      if (
        PanelSettingsRef.current &&
        !PanelSettingsRef.current.contains(event.target as Node)
      ) {
        // cXonsole.log('Click is outside Settings Panel, closing Settings Panel')
        
        // Don't interfere with the event - let it complete naturally
        // Close panel on next tick
        requestAnimationFrame(() => {
          closeSettings();
        });
      } else {
        // cXonsole.log('Click is inside Settings Panel or ref not available')
      }
    }

    if (isSettingsOpen) {
      // cXonsole.log('Adding listener for click outside Settings Panel')
      
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, { 
          capture: false // Listen in bubbling phase, after other handlers
        });
      }, 150); // Slightly longer delay

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
        // cXonsole.log('Removing listener for click outside Settings Panel')
      };
    }
  }, [isSettingsOpen, closeSettings]);

  const headline = (
    <div className="flex flex-column">
      <div className='pa0 ma0'>
      Set your preferences here in regards to whether you are using a local Text-To-Speech (TTS) service or a cloud-based TTS service. Also, you may set your cost metrics here to help you understand rate of usage and potential costs for using cloud-based services, e.g., Google TTS Service or OpenAI's GenAI Service.
      </div>

      <div className="f2 b">{theme}</div>
      <button tabIndex={screenState[SCREEN.SETTINGS] ? 0 : -1} aria-disabled={!screenState[SCREEN.SETTINGS]} className="mv3" onClick={() => {setTheme('Midnight Sand')}}>Select MIDNIGHT SAND</button>
      <button tabIndex={screenState[SCREEN.SETTINGS] ? 0 : -1} aria-disabled={!screenState[SCREEN.SETTINGS]} className="mv3" onClick={() => {setTheme('Dunkin')}}>Select DUNKIN</button>
      <button tabIndex={screenState[SCREEN.SETTINGS] ? 0 : -1} aria-disabled={!screenState[SCREEN.SETTINGS]} className="mv3" onClick={() => {setTheme('McDonalds')}}>Select MCDONALDS</button>
      <button tabIndex={screenState[SCREEN.SETTINGS] ? 0 : -1} aria-disabled={!screenState[SCREEN.SETTINGS]} className="mv3" onClick={() => {setTheme('Starbucks')}}>Select STARBUCKS</button>
      <button tabIndex={screenState[SCREEN.SETTINGS] ? 0 : -1} aria-disabled={!screenState[SCREEN.SETTINGS]} className="mv3" onClick={() => {setTheme('Ocean View')}}>Select Theme OCEAN VIEW</button>
    </div>
  )

  return (
    <div
      ref={PanelSettingsRef}
      className={`panel-right-short panel-settings pt5 bl b--moon-gray bw1 z-2 absolute top-0 left-10 w-90 h-100 bg-light-gray transition-transform ${translateX}`}
    >
      <div tabIndex={screenState[SCREEN.SETTINGS] ? 0 : -1} aria-disabled={screenState[SCREEN.SETTINGS]} className="h-100 w-100 overflow-y-auto">
        <div className={`pa4 ${SETTINGS_PANEL_WIDTH_PERCENT} mb5`}>
          <div className="f3 tc pt5 b background w-100X">Settings Panel</div>
          <h2 className="f5 pa3 mt5">{headline}</h2>
          <p className="pl3">This panel slides in and out correctly based on context.</p>
          <div style={{height: '100em'}} className="bg-blue" />
        </div>
      </div>
    </div>
  )
}

export default PanelSettings