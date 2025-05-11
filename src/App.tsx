import { useState } from 'react'

export default function App() {
  const [text, setText] = useState('')
  const [cleaned, setCleaned] = useState('')

  const handleClick = () => {
    const trimmed = text.trim()
    setCleaned(trimmed)
  }

  return (
    <div className={'flex-1 w-100 b-green bw-5'}>
      <div className={'bg-red w-60 center'} style={{ padding: 32 }}>
        <h1>Hello, world</h1>

        <textarea
          rows={5}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Enter Spanish text...'
          style={{ width: '100%', fontSize: 16 }}
        />

        <button onClick={handleClick} style={{ marginTop: 12 }}>
          Clean it
        </button>

        {cleaned && (
          <p style={{ marginTop: 24 }}>
            <strong>Cleaned:</strong> {cleaned}
          </p>
        )}
      </div>
    </div>
  )
}
