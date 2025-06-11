import type { NounRecord, VerbRecord } from '../../../../../shared/types'

type ScenarioData = {
  nouns: NounRecord[]
  verbs: VerbRecord[]
}

export const handleGetScenarioData = async (scenarioName: string): Promise<ScenarioData | null> => {
  try {
    const res = await fetch('/.netlify/functions/scenario-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarioName })
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
