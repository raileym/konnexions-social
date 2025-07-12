import type { GetPaywallProps, Paywall } from '@cknTypes/types'

export const getPaywall = async (
  { clientUUID }: GetPaywallProps
): Promise<{ success: boolean; data?: Paywall; error?: string }> => {
  try {
    const res = await fetch('/.netlify/functions/get-paywall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientUUID })
    })

    const json = await res.json()

    if (!res.ok) {
      return { success: false, error: json?.error ?? 'Unexpected error' }
    }

    return { success: true, data: json.data as Paywall}
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}
