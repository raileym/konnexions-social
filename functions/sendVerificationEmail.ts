// functions/sendVerificationEmail.ts
import type { Handler } from '@netlify/functions'
import { Resend } from 'resend'
import jwt from 'jsonwebtoken'

const resend = new Resend(process.env.RESEND_API_KEY!)

const JWT_SECRET = process.env.JWT_SECRET!

export const handler: Handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body || '{}')
    if (!email) {
      return { statusCode: 400, body: 'Email required' }
    }

    // Create a JWT token with email and expiry (e.g., 24h)
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '24h' })

    // const verificationUrl = `https://yourdomain.com/verify?token=${token}`
    const verificationUrl = `https://cool-tarsier-753439.netlify.app/verify?token=${token}`

    // Compose email content
    const html = `
      <h1>Welcome to CKN.SOCIAL</h1>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}">Verify my email</a>
      <p>This link expires in 24 hours.</p>
    `

    // Send email via Resend
    await resend.emails.send({
      from: 'Your team at CKN Social <no-reply@ckn.social>',
      to: email,
      subject: 'Please verify your email',
      html,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Verification email sent' }),
    }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: 'Server error' }
  }
}
