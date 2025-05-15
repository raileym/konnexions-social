import type { ScenarioValue } from "../cknTypes/types/types"

export const getCurrentWeek = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const diff = (now.getTime() - start.getTime()) / 86400000
  return Math.floor((diff + start.getDay() + 1) / 7)
}

const scenarioTitles: Record<ScenarioValue, string> = {
  restaurant: 'Restaurant',
  hotel: 'Hotel',
  airport: 'Airport',
  taxi: 'Taxi',
}

const scenarioLabels: Record<ScenarioValue, string> = {
  restaurant: 'at the restaurant',
  hotel: 'at the hotel',
  airport: 'at the airport',
  taxi: 'in a taxi',
}

const scenarioPrompts: Record<ScenarioValue, string> = {
  restaurant:
    // 'For the dialog request below, respond in the context of a restaurant. Pick two people randomly among a waiter, waitress, a man customer, and a woman customer, or two men, or two women.',
    'Express a dialog between a random combination of two people',
    hotel:
    // 'Respond in the context of a hotel. Choose two characters such as a guest and a front desk agent, or two travelers discussing hotel amenities.',
    'Express a dialog between a random combination of two people',
    airport:
    // 'Respond in the context of an airport. Choose roles such as a traveler, airline agent, or TSA officer.',
    'Express a dialog between a random combination of two people',
    taxi:
    'Express a dialog between a random combination of two people',
}

const scenarioParticipants: Record<ScenarioValue, string> = {
  restaurant:
    'the host, hostess, waiter, waitress, bartender, chef, a male diner, a female diner, or a couple seated nearby',
    hotel:
    'the front desk agent, concierge, bellhop, housekeeper, a male guest, a female guest, or the hotel manager',
    airport:
    'an airline agent, a gate attendant, a TSA officer, a baggage handler, a flight attendant, a male traveler, or a female traveler',
    taxi:
    'the driver, a rideshare driver, a dispatcher, a male passenger, a female passenger, a couple sharing the ride, or a tourist unfamiliar with the city',
}

export function getScenarioDetails(scenario: ScenarioValue) {
  return {
    scenarioLabel: scenarioLabels[scenario],
    scenarioPrompt: scenarioPrompts[scenario],
    scenarioTitle: scenarioTitles[scenario],
    scenarioParticipants: scenarioParticipants[scenario],
  }
}
