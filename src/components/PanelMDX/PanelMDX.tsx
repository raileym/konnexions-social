import { APP_PANEL } from '@cknTypes/constants'
import PanelMDXComponents from '@components/PanelMDX/PanelMDXComponents'
import { useAppContext } from '@context/AppContext/AppContext'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { mdxPagesMap } from '@context/AppContext/AppContext'

const PanelMDX = () => {
  const {
    activePanel,
    setActivateLessonBar,
  } = useAppContext()
  const isActive = activePanel === APP_PANEL.MDX

  useEffect(() => {
    if (isActive) {
      setActivateLessonBar(false)
    }
  }, [isActive, setActivateLessonBar])

  const location = useLocation()
  const path = location.pathname.replace('/', '').toLowerCase()

  const matchedKey = Object.keys(mdxPagesMap).find(
    (key) => key.toLowerCase() === path
  )

  return (
    <div className="panel-right panel-mdx bw1 b--moon-gray bl panel-basic z-0 absolute top-0 left-0 w-100 h-100 flex transition-transform translate-x-0">
      {matchedKey ? <PanelMDXComponents page={matchedKey} /> : null}
    </div>
  )
}

export default PanelMDX

// import { APP_PANEL } from '@cknTypes/constants'
// import PanelMDXComponents from '@components/PanelMDX/PanelMDXComponents'
// import { useAppContext } from '@context/AppContext/AppContext'
// import { useEffect } from 'react'

// const PanelMDX = () => {
//   const {
//     activePanel,
//     setActivateLessonBar,
//     mdxPage
//   } = useAppContext()
//   const isActive = activePanel === APP_PANEL.MDX

//   useEffect(() => {
//     if (isActive) {
//       setActivateLessonBar(false)
//     }
//   }, [isActive, setActivateLessonBar])

//   return (
//     <div className={'panel-right panel-mdx bw1 b--moon-gray bl panel-basic z-0 absolute top-0 left-0 w-100 h-100 flex transition-transform translate-x-0'}>
//       <PanelMDXComponents page={mdxPage} />
//     </div>
//   )
// }

// export default PanelMDX
