// functions/verifyEmail.ts
import type { Handler } from '@netlify/functions'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export const handler: Handler = async (event) => {
  try {
    const { token } = JSON.parse(event.body || '{}')
    if (!token) {
      return { statusCode: 400, body: 'Token required' }
    }

    const payload = jwt.verify(token, JWT_SECRET) as { email: string }

    // Here, you can mark the email as verified in your DB

    return {
      statusCode: 200,
      body: JSON.stringify({ email: payload.email, verified: true }),
    }
  } catch (error) {
    console.error(error)
    return { statusCode: 400, body: 'Invalid or expired token' }
  }
}
