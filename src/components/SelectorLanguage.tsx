import React from 'react'
import { useAppContext } from '../context/AppContext/AppContext'
import { type Language } from '@cknTypes/types'
import { LANGUAGE } from '@cknTypes/constants'

const SelectorLanguage: React.FC = () => {
  const {
    language,
    setLanguage
  } = useAppContext()

  const languages: Language[] = [
    LANGUAGE.ENGLISH,
    LANGUAGE.SPANISH,
    LANGUAGE.FRENCH,
    LANGUAGE.ITALIAN
  ]

  return (
    <>
      <div className="mb3">
        <label className="db mb2 f5 b">Choose a language:</label>
        <div className="flex flex-wrap">
          {languages.map((s) => (
            <label key={s} className="mr3 mb2 flex items-center">
              <input
                type="radio"
                name={`language-${Math.random().toString(36).slice(2)}`}
                // name="language"
                value={s}
                checked={language === s}
                onChange={() => setLanguage(s)}
                className="mr1"
              />
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </>
  )
}

export default SelectorLanguage
