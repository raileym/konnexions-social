import {
  type GenerateExampleProps,
  type Line,
  type Lines,
  type ModuleName
} from '@cknTypes/types'
import {
  LANGUAGE
} from '@cknTypes/constants'

// ✅ Overload declarations — DO NOT use 'const' or 'export'
export function generateExample(props: GenerateExampleProps & { options: { asString: true } }): string
export function generateExample(props: GenerateExampleProps & { options?: { asString?: false } }): string[]

// ✅ Implementation (this one is exported)
export function generateExample({
  language,
  moduleName,
  options = {}
}: GenerateExampleProps): Line | Lines {
  if (language !== LANGUAGE.SPANISH) {
    return options.asString ? '[]' : []
  }

  const examples: Record<ModuleName, string[]> = {
    dialogDraft: [
      'f|Camarera|¡Bienvenidos al restaurante! ¿Cuántos son en su grupo?',
      'm|Cliente|Somos cuatro. ¿Podemos sentarnos cerca de la ventana?',
      'f|Camarera|Por supuesto. Síganme, por favor.',
      'm|Cliente|Gracias.'
    ],
    nounsDraft: [
      'restaurant|restaurante|restaurantes|m',
      'night|noche|noches|f',
      'salad|ensalada|ensaladas|f',
      'chicken|pollo|pollos|m'
    ],
    translationDraft: [
      '1. Good afternoon, what would you like to drink?',
      '2. I would like a lemonade, please.',
      '3. I’ll bring you your drink in a moment.'
    ],
    verbsDraft: [
      'like|gustar|me gusta|te gusta|le gusta|nos gusta|os gusta|les gusta',
      'order|ordenar|ordeno|ordenas|ordena|ordenamos|ordenáis|ordenan',
      'ask for|pedir|pido|pides|pide|pedimos|pedís|piden'
    ],
    dialogReview: [
      '1. Buenas tardes, ¿qué le gustaría tomar?',
      '2. Me gustaría una limonada, por favor.',
      '3. En un momento le traigo su bebida.'
    ],
    translationReview: [
      '1. Good afternoon, what would you like to drink?',
      '2. I would like a lemonade, please.',
      '3. I’ll bring you your drink in a moment.'
    ],
    nounsReview: [
      '1. restaurant|restaurante|restaurantes|m',
      '2. night|noche|noches|f',
      '3. salad|ensalada|ensaladas|f',
      '4. chicken|pollo|pollos|m'
    ],
    verbsReview: [
      '1. like|gustar|me gusta|te gusta|le gusta|nos gusta|os gusta|les gusta',
      '2. order|ordenar|ordeno|ordenas|ordena|ordenamos|ordenáis|ordenan',
      '3. ask for|pedir|pido|pides|pide|pedimos|pedís|piden'
    ],
    verbsExpandedComplete: [
      ' 1. yo estoy en casa.',
      ' 2. tú estás en la escuela.',
      ' 3. él/ella/usted está en el restaurante.',
      ' 4. nosotros/nosotras estamos en el parque.',
      ' 5. vosotros/vosotras estáis en la clase.',
      ' 6. ellos/ellas/ustedes están en el hotel.',
      ' 7. yo tomo un café por la mañana.',
    ],
    verbsExpandedTriple: [],
    verbsExpandedInComplete: [],
    verbsResolve: [],
    nounsResolve: [],
    dialogResolve: [],
    translationResolve: []
  }
  const raw = examples[moduleName]
  return options.asString ? JSON.stringify(raw, null, 2) : raw
}
