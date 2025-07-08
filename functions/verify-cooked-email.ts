import type { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const { cookedEmail } = JSON.parse(event.body || '{}')

    if (!cookedEmail) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing cookedEmail' }),
      }
    }

    console.log('verify-cooked-email', JSON.stringify({
      cookedEmail
    }, null, 2))
    
    const { data, error } = await supabase.rpc('ckn_verify_cooked_email', {
      arg_cooked_email: cookedEmail,
    })

    if (error) {
      console.error('Supabase verify error:', error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Verification failed' }),
      }
    }

    const valid = data === true

    return {
      statusCode: 200,
      body: JSON.stringify({ valid }),
    }
  } catch (err) {
    console.error('[verifyCookedEmail ERROR]', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal error' }),
    }
  }
}
