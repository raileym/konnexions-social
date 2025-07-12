import type { UpsertPaywallProps } from '@cknTypes/types'

export const upsertPaywall = async (
  { clientUUID, patch }: UpsertPaywallProps
): Promise<{ success: boolean; error?: string }> => {
  try {
    const res = await fetch('/.netlify/functions/upsert-paywall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientUUID, patch })
    })

    const json = await res.json()

    if (!res.ok) {
      return { success: false, error: json?.error ?? 'Unexpected error' }
    }

    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}
