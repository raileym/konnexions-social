// supabase/paywall.ts
import { createClient } from '@supabase/supabase-js'
import type { ClientUUID, Paywall } from '@cknTypes/types'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const getPaywall = async (
  clientUUID: string
): Promise<{ success: boolean; data?: Paywall; error?: string }> => {
  const { data, error } = await supabase.rpc('ckn_get_paywall', {
    arg_client_uuid: clientUUID
  })

  if (error) {
    return { success: false, error: error.message }
  }

  const paywall = data?.[0]
  return { success: true, data: paywall }
}

export const upsertPaywall = async (
  clientUUID: ClientUUID,
  paywall: Paywall
): Promise<{ success: boolean; error?: string }> => {
  const { error } = await supabase.rpc('ckn_upsert_paywall', {
    arg_client_uuid: clientUUID,
    arg_package_green_remaining: paywall.paywall_package_green_remaining,
    arg_package_yellow_remaining: paywall.paywall_package_yellow_remaining,
    arg_stripe_customer_id: paywall.paywall_stripe_customer_id,
    arg_stripe_subscription_id: paywall.paywall_stripe_subscription_id,
    arg_stripe_metadata: paywall.paywall_stripe_metadata
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
