// export type AppPanel = 'home' | 'settings' | 'help' | 'keys' | 'genAI'

export type AppContextType = {
  activePanel: AppPanelValue
  setActivePanel: (panel: AppPanelValue) => void
  gcpKey: string
  setGcpKey: (key: string) => void
  openAiKey: string
  setOpenAiKey: (key: string) => void
  switchPanel: (newPanel: AppPanelValue) => void
}

export const APP_PANEL = {
  HOME: 'home',
  SETTINGS: 'settings',
  HELP: 'help',
  keys: 'keys',
  GEN_AI: 'genAI',
  MENU: 'menu',
} as const

export type AppPanelValue = (typeof APP_PANEL)[keyof typeof APP_PANEL]
export type AppPanelKey = keyof typeof APP_PANEL
