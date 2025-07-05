import type {
  JsonQualification, 
  GetJsonQualificationProps,
  GetJsonQualificationWithExampleProps
} from '../shared/cknTypes/types.js';

type detailsProps = {
  responseType: string
}
const details = ({responseType}: detailsProps) => {
  return(
    `
  - output must be well-formed JSON,
  - no trailing commas,
  - no single quotes,
  - use double quotes only,
  - no Markdown wrappers,
  - no comments,
  - no introductions,
  - no wrapping phrases,
  - no partial JSON blocks,
  - no explanatory text or prose, and
  - no headings, titles, or labels.

Important: Do not include a comma after the last item in the JSON array. Trailing commas will cause the response to be rejected.

Your ${responseType} response must be a single valid JSON array that starts with a left bracket "[" and ends with a right bracket "]". Do not prepend phrases like “Here is your JSON:”. Assume the consumer is a machine expecting strict JSON compliance.
`
  )
}
export const getJsonQualification = ({responseType}: GetJsonQualificationProps): JsonQualification => {
  return(details({responseType}))
}

export const getJsonQualificationWithExample = ({
  responseType,
  example
}: GetJsonQualificationWithExampleProps): JsonQualification => {
  return(
`The format of your ${responseType} response must take the form,
  ${example}
where this format uses well-formed JSON only with:
  
  - no trailing commas,
  - no single quotes,
  - use double quotes only,
  - no Markdown wrappers,
  - no comments,
  - no introductions,
  - no wrapping phrases,
  - no partial JSON blocks,
  - no explanatory text or prose, and
  - no headings, titles, or labels.

Important: Do not include a comma after the last item in the JSON array. Trailing commas will cause the response to be rejected.

Your ${responseType} response must be a single valid JSON array that starts with a left bracket "[" and ends with a right bracket "]". Do not prepend phrases like “Here is your JSON:”. Assume the consumer is a machine expecting strict JSON compliance.`
  )
}