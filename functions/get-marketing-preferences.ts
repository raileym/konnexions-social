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

  const { clientUUID } = JSON.parse(event.body || '{}')

  if (!clientUUID) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing clientUUID' })
    }
  }

  const { data, error } = await supabase.rpc('ckn_get_marketing_preferences', {
    arg_client_uuid: clientUUID
  })

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }

  const preferences = data?.[0]?.marketing_data_preferences ?? {}

  return {
    statusCode: 200,
    body: JSON.stringify({ data: preferences })
  }
}
