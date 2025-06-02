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
      "Camarera|¡Bienvenidos al restaurante! ¿Cuántos son en su grupo?",
      "Cliente|Somos cuatro. ¿Podemos sentarnos cerca de la ventana?",
      "Camarera|Por supuesto. Síganme, por favor.",
      "Cliente|Gracias."
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
      "Buenas tardes. ¿Qué desea tomar?|Buenas tardes, ¿qué le gustaría tomar?",
      "Una limonada, por favor.|Me gustaría una limonada, por favor.",
      "En seguida.|En un momento le traigo su bebida."
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
    ]
  }

  const raw = examples[moduleName]
  return options.asString ? JSON.stringify(raw, null, 2) : raw
}
