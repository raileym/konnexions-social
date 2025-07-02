import type { Handler } from '@netlify/functions'
import crypto from 'crypto'

const SERVER_SECRET = process.env.CLIENT_UUID_SECRET || 'default_salt_change_me'

const handler: Handler = async (event) => {
  try {
    const { clientEmail } = JSON.parse(event.body || '{}')

    if (!clientEmail || typeof clientEmail !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required and must be a string.' })
      }
    }

    // Normalize email to lowercase trimmed
    const normalizedEmail = clientEmail.trim().toLowerCase()

    // Create HMAC using SHA256 with secret salt
    const hmac = crypto.createHmac('sha256', SERVER_SECRET)
    hmac.update(normalizedEmail)
    const clientUUID = hmac.digest('hex')

    return {
      statusCode: 200,
      body: JSON.stringify({ clientUUID })
    }
  } catch (err) {
    console.error('Error generating clientUUID:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    }
  }
}

export { handler }
