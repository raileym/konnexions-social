import {
  scenarioTitles,
  // type ChooseParticipantLinesProps,
  type GetScenarioDetailsProps,
  // type ParticipantProse,
  // type ParticipantLinesByLanguage,
  type Scenario,
  type Gender
} from '@cknTypes/types'
import {
  LANGUAGE,
  GENDER_TO_ARTICLE
} from '@cknTypes/constants'

export const getCurrentWeek = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const diff = (now.getTime() - start.getTime()) / 86400000
  return Math.floor((diff + start.getDay() + 1) / 7)
}

export const getArticle = (gender: Gender) => GENDER_TO_ARTICLE[gender]

const scenarioParticipants: Record<Scenario, {
  participantLinesByLanguage: Record<string, {
    vendor: string[]
    customer: string[]
  }>
}> = {
  restaurant: {
    participantLinesByLanguage: {
      [LANGUAGE.ENGLISH]: {
        vendor: [
          'the host',
          'the hostess',
          'a waiter',
          'a waitress',
          'the bartender',
          'the chef'
        ],
        customer: [
          'a male diner',
          'a female diner',
          'a couple seated nearby'
        ]
      },
      [LANGUAGE.SPANISH]: {
        vendor: [
          'el anfitrión',
          'la anfitriona',
          'un camarero',
          'una camarera',
          'el barman',
          'el chef'
        ],
        customer: [
          'un comensal (hombre)',
          'una comensal (mujer)',
          'una pareja sentada cerca'
        ]
      },
      [LANGUAGE.FRENCH]: {
        vendor: [
          'le maître d’hôtel',
          'l’hôtesse',
          'un serveur',
          'une serveuse',
          'le barman',
          'le chef'
        ],
        customer: [
          'un client (homme)',
          'une cliente (femme)',
          'un couple assis à proximité'
        ]
      },
      [LANGUAGE.ITALIAN]: {
        vendor: [
          'il padrone di sala',
          'la padrona di sala',
          'un cameriere',
          'una cameriera',
          'il barista',
          'lo chef'
        ],
        customer: [
          'un cliente (uomo)',
          'una cliente (donna)',
          'una coppia seduta vicino'
        ]
      }
    }
  },
  hotel: {
    participantLinesByLanguage: {
      [LANGUAGE.ENGLISH]: {
        vendor: [
          'the front desk agent',
          'concierge',
          'bellhop',
          'housekeeper',
          'the hotel manager'
        ],
        customer: [
          'a male guest',
          'a female guest'
        ]
      },
      [LANGUAGE.SPANISH]: {
        vendor: [
          'el recepcionista',
          'el conserje',
          'el botones',
          'la camarera de piso',
          'el gerente del hotel'
        ],
        customer: [
          'un huésped (hombre)',
          'una huésped (mujer)'
        ]
      },
      [LANGUAGE.FRENCH]: {
        vendor: [
          'le réceptionniste',
          'le concierge',
          'le porteur',
          'la femme de chambre',
          'le directeur de l’hôtel'
        ],
        customer: [
          'un client (homme)',
          'une cliente (femme)'
        ]
      },
      [LANGUAGE.ITALIAN]: {
        vendor: [
          'l’addetto alla reception',
          'il concierge',
          'il facchino',
          'la cameriera ai piani',
          'il direttore dell’hotel'
        ],
        customer: [
          'un ospite (uomo)',
          'una ospite (donna)'
        ]
      }
    }
  },
  airport: {
    participantLinesByLanguage: {
      [LANGUAGE.ENGLISH]: {
        vendor: [
          'an airline agent',
          'a gate attendant',
          'a TSA officer',
          'a baggage handler',
          'a flight attendant'
        ],
        customer: [
          'a male traveler',
          'a female traveler'
        ]
      },
      [LANGUAGE.SPANISH]: {
        vendor: [
          'un agente de aerolínea',
          'un asistente de puerta',
          'un oficial de seguridad (TSA)',
          'un encargado de equipaje',
          'un auxiliar de vuelo'
        ],
        customer: [
          'un viajero',
          'una viajera'
        ]
      },
      [LANGUAGE.FRENCH]: {
        vendor: [
          'un agent de la compagnie aérienne',
          'un agent d’embarquement',
          'un agent de sécurité',
          'un bagagiste',
          'un steward / une hôtesse de l’air'
        ],
        customer: [
          'un voyageur',
          'une voyageuse'
        ]
      },
      [LANGUAGE.ITALIAN]: {
        vendor: [
          'un impiegato della compagnia aerea',
          'un assistente al gate',
          'un agente di sicurezza',
          'un addetto ai bagagli',
          'un assistente di volo'
        ],
        customer: [
          'un viaggiatore',
          'una viaggiatrice'
        ]
      }
    }
  },
  taxi: {
    participantLinesByLanguage: {
      [LANGUAGE.ENGLISH]: {
        vendor: [
          'the driver',
          'a rideshare driver',
          'a dispatcher'
        ],
        customer: [
          'a male passenger',
          'a female passenger',
          'a couple sharing the ride',
          'a tourist unfamiliar with the city'
        ]
      },
      [LANGUAGE.SPANISH]: {
        vendor: [
          'el conductor',
          'un conductor de rideshare',
          'el despachador'
        ],
        customer: [
          'un pasajero',
          'una pasajera',
          'una pareja compartiendo el viaje',
          'un turista que no conoce la ciudad'
        ]
      },
      [LANGUAGE.FRENCH]: {
        vendor: [
          'le chauffeur',
          'un chauffeur de VTC',
          'le répartiteur'
        ],
        customer: [
          'un passager',
          'une passagère',
          'un couple partageant la course',
          'un touriste qui ne connaît pas la ville'
        ]
      },
      [LANGUAGE.ITALIAN]: {
        vendor: [
          'l’autista',
          'un autista di rideshare',
          'il centralinista'
        ],
        customer: [
          'un passeggero',
          'una passeggera',
          'una coppia che condivide il viaggio',
          'un turista che non conosce la città'
        ]
      }
    }
  },
  custom: {
    participantLinesByLanguage: {
      [LANGUAGE.ENGLISH]: { vendor: ['WHICH DIALOG PARTICIPANTS'], customer: [] },
      [LANGUAGE.SPANISH]: { vendor: ['¿QUÉ PARTICIPANTES EN EL DIÁLOGO?'], customer: [] },
      [LANGUAGE.FRENCH]: { vendor: ['QUELS INTERVENANTS DANS LE DIALOGUE ?'], customer: [] },
      [LANGUAGE.ITALIAN]: { vendor: ['QUALI PARTECIPANTI NEL DIALOGO?'], customer: [] }
    }
  }
}

export function getScenarioDetails({useMyself, scenario, language}: GetScenarioDetailsProps) {
  const { vendor, customer } = scenarioParticipants[scenario].participantLinesByLanguage[language]

  let selected: string[] = []

  if (useMyself) {
    selected = [language === LANGUAGE.SPANISH ? 'yo mismo' : 'myself']
    const other = vendor[Math.floor(Math.random() * vendor.length)]
    selected.push(other)
  } else {
    const v = vendor[Math.floor(Math.random() * vendor.length)]
    const c = customer[Math.floor(Math.random() * customer.length)]
    selected = [v, c].sort(() => Math.random() - 0.5)
  }

  return {
    scenarioTitle: scenarioTitles[scenario],
    // participantList: selected.map(p => `'${p}'`).join(' and ')
    participantList: selected.map(p => `${p}`).join(' and ')
  }
}
