import { html } from "lit";
import { SabianaVmcCard } from "./sabiana-vmc-card";
import { localize } from "./localize";
import { getEntityValue, safeState, toNumber } from "./commons";
import { LOC_KEYS } from "./localize-keys";
import { SabianaVmcMode, toSabianaVmcMode, toSabianaVmcModeIcon, toSabianaVmcModeLocalization } from "./sabiana-vmc-mode";
declare const __CARD_VERSION__: string;

export function renderCard(this: SabianaVmcCard) {
  if (!this.hass || !this.config) {
    return html`<div>Caricamento...</div>`;
  } else if (typeof this.error === "string" && this.error.length > 0) {
    return html`<ha-alert alert-type="error">${this.error}</ha-alert>`;
  }

  const lang = this.hass.language;
  const CARD_VERSION = __CARD_VERSION__;
  const model = safeState(this.hass, this.entities?.model, 'n/a');
  const powerState = safeState(this.hass, this.entities?.power, 'off') === 'on';
  // const tempIn = toNumber(safeState(this.hass, this.entities?.temp_in));
  // const tempOut = toNumber(safeState(this.hass, this.entities?.temp_out));
  // const tempExhaust = toNumber(safeState(this.hass, this.entities?.temp_exhaust));
  // const tempDisposal = toNumber(safeState(this.hass, this.entities?.temp_disposal));
  const boost = safeState(this.hass, this.entities?.boost, 'off') === 'on';
  const bypass = safeState(this.hass, this.entities?.bypass, 'off') === 'on';
  const modeState = safeState(this.hass, this.entities?.mode) || '';
  const programSelection = toNumber(safeState(this.hass, this.entities?.program));
  const fanSpeed = toNumber(safeState(this.hass, this.entities?.fan_speed));
  const fanAnim = powerState && fanSpeed > 0 ? "fan-anim" : "";

  return html`
<ha-card>
  <h1 class="header">
    <div class="name">
      Sabiana ${model}
    </div>
    <button class="power-button" 
      @click=${this.togglePower} 
      title=${powerState ? localize(lang, LOC_KEYS.ui.card.sabiana_vmc.actions.power_off) : localize(lang, LOC_KEYS.ui.card.sabiana_vmc.actions.power_on)}>
      <ha-icon class=${powerState ? 'power-button-on' : 'power-button-off'} icon="mdi:power"></ha-icon>
    </button>
  </h1>

  <div class="main-row">

    <div class="temps">
      <div>
        <div>${getEntityValue(this.hass, this.entities?.temp_in)}</div>
        <div class="label">${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.temperature.internal)}</div>
      </div>
      <div>
        <div>${getEntityValue(this.hass, this.entities?.temp_out)}</div>
        <div class="label">${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.temperature.external)}</div>
      </div>
      <div>
        <div>${getEntityValue(this.hass, this.entities?.temp_exhaust)}</div>
        <div class="label">${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.temperature.exhaust)}</div>
      </div>
      <div>
        <div>${getEntityValue(this.hass, this.entities?.temp_disposal)}</div>
        <div class="label">${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.temperature.disposal)}</div>
      </div>
    </div>

    <div
      class="fan-icon"
      aria-label="Fan speed indicator">
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="${fanAnim}"
        fill="currentColor"
        style="${fanSpeed > 0 ? `animation-duration: ${getFanAnimationSpeed(fanSpeed)};` : ''}"
        viewBox="0 0 24 24"
        width="112" height="112">
        <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" />
      </svg>
    </div>

    <div class="status-indicator">

      <ha-tooltip label="Boost">
        <ha-icon 
          class="${!boost ? 'hidden-element' : ''}"
          icon="mdi:fan-plus">
        </ha-icon>
      </ha-tooltip>

      <ha-tooltip label="${safeState(this.hass, this.entities?.bypass_mode)}">
        <ha-icon 
          class="${!bypass ? 'hidden-element' : ''}"
          icon="mdi:debug-step-over"
        </ha-icon>
      </ha-tooltip>

    </div>

  </div>  

  <div class="mode-selector">
    ${Object.keys(SabianaVmcMode).map(mode => html`
      <button
        aria-label="${mode}"
        class="mode-button ${modeState === mode ? "selected" : ""}"
        @click=${() => this.selectMode(toSabianaVmcMode(mode))}
        ?disabled="${!powerState}">
        <ha-icon icon="${toSabianaVmcModeIcon(mode)}"></ha-icon>
        <span class="mode-label">${localize(lang, toSabianaVmcModeLocalization(mode))}</span>
      </button>
    `)}
  </div>

  <div
    class="speed-manual ${modeState !== SabianaVmcMode.Manual ? 'hidden-element' : ''}">
    ${Array.from({ length: 4 }, (_, speed) => html`
      <button 
        aria-label="${speed}"
        class="speed-button ${fanSpeed === speed ? 'selected' : ''}"
        @click=${() => this.setFanSpeed(speed)}
        ?disabled="${!powerState}">
        <ha-icon icon="${getIconForSpeed(speed)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="program-selection ${modeState !== SabianaVmcMode.Program ? 'hidden-element' : ''}">
    ${Array.from({ length: 7 }, (_, program) => html`
      <button 
        aria-label="${getLabelForProgram(lang, program)}"
        title="${getLabelForProgram(lang, program)}"
        class="program-button ${programSelection === program ? 'selected' : ''}"
        @click=${() => this.setProgram(program)}
        ?disabled="${!powerState}">
        <ha-icon icon="mdi:numeric-${program + 1}"></ha-icon>
      </button>
      `)}
  </div>

  <div class="footer">
    <div></div>
    <div class="version">v${CARD_VERSION}</div>
  </div>

</ha-card>
`;
}

function getFanAnimationSpeed(speed: number): string {
  switch (speed) {
    case 1:
      return "4s";    // lenta
    case 2:
      return "2.8s";
    case 3:
      return "1.6s";
    case 4:
      return "1s";    // veloce
    default:
      return "0s";    // ferma
  }
}

function getIconForSpeed(speed: number): string {
  switch (speed) {
    case 1: return "mdi:fan-speed-1";
    case 2: return "mdi:fan-speed-2";
    case 3: return "mdi:fan-speed-3";
    default: return "mdi:fan-off";
  }
}

function getLabelForProgram(lang: string, program: number): string {
  switch (program) {
    case 0: return localize(lang, LOC_KEYS.ui.card.sabiana_vmc.programs.p1);
    case 1: return localize(lang, LOC_KEYS.ui.card.sabiana_vmc.programs.p2);
    case 2: return localize(lang, LOC_KEYS.ui.card.sabiana_vmc.programs.p3);
    case 3: return localize(lang, LOC_KEYS.ui.card.sabiana_vmc.programs.p4);
    default: return localize(lang, LOC_KEYS.ui.card.sabiana_vmc.programs.pN, { program: `${program + 1}` });
  };
}