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
    <nav className="fixed top-0 shadow-3 left-0 w-100 bg-white flex items-center justify-between ph2 pt2 pt2-kx-45 pt3-kx-60 pb2 pb2-kx-45 pb3-kx-60 z-999">
      <div className="w-100 flex flex-column">
        <div className="w-100 flex flex-row justify-between">
          <div 
            className="flex justify-start flex-row pointer lh-4-kx" 
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
            <div className="mr3 width-3-kx height-3-kx items-center flex-ks-vvs flex-kx-45 flex-kx-60 lh-4-kx">
              <div className="silver b flex flex-column">
                <div className="flex flex-row f3">
                  <div className="dn relative width-4-kx height-3-kx dn-kx-45 dib-kx-n45">
                    <div className="absolute top-0 left-0 bg-black mt2 width-3-kx br3 height-3-kx"></div>
                    <div className="konnexions-title absolute top-0 left-0 ml2">
                      <MyKonnexionsTitle shorten={true} color='white' fontSizeInRem={1}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="items-center flex-ks-vvs flex-kx-45 flex-kx-60 lh-4-kx">
              <div className="silver f1 b flex flex-column">
                <div className="flex flex-row f1">
                  <div className="dn dn-kx-45 dib-kx-n45">
                    <MyKonnexionsTitle color='moon-gray' fontSizeInRem={3}/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <Button buttonClass='bn mh3 brand dn dn-m dib-l' isActive={false} switchFn={switchPanel} panel={APP_PANEL.SETTINGS} icon={faGear} title='Settings'/>
            {/* <Button buttonClass='bn mh3 brand dn dn-m db-l' isActive={false} switchFn={switchPanel} panel={APP_PANEL.MDX} icon={faHome} title='Home' onClick={() => setMdxPage(MDX_PAGE.WELCOME)}/> */}
            <Button buttonClass='bn mh3 brand dn dn-m dib-l' isActive={false} switchFn={switchPanel} panel={APP_PANEL.PROFILE} icon={faUser} title='Profile' />
            <Button buttonClass='bn mh3 brand dn dn-m dib-l' isActive={false} switchFn={switchPanel} panel="help" icon={faCircleQuestion} title="Help" />
            <Button titleClass='db' buttonClass='bn b--black ml2 mr3 brand' isActive={false} switchFn={switchPanel} panel={APP_PANEL.MENU} icon={faBars} title='Menu' />
          </div>
        </div>
      </div>
    </nav>

  )
}

export default NavbarTop
