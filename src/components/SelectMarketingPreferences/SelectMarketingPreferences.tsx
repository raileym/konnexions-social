import { useEffect, useState } from 'react'
import { defaultMarketingPreferences } from '@shared/cknTypes/types'
import { MARKETING_PREFERENCE } from '@shared/cknTypes/constants'
import type { MarketingPreferences } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'
import { upsertMarketingPreferences } from '@components/upsertMarketingPreferences/upsertMarketingPreferences'
import { getMarketingPreferences } from '@components/getMarketingPreferences/getMarketingPreferences'

export const SelectMarketingPreferences = () => {
  const [preferences, setPreferences] = useState<MarketingPreferences>(defaultMarketingPreferences)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { clientUUID } = useAppContext()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const res = await getMarketingPreferences({ clientUUID })

      if (res.success) {
        const prefs = res.data ?? defaultMarketingPreferences
        setPreferences(prefs)
      } else {
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
      <div className="b f3 mv3 black">Email preferences</div>
      {Object.entries(MARKETING_PREFERENCE).map(([key, label]) => {
        const checked = preferences[label]

        return (
          <label key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleToggle(key as keyof typeof MARKETING_PREFERENCE)}
              className="form-checkbox h2 mh3 black"
            />
            <span className="black">{label}</span>
          </label>
        )
      })}
    </div>
  )
}
