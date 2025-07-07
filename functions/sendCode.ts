// netlify/functions/sendCode.ts

import type { Handler } from '@netlify/functions'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY!)
const EMAIL_SALT = process.env.EMAIL_SALT!
const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

// Deterministic hashing
function cookEmail(email: string): string {
  return crypto
    .createHmac('sha256', EMAIL_SALT)
    .update(email.trim().toLowerCase())
    .digest('hex')
}

export const handler: Handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body || '{}')
    if (!email) {
      return { statusCode: 400, body: 'Email required' }
    }

    const { error: fnError } = await supabase.rpc('ckn_upsert_email_code', {
      arg_email: email,
    })

    if (fnError) {
      console.error('[RPC ERROR]', fnError)
      return { statusCode: 500, body: 'Supabase error' }
    }

    const cooked = cookEmail(email)

    // You’re not retrieving the code from Supabase — it stays server-side.
    const html = `
      <h1>Welcome to CKN.SOCIAL</h1>
      <p>Enter the following code in your browser to verify your email:</p>
      <h2 style="font-size: 2rem;">${'******'}</h2>
      <p>This code expires in 15 minutes.</p>
    `

    // Email must be sent — you could modify this to return a fake code for testing
    await resend.emails.send({
      from: 'Your team at CKN Social <no-reply@ckn.social>',
      to: email,
      subject: 'Your CKN verification code',
      html,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Verification code sent', cookedEmail: cooked }),
    }
  } catch (error) {
    console.error('[SEND CODE ERROR]', error)
    return { statusCode: 500, body: 'Server error' }
  }
}
