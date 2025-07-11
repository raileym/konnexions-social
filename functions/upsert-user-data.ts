import { type Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON payload' })
    }
  }

  const {
    clientUUID,
    flexLesson,
    currentLesson,
    lessons,
    lessonNumber,
    lessonPrompt,
    lessonTimestamp
  } = payload

  const { error } = await supabase.rpc('ckn_upsert_user_data', {
    arg_client_uuid: clientUUID,
    arg_flex_lesson: flexLesson,
    arg_current_lesson: currentLesson,
    arg_lessons: lessons,
    arg_lesson_number: lessonNumber,
    arg_lesson_prompt: lessonPrompt,
    arg_lesson_timestamp: lessonTimestamp
  })

  if (error) {
    console.error('❌ upsertUserData RPC failed:', error.message)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  }
}
