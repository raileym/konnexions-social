import { ACTIVE_PANEL } from '@cknTypes/constants'
import PanelMDXComponents from '@components/PanelMDX/PanelMDXComponents'
import { useAppContext } from '@context/AppContext/AppContext'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { mdxPagesMap } from '@context/AppContext/AppContext'
import type { MdxPage } from '@cknTypes/types'
import { usePanelBase } from '@hooks/usePanelBase'

const PanelMDX = () => {
  const {
    activePanel,
    setActivateLessonBar,
  } = useAppContext()
  const isActive = activePanel === ACTIVE_PANEL.MDX

  useEffect(() => {
    if (isActive) {
      setActivateLessonBar(false)
    }
  }, [isActive, setActivateLessonBar])

  const location = useLocation()
  const path = location.pathname.replace('/', '').toLowerCase()

  // const matchedKey: MdxPage = Object.keys(mdxPagesMap).find(
  //   (key) => key.toLowerCase() === path
  // )

  const matchedKey: MdxPage | undefined = Object.keys(mdxPagesMap).find(
    (key): key is MdxPage => key.toLowerCase() === path
  )

  const { ref, tabIndex, ariaHidden, ariaDisabled, translateX, isOpen, isMounted } = usePanelBase({
    panelName: ACTIVE_PANEL.MDX,
    translateXOpen: 'translate-x-0',
    translateXClose: 'translate-x-100',
    defaultOpen: true
  })

  return (
    <div
      ref={ref}
      role="region"
      aria-modal="true"
      inert={!isOpen}
      aria-hidden={ariaHidden}
      aria-disabled={ariaDisabled}
      tabIndex={tabIndex}

      className={`panel-right panel-mdx bw1 b--moon-gray bl panel-basic z-0 absolute top-0 left-0 w-100 h-100 flex transition-transform ${translateX} ${isOpen ? 'panel-visible' : 'panel-hiddenX'} ${!isMounted ? 'dnX' : ''}`}>
      {matchedKey ? <PanelMDXComponents page={matchedKey} /> : null}
    </div>
  )
}

export default PanelMDX
