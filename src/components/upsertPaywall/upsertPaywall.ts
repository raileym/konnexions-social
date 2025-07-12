import type { UpsertPaywallProps } from '@cknTypes/types'

export const upsertPaywall = async (
  { clientUUID, paywallContent }: UpsertPaywallProps
): Promise<{ success: boolean; error?: string }> => {
  try {
    const res = await fetch('/.netlify/functions/upsert-paywall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientUUID, paywallContent })
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
