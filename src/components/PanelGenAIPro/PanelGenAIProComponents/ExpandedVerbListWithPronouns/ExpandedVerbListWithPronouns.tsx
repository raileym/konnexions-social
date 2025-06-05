import React from 'react'

type ExpandedVerbListProps = {
  verbs: string[] // lesson.verbs.list
}

const pronouns = [
  'yo',
  'tú',
  'él/ella/usted',
  'nosotros/nosotras',
  'vosotros/vosotras',
  'ellos/ellas/ustedes'
]

export const ExpandedVerbListWithPronouns: React.FC<ExpandedVerbListProps> = ({ verbs }) => {
  const expandedLines = verbs.flatMap((line) => {
    const [infinitive, ...conjugations] = line.split('|')
    return conjugations.map((form, index) => {
      const pronoun = pronouns[index] || '—'
      return `${infinitive} → ${form}. ${pronoun} ${form}.`
    })
  })

  return (
    <ul className="pa3">
      {expandedLines.map((entry, i) => (
        <li key={i} className="pb2">{entry}</li>
      ))}
    </ul>
  )
}
