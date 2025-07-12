import { type Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'
import type { Paywall } from '../shared/cknTypes/types.js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const { clientUUID, greenCount = 0, yellowCount = 0 } = body

    if (!clientUUID) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing clientUUID' }),
      }
    }

    const { data, error } = await supabase.rpc('ckn_set_paywall_package_counts', {
      arg_client_uuid: clientUUID,
      arg_set_green_count: greenCount,
      arg_set_yellow_count: yellowCount,
    })

    console.log('server-side set result', data, error)

    if (error) {
      console.error('❌ Supabase RPC error (set):', error.message)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      }
    }

    const paywall: Paywall | undefined = data?.[0]

    return {
      statusCode: 200,
      body: JSON.stringify({ data: paywall }),
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: message }),
    }
  }
}
