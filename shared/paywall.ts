// supabase/paywall.ts
import { createClient } from '@supabase/supabase-js'
import type { Paywall } from '@cknTypes/types'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const getPaywallForClient = async (
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

export const upsertPaywallForClient = async (
  clientUUID: string,
  patch: Partial<Paywall>
): Promise<{ success: boolean; error?: string }> => {
  const { error } = await supabase.rpc('ckn_upsert_paywall', {
    arg_client_uuid: clientUUID,
    arg_patch: patch
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
