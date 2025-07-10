import type { StorePromptResponseProps } from '@cknTypes/types';

export const storePromptResponse = async ({
  cookedEmail,
  lessonId,
  prompt,
  response,
  genAIProvider
}: StorePromptResponseProps): Promise<{ success: boolean; error?: string}> => {
  try {
    const res = await fetch('/.netlify/functions/store-prompt-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cookedEmail,
        lessonId,
        prompt,
        response,
        genAIProvider
      })
    })

    if (!res.ok) {
      const { error } = await res.json()
      return { success: false, error }
    }

    return { success: true }
  } catch (err: unknown) {
    let message = 'Unexpected error'
    if (err instanceof Error) {
      message = err.message
    }
    return {
      success: false,
      error: message
    }
  }
}
