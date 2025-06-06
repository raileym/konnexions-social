import type { Lesson } from "../../../../../shared/types"
import { generateVerbLists } from "../generateVerbLists/generateVerbLists"

export function DebugVerbLists({ lesson }: { lesson: Lesson }) {
  const verbLists = generateVerbLists(lesson)

  return (
    <>
      {Object.entries(verbLists).map(([format, lines]) => {
        const title = `[DEBUG] ${format.charAt(0).toUpperCase() + format.slice(1)}`
          .replace("And", " and ")
          .replace(/([a-z])([A-Z])/g, '$1 $2')

        return (
          <div key={format}>
            <h3 className="mt4 mb2">{title} sentences</h3>
            <ul className="debug-list">
              {lines.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>
        )
      })}
    </>
  )
}
