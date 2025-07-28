import { useEffect, useState } from 'react'
import { defaultMarketingPreferences } from '@shared/cknTypes/types'
import { ACTIVE_PANEL, MARKETING_PREFERENCE } from '@shared/cknTypes/constants'
import type { MarketingPreferences } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'
import { upsertMarketingPreferences } from '@components/upsertMarketingPreferences/upsertMarketingPreferences'
import { getMarketingPreferences } from '@components/getMarketingPreferences/getMarketingPreferences'
import { usePanelBase } from '@hooks/usePanelBase'

export const SelectMarketingPreferences = () => {
  const [preferences, setPreferences] = useState<MarketingPreferences>(defaultMarketingPreferences)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { firstFocusInputRef: ref, tabIndex, ariaDisabled } = usePanelBase({panelName: ACTIVE_PANEL.SELECT_MARKETING_PREFERENCES})

  const { clientUUID } = useAppContext()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const res = await getMarketingPreferences({ clientUUID })

      if (res.success) {
        // cXnsole.log('WINNER')
        // cXnsole.log(res)
        const prefs = res.data ?? defaultMarketingPreferences
        setPreferences(prefs)
        // console.log(prefs)
      } else {
        // cXnsole.log('LOSER')
        setError(res.error || 'Failed to load preferences')
        setPreferences(defaultMarketingPreferences)
      }

      setLoading(false)
    }

    load()
  }, [clientUUID])

  const handleToggle = async (key: keyof typeof MARKETING_PREFERENCE) => {
    if (!preferences) return

    const updatedPreferences: MarketingPreferences = {
      ...preferences,
      [MARKETING_PREFERENCE[key]]: !preferences[MARKETING_PREFERENCE[key]]
    }

    setPreferences(updatedPreferences)

    const { success, error } = await upsertMarketingPreferences({
      clientUUID,
      marketingPreferences: updatedPreferences
    })

    if (!success) {
      setError(error ?? 'Failed to update preference')
    }
  }

  if (loading || error) {
    return (
      <div className="p-2 text-sm">
        {loading && <p>Loading marketing preferences...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
    )
  }

  if (!preferences) return null

  return (
    <div className="mv4">
      <div className="b f3 mv3 background">Email preferences</div>
      {Object.entries(MARKETING_PREFERENCE).map(([key, label], index) => {
        // const checked = preferences[label]

        return (
          <label key={key} className="focusable flex items-center space-x-2">
          <input
            {...(index === 0 ? { ref } : {})}
            tabIndex={tabIndex}
            aria-disabled={ariaDisabled}
            // aria-disabled={!screenState[SCREEN.PROFILE]}
            type="checkbox"
            checked={preferences[label] ?? false}
            onChange={() => handleToggle(key as keyof typeof MARKETING_PREFERENCE)}
            className="form-checkbox h2 mh3 background"
          />
            <span className="background">{label}</span>
          </label>
        )
      })}
    </div>
  )
}
