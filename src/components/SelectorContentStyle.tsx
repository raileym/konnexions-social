import React, { useMemo } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { type ContentStyle } from '@cknTypes/types'
import { CONTENT_STYLE } from '@cknTypes/constants'

const SelectorContentStyle: React.FC = () => {
  const {
    contentStyle,
    setContentStyle
  } = useAppContext()

  const contentStyles = useMemo<ContentStyle[]>(() => Object.values(CONTENT_STYLE), [])

  return (
    <div className="mb3">
      <label className="db mb2 f5 b">Content Style:</label>
      <div className="flex flex-wrap flex-column">
        {contentStyles.map((style) => (
          <label key={style} className="mh3 mb1 flex items-center">
            <input
              type="radio"
              name="content-style"
              value={style}
              checked={contentStyle === style}
              onChange={() => setContentStyle(style)}
              className="mr1"
            />
            {style.charAt(0).toUpperCase() + style.slice(1)}
          </label>
        ))}
      </div>
    </div>
  )
}

export default SelectorContentStyle
