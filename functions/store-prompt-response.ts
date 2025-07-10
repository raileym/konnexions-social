import { type Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

// Types
type PromptResponseBody = {
  cookedEmail: string
  lessonId: string
  prompt: string
  response?: string // Optional, as you indicated
  genAIProvider: string
}

// Environment variables
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  let data: PromptResponseBody

  try {
    data = JSON.parse(event.body || '{}')
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON' }),
    }
  }

  const { cookedEmail, lessonId, prompt, response = '', genAIProvider } = data

  if (!cookedEmail || !lessonId || !prompt || !genAIProvider) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields' }),
    }
  }

  const { error } = await supabase.rpc('ckn_insert_prompt_response', {
    arg_cooked_email: cookedEmail,
    arg_lesson_id: lessonId,
    arg_prompt: prompt,
    arg_response: response,
    arg_gen_ai_provider: genAIProvider,
  })

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  }
}

export default handler
