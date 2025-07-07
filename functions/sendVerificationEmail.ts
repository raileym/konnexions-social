import type { Handler } from '@netlify/functions'
import { Resend } from 'resend'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY!)

const JWT_SECRET = process.env.JWT_SECRET!
const EMAIL_SALT = process.env.EMAIL_SALT! // set this in env

// Helper: cook email with salt deterministically
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

    // console.log('email', email)

    const cookedEmail: string = cookEmail(email)
    
    // console.log('cookedEmail', cookedEmail)
    // console.log('JWT_SECRET', JWT_SECRET)
    // console.log('EMAIL_SALT', EMAIL_SALT)
    // console.log('process.env', process.env)

    // Create a JWT token with cookedEmail and expiry (e.g., 24h)
    const token = jwt.sign({ cookedEmail }, JWT_SECRET, { expiresIn: '24h' })

    // console.log('token', token)

    const verificationUrl = `https://localhost:8888/verify?token=${token}`

    const html = `
      <h1>Welcome to CKN.SOCIAL</h1>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}">Verify my email</a>
      <p>This link expires in 24 hours.</p>
    `

    await resend.emails.send({
      from: 'Your team at CKN Social <no-reply@ckn.social>',
      to: email,
      subject: 'Please verify your email',
      html,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Verification email sent',
        cookedEmail,  // returning cooked email here
        token,        // optionally returning token too
      }),
    }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: 'Server error' }
  }
}

