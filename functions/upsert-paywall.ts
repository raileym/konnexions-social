// netlify/functions/upsert-paywall.ts
import { type Handler } from '@netlify/functions'
import { upsertPaywallForClient } from '@shared/paywall.js'

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const { clientUUID, patch } = JSON.parse(event.body || '{}')

  if (!clientUUID || !patch) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing clientUUID or patch object' })
    }
  }

  const { success, error } = await upsertPaywallForClient(clientUUID, patch)

  return {
    statusCode: success ? 200 : 500,
    body: JSON.stringify(success ? { success: true } : { error })
  }
}
