import type { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'
// import crypto from 'crypto'

// const EMAIL_SALT = process.env.EMAIL_SALT!
const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

// function cookEmail(email: string): string {
//   return crypto
//     .createHmac('sha256', EMAIL_SALT)
//     .update(email.trim().toLowerCase())
//     .digest('hex')
// }

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const { cookedEmail, code } = JSON.parse(event.body || '{}')

    if (!cookedEmail || !code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing email or code' }),
      }
    }

    // const cookedEmail = cookEmail(email)

    console.log('verifyCode', JSON.stringify({
      cookedEmail,
      code,
      arg_cooked_email: cookedEmail,
      arg_code: code,
    }, null, 2))

    // 🟢 Pass cooked email here
    const { data, error } = await supabase.rpc('ckn_verify_email_code', {
      arg_cooked_email: cookedEmail,
      arg_code: code,
    })

    if (error || !data || data.length === 0) {
      console.error('error', error)
      console.log('data', data)
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid or expired code' }),
      }
    }

    // Optional: You may already be updating `verified = true` inside the private function
    // If so, skip this step. Otherwise, you can leave it in for double-safety.
    // await supabase
    //   .from('ckn_email_code')
    //   .update({ email_code_verified: true })
    //   .eq('email_code_id', data[0].email_code_id)

    const verified = true

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Code verified',
        verified,
        cookedEmail: cookedEmail,
      }),
    }
  } catch (err) {
    console.error('[VERIFY CODE ERROR]', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal error' }),
    }
  }
}
