import type { Language, Lines } from '@cknTypes/types'

type RunTranslationProps = {
  lines: Lines,
  source: Language,
  target: Language
}

export const runTranslation = async ({lines, source, target}: RunTranslationProps): Promise<string[] | null> => {
  try {
    const res = await fetch('/.netlify/functions/translate-dialog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        lines,
        source,
        target
      })
    })

    if (!res.ok) {
      console.error('❌ Translation failed', res.status)
      return null
    }

    const { translations } = await res.json()
    return translations
  } catch (err) {
    console.error('❌ Translation error', err)
    return null
  }
}
