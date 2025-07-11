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

  const { data, error } = await supabase
    .from('ckn_marketing')
    .select('market_content')
    .eq('market_client_uuid', clientUUID)
    .maybeSingle()

  if (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  }

  return { statusCode: 200, body: JSON.stringify({ data: data?.market_content ?? {} }) }
}
