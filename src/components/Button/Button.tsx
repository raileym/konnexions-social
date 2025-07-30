// components/Button.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ButtonProps } from '@cknTypes/types'

const Button = ({
  buttonRef,
  tabIndex,
  ariaDisabled = false,
  ariaHidden = false,
  ariaLabelledBy,
  iconClass,
  titleClass,
  disable,
  icon,
  img,
  title,
  buttonClass,
  // switchFn,
  isActive,
  onClick
}: ButtonProps) => {

  const handleClick = () => {
    if (onClick) onClick()    
  }  

  return (
      <button
        ref={buttonRef} // <-- apply ref here
        aria-labelledby={ariaLabelledBy}
        tabIndex={tabIndex}
        aria-disabled={ariaDisabled}
        aria-hidden={ariaHidden}
        onClick={() => { if (!disable) handleClick() }}
        disabled={disable}
        className={`f2 pa1 bnX b--redX focus-visible:bg-tertiaryX bw3X pointer width-2X secondary ${isActive ? 'bg-on-background' : 'bg-background'} mr2X ${disable ? 'o-20' : 'o-100'} ${buttonClass}`}
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
      </button>
  )
}

export default Button
