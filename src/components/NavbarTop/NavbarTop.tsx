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
    <nav className="fixed top-0 shadow-3 left-0 w-100 bg-white flex items-center justify-between ph3 pt3 pb3 z-999">
      <div className="w-100 flex flex-column">
        <div className="baX w-100 flex flex-row justify-between">
          <div 
            className="baX w-100X flex justify-start flex-row pointer" 
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
            <MyKonnexionsIcon />
            {/* <div className="baX b--silverX bw1 br4 f2 b bg-silver primary h3X w3 pa2X flex items-centerX justify-center mr3" style={{lineHeight: '2em'}}>
              <div>K</div><MyKonnexionsSlash color='white' lineHeight={2} />
            </div> */}
            <div className="flex items-center">
              <div className="silver f1 b lh-title flex flex-column">
                <div className="flex flex-row f1" style={{lineHeight: '1em'}}>
                  <div>My <span className="primary">K</span>onne</div><MyKonnexionsSlash /><div>ions</div>
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
