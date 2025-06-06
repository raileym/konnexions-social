import { generateConjugatedLines } from "../generateConjugatedLines/generatedConjugatedLines"
import { type Lesson, LANGUAGE, type Lines, VERB_FORMATS, type VerbFormats } from "../../../../../shared/types"
import { zipLines } from "../zipLines/zipLines"

const formats: VerbFormats[] = Object.values(VERB_FORMATS)

export function generateVerbLists(lesson: Lesson): Record<VerbFormats, Lines> {
  if (!Array.isArray(lesson?.verbs?.lines)) return {} as Record<VerbFormats, Lines>

  const result = {} as Record<VerbFormats, Lines>

  formats.forEach((format) => {
    let lines: Lines = []

    if (format === "complete") {
      lines = lesson.verbsExpandedComplete?.lines ?? []
    } else if (format === "pronounAndConjugation") {
      const pronouns = generateConjugatedLines({
        verbsLines: lesson.verbs.lines,
        language: LANGUAGE.SPANISH,
        returnFormat: "pronoun",
        noIndex: true,
        noPeriod: true
      })
      const conjugations = generateConjugatedLines({
        verbsLines: lesson.verbs.lines,
        language: LANGUAGE.SPANISH,
        returnFormat: "conjugation",
        noIndex: true,
        noPeriod: true
      })
      lines = zipLines({ left: pronouns, right: conjugations, noIndex: false, noPeriod: false})
    } else if (format === "triple") {
      const conjugations = generateConjugatedLines({
        verbsLines: lesson.verbs.lines,
        language: LANGUAGE.SPANISH,
        returnFormat: "conjugation",
        noIndex: true,
        noPeriod: true
      })
      const conjugationsWithPeriod = generateConjugatedLines({
        verbsLines: lesson.verbs.lines,
        language: LANGUAGE.SPANISH,
        returnFormat: "conjugation",
        noIndex: true,
        noPeriod: false
      })
      const pronouns = generateConjugatedLines({
        verbsLines: lesson.verbs.lines,
        language: LANGUAGE.SPANISH,
        returnFormat: "pronoun",
        noIndex: true,
        noPeriod: true
      })
      const pronounConj = zipLines({ left: pronouns, right: conjugationsWithPeriod, noIndex: true, noPeriod: true})
      const complete = lesson.verbsExpandedComplete?.lines ?? []
      const linesPre = zipLines({left: conjugationsWithPeriod, right: pronounConj, noIndex: false, noPeriod: true})
      lines = zipLines({left: linesPre, right: complete, noIndex: false, noPeriod: true})
    } else if (format === "incomplete") {
      lines = generateConjugatedLines({
        verbsLines: lesson.verbs.lines,
        language: LANGUAGE.SPANISH,
        returnFormat: format,
        noIndex: false,
        noPeriod: true
      })
    } else {
      lines = generateConjugatedLines({
        verbsLines: lesson.verbs.lines,
        language: LANGUAGE.SPANISH,
        returnFormat: format,
        noIndex: false
      })
    }

    result[format] = lines
  })

  return result
}
