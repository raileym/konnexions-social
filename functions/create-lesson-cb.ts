// /.netlify/functions/create-lesson-cb.ts
import type { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const handler: Handler = async (event) => {
  try {
    const {
      // id,
      uuid,
      number,
      timestamp,
      name,
      description,
      targetLanguage,
      sourceLanguage,
      scenario,
      participantList,
      prose
    } = JSON.parse(event.body || '{}')

    const salt = 'joy-of-language'
    const normalized = `${uuid.trim().toLowerCase()}:${number}:${salt}`
    const lessonId = crypto.createHash('sha256').update(normalized).digest('hex')

    const { error } = await supabase.rpc('ckn_insert_lesson', {
      arg_lesson_id: lessonId,
      arg_lesson_number: number,
      arg_lesson_uuid: uuid,
      arg_lesson_timestamp: timestamp,
      arg_lesson_name: name,
      arg_lesson_description: description,
      arg_lesson_target_language: targetLanguage,
      arg_lesson_source_language: sourceLanguage,
      arg_lesson_scenario: scenario,
      arg_lesson_participant_list: participantList,
      arg_lesson_prose: prose
    })

    if (error) throw error

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        lessonId
      })
    }
  } catch (err) {
    console.error('Insert failed:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Insert lesson failed' })
    }
  }
}

export { handler }
