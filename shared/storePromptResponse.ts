import { createClient } from '@supabase/supabase-js'
import type { StorePromptResponseProps } from '@cknTypes/types'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

export const storePromptResponse = async ({
  clientUUID,
  lessonId,
  prompt,
  response,
  genAIProvider
}: StorePromptResponseProps): Promise<{ success: boolean; error?: string }> => {
  const { error } = await supabase.rpc('ckn_insert_prompt_response', {
    arg_client_uuid: clientUUID,
    arg_lesson_id: lessonId,
    arg_prompt: prompt,
    arg_response: response ?? '',
    arg_gen_ai_provider: genAIProvider
  })

  if (error) {
    console.error('❌ storePromptResponse RPC failed:', error.message)
    return { success: false, error: error.message }
  }

  console.log('✅ storePromptResponse succeeded')
  return { success: true }
}
