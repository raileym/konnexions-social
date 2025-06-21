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
    // cXnsole.log(`Not Spanish: ${language}`)
    return options.asString ? '[]' : []
  }

  const examples: Record<ModuleName, string[]> = {
    dialog: [
      'f|Camarera|¡Bienvenidos al restaurante! ¿Cuántos son en su grupo?',
      'm|Cliente|Somos cuatro. ¿Podemos sentarnos cerca de la ventana?',
      'f|Camarera|Por supuesto. Síganme, por favor.',
      'm|Cliente|Gracias.'
    ],
    nouns: [
      'restaurante|restaurantes|masculino|a, en, desde, sobre',
      'noche|noches|femenino|en, durante, por',
      'ensalada|ensaladas|femenino|con, sin, de, para',
      'pollo|pollos|masculino|con, sin, de, para'
    ],
    nounsMissing: [
      'restaurant|restaurante|restaurantes|m',
      'night|noche|noches|f',
      'salad|ensalada|ensaladas|f',
      'chicken|pollo|pollos|m'
    ],
    nounsMissingReview: [
      '1. restaurant|restaurante|restaurantes|m',
      '2. night|noche|noches|f',
      '3. salad|ensalada|ensaladas|f',
      '4. pollo|pollos|m'
    ],
    nounsOnly: [
      'mesa',
      'silla',
      'camarero',
      'menú',
      'comida'
    ],
    verbs: [
      'gustar|me gusta|te gusta|le gusta|nos gusta|os gusta|les gusta',
      'ordenar|ordeno|ordenas|ordena|ordenamos|ordenáis|ordenan',
      'pedir|pido|pides|pide|pedimos|pedís|piden'
    ],
    verbsMissing: [
      'like|gustar|me gusta|te gusta|le gusta|nos gusta|os gusta|les gusta',
      'order|ordenar|ordeno|ordenas|ordena|ordenamos|ordenáis|ordenan',
      'request|pedir|pido|pides|pide|pedimos|pedís|piden'
    ],
    verbsMissingReview: [
      '1. like|gustar|me gusta|te gusta|le gusta|nos gusta|os gusta|les gusta',
      '2. order|ordenar|ordeno|ordenas|ordena|ordenamos|ordenáis|ordenan',
      '3. request|pedir|pido|pides|pide|pedimos|pedís|piden'
    ],
    verbsOnly: [
      'gustar',
      'ordenar',
      'pedir'
    ],
    dialogReview: [
      '1. Buenas tardes, ¿qué le gustaría tomar?',
      '2. Me gustaría una limonada, por favor.',
      '3. En un momento le traigo su bebida.'
    ],
    nounsReview: [
      'masculino|restaurante|restaurantes|a, en, desde, sobre',
      'femenino|noche|noches|en, durante, por',
      'femenino|ensalada|ensaladas|con, sin, de, para',
      'masculino|pollo|pollos|con, sin, de, para'
    ],
    nounsOnlyReview: [
      'mesa',
      'silla',
      'camarero',
      'menú',
      'comida'
    ],
    verbsReview: [
      'gustar|me gusta|te gusta|le gusta|nos gusta|os gusta|les gusta',
      'ordenar|ordeno|ordenas|ordena|ordenamos|ordenáis|ordenan',
      'pedir|pido|pides|pide|pedimos|pedís|piden'
    ],
    verbsOnlyReview: [
      'gustar',
      'ordenar',
      'pedir'
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
    verbsOnlyMissing: [],
    nounsOnlyMissing: []
  }

  const raw = examples[moduleName]
  return options.asString ? JSON.stringify(raw, null, 2) : raw
}
