// components/Paywall/Paywall.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '@context/AppContext/AppContext'
import { bumpPaywallPackageCounts } from '@components/bumpPaywallPackageCounts/bumpPaywallPackageCounts'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Paywall = () => {
  const { paywall, setPaywall, clientUUID } = useAppContext()

  if (!paywall) return <div className="pa3">No paywall data available.</div>

  const handleBump = async (type: 'green' | 'yellow') => {
    const bumpGreenCount = type === 'green' ? 100 : 0
    const bumpYellowCount = type === 'yellow' ? 100 : 0

    const { success, data, error } = await bumpPaywallPackageCounts({
      clientUUID,
      bumpGreenCount,
      bumpYellowCount
    })

    if (success && data) {
      console.log('Bump worked:', data)
      setPaywall(data)
    } else {
      console.log('Bump did not work:', data)
      console.error('Failed to bump paywall counts:', error)
    }
  }

  return (
    <div className="pa3 bg-black">
      <h3 className="mb2">Paywall Packages</h3>
      <ul className="bg-white black f6 pa2 br2">
        <li><strong><span className="green">Green</span> Remaining:</strong> {paywall.paywall_package_green_remaining}</li>
        <li><strong><span className="yellow">Yellow</span> Remaining:</strong> {paywall.paywall_package_yellow_remaining}</li>
      </ul>

      <div className="mt3 flex gap2">
        <button
          className="f6 mr2 br3 ba bw1 ph3 pv2 mb2 dib black b--green bg-green hover:b--green active:bg-oceanblue active:white"
          onClick={() => handleBump('green')}
        >
          <FontAwesomeIcon className="f1X" icon={faPlus} /> Green Packages
        </button>

        <button
          className="f6 ml2 br3 ba bw1 ph3 pv2 mb2 dib black b--yellow bg-yellow hover:b--yellow active:bg-oceanblue active:white"
          onClick={() => handleBump('yellow')}
        >
          <FontAwesomeIcon className="f1X" icon={faPlus} /> Yellow Packages
        </button>
      </div>

    </div>
  )
}

export default Paywall
