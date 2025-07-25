import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { useThemeContext } from '@context/ThemeContext/ThemeContext';
import { useActivePanel } from '@hooks/useActivePanel';

const SETTINGS_PANEL_WIDTH_PERCENT = 'w-40'     // could be 'w-60', 'w-80', etc.
const SETTINGS_PANEL_TRANSLATE_X = 'translate-x-60' // must match the right offset

const PanelSettings: React.FC = () => {
  const firstFocusRef = useRef<HTMLButtonElement | null>(null)
  const [settingsPanelTabIndex, setSettingsPanelTabIndex] = useState<number>(-1)

  const { isSettingsOpen } = useAppContext()
  const { theme, setTheme } = useThemeContext()
 
  const { refs } = useActivePanel()

  const translateX = isSettingsOpen ? SETTINGS_PANEL_TRANSLATE_X : 'translate-x-full'

  const headline = (
    <div className="flex flex-column">
      <div className='pa0 ma0'>
      Set your preferences here in regards to whether you are using a local Text-To-Speech (TTS) service or a cloud-based TTS service. Also, you may set your cost metrics here to help you understand rate of usage and potential costs for using cloud-based services, e.g., Google TTS Service or OpenAI's GenAI Service.
      </div>

      <div className="f2 b">{theme}</div>
      <button ref={firstFocusRef} tabIndex={settingsPanelTabIndex} aria-disabled={settingsPanelTabIndex !== 0} className="mv3" onClick={() => {setTheme('Midnight Sand')}}>Select MIDNIGHT SAND</button>
      <button tabIndex={settingsPanelTabIndex} aria-disabled={settingsPanelTabIndex !== 0} className="mv3" onClick={() => {setTheme('Dunkin')}}>Select DUNKIN</button>
      <button tabIndex={settingsPanelTabIndex} aria-disabled={settingsPanelTabIndex !== 0} className="mv3" onClick={() => {setTheme('McDonalds')}}>Select MCDONALDS</button>
      <button tabIndex={settingsPanelTabIndex} aria-disabled={settingsPanelTabIndex !== 0} className="mv3" onClick={() => {setTheme('Starbucks')}}>Select STARBUCKS</button>
      <button tabIndex={settingsPanelTabIndex} aria-disabled={settingsPanelTabIndex !== 0} className="mv3" onClick={() => {setTheme('Ocean View')}}>Select Theme OCEAN VIEW</button>
    </div>
  )

  useEffect(() => {
    if (isSettingsOpen && firstFocusRef.current) {
      const timeoutId = setTimeout(() => {
        firstFocusRef.current?.focus()
        setSettingsPanelTabIndex(0)
        console.log('✅ Delayed focus on profile first button')
        console.log('settingsPanelTabIndex', settingsPanelTabIndex)
      }, 250)

      return () => clearTimeout(timeoutId)
    } else {
      setSettingsPanelTabIndex(-1)
    }
  }, [isSettingsOpen, firstFocusRef, settingsPanelTabIndex])
      
  
  return (
    <div
      ref={refs.settings}
      className={`panel-right-short panel-settings pt5 bl b--moon-gray bw1 z-2 absolute top-0 left-10 w-90 h-100 bg-light-gray transition-transform ${translateX}`}
    >
      <div tabIndex={settingsPanelTabIndex} aria-disabled={settingsPanelTabIndex !== 0} className="h-100 w-100 overflow-y-auto">
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