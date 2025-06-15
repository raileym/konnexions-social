import {
  LANGUAGE,
  SCENARIO,
} from "./types"
import type {
  Language,
  Nouns,
  Scenario,
  Verbs,
  GetConstraintsProps
} from "./types"


// ✅ Implementation (this one is exported)
export function getConstraints({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  language,
  scenario
}: GetConstraintsProps): { nouns: Nouns, verbs: Verbs } {

  const nounsList: Record<Language, Record<Scenario, Nouns>> = {
    [LANGUAGE.SPANISH]: {
      [SCENARIO.RESTAURANT]: [
        "mesa", "silla", "camarero", "menú", "comida",
        "bebida", "plato", "tenedor", "cuchillo", "cuchara",
        "servilleta", "cuenta", "vaso", "copa", "reserva",
        "cliente", "camarera", "postre", "entrada", "vino",
        "agua", "cerveza", "restaurante", "propina", "arroz"
      ],
      [SCENARIO.HOTEL]: [],
      [SCENARIO.AIRPORT]: [],
      [SCENARIO.TAXI]: [],
      [SCENARIO.CUSTOM]: []
    }
  }

  const verbsList: Record<Language, Record<Scenario, Nouns>> = {
    [LANGUAGE.SPANISH]: {
      [SCENARIO.RESTAURANT]: [
        "querer", "tener", "pedir", "servir", "comer",
        "beber", "traer", "venir", "ir", "gustar",
        "necesitar", "esperar", "reservar", "abrir", "cerrar",
        "recomendar", "probar", "pagar", "dejar", "elegir",
        "atender", "cocinar", "decir", "volver"
      ],
      [SCENARIO.HOTEL]: [],
      [SCENARIO.AIRPORT]: [],
      [SCENARIO.TAXI]: [],
      [SCENARIO.CUSTOM]: []
    },
    [LANGUAGE.ENGLISH]: {
      [SCENARIO.RESTAURANT]: [
        "want", "have", "ask for", "serve", "eat",
        "drink", "bring", "come", "go", "like",
        "need", "wait", "reserve", "open", "close",
        "recommend", "try", "pay",
        "leave",
        "choose",
        "attend to",
        "cook",
        "say",
        "return"
      ],
      [SCENARIO.HOTEL]: [],
      [SCENARIO.AIRPORT]: [],
      [SCENARIO.TAXI]: [],
      [SCENARIO.CUSTOM]: []
    }
  }

  return {
    nouns: nounsList[scenario],
    verbs: verbsList[scenario]
  }
}
