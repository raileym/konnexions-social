import {
  LANGUAGE,
  type GenerateExampleProps,
  type Line,
  type Lines,
  type ModuleName
} from "./types"

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
      "F|Camarera|¡Bienvenidos al restaurante! ¿Cuántos son en su grupo?",
      "M|Cliente|Somos cuatro. ¿Podemos sentarnos cerca de la ventana?",
      "F|Camarera|Por supuesto. Síganme, por favor.",
      "M|Cliente|Gracias."
    ],
    nouns: [
      "restaurante|restaurantes|masculino|a, en, desde, sobre",
      "noche|noches|femenino|en, durante, por",
      "ensalada|ensaladas|femenino|con, sin, de, para",
      "pollo|pollos|masculino|con, sin, de, para"
    ],
    verbs: [
      "gustar|me gusta|te gusta|le gusta|nos gusta|os gusta|les gusta",
      "ordenar|ordeno|ordenas|ordena|ordenamos|ordenáis|ordenan",
      "pedir|pido|pides|pide|pedimos|pedís|piden"
    ],
    dialogReview: [
      "1. Buenas tardes, ¿qué le gustaría tomar?",
      "2. Me gustaría una limonada, por favor.",
      "3. En un momento le traigo su bebida."
    ],
    nounsReview: [
      "masculino|restaurante|restaurantes|a, en, desde, sobre",
      "femenino|noche|noches|en, durante, por",
      "femenino|ensalada|ensaladas|con, sin, de, para",
      "masculino|pollo|pollos|con, sin, de, para"
    ],
    verbsReview: [
      "gustar|me gusta|te gusta|le gusta|nos gusta|os gusta|les gusta",
      "ordenar|ordeno|ordenas|ordena|ordenamos|ordenáis|ordenan",
      "pedir|pido|pides|pide|pedimos|pedís|piden"
    ],
    verbsExpanded: [],
    verbsExpandedFull: [
      " 1. yo estoy en casa.",
      " 2. tú estás en la escuela.",
      " 3. él/ella/usted está en el restaurante.",
      " 4. nosotros/nosotras estamos en el parque.",
      " 5. vosotros/vosotras estáis en la clase.",
      " 6. ellos/ellas/ustedes están en el hotel.",
      " 7. yo tomo un café por la mañana.",
    ]
  }

  const raw = examples[moduleName]
  return options.asString ? JSON.stringify(raw, null, 2) : raw
}
