import type { GetMarketingPreferencesProps, MarketingPreferences } from '@cknTypes/types'

export const getMarketingPreferences = async (
  { clientUUID }: GetMarketingPreferencesProps
): Promise<{ success: boolean; data?: MarketingPreferences; error?: string }> => {
  try {
    const res = await fetch('/.netlify/functions/get-marketing-preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientUUID })
    })

    if (!res.ok) {
      const json = await res.json()
      return { success: false, error: json?.error ?? 'Unexpected error' }
    }

    const json = await res.json()
    // cXnsole.log('json', JSON.stringify(json, null, 2))
    return { success: true, data: json.data as MarketingPreferences}
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}
