import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { APP_PANEL, MENU_PANEL_TRANSLATE_X, MENU_PANEL_WIDTH_PERCENT } from '@cknTypes/constants'

const PanelMenu: React.FC = () => {
  const { isMenuOpen, setActivePanel, setMdxPage, setIsMenuOpen } = useAppContext()
  const translateX = isMenuOpen ? MENU_PANEL_TRANSLATE_X : 'translate-x-full'

  const navigateTo = (page: string) => {
    setMdxPage(page)
    setActivePanel(APP_PANEL.MDX)
    setIsMenuOpen(false)
  }

  return (
    <div className={`panel-right panel-help absolute bl b--black bw1 z-3 top-0 left-10 w-90 h-100 bg-red white pt5 transition-transform ${translateX}`}>
      <div className="h-100 w-100 overflow-y-auto">
        <div className={`pa4 ${MENU_PANEL_WIDTH_PERCENT} mb5`}>
          <h2 className="f3 pa3 mt5">Menu Panel</h2>
          <p className="pl3">Click to view:</p>
          <ul className="list pl4 lh-copy">
            <li className="pointer underline" onClick={() => navigateTo('Welcome')}>Home</li>
            <li className="pointer underline" onClick={() => navigateTo('About')}>About</li>
            <li className="pointer underline" onClick={() => navigateTo('FAQ')}>FAQ</li>
            <li className="pointer underline" onClick={() => navigateTo('Terms')}>Terms & Conditions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PanelMenu
