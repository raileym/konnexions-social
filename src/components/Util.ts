import { type ChooseParticipantsProps, type GetScenarioDetailsProps, type ParticipantArrayByLanguage, type ParticipantList, type ParticipantsByLanguage, type ScenarioLabels, type ScenarioTitles, type ScenarioValue } from "../../shared/types"

export const getCurrentWeek = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const diff = (now.getTime() - start.getTime()) / 86400000
  return Math.floor((diff + start.getDay() + 1) / 7)
}

const scenarioTitles: ScenarioTitles = {
  restaurant: 'Restaurant',
  hotel: 'Hotel',
  airport: 'Airport',
  taxi: 'Taxi',
  custom: 'Custom'
}

const scenarioLabels: ScenarioLabels = {
  restaurant: 'at the restaurant',
  hotel: 'at the hotel',
  airport: 'at the airport',
  taxi: 'in a taxi',
  custom: 'Custom'
}

const scenarioParticipants: Record<ScenarioValue, { participantsByLanguage: ParticipantsByLanguage }> = {
  restaurant: {
    participantsByLanguage: {
      EN: [
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
      ES: [
        'el anfitrión',
        'la anfitriona',
        'un camarero',
        'una camarera',
        'el barman',
        'el chef',
        'un comensal (hombre)',
        'una comensal (mujer)',
        'una pareja sentada cerca'
      ]
    }
  },
  hotel: {
    participantsByLanguage: {
      EN: [
        'the front desk agent',
        'concierge',
        'bellhop',
        'housekeeper',
        'a male guest',
        'a female guest',
        'the hotel manager'
      ],
      ES: [
        'el recepcionista',
        'el conserje',
        'el botones',
        'la camarera de piso',
        'un huésped (hombre)',
        'una huésped (mujer)',
        'el gerente del hotel'
      ]
    }
  },
  airport: {
    participantsByLanguage: {
      EN: [
        'an airline agent',
        'a gate attendant',
        'a TSA officer',
        'a baggage handler',
        'a flight attendant',
        'a male traveler',
        'a female traveler'
      ],
      ES: [
        'un agente de aerolínea',
        'un asistente de puerta',
        'un oficial de seguridad (TSA)',
        'un encargado de equipaje',
        'un auxiliar de vuelo',
        'un viajero',
        'una viajera'
      ]
    }
  },
  taxi: {
    participantsByLanguage: {
      EN: [
        'the driver',
        'a rideshare driver',
        'a dispatcher',
        'a male passenger',
        'a female passenger',
        'a couple sharing the ride',
        'a tourist unfamiliar with the city'
      ],
      ES: [
        'el conductor',
        'un conductor de rideshare',
        'el despachador',
        'un pasajero',
        'una pasajera',
        'una pareja compartiendo el viaje',
        'un turista que no conoce la ciudad'
      ]
    }
  },
  custom: {
    participantsByLanguage: {
      EN: ['WHICH DIALOG PARTICIPANTS'],
      ES: ['¿QUÉ PARTICIPANTES EN EL DIÁLOGO?']
    }
  }
}

// export function getScenarioDetails(scenario: ScenarioValue) {

// const langKeyMap: Record<Language, LangValue> = {
//   Spanish: LANG_KEYS.ES,
//   English: LANG_KEYS.EN
// }

const chooseParticipants = ({ participantArrayByLanguage, language, n, useMyself }: ChooseParticipantsProps): ParticipantList => {
  const participantArray = participantArrayByLanguage[language]

  if (!participantArray || participantArray.length === 0 || n <= 0) return ''

  const count = useMyself ? n - 1 : n
  const shuffled = [...participantArray].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, Math.min(count, participantArray.length))

  if (useMyself) selected.unshift(language === 'Spanish' ? 'yo mismo' : 'myself')

  if (selected.length === 1) return selected[0]
  if (selected.length === 2) return `${selected[0]} y ${selected[1]}`

  const last = selected.pop()
  return `${selected.join(', ')}, y ${last}`
}


export function getScenarioDetails({scenario, language}: GetScenarioDetailsProps) {
  console.log(`scenario: ${scenario}`)
  const participantArrayByLanguage = scenarioParticipants[scenario].participantsByLanguage as ParticipantArrayByLanguage
  const participantList = chooseParticipants({ participantArrayByLanguage, n: 2, useMyself: false, language })

  return {
    scenarioLabel: scenarioLabels[scenario],
    scenarioTitle: scenarioTitles[scenario],
    scenarioParticipantList: participantList
  }
}

