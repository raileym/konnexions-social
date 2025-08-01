import type { Handler } from '@netlify/functions'
import { Resend } from 'resend'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY!)
const EMAIL_SALT = process.env.EMAIL_SALT!
const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

function cookEmail(email: string): string {
  return crypto
    .createHmac('sha256', EMAIL_SALT)
    .update(email.trim().toLowerCase())
    .digest('hex')
}

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString() // 6-digit code
}

export const handler: Handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body || '{}')
    if (!email) {
      return { statusCode: 400, body: 'Email required' }
    }

    const cookedEmail = cookEmail(email)
    const code = generateCode()
    const expiry = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now

    // cXnsole.log('verifyCode', JSON.stringify({
    //   email,
    //   arg_cooked_email: cookedEmail,
    //   arg_code: code,
    //   arg_expires_at: expiry.toISOString(),
    // }, null, 2))

    // Call Supabase to store the code
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/ckn_upsert_email_code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({
        arg_cooked_email: cookedEmail,
        arg_code: code,
        arg_expires_at: expiry.toISOString(),
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('Supabase insert error:', text)
      return { statusCode: 500, body: 'Supabase insert failed' }
    }

    // Prepare email with actual code
    const html = `
      <h1>Welcome to CKN.SOCIAL</h1>
      <p>Enter the following code to verify your email:</p>
      <h2 style="font-size: 2rem;">${code}</h2>
      <p>This code will expire in 15 minutes.</p>
    `

    console.log('sendVerificationEmail', code)
    
    await resend.emails.send({
      from: 'Your team at CKN Social <no-reply@ckn.social>',
      to: email,
      subject: 'Your CKN verification code',
      html,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Verification code sent',
        cookedEmail,
      }),
    }
  } catch (error) {
    console.error('handler error:', error)
    return { statusCode: 500, body: 'Server error' }
  }
}
