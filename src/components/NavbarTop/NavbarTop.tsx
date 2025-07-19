// src/components/NavbarTop.tsx
import React from 'react'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { faBars, faGear, faUser } from '@fortawesome/free-solid-svg-icons'   

import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { APP_PANEL, MDX_PAGE } from '@cknTypes/constants'
import { useAppContext } from '@context/AppContext/AppContext'
import { useMenuPanel } from '@hooks/useMenuPanel'
import { useHelpPanel } from '@hooks/useHelpPanel'
import { useProfilePanel } from '@hooks/useProfilePanel'
import { useNavigate } from 'react-router-dom'
import MyKonnexionsSlash from '@components/MyKonnexionsSlash/MyKonnexionsSlash'
import MyKonnexionsIcon from '@components/MyKonnexionsIcon/MyKonnexionsIcon'
import MyKonnexionsTitle from '@components/MyKonnexionsTitle/MyKonnexionsTitle'

const NavbarTop: React.FC = () => {
  const { switchPanel } = usePanel()
  const { setMdxPage, setActivePanel, setIsMenuOpen } = useAppContext()
  const { closeMenu } = useMenuPanel()
  const { closeHelp } = useHelpPanel()
  const { closeProfile } = useProfilePanel()
  const navigate = useNavigate()
  
  // const alwaysTrue = false

  const navigateTo = (route: string) => {
    navigate(`/${route.toLowerCase()}`)
    setActivePanel(APP_PANEL.MDX)
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed h3X top-0 shadow-3 left-0 w-100 bg-white flex items-center justify-between ph2 pt2 pt2-kx-s pt3-kx-m pb2 pb2-kx-s pb3-kx-m z-999">
      <div className="w-100 flex flex-column">
        <div className="w-100 flex flex-row justify-between">
          <div 
            className="flex justify-start flex-row pointer" 
            onClick={() => {
              console.log('Clicking on upper left icon set.')
              closeMenu()
              closeHelp()
              closeProfile()
              switchPanel(APP_PANEL.MDX)              
              setMdxPage(MDX_PAGE.WELCOME)
              navigateTo('Welcome')
            }}
          >
            <div className="dn-kx-s dib-kx-m">
              <MyKonnexionsIcon />
            </div>

            <div className="dnX flexX items-center flex-ks-vvs flex-kx-s flex-kx-m">
              <div className="silver f1 b lh-title flex flex-column">
                <div className="flex flex-row f1 f1-vsX f1-mX f1-nsX" style={{lineHeight: '1.5em'}}>
                  <div className="dn dn-kx-s dib-kx-m">
                    <MyKonnexionsTitle color='moon-gray'/>
                  </div>
                  <div className="db db-kx-s dn-kx-m">
                    <MyKonnexionsIcon forwardColor={'silver'} slashColor={'brand'} backgroundColor={'transparent'}/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="baX">
            <Button buttonClass='bn w-50X mh3 brand dn dn-m dib-l' isActive={false} switchFn={switchPanel} panel={APP_PANEL.SETTINGS} icon={faGear} title='Settings'/>
            {/* <Button buttonClass='bn w-50X mh3 brand dn dn-m db-l' isActive={false} switchFn={switchPanel} panel={APP_PANEL.MDX} icon={faHome} title='Home' onClick={() => setMdxPage(MDX_PAGE.WELCOME)}/> */}
            <Button buttonClass='bn w-50X mh3 brand dn dn-m dib-l' isActive={false} switchFn={switchPanel} panel={APP_PANEL.PROFILE} icon={faUser} title='Profile' />
            <Button buttonClass='bn o-20X mh3 brand dn dn-m dib-l' isActive={false} switchFn={switchPanel} panel="help" icon={faCircleQuestion} title="Help" />
            <Button titleClass='dn dn-m db-l' buttonClass='bn b--black o-20X ml2 mr3 brand' isActive={false} switchFn={switchPanel} panel={APP_PANEL.MENU} icon={faBars} title='Menu' />
          </div>
        </div>
      </div>
    </nav>

  )
}

export default NavbarTop
