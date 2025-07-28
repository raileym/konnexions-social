import { useState } from 'react'

type LessonElementToggleProps = {
  title: string
  content: string[]
  testMode?: boolean
}

const LessonElementToggle: React.FC<LessonElementToggleProps> = ({ title, content, testMode = false }) => {
  const [show, setShow] = useState(false)

  if (!testMode) return null

  return (
    <div className="w-100">
      <button
        onClick={() => setShow(prev => !prev)}
        className="mt3 pa2 br2 bn bg-brand on-background pointer"
      >
        {show ? `Hide ${title}` : `Show ${title}`}
      </button>

      {show && (
        <div className="w-100 flex justify-center flex-column">
          <div className="mt4 ba pa3 bg-on-background">
            <div className="b" style={{ whiteSpace: 'pre-wrap' }}>{title}</div>
            <div className="db" style={{ whiteSpace: 'pre-wrap' }}>
              {content.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LessonElementToggle
