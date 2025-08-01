// components/Paywall/Paywall.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '@context/AppContext/AppContext'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { usePaywall } from '@hooks/usePaywall/usePaywall'
import { ACTIVE_PANEL } from '@cknTypes/constants'
import { usePanelBase } from '@hooks/usePanelBase'

const Paywall = () => {
  const { paywall } = useAppContext()
  const { bumpPackages, setPackages } = usePaywall()

  if (!paywall) return <div className="pa3">No paywall data available.</div>

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { tabIndex, ariaDisabled, ariaHidden, isOpen, isMounted } = usePanelBase({panelName: ACTIVE_PANEL.PAYWALL})

  return (
    <div className={`paywall pa3 bg-background ${isOpen ? 'panel-visible' : 'panel-hiddenX'} ${!isMounted ? 'dnX' : ''}`}>
      <h3 className="mb2">Paywall Packages</h3>
      <ul className="bg-on-background background f6 pa2 br2">
        <li><strong><span className="green">Green</span> Remaining:</strong> {paywall.paywall_package_green_remaining}</li>
        <li><strong><span className="yellow">Yellow</span> Remaining:</strong> {paywall.paywall_package_yellow_remaining}</li>
      </ul>

      <div className="mt3 flex gap2">
        <button
          tabIndex={tabIndex}
          inert={!isOpen}
          aria-disabled={ariaDisabled}
          aria-hidden={ariaHidden}
          className="n1 w4 f6 mr2 br3 ba bw1 ph3 pv2 mb2 dib background b--green bg-green hover:b--green active:bg-oceanblue active:on-background"
          onClick={() => bumpPackages({bumpGreenCount: 20, bumpYellowCount: 0})}
        >
          <FontAwesomeIcon className="f1X" icon={faPlus} /> Green Packages
        </button>

        <button
          tabIndex={tabIndex}
          inert={!isOpen}
          aria-disabled={ariaDisabled}
          aria-hidden={ariaHidden}
          className="n2 w4 f6 ml2 br3 ba bw1 ph3 pv2 mb2 dib background b--yellow bg-yellow hover:b--yellow active:bg-oceanblue active:on-background"
          onClick={() => bumpPackages({bumpGreenCount: 0, bumpYellowCount: 20})}
        >
          <FontAwesomeIcon className="f1X" icon={faPlus} /> Yellow Packages
        </button>
      </div>

      <div className="mt3 flex gap2">
        <button
          tabIndex={tabIndex}
          inert={!isOpen}
          aria-disabled={ariaDisabled}
          aria-hidden={ariaHidden}
          className="n3 w4 f6 mr2 br3 ba bw1 ph3 pv2 mb2 dib background b--green bg-green hover:b--green active:bg-oceanblue active:on-background"
          onClick={() => setPackages({greenCount: 20, yellowCount: paywall?.paywall_package_yellow_remaining ?? 0})}
        >
          Reset Green Packages
        </button>

        <button
          tabIndex={tabIndex}
          inert={!isOpen}
          aria-disabled={ariaDisabled}
          aria-hidden={ariaHidden}
          className="n4 w4 f6 ml2 br3 ba bw1 ph3 pv2 mb2 dib background b--yellow bg-yellow hover:b--yellow active:bg-oceanblue active:on-background"
          onClick={() => setPackages({greenCount: paywall?.paywall_package_green_remaining ?? 0, yellowCount: 20})}
        >
          Reset Yellow Packages
        </button>
      </div>
    </div>
  )
}

export default Paywall
