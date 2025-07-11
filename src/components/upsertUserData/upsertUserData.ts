import type { UpsertUserDataProps } from '@cknTypes/types'

export const upsertUserData = async (
  props: UpsertUserDataProps
): Promise<{ success: boolean; error?: string }> => {
  try {
    const res = await fetch('/.netlify/functions/upsert-user-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props)
    })

    if (!res.ok) {
      const json = await res.json()
      return { success: false, error: json?.error ?? 'Unexpected error' }
    }

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err)
    }
  }
}
