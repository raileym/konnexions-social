import { CURATED } from '@cknTypes/constants'
import { type Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const handler: Handler = async (event) => {
  const { lesson } = JSON.parse(event.body ?? '{}')

  if (!lesson?.targetLanguage || !lesson?.scenario) {
    return {
      statusCode: 400,
      body: 'Missing lesson.targetLanguage or lesson.scenario'
    }
  }

  const { targetLanguage, scenario } = lesson

  const nounLines = lesson.nounsMissing?.lines ?? []
  const verbLines = lesson.verbsMissing?.lines ?? []

  try {
    for (const line of nounLines) {
      const [base, singular, plural, gender] = line.split('|')
      console.log(`Adding noun: ${base}`)
      await supabase.rpc('ckn_insert_noun', {
        arg_noun_base: base,
        arg_noun_singular: singular,
        arg_noun_plural: plural,
        arg_noun_gender: gender,
        arg_scenario: scenario,
        arg_language: targetLanguage,
        arg_curated: CURATED.FALSE
      })
    }

    for (const line of verbLines) {
      const [base, inf, yo, tu, el_ella_usted, noso, voso, ellos] = line.split('|')
      console.log(`Adding verb: ${base}`)
      await supabase.rpc('ckn_insert_verb', {
        arg_verb_base: base,
        arg_verb_infinitive: inf,
        arg_verb_yo: yo,
        arg_verb_tu: tu,
        arg_verb_el_ella_usted: el_ella_usted,
        arg_verb_nosotros: noso,
        arg_verb_vosotros: voso,
        arg_verb_ellos_ellas_ustedes: ellos,
        arg_scenario: scenario,
        arg_language: targetLanguage,
        arg_curated: CURATED.FALSE
      })
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Nouns and verbs inserted (curated=false)' })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error inserting data: ${(err as Error).message}`
    }
  }
}

export { handler }
