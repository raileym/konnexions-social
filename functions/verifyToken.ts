import type { CookedEmail } from '@cknTypes/types.js'
import type { Handler } from '@netlify/functions'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const { cookedEmail, token } = JSON.parse(event.body || '{}')

    if (!cookedEmail || !token) {
      // cXonsole.log('Missing cookedEmail or token:', { cookedEmail, token })
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing cookedEmail or token' }),
      }
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { cookedEmail: CookedEmail; iat: number; exp: number }

    if (!decoded) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Bad token' }),
      }
    }

    if (decoded.cookedEmail !== cookedEmail) {
      return {
        statusCode: 402,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email does not match token' }),
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Email verified successfully' }),
    }
  } catch (err: unknown) {
    let message = 'Invalid or expired token'

    if (err instanceof Error) {
      message = err.message
      message = 'Bad token'
    }

    // cXonsole.log('message', message)

    return {
      statusCode: 403,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: message }),
    }
  }
}

export { handler }
