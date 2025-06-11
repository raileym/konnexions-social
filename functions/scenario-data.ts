import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // use service role since you're calling RPC
)

const handler: Handler = async (event) => {
  try {
    const { scenarioName } = JSON.parse(event.body || '{}')

    if (!scenarioName) {
      return {
        statusCode: 400,
        body: 'Missing scenarioName'
      }
    }

    const { data: nouns, error: nounErr } = await supabase
      .rpc('ckn_get_nouns_by_scenario', { arg_scenario_name: scenarioName })

    if (nounErr) {
      console.error('Noun RPC error:', nounErr)
      return { statusCode: 500, body: 'Error fetching nouns' }
    }

    const { data: verbs, error: verbErr } = await supabase
      .rpc('ckn_get_verbs_by_scenario', { arg_scenario_name: scenarioName })

    if (verbErr) {
      console.error('Verb RPC error:', verbErr)
      return { statusCode: 500, body: 'Error fetching verbs' }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ nouns, verbs })
    }
  } catch (err) {
    console.error('❌ scenario-data.ts failed:', err)
    return {
      statusCode: 500,
      body: 'Internal server error'
    }
  }
}

export { handler }
