import type { GetClientUUIDProps } from '@cknTypes/types'

export const getClientUUID = async ({clientEmail}: GetClientUUIDProps): Promise<string | null> => {
  try {
    const res = await fetch('/.netlify/functions/get-client-uuid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientEmail })
    })

    if (!res.ok) {
      console.error('Failed to get clientUUID')
      return null
    }

    const data = await res.json()
    return data.clientUUID ?? null
  } catch (err) {
    console.error('Error fetching clientUUID:', err)
    return null
  }
}
