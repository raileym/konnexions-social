// src/components/NavbarTop.tsx
import React from 'react'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'   

import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
// import CutoffToggle from '@components/CutoffToggle'
import ShowMaxCount from '@components/ShowMaxCount'
import { APP_PANEL } from '@cknTypes/constants'
import { useAppContext } from '@context/AppContext/AppContext'

const NavbarTop: React.FC = () => {
  const { switchPanel } = usePanel()
  const { activePanel, isUserValidated } = useAppContext()

  const alwaysTrue = false

  return (
    <nav className="fixed top-0 shadow-3 left-0 w-100 bg-white flex items-center justify-between ph3 pv2 z-999">
      <div className="w-100 flex flex-column">
      <div className="w-100 flex flex-row justify-between">



        <div className="baX w-100X flex justify-start flex-row">
            <div className="ml3 bg-brand mr4 ba b--white bw2">
              <img
                src="/logo-blue-transparent-on-white-173x173.png"
                alt="CKN logo"
                className="db aspect-ratio aspect-ratio--1x mv2X baX h3"
                // style={{height: '4.5em'}}
              />
            </div>
            <div className="black-20 f2 b lh-title flex items-center">
              <div><span className="brand">CK</span>Ո Social</div>
            </div>
            {/* <div className="black-30 f3 b lh-title">
              <div><span className="brand">CK</span>Ո Series on Joy</div>
              <div className="black-20 f5">Joy of Language - Spanish</div>
            </div> */}
          </div>

          {
            (activePanel == APP_PANEL.BASIC || activePanel == APP_PANEL.BASIC_REVIEW || alwaysTrue) && (
              <div className="flex flex-row dn-m">        
                {/* <CutoffToggle /> */}
                <ShowMaxCount />
              </div>
            )
          }

          <div className="baX">
            <Button buttonClass='bn w-50X mh3X brand' isActive={activePanel === APP_PANEL.REQUEST_EMAIL} switchFn={switchPanel} panel={APP_PANEL.REQUEST_EMAIL} icon={faUser} title='Sign-In' />
            <Button buttonClass='bn o-20X mh2 brand' isActive={false} switchFn={switchPanel} panel="help" icon={faCircleQuestion} title="Help" />
            <Button buttonClass='bn o-20X mr3 brand' isActive={activePanel === APP_PANEL.MENU} switchFn={switchPanel} panel={APP_PANEL.MENU} icon={faBars} title='Menu' />
          </div>
        </div>
        <div className="mt2 flex justify-center flex-row">
          <div className="f4 mh3 mv1 moon-gray b">One</div>
          <div className="f4 mh3 mv1 moon-gray b">Two</div>
          <div className="f4 mh3 mv1 moon-gray b">Three</div>
          <div className="f4 mh3 mv1 moon-gray b">Four</div>
          <div className="f4 mh3 mv1 moon-gray b">Five</div>
        </div>
      </div>
    </nav>

  )
}

export default NavbarTop
