import type { Participants, ScenarioLabels, ScenarioTitles, ScenarioValue } from "../cknTypes/types/types"

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

const scenarioParticipantsOld: Record<ScenarioValue, string> = {
  restaurant:
    `the host, hostess, waiter, waitress, bartender,
chef, a male diner, a female diner, or a couple
seated nearby`,
    hotel:
    `the front desk agent, concierge, bellhop, 
housekeeper, a male guest, a female guest, 
or the hotel manager`,
    airport:
    `an airline agent, a gate attendant, a TSA officer,
    a baggage handler, a flight attendant, a male traveler,
    or a female traveler`,
    taxi:
    `the driver, a rideshare driver, a dispatcher,
a male passenger, a female passenger, a couple
sharing the ride, or a tourist unfamiliar with the city`,
    custom:
    'WHICH DIALOG PARTICIPANTS',
}

const scenarioParticipants: Record<ScenarioValue, { participants: Participants }> = {
  restaurant: {
    participants: [
      'the host',
      'the hostess',
      'a waiter',
      'a waitress',
      'the bartender',
      'the chef',
      'a male diner',
      'a female diner',
      'a couple seated nearby',
    ],
  },
  hotel: {
    participants: [
      'the front desk agent',
      'concierge',
      'bellhop',
      'housekeeper',
      'a male guest',
      'a female guest',
      'the hotel manager',
    ],
  },
  airport: {
    participants: [
      'an airline agent',
      'a gate attendant',
      'a TSA officer',
      'a baggage handler',
      'a flight attendant',
      'a male traveler',
      'a female traveler',
    ],
  },
  taxi: {
    participants: [
      'the driver',
      'a rideshare driver',
      'a dispatcher',
      'a male passenger',
      'a female passenger',
      'a couple sharing the ride',
      'a tourist unfamiliar with the city',
    ],
  },
  custom: {
    participants: ['WHICH DIALOG PARTICIPANTS'],
  },
}

export function getScenarioDetails(scenario: ScenarioValue) {
  return {
    scenarioLabel: scenarioLabels[scenario],
    scenarioTitle: scenarioTitles[scenario],
    scenarioParticipantsOld: scenarioParticipantsOld[scenario],
    scenarioParticipants: scenarioParticipants[scenario].participants,
  }
}
