import type { GetMarketingDataProps, MarketingData } from '@cknTypes/types';

export const getMarketingData = async (
  {clientUUID}: GetMarketingDataProps
): Promise<{ success: boolean; data?: MarketingData; error?: string }> => {
  try {
    const res = await fetch('/.netlify/functions/get-marketing-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientUUID })
    })

    if (!res.ok) {
      const json = await res.json()
      return { success: false, error: json?.error ?? 'Unexpected error' }
    }

    const json = await res.json()
    return { success: true, data: json.data }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}
