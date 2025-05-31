import {
  LANGUAGE,
  type GenerateExampleProps,
  type LessonTitle
} from "./types"

// ✅ Overload declarations — DO NOT use 'const' or 'export'
export function generateExample(props: GenerateExampleProps & { options: { asString: true } }): string
export function generateExample(props: GenerateExampleProps & { options?: { asString?: false } }): string[]

// ✅ Implementation (this one is exported)
export function generateExample({
  language,
  lessonTitle,
  options = {}
}: GenerateExampleProps): string | string[] {
  if (language !== LANGUAGE.SPANISH) {
    console.log(`Not Spanish: ${language}`)
    return options.asString ? '[]' : []
  }

  const examples: Record<LessonTitle, string[]> = {
    dialog: [
      "Camarera|¡Bienvenidos al restaurante! ¿Cuántos son en su grupo?",
      "Cliente|Somos cuatro. ¿Podemos sentarnos cerca de la ventana?",
      "Camarera|Por supuesto. Síganme, por favor.",
      "Cliente|Gracias."
    ],
    nouns: [
      "masculino|restaurante|restaurantes|a, en, desde, sobre",
      "femenino|noche|noches|en, durante, por",
      "femenino|ensalada|ensaladas|con, sin, de, para",
      "masculino|pollo|pollos|con, sin, de, para"
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

  const raw = examples[lessonTitle]
  return options.asString ? JSON.stringify(raw, null, 2) : raw
}
