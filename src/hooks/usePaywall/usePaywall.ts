// hooks/usePaywall.ts
import { useAppContext } from '@context/AppContext/AppContext'
import { getPaywall as cloudGetPaywall } from '@hooks/usePaywall/getPaywall'
import { upsertPaywall as cloudUpsertPaywall } from '@hooks/usePaywall/upsertPaywall'
import { bumpPaywallPackageCounts } from '@hooks/usePaywall/bumpPaywallPackageCounts'
import { setPaywallPackageCounts } from '@hooks/usePaywall/setPaywallPackageCounts'
import type { BumpPackagesProps, SetPackagesProps, UpsertPaywallProps } from '@cknTypes/types'

export const usePaywall = () => {
  const { clientUUID, setPaywall } = useAppContext()

  const getPaywall = async () => {
    if (!clientUUID) return
    const { success, data } = await cloudGetPaywall({ clientUUID })
    if (success && data) return(data)
  }

  const refreshPaywall = async () => {
    console.log('refreshPaywall')
    if (!clientUUID) return
    const { success, data } = await cloudGetPaywall({ clientUUID })
    console.log('data', data)
    if (success && data) setPaywall(data)
  }

  const upsertPaywall = async (patch: UpsertPaywallProps['patch']) => {
    if (!clientUUID) return { success: false, error: 'Missing clientUUID' }

    const { success, error } = await cloudUpsertPaywall({ clientUUID, patch })
    if (success) await getPaywall()
    return { success, error }
  }

  const getPackages = async () => {
    if (!clientUUID) return
    const { success, data } = await cloudGetPaywall({ clientUUID })
    if (success && data) setPaywall(data)
    return { 
      greenCount: data?.paywall_package_green_remaining ?? 0, 
      yellowCount: data?.paywall_package_yellow_remaining ?? 0, 
    }
  }

  const setPackages = async ({
    greenCount,
    yellowCount
  }: SetPackagesProps): Promise<{ success: boolean; error?: string }> => {
    if (!clientUUID) return { success: false, error: 'Missing clientUUID' }

    const result = await setPaywallPackageCounts({
      clientUUID,
      greenCount,
      yellowCount
    })

    if (result.success && result.data) {
      setPaywall(result.data)
    }

    return { success: result.success, error: result.error }
  }

  const bumpPackages = async ({
    bumpGreenCount,
    bumpYellowCount
  }: BumpPackagesProps): Promise<{ success: boolean; error?: string }> => {
    if (!clientUUID) return { success: false, error: 'Missing clientUUID' }

    const result = await bumpPaywallPackageCounts({
      clientUUID,
      bumpGreenCount,
      bumpYellowCount
    })

    if (result.success && result.data) {
      setPaywall(result.data)
    }

    return { success: result.success, error: result.error }
  }

  return {
    getPaywall,
    refreshPaywall,
    upsertPaywall,
    getPackages,
    setPackages,
    bumpPackages
  }
}
