// src/components/NavbarTop.tsx
import React from 'react'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { faBars, faHome, faUser } from '@fortawesome/free-solid-svg-icons'   

import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { APP_PANEL } from '@cknTypes/constants'
import { useAppContext } from '@context/AppContext/AppContext'
import { useMenuPanel } from '@hooks/useMenuPanel'
import { useHelpPanel } from '@hooks/useHelpPanel'
import { useProfilePanel } from '@hooks/useProfilePanel'

const NavbarTop: React.FC = () => {
  const { switchPanel } = usePanel()
  const { setMdxPage } = useAppContext()
  const { closeMenu } = useMenuPanel()
  const { closeHelp } = useHelpPanel()
  const { closeProfile } = useProfilePanel()
  
  // const alwaysTrue = false

  return (
    <nav className="fixed top-0 shadow-3 left-0 w-100 bg-white flex items-center justify-between ph3 pv2 z-999">
      <div className="w-100 flex flex-column">
        <div className="baX w-100 flex flex-row justify-between">
          <div 
            className="ba w-100X flex justify-start flex-row" 
            onClick={() => {
              console.log('Clicking on upper left icon set.')
              closeMenu()
              closeHelp()
              closeProfile()
              setMdxPage('Welcome')
              switchPanel(APP_PANEL.MDX)              
            }}
          >
            <div className="ml3 bg-brand mr4 baX b--white bw2">
              <img
                src="/logo-blue-transparent-on-white-173x173.png"
                alt="CKN logo"
                className="db aspect-ratio aspect-ratio--1x mv2X baX h3X"
                style={{height: '5em'}}
              />
            </div>
            <div className="flex items-center">
              <div className="black-30 f3 b lh-title flex flex-column">
                <div className="f2"><span className="brand">CK</span>Ո Social</div>
                <div className="black-20 f4 dn-m">Let's connect - Promoting ways to connect socially</div>
              </div>
            </div>
          </div>

          <div className="baX">
            <Button buttonClass='bn w-50X mh2 brand dn-m' isActive={false} switchFn={switchPanel} panel={APP_PANEL.MDX} icon={faHome} title='Home' onClick={() => setMdxPage('Welcome')}/>
            <Button buttonClass='bn w-50X mh2 brand dn-m' isActive={false} switchFn={switchPanel} panel={APP_PANEL.PROFILE} icon={faUser} title='Profile' />
            <Button buttonClass='bn o-20X mh2 brand dn-m' isActive={false} switchFn={switchPanel} panel="help" icon={faCircleQuestion} title="Help" />
            <Button buttonClass='bn b--black o-20X ml2 mr3 brand' isActive={false} switchFn={switchPanel} panel={APP_PANEL.MENU} icon={faBars} title='Menu' />
          </div>
        </div>
      </div>
    </nav>

  )
}

export default NavbarTop
