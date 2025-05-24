import { Handler } from '@netlify/functions'

const handler: Handler = async (event) => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return {
      statusCode: 500,
      body: 'Missing OpenAI API key in environment'
    }
  }

  try {
    const { language, scenarioLabel, participant } = JSON.parse(event.body ?? '{}')

    if (!language || !scenarioLabel || !participant) {
      return {
        statusCode: 400,
        body: 'Missing one or more required fields: language, scenarioLabel, participant'
      }
    }

    const prompt = `Create a dialog in ${language} appropriate for a beginning language
instruction, where the dialog takes place ${scenarioLabel}
between participants, ${participant}.
Use between 6 to 8 sentences for this dialog.

RESPONSE: Express your response using well-formed JSON only, with no trailing
commas, no single quotes (use double quotes only), no Markdown wrappers, no
comments, no explanatory text or prose or partial JSON blocks, and no headings
or titles. The output must be a single valid JSON array, starting
with [ and ending with ]. Do not prepend phrases like \u201cHere is your JSON:\u201d.
Assume the consumer is a machine expecting strict JSON compliance.

Note, a dialog response is an array of strings that take the form,

    "Participant| Line from the dialog"

where the vertical bar "|" delineates the two fields.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      })
    })

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || ''

    return {
      statusCode: 200,
      body: JSON.stringify({ prompt, reply })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error generating dialog: ${(err as Error).message}`
    }
  }
}

export { handler }
