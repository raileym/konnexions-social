import { generateConjugatedLines } from "../generateConjugatedLines/generatedConjugatedLines"
import { type Lesson, type Lines, type VerbFormats } from "@cknTypes/types"
import { LANGUAGE,  VERB_FORMATS } from "@cknTypes/constants"
import { zipLines } from "../zipLines/zipLines"

const formats: VerbFormats[] = Object.values(VERB_FORMATS)

export function generateVerbLists(lesson: Lesson, noIndex: boolean = false): Record<VerbFormats, Lines> {
  if (!Array.isArray(lesson?.verbs?.lines)) return {} as Record<VerbFormats, Lines>

  const result = {} as Record<VerbFormats, Lines>

  formats.forEach((format) => {
    let lines: Lines = []

    if (format === "complete") {
      lines = (lesson.verbsExpandedComplete?.lines ?? []).map(line => line.replace(/^\s*\d+\.\s*/, ""))
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
        noPeriod: true,
        noCap: true
      })
      lines = zipLines({ left: pronouns, right: conjugations, noIndex, noPeriod: false})
    } else if (format === "triple") {
      const conjugations = generateConjugatedLines({
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
      const pronounConj = zipLines({ left: pronouns, right: conjugations, noIndex: true, noPeriod: true})
      const complete = lesson.verbsExpandedComplete?.lines ?? []
      const linesPre = zipLines({left: conjugations, right: pronounConj, noIndex: false, noPeriod: true})
      lines = zipLines({left: linesPre, right: complete, noIndex, noPeriod: true})
    } else if (format === "incomplete") {
      lines = generateConjugatedLines({
        verbsLines: lesson.verbs.lines,
        language: LANGUAGE.SPANISH,
        returnFormat: format,
        noIndex,
        noPeriod: true
      })
    } else if (format === "conjugation") {
      lines = generateConjugatedLines({
        verbsLines: lesson.verbs.lines,
        language: LANGUAGE.SPANISH,
        returnFormat: format,
        noIndex,
        noPeriod: true
      })
    } else {
      lines = generateConjugatedLines({
        verbsLines: lesson.verbs.lines,
        language: LANGUAGE.SPANISH,
        returnFormat: format,
        noIndex
      })
    }

    result[format] = lines
  })

  return result
}
