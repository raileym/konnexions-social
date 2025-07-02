// /.netlify/functions/get-module.ts
import type { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const handler: Handler = async (event) => {
  try {
    // Parse POST body
    const { lessonId, moduleName } = JSON.parse(event.body || '{}')

    if (!lessonId || !moduleName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing lessonId or moduleName' })
      }
    }

    // Call the RPC function
    const { data, error } = await supabase.rpc('get_module_by_lesson_and_name', {
      lesson_id: lessonId,
      module_name: moduleName
    })

    if (error) {
      console.error('Supabase RPC error:', error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch module' })
      }
    }

    if (!data) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Module not found' })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}

export { handler }
