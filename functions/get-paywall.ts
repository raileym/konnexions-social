import { type Handler } from '@netlify/functions'
import { getPaywallForClient } from '@shared/paywall.js'

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const { clientUUID } = JSON.parse(event.body || '{}')
  if (!clientUUID) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing clientUUID' }) }
  }

  const { success, data, error } = await getPaywallForClient(clientUUID)

  return {
    statusCode: success ? 200 : 500,
    body: JSON.stringify(success ? { data } : { error })
  }
}
