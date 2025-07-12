import { type Handler } from '@netlify/functions'
import { upsertPaywallForClient } from '@/supabase/paywall'

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const { clientUUID, paywallContent } = JSON.parse(event.body || '{}')

  if (!clientUUID || !paywallContent) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing clientUUID or paywallContent' })
    }
  }

  const { success, error } = await upsertPaywallForClient(clientUUID, paywallContent)

  return {
    statusCode: success ? 200 : 500,
    body: JSON.stringify(success ? { success: true } : { error })
  }
}
