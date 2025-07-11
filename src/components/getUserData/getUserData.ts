import type { UserData } from '@cknTypes/types';

export const getUserData = async (
  clientUUID: string
): Promise<{ success: boolean; data?: UserData; error?: string }> => {
  try {
    const res = await fetch('/.netlify/functions/get-user-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientUUID })
    })

    if (!res.ok) {
      const json = await res.json()
      return { success: false, error: json?.error ?? 'Unexpected error' }
    }

    const data = await res.json() as UserData
    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err)
    }
  }
}
