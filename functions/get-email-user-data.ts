import type { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const { cookedEmail } = JSON.parse(event.body || '{}')

    if (!cookedEmail || typeof cookedEmail !== 'string' || !cookedEmail.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid cookedEmail' }),
      }
    }

    const { data, error } = await supabase.rpc('ckn_get_email_user_data', {
      arg_cooked_email: cookedEmail,
    })

    if (error) {
      console.error('[get-user-email-data] Supabase RPC error:', error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Supabase error', details: error.message }),
      }
    }

    if (!data || data.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User data not found' }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ userData: data[0] }),
    }
  } catch (err) {
    console.error('[get-user-email-data] Unexpected error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    }
  }
}
