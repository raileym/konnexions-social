import { Prompt } from "./types"

type FetchOpenAIProps = {
  prompt: Prompt
}

type UseClaudeProps = {
  prompt: Prompt
}

export async function fetchClaude({ prompt }: UseClaudeProps): Promise<string> {
  const claudeKey = process.env.CLAUDE_API_KEY
  if (!claudeKey) {
    throw new Error('Missing Claude API key in environment')
  }

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

  const data = await response.json()
  return data.content?.[0]?.text?.trim() ?? ''
}

export async function fetchOpenAI({ prompt }: FetchOpenAIProps): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('Missing OpenAI API key in environment')
  }

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

  const data = await response.json()
  return data.choices?.[0]?.message?.content?.trim() ?? ''
}

