import type {
  JsonQualification, 
  GetJsonQualificationProps,
  GetJsonQualificationWithExampleProps
} from '@cknTypes/types';

type detailsProps = {
  responseType: string
}
const details = ({responseType}: detailsProps) => {
  return(
    `
Formatting rules:
  
  - output must be well-formed JSON,
  - no trailing commas,
  - no single quotes,
  - use double quotes only,
  - no Markdown wrappers,
  - no comments,
  - no introductions,
  - no wrapping phrases,
  - no explanatory text or prose or partial JSON blocks, and
  - no headings, titles, or labels.

Your ${responseType} response must be a single valid JSON array, starting with a left bracket "[" and ending with a right bracket "]". Do not prepend phrases like “Here is your JSON:”. Assume the consumer is a machine expecting strict JSON compliance.
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
    - no single quotes (use double quotes only),
    - no Markdown wrappers,
    - no comments,
    - no explanatory text or prose or partial JSON blocks, and
    - no headings, titles, or labels.
  
Your ${responseType} response must be a single valid JSON array, starting with a left bracket "[" and ending with a right bracket "]". Do not prepend phrases like “Here is your JSON:”. Assume the consumer is a machine expecting strict JSON compliance.`
  )
}