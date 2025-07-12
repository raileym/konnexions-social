import type { GetPaywallProps, PaywallContent } from '@cknTypes/types'

export const getPaywall = async (
  { clientUUID }: GetPaywallProps
): Promise<{ success: boolean; data?: PaywallContent; error?: string }> => {
  try {
    const res = await fetch('/.netlify/functions/get-paywall', {
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
