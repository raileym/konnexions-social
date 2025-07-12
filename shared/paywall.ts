// supabase/paywall.ts
import { createClient } from '@supabase/supabase-js'
import type { PaywallContent } from '@cknTypes/types'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const getPaywallForClient = async (
  clientUUID: string
): Promise<{ success: boolean; data?: PaywallContent; error?: string }> => {
  const { data, error } = await supabase.rpc('ckn_get_paywall', {
    arg_client_uuid: clientUUID
  })

  if (error) {
    return { success: false, error: error.message }
  }

  const content = data?.[0]?.paywall_content ?? {}
  return { success: true, data: content }
}

export const upsertPaywallForClient = async (
  clientUUID: string,
  content: PaywallContent
): Promise<{ success: boolean; error?: string }> => {
  const { error } = await supabase.rpc('ckn_upsert_paywall', {
    arg_client_uuid: clientUUID,
    arg_paywall_content: content
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
