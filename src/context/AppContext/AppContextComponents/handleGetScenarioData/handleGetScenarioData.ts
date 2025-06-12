import type { 
  HandleGetScenarioDataProps,
  NounRecord,
  VerbRecord
} from '../../../../../shared/types'

type ScenarioData = {
  nouns: NounRecord[]
  verbs: VerbRecord[]
}

export const handleGetScenarioData = async ({
  scenario,
  language
}: HandleGetScenarioDataProps
): Promise<ScenarioData | null> => {
  try {
    const res = await fetch('/.netlify/functions/scenario-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenario,
        language
      })
    })

    if (!res.ok) {
      console.error('❌ Scenario fetch failed:', res.status)
      return null
    }

    const { nouns, verbs } = await res.json()
    return { nouns, verbs }
  } catch (err) {
    console.error('❌ Network error in handleGetScenarioData:', err)
    return null
  }
}
