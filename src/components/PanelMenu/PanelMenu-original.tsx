import React, { useEffect, useRef } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { APP_PANEL, MENU_PANEL_TRANSLATE_X, MENU_PANEL_WIDTH_PERCENT } from '@cknTypes/constants'
import { useNavigate } from 'react-router-dom'
import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { faCircleQuestion, faGear, faHome, faUser } from '@fortawesome/free-solid-svg-icons'   
import { useMenuPanel } from '@hooks/useMenuPanel'

const PanelMenu: React.FC = () => {
  const PanelMenuRef = useRef<HTMLDivElement>(null);

  const { isMenuOpen, setActivePanel, setIsMenuOpen, setMdxPage } = useAppContext()
  const { switchPanel } = usePanel()
  const { closeMenu } = useMenuPanel()
  

  const translateX = isMenuOpen ? MENU_PANEL_TRANSLATE_X : 'translate-x-full'

  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        PanelMenuRef.current &&
        !PanelMenuRef.current.contains(event.target as Node)
      ) {
        closeMenu(); // Close the panel
      }
    }

    if (isMenuOpen) {
      console.log('adding listener.')
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeMenu, isMenuOpen]);

  const navigateTo = (route: string) => {
    navigate(`/${route.toLowerCase()}`) // e.g. 'Welcome' → '/welcome'
    setActivePanel(APP_PANEL.MDX)
    setIsMenuOpen(false)
  }

  return (
    <div className={`panel-right panel-help absolute bl b--black bw1 z-3 top-0 left-10 w-90 h-100 bg-red white pt5 transition-transform ${translateX}`}>
      <div className="h-100 w-100 overflow-y-auto">
        <div className={`pa4 ${MENU_PANEL_WIDTH_PERCENT} mb5`}>
          <h2 className="f3 pa3 mt5 tc">Menu Panel</h2>
          <div className="bg-whiteX baX flex justify-between">
            <Button titleClass={'white'} iconClass={'white bg-greenX mh0 ph0'} buttonClass='bn w-50X width-3 mh0 ph0 brand dn-mX bg-transparent' isActive={false} switchFn={switchPanel} panel={APP_PANEL.MDX} icon={faHome} title='Home' onClick={() => setMdxPage('Welcome')}/>
            <Button titleClass={'white'} iconClass={'white bg-greenX mh0 ph0'} buttonClass='bn w-50X width-4 mh0 ph0 brand dn-mX bg-transparent' isActive={false} switchFn={switchPanel} panel={APP_PANEL.PROFILE} icon={faGear} title='Settings' />
            <Button titleClass={'white'} iconClass={'white bg-greenX mh0 ph0'} buttonClass='bn w-50X width-3 mh0 ph0 brand dn-mX bg-transparent' isActive={false} switchFn={switchPanel} panel={APP_PANEL.PROFILE} icon={faUser} title='Profile' />
            <Button titleClass={'white'} iconClass={'white bg-greenX mh0 ph0'} buttonClass='bn o-20X width-3 mh0 ph0 brand dn-mX bg-transparent' isActive={false} switchFn={switchPanel} panel="help" icon={faCircleQuestion} title="Help" />
          </div>
          <p className="pl3 mt4">Click to view:</p>
          <ul className="list pl4 lh-copy">
            <li className="pointer bullet underline" onClick={() => navigateTo('Welcome')}>Home</li>
            <li className="pointer bullet underline" onClick={() => navigateTo('About')}>About</li>
            <li className="pointer bullet underline" onClick={() => navigateTo('FAQ')}>FAQ</li>
            <li className="pointer bullet underline" onClick={() => navigateTo('Terms')}>Terms & Conditions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PanelMenu

// import React from 'react'
// import { useAppContext } from '@context/AppContext/AppContext'
// import { APP_PANEL, MENU_PANEL_TRANSLATE_X, MENU_PANEL_WIDTH_PERCENT } from '@cknTypes/constants'

// const PanelMenu: React.FC = () => {
//   const { isMenuOpen, setActivePanel, setMdxPage, setIsMenuOpen } = useAppContext()
//   const translateX = isMenuOpen ? MENU_PANEL_TRANSLATE_X : 'translate-x-full'

//   const navigateTo = (page: string) => {
//     setMdxPage(page)
//     setActivePanel(APP_PANEL.MDX)
//     setIsMenuOpen(false)
//   }

//   return (
//     <div className={`panel-right panel-help absolute bl b--black bw1 z-3 top-0 left-10 w-90 h-100 bg-red white pt5 transition-transform ${translateX}`}>
//       <div className="h-100 w-100 overflow-y-auto">
//         <div className={`pa4 ${MENU_PANEL_WIDTH_PERCENT} mb5`}>
//           <h2 className="f3 pa3 mt5">Menu Panel</h2>
//           <p className="pl3">Click to view:</p>
//           <ul className="list pl4 lh-copy">
//             <li className="pointer underline" onClick={() => navigateTo('Welcome')}>Home</li>
//             <li className="pointer underline" onClick={() => navigateTo('About')}>About</li>
//             <li className="pointer underline" onClick={() => navigateTo('FAQ')}>FAQ</li>
//             <li className="pointer underline" onClick={() => navigateTo('Terms')}>Terms & Conditions</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PanelMenu
