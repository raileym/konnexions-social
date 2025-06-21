import {
  scenarioTitles,
  type ChooseParticipantLinesProps,
  type GetScenarioDetailsProps,
  type ParticipantProse,
  type ParticipantLinesByLanguage,
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

const scenarioParticipants: Record<Scenario, { participantLinesByLanguage: ParticipantLinesByLanguage }> = {
  restaurant: {
    participantLinesByLanguage: {
      [LANGUAGE.ENGLISH]: [
        'the host',
        'the hostess',
        'a waiter',
        'a waitress',
        'the bartender',
        'the chef',
        'a male diner',
        'a female diner',
        'a couple seated nearby'
      ],
      [LANGUAGE.SPANISH]: [
        'el anfitrión',
        'la anfitriona',
        'un camarero',
        'una camarera',
        'el barman',
        'el chef',
        'un comensal (hombre)',
        'una comensal (mujer)',
        'una pareja sentada cerca'
      ],
      [LANGUAGE.FRENCH]: [
        'le maître d’hôtel',
        'l’hôtesse',
        'un serveur',
        'une serveuse',
        'le barman',
        'le chef',
        'un client (homme)',
        'une cliente (femme)',
        'un couple assis à proximité'
      ],
      [LANGUAGE.ITALIAN]: [
        'il padrone di sala',
        'la padrona di sala',
        'un cameriere',
        'una cameriera',
        'il barista',
        'lo chef',
        'un cliente (uomo)',
        'una cliente (donna)',
        'una coppia seduta vicino'
      ]
    }
  },
  hotel: {
    participantLinesByLanguage: {
      [LANGUAGE.ENGLISH]: [
        'the front desk agent',
        'concierge',
        'bellhop',
        'housekeeper',
        'a male guest',
        'a female guest',
        'the hotel manager'
      ],
      [LANGUAGE.SPANISH]: [
        'el recepcionista',
        'el conserje',
        'el botones',
        'la camarera de piso',
        'un huésped (hombre)',
        'una huésped (mujer)',
        'el gerente del hotel'
      ],
      [LANGUAGE.FRENCH]: [
        'le réceptionniste',
        'le concierge',
        'le porteur',
        'la femme de chambre',
        'un client (homme)',
        'une cliente (femme)',
        'le directeur de l’hôtel'
      ],
      [LANGUAGE.ITALIAN]: [
        'l’addetto alla reception',
        'il concierge',
        'il facchino',
        'la cameriera ai piani',
        'un ospite (uomo)',
        'una ospite (donna)',
        'il direttore dell’hotel'
      ]
    }
  },
  airport: {
    participantLinesByLanguage: {
      [LANGUAGE.ENGLISH]: [
        'an airline agent',
        'a gate attendant',
        'a TSA officer',
        'a baggage handler',
        'a flight attendant',
        'a male traveler',
        'a female traveler'
      ],
      [LANGUAGE.SPANISH]: [
        'un agente de aerolínea',
        'un asistente de puerta',
        'un oficial de seguridad (TSA)',
        'un encargado de equipaje',
        'un auxiliar de vuelo',
        'un viajero',
        'una viajera'
      ],
      [LANGUAGE.FRENCH]: [
        'un agent de la compagnie aérienne',
        'un agent d’embarquement',
        'un agent de sécurité',
        'un bagagiste',
        'un steward / une hôtesse de l’air',
        'un voyageur',
        'une voyageuse'
      ],
      [LANGUAGE.ITALIAN]: [
        'un impiegato della compagnia aerea',
        'un assistente al gate',
        'un agente di sicurezza',
        'un addetto ai bagagli',
        'un assistente di volo',
        'un viaggiatore',
        'una viaggiatrice'
      ]
    }
  },
  taxi: {
    participantLinesByLanguage: {
      [LANGUAGE.ENGLISH]: [
        'the driver',
        'a rideshare driver',
        'a dispatcher',
        'a male passenger',
        'a female passenger',
        'a couple sharing the ride',
        'a tourist unfamiliar with the city'
      ],
      [LANGUAGE.SPANISH]: [
        'el conductor',
        'un conductor de rideshare',
        'el despachador',
        'un pasajero',
        'una pasajera',
        'una pareja compartiendo el viaje',
        'un turista que no conoce la ciudad'
      ],
      [LANGUAGE.FRENCH]: [
        'le chauffeur',
        'un chauffeur de VTC',
        'le répartiteur',
        'un passager',
        'une passagère',
        'un couple partageant la course',
        'un touriste qui ne connaît pas la ville'
      ],
      [LANGUAGE.ITALIAN]: [
        'l’autista',
        'un autista di rideshare',
        'il centralinista',
        'un passeggero',
        'una passeggera',
        'una coppia che condivide il viaggio',
        'un turista che non conosce la città'
      ]
    }
  },
  custom: {
    participantLinesByLanguage: {
      [LANGUAGE.ENGLISH]: ['WHICH DIALOG PARTICIPANTS'],
      [LANGUAGE.SPANISH]: ['¿QUÉ PARTICIPANTES EN EL DIÁLOGO?'],
      [LANGUAGE.FRENCH]: ['QUELS INTERVENANTS DANS LE DIALOGUE ?'],
      [LANGUAGE.ITALIAN]: ['QUALI PARTECIPANTI NEL DIALOGO?']
    }
  }
}


const chooseParticipantLines = ({ participantLines, targetLanguage, n, useMyself }: ChooseParticipantLinesProps): ParticipantProse => {
  if (!participantLines || participantLines.length === 0 || n <= 0) {
    // cXnsole.log('error out too soon')
    return ''
  }

  const count = useMyself ? n - 1 : n
  const shuffled = [...participantLines].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, Math.min(count, participantLines.length))

  if (useMyself) selected.unshift(targetLanguage === LANGUAGE.SPANISH ? 'yo mismo' : 'myself')

  const quoted = selected.map(p => `'${p}'`)

  if (quoted.length === 1) return quoted[0]
  if (quoted.length === 2) return `${quoted[0]} and ${quoted[1]}`

  if (selected.length === 1) return selected[0]
  if (selected.length === 2) return `${selected[0]} and ${selected[1]}`

  const last = quoted.pop()
  return `${quoted.join(', ')}, and ${last}`
}


export function getScenarioDetails({scenario, language}: GetScenarioDetailsProps) {
  const participantList = chooseParticipantLines({ participantLines: scenarioParticipants[scenario].participantLinesByLanguage[LANGUAGE.SPANISH], n: 2, useMyself: false, language })

  return {
    scenarioTitle: scenarioTitles[scenario],
    participantList: participantList
  }
}

