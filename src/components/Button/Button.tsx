// components/Button.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ButtonProps } from '@cknTypes/types'
// import { ACTIVE_PANEL } from '@cknTypes/constants'
// import { useHelpPanel } from '@hooks/useHelpPanel'
// import { useMenuPanel } from '@hooks/useMenuPanel'
// import { useProfilePanel } from '@hooks/useProfilePanel'
// import { useSettingsPanel } from '@hooks/useSettingsPanel'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'

const Button = ({
  buttonRef,
  tabIndex,
  ariaDisabled = false,
  ariaLabelledBy,
  iconClass,
  titleClass,
  disable,
  panel,
  icon,
  img,
  title,
  buttonClass,
  // switchFn,
  isActive,
  onClick
}: ButtonProps) => {
  const { isPanelOpen, openPanel, closeAllPanels } = usePanelManager()

  const handleClick = () => {

    // if (panel) {
    //   if (!isPanelOpen('button', panel)) {
    //     openPanel(panel)
    //   } else {
    //     closeAllPanels()
    //   }
    // }

    // switchFn?.(panel ?? ACTIVE_PANEL.MDX)

    if (onClick) onClick()    
  }  

  return (
      <button
        ref={buttonRef} // <-- apply ref here
        // aria-label={`${title} Button,`}
        aria-labelledby={ariaLabelledBy}
        // aria-describedby={ariaDescribedBy}
        tabIndex={tabIndex}
        aria-disabled={ariaDisabled}
        // aria-keyshortcuts={'up arrow'}
        onClick={() => { if (!disable) handleClick() }}
        disabled={disable}
        className={`f2 pa1 bnX b--redX focus-visible:bg-tertiaryX bw3X pointer width-2X secondary ${isActive ? 'bg-on-backgroundX' : 'bg-backgroundX'} mr2X ${disable ? 'o-20' : 'o-100'} ${buttonClass}`}
        // style={{width: '2.5em'}}
        title={title}
      >
        { icon && <FontAwesomeIcon className={`secondary ${iconClass} baX`} icon={icon} /> }
        { img && (
          <div className="flex items-center justify-center overflow-hiddenX w2X h2 br-100X baX" style={{height: '1.15em'}}>
            <img
              src={`/${img}`}
              alt={title}
              className="scale-125X h3 w3 mv0 pv0"
            />
          </div>
        )}

        <div className={`f6 mt1 tc secondary ${titleClass}`}>{title}</div>
        {/* <div className={`f6 mt1 tc ${isActive ? reverse ? 'secondary' : 'on-secondary' : reverse ? 'secondary' : 'on-secondary'}} ${titleClass}`}>{title}</div> */}
      </button>
  )
}

export default Button
