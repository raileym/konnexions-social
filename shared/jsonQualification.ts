import { type JsonQualification } from "./types";

export const jsonQualification: JsonQualification = `
RESPONSE: Express your response using well-formed JSON only, with:

  - no trailing commas,
  - no single quotes (use double quotes only),
  - no Markdown wrappers,
  - no comments,
  - no explanatory text or prose or partial JSON blocks, and
  - no headings, titles, or labels.

The output must be a single valid JSON array, starting with a left bracket "[" and ending with a right bracket "]". Do not prepend phrases like “Here is your JSON:”. Assume the consumer is a machine expecting strict JSON compliance.
`