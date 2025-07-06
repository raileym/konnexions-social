import { APP_PANEL } from '@cknTypes/constants'
import PanelMDXComponents from '@components/PanelMDX/PanelMDXComponents'
import { useAppContext } from '@context/AppContext/AppContext'
import { useEffect } from 'react'

const PanelMDX = () => {

  const {
    activePanel,
    setActivateLessonBar
  } = useAppContext()
  const isActive = activePanel === APP_PANEL.MDX

  useEffect(() => {
    if (isActive) {
      setActivateLessonBar(false)
    }
  }, [isActive, setActivateLessonBar])

  return (
    <div className={'panel-right panel-mdx bw1 b--moon-gray bl panel-basic z-0 absolute top-0 left-0 w-100 h-100 flex transition-transform translate-x-0'}>
      <PanelMDXComponents />
    </div>
  )
}

export default PanelMDX
