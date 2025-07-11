import { type Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const { clientUUID, marketingPreferences } = JSON.parse(event.body || '{}')

  if (!clientUUID || !marketingPreferences) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing clientUUID or preferences' })
    }
  }

  const { error } = await supabase.rpc('ckn_upsert_marketing_preferences', {
    arg_client_uuid: clientUUID,
    arg_preferences: marketingPreferences
  })

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  }
}
