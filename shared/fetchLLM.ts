import { GEN_AI_PROVIDER } from '@cknTypes/constants.js'
import type {
  FetchClaudeProps,
  FetchClaudeResponse,
  FetchOpenAIProps,
  FetchOpenAIResponse,
} from '../shared/cknTypes/types.js'
import { storePromptResponse } from './storePromptResponse.js'

export const fetchClaude = async ({
  prompt,
  lessonId,
  clientUUID
}: FetchClaudeProps): Promise<FetchClaudeResponse> => {
  const claudeKey = process.env.CLAUDE_API_KEY
  if (!claudeKey) throw new Error('Missing Claude API key in environment')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': claudeKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Claude API error: ${response.status} ${text}`)
  }

  const data = (await response.json()) as {
    content?: Array<{ text?: string }>
  }

  const answer = data.content?.[0]?.text?.trim() ?? ''

  // cXonsole.log('storePromptResponse', JSON.stringify({
  //     clientUUID,
  //     lessonId,
  //     prompt,
  //     response: answer,
  //     genAIProvider: GEN_AI_PROVIDER.CLAUDE
  //   }, null, 2))
  try {
    await storePromptResponse({
      clientUUID,
      lessonId,
      prompt,
      response: answer,
      genAIProvider: GEN_AI_PROVIDER.CLAUDE
    })
  } catch (err) {
    console.error('Failed to store Claude prompt response:', err)
  }

  return answer
}

export const fetchOpenAI = async ({
  prompt,
  lessonId,
  clientUUID
}: FetchOpenAIProps): Promise<FetchOpenAIResponse> => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('Missing OpenAI API key in environment')

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }

  const answer = data.choices?.[0]?.message?.content?.trim() ?? ''

  // cXonsole.log('storePromptResponse', JSON.stringify({
  //     clientUUID,
  //     lessonId,
  //     prompt,
  //     response: answer,
  //     genAIProvider: GEN_AI_PROVIDER.OPENAI
  //   }, null, 2))  
  try {
    await storePromptResponse({
      clientUUID,
      lessonId,
      prompt,
      response: answer,
      genAIProvider: GEN_AI_PROVIDER.OPENAI
    })
  } catch (err) {
    console.error('Failed to store OpenAI prompt response:', err)
  }

  return answer
}
