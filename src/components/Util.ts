import {
  type Gender
} from '@cknTypes/types'
import {
  GENDER_TO_ARTICLE
} from '@cknTypes/constants'


export const getArticle = (gender: Gender) => GENDER_TO_ARTICLE[gender]
