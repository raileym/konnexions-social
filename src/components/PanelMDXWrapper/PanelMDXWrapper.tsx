import { ACTIVE_PANEL } from '@cknTypes/constants'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'

const PanelMDXWrapper = ({ children }: { children: React.ReactNode }) => {
  const { currentPanel } = usePanelManager()
  const isMDXPanelActive = currentPanel === ACTIVE_PANEL.MDX

  return (
    <div
      id="main-content"
      role="main"
      className={`
        panel-right panel-mdx-wrapper absolute top-0 left-10 w-90 h-100 bg-on-background transition-transform
        ${isMDXPanelActive ? 'dn' : 'flex'}`}
    >
      {children}
    </div>
  )
}

export default PanelMDXWrapper

// import { ACTIVE_PANEL } from '@cknTypes/constants'
// import { usePanelBase } from '@hooks/usePanelBase'


// const PanelMDXWrapper = ({ children }: { children: React.ReactNode }) => {

//   const { isMounted } = usePanelBase({
//     panelName: ACTIVE_PANEL.PANEL_MDX_WRAPPER,
//     defaultOpen: true
//   })
  
//   return (
//     <div
//       id="main-contentX"
//       role="main"
//       className={`
//         panel-right panel-mdx-wrapper absolute bl bw1 z-1 top-0 left-10 w-90 h-100 bg-on-background transition-transform translate-x-full
//         ${!isMounted ? 'dn' : ''}`}>
//       {children}
//     </div>
//   )
// }

// export default PanelMDXWrapper