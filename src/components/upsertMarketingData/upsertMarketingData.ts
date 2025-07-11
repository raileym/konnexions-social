import type { UpsertMarketingDataProps } from '@cknTypes/types';

export const upsertMarketingData = async ({
  clientUUID,
  marketingData
}: UpsertMarketingDataProps): Promise<{ success: boolean; error?: string }> => {
  try {
    const res = await fetch('/.netlify/functions/upsert-marketing-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientUUID,
        marketingData
      })
    })

    if (!res.ok) {
      const json = await res.json()
      return { success: false, error: json?.error ?? 'Unexpected error' }
    }

    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}
