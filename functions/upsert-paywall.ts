// netlify/functions/upsert-paywall.ts
import { type Handler } from '@netlify/functions'
import { upsertPaywall } from '@shared/paywall.js'

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

  const { success, error } = await upsertPaywall(clientUUID, patch)

  console.log('clientUUID', clientUUID)
  console.log('patch', patch)
  console.log('error', error)

  return {
    statusCode: success ? 200 : 500,
    body: JSON.stringify(success ? { success: true } : { error })
  }
}
