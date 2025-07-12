import type { BumpPaywallPackageCountsProps, Paywall } from '@cknTypes/types'

export const bumpPaywallPackageCounts = async ({
  clientUUID,
  bumpGreenCount = 0,
  bumpYellowCount = 0
}: BumpPaywallPackageCountsProps): Promise<{
  success: boolean
  data?: Paywall
  error?: string
}> => {
  try {
    const res = await fetch('/.netlify/functions/bump-paywall-package-counts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientUUID, bumpGreenCount, bumpYellowCount })
    })

    const json = await res.json()

    console.log('bumpPaywallPackageCounts', json)
    if (!res.ok) {
      return { success: false, error: json.error ?? 'Unexpected response from bump-paywall-package-counts' }
    }

    return { success: true, data: json.data as Paywall }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err)
    }
  }
}
