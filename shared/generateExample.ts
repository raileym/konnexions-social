import {
  type GenerateExampleProps,
  type LessonPromptStyle,
  type Line,
  type Lines,
  type ModuleName
} from '@cknTypes/types'
import {
  LANGUAGE,
  LESSON_PROMPT_STYLE
} from '@cknTypes/constants'

// ✅ Overload declarations — DO NOT use 'const' or 'export'
export function generateExample(props: GenerateExampleProps & { options: { asString: true }, lessonPromptStyle: LessonPromptStyle }): string
export function generateExample(props: GenerateExampleProps & { options?: { asString?: false }, lessonPromptStyle: LessonPromptStyle }): string[]

// ✅ Implementation (this one is exported)
export function generateExample({
  language,
  moduleName,
  lessonPromptStyle,
  options = {}
}: GenerateExampleProps & { lessonPromptStyle: string }): Line | Lines {
  if (language !== LANGUAGE.SPANISH) {
    return options.asString ? '[]' : []
  }

  const dialogExamples: Record<string, string[]> = {
    [LESSON_PROMPT_STYLE.DIALOG]: [
      'f|Camarera|¡Bienvenidos al restaurante! ¿Cuántos son en su grupo?',
      'm|Cliente|Somos cuatro. ¿Podemos sentarnos cerca de la ventana?',
      'f|Camarera|Por supuesto. Síganme, por favor.',
      'm|Cliente|Gracias.'
    ],
    [LESSON_PROMPT_STYLE.DESCRIPTION]: [
      'Estoy sentado en una terraza en París mientras el camarero se acerca.',
      'El sol brilla suavemente y la calle está llena de vida.',
      'Pido un café con leche en francés básico.',
      'El camarero sonríe y toma mi orden con amabilidad.'
    ],
    [LESSON_PROMPT_STYLE.COMMENTARY]: [
      'Llegar a París fue un sueño hecho realidad.',
      'La cultura del café aquí es completamente diferente.',
      'Observar a los locales mientras beben espresso es fascinante.',
      'Este café tiene una atmósfera encantadora.'
    ],
    [LESSON_PROMPT_STYLE.POEM]: [
      'En la calle París al atardecer,',
      'Pido un café, no puedo creer,',
      'El aroma flota en el aire sutil,',
      'El camarero asiente, todo es sutil.'
    ],
    [LESSON_PROMPT_STYLE.STORY]: [
      'Juan llegó a París por primera vez y se sentó en un café.',
      'Vio a un camarero pasar y decidió pedir un café.',
      'Mientras esperaba, observaba la vida parisina pasar.',
      'El café llegó humeante y perfecto para el momento.'
    ],
    [LESSON_PROMPT_STYLE.INSTRUCTION]: [
      'Busca una mesa libre en la terraza del café.',
      'Saluda al camarero con una sonrisa.',
      'Pide un café en español claro y simple.',
      'Agradece cuando te traigan tu bebida.'
    ],
    [LESSON_PROMPT_STYLE.OPINION]: [
      'Creo que los cafés en París tienen un encanto especial.',
      'Me gusta cómo los camareros son atentos y rápidos.',
      'Prefiero pedir un café con leche en lugar de espresso.',
      'En mi opinión, sentarse afuera mejora la experiencia.'
    ],
    [LESSON_PROMPT_STYLE.COMPARISON]: [
      'En París, el café es más fuerte que en mi país.',
      'Los camareros aquí son más formales.',
      'El ambiente es más tranquilo que en cafeterías de casa.',
      'El servicio es más lento, pero también más relajado.'
    ],
    [LESSON_PROMPT_STYLE.LIST]: [
      '1. Encontrar una mesa libre.',
      '2. Sentarse cómodamente.',
      '3. Llamar al camarero.',
      '4. Pedir un café con leche.'
    ],
    [LESSON_PROMPT_STYLE.QUESTION_SET]: [
      '¿Dónde estás sentado?',
      '¿Qué bebida vas a pedir?',
      '¿Cómo responde el camarero?',
      '¿Qué ves alrededor de ti?'
    ]
  }

  const translationExamples: Record<string, string[]> = {
    [LESSON_PROMPT_STYLE.DIALOG]: [
      '1. Good afternoon, what would you like to drink?',
      '2. I would like a lemonade, please.',
      '3. I’ll bring you your drink in a moment.'
    ],
    [LESSON_PROMPT_STYLE.DESCRIPTION]: [
      '1. I am sitting at a café in Paris.',
      '2. The waiter approaches and I order a coffee.',
      '3. The atmosphere is calm and relaxed.'
    ],
    [LESSON_PROMPT_STYLE.COMMENTARY]: [
      '1. The coffee culture in Paris is charming.',
      '2. I noticed how everyone takes their time.',
      '3. It’s a refreshing change of pace.'
    ],
    [LESSON_PROMPT_STYLE.POEM]: [
      '1. The sun is low, the mood is sweet,',
      '2. Coffee warms my hands and feet,',
      '3. A Paris dream beneath my seat.'
    ],
    [LESSON_PROMPT_STYLE.STORY]: [
      '1. He arrived in Paris and sought a café.',
      '2. He greeted the waiter with a smile.',
      '3. It was his first real moment of peace.'
    ],
    [LESSON_PROMPT_STYLE.INSTRUCTION]: [
      '1. Find an open seat outside the café.',
      '2. Say hello to the waiter politely.',
      '3. Ask for a coffee in simple Spanish.'
    ],
    [LESSON_PROMPT_STYLE.OPINION]: [
      '1. I think Paris cafés are cozy.',
      '2. I like how people relax with their coffee.',
      '3. In my opinion, the service is excellent.'
    ],
    [LESSON_PROMPT_STYLE.COMPARISON]: [
      '1. The coffee here is stronger than at home.',
      '2. Waiters are more formal than I’m used to.',
      '3. The pace is slower, but more enjoyable.'
    ],
    [LESSON_PROMPT_STYLE.LIST]: [
      '1. Sit down.',
      '2. Call the waiter.',
      '3. Order a drink.'
    ],
    [LESSON_PROMPT_STYLE.QUESTION_SET]: [
      '1. Where are you sitting?',
      '2. What do you order?',
      '3. What is the waiter like?'
    ]
  }

  const examples: Record<ModuleName, string[]> = {
    dialogDraft: dialogExamples[lessonPromptStyle] || [],
    nounsDraft: [
      'restaurant|restaurante|restaurantes|m',
      'night|noche|noches|f',
      'salad|ensalada|ensaladas|f',
      'chicken|pollo|pollos|m'
    ],
    translationDraft: translationExamples[lessonPromptStyle] || [],
    verbsDraft: [
      'like|gustar|me gusta|te gusta|le gusta|nos gusta|os gusta|les gusta',
      'order|ordenar|ordeno|ordenas|ordena|ordenamos|ordenáis|ordenan',
      'ask for|pedir|pido|pides|pide|pedimos|pedís|piden'
    ],
    dialogReview: (dialogExamples[lessonPromptStyle] || []).map((line, index) => `${index + 1}. ${line}`),
    translationReview: (translationExamples[lessonPromptStyle] || []).map((line, index) => `${index + 1}. ${line}`),
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
      ' 7. yo tomo un café por la mañana.'
    ],
    verbsExpandedTriple: [],
    verbsExpandedInComplete: [],
    verbsResolve: [],
    nounsResolve: [],
    dialogResolve: [],
    translationResolve: [],
    errorModule: []
  }
  const raw = examples[moduleName]
  return options.asString ? JSON.stringify(raw, null, 2) : raw
}
