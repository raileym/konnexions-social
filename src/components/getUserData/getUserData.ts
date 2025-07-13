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

    const json = await res.json()

    if (!res.ok) {
      return { success: false, error: json?.error ?? 'Unexpected error' }
    }

    return { success: true, data: json.userData }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err)
    }
  }
}
