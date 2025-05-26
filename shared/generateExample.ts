import type {
  GenAIContext,
  GenerateExampleProps
} from "./types"

export const generateExample = ({
  language,
  context,
  options = {}
}: GenerateExampleProps): string | string[] => {
  if (language !== 'Spanish') {
    console.log(`Not Spanish: ${language}`)
    return options.asString ? '[]' : []
  }

  const examples: Record<GenAIContext, string[]> = {
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
    ]
  }

  const raw = examples[context]
  return options.asString ? JSON.stringify(raw, null, 2) : raw
}
