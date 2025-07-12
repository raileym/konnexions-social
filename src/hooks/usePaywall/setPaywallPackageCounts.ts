// api/setPaywallPackageCounts.ts
import type { SetPaywallPackageCountsProps, Paywall } from '@cknTypes/types'

export const setPaywallPackageCounts = async ({
  clientUUID,
  greenCount = 0,
  yellowCount = 0
}: SetPaywallPackageCountsProps): Promise<{
  success: boolean
  data?: Paywall
  error?: string
}> => {
  try {
    const res = await fetch('/.netlify/functions/set-paywall-package-counts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientUUID, greenCount, yellowCount })
    })

    const json = await res.json()

    if (!res.ok) {
      return { success: false, error: json.error ?? 'Unexpected response from set-paywall-package-counts' }
    }

    return { success: true, data: json.data as Paywall }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err)
    }
  }
}
