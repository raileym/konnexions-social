// components/Paywall/Paywall.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '@context/AppContext/AppContext'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { usePaywall } from '@hooks/usePaywall/usePaywall'
import { SCREEN } from '@cknTypes/constants'

const Paywall = () => {
  const { paywall, screenState } = useAppContext()
  const { bumpPackages, setPackages } = usePaywall()

  if (!paywall) return <div className="pa3">No paywall data available.</div>

  return (
    <div className="pa3 bg-background">
      <h3 className="mb2">Paywall Packages</h3>
      <ul className="bg-on-background background f6 pa2 br2">
        <li><strong><span className="green">Green</span> Remaining:</strong> {paywall.paywall_package_green_remaining}</li>
        <li><strong><span className="yellow">Yellow</span> Remaining:</strong> {paywall.paywall_package_yellow_remaining}</li>
      </ul>

      <div className="mt3 flex gap2">
        <button
          tabIndex={screenState[SCREEN.PAYWALL] ? 0 : -1}
          className="n1 w4 f6 mr2 br3 ba bw1 ph3 pv2 mb2 dib background b--green bg-green hover:b--green active:bg-oceanblue active:on-background"
          onClick={() => bumpPackages({bumpGreenCount: 20, bumpYellowCount: 0})}
        >
          <FontAwesomeIcon className="f1X" icon={faPlus} /> Green Packages
        </button>

        <button
          tabIndex={screenState[SCREEN.PAYWALL] ? 1 : -1}
          className="n2 w4 f6 ml2 br3 ba bw1 ph3 pv2 mb2 dib background b--yellow bg-yellow hover:b--yellow active:bg-oceanblue active:on-background"
          onClick={() => bumpPackages({bumpGreenCount: 0, bumpYellowCount: 20})}
        >
          <FontAwesomeIcon className="f1X" icon={faPlus} /> Yellow Packages
        </button>
      </div>

      <div className="mt3 flex gap2">
        <button
          tabIndex={screenState[SCREEN.PAYWALL] ? 2 : -1}
          className="n3 w4 f6 mr2 br3 ba bw1 ph3 pv2 mb2 dib background b--green bg-green hover:b--green active:bg-oceanblue active:on-background"
          onClick={() => setPackages({greenCount: 20, yellowCount: paywall?.paywall_package_yellow_remaining ?? 0})}
        >
          Reset Green Packages
        </button>

        <button
          tabIndex={screenState[SCREEN.PAYWALL] ? 3 : -1}
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
