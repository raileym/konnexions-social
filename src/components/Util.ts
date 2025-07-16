import {
  type Gender
} from '@cknTypes/types'
import {
  GENDER_TO_ARTICLE
} from '@cknTypes/constants'


export const getArticle = (gender: Gender) => GENDER_TO_ARTICLE[gender]

export function capitalize(word: string): string {
  if (!word) return ''
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export const cleanTextForTTS = (text: string) => {
  const updatedText = text
    .replace(/^\d+\.\s*/gm, '')      // remove leading numbers like "1. " from each line
    .replace(/\*\*/g, '')            // remove double asterisks
    .replace(/\*/g, '')              // remove single asterisks
    .replace(/#/g, '');              // remove hash marks
  return updatedText;
}

export const isOnlyNumbers = (str: string): boolean => {
  return /^\d+$/.test(str)
}