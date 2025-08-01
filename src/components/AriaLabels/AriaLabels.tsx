// src/a11y/ariaLabels.tsx

import { ARIA_LABEL_IDS, ARIA_LABEL_STRINGS } from '@components/AriaLabels/ariaLabelsContstants';

export const AriaLabels = () => (
  <div className="sr-only" aria-hidden="true">
    <span id={ARIA_LABEL_IDS.NAVBAR_TOP}>[Top Navigation Bar] The Top Navigation Bar is always present.</span>
    <span id={ARIA_LABEL_IDS.BUTTON_HOME}>[Home Button] Press the Home Button to return to the Welcome Page.</span>
    <span id={ARIA_LABEL_IDS.BUTTON_BIENVENIDO}>[Bienvenido Button] Press the Bienvenido Button to engage your Spanish lesson.</span>
    <span id={ARIA_LABEL_IDS.BUTTON_BIENVENIDO_PRO}>[Bienvenido Pro Button] Press the Bienvenido Pro Button to engage your Spanish lesson.</span>
    <span id={ARIA_LABEL_IDS.BUTTON_MENU}>[Menu Button] Press the Menu Button to engage the menu.</span>
    <span id={ARIA_LABEL_IDS.BUTTON_PROFILE}>[Profile Button] Press the Profile Button to update your profile.</span>

    <span id={ARIA_LABEL_IDS.REGION_MAIN}>[Main Region] Main application loaded.</span>
    <span id={ARIA_LABEL_IDS.REGION_MAIN_TEXT}>[Main Region] Application ready.</span>

    <span id={ARIA_LABEL_IDS.IMAGE_MAIN}>[Main Region] {ARIA_LABEL_STRINGS.IMAGE_MAIN}</span>
  </div>
)
