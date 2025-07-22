import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { type Language } from '@cknTypes/types'
import { LANGUAGE, LANGUAGE_TITLE, SCREEN } from '@cknTypes/constants'

const SelectorLanguage: React.FC = () => {
  const { targetLanguage, setTargetLanguage, screenState } = useAppContext()

  const languages: Language[] = [
    LANGUAGE.ENGLISH,
    LANGUAGE.SPANISH,
    LANGUAGE.FRENCH,
    LANGUAGE.ITALIAN
  ]

  return (
    <div className="mb3X">
      <label className="db mb2 f5 b">Choose a language:</label>
      <div className="flex flex-wrap flex-columnX">
        {languages.map((code) => (
          <label key={code} className="mr3 mb2 flex items-center">
            <input
              tabIndex={screenState[SCREEN.GEN_AI_PRO] ? 0 : -1}
              aria-disabled={!screenState[SCREEN.GEN_AI_PRO]}
              type="radio"
              name="language" // fixed name ensures exclusive selection
              value={code}
              checked={targetLanguage === code}
              onChange={() => setTargetLanguage(code)}
              className="mr1"
            />
            {LANGUAGE_TITLE[code]}
          </label>
        ))}
      </div>
    </div>
  )
}

export default SelectorLanguage
