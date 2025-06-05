import React from 'react'

type ExpandedVerbListProps = {
  verbs: string[] // lesson.verbs.list
}

export const ExpandedVerbList: React.FC<ExpandedVerbListProps> = ({ verbs }) => {
  const expandedLines = verbs.flatMap((line) => {
    const [infinitive, ...conjugations] = line.split('|')
    return conjugations.map((form) => `${infinitive} → ${form}`)
  })

  return (
    <ul className="pa3">
      {expandedLines.map((entry, i) => (
        <li key={i} className="pb2">{entry}</li>
      ))}
    </ul>
  )
}
