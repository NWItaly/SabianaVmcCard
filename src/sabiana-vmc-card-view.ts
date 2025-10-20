import { html } from "lit";
import { SabianaVmcCard } from "./sabiana-vmc-card";
import { localize } from "./localize";
import { getEntityValue, safeState, toNumber, getEntityBool } from "./commons";
import { LOC_KEYS } from "./localize-keys";
import { SabianaVmcMode, toSabianaVmcMode, toSabianaVmcModeIcon, toSabianaVmcModeLocalization } from "./sabiana-vmc-mode";
import { SabianaEntities } from "./configuration";
import { HomeAssistant } from "custom-card-helpers";
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
  const alertTitle = getAlertTitle(this.hass, this.entities);
  const boost = safeState(this.hass, this.entities?.boost, 'off') === 'on';
  const boostTitle = boost ? localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.boost_on) : localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.boost_off);
  const bypass = safeState(this.hass, this.entities?.bypass, 'off') === 'on';
  const bypassTitle = bypass ? localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.bypass_on) : localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.bypass_off);
  const defrost = safeState(this.hass, this.entities?.defrost, 'off') === 'on';
  const defrostTitle = defrost ? localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.defrost_on) : localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.defrost_off);
  const modeState = safeState(this.hass, this.entities?.mode) || '';
  const programSelection = toNumber(safeState(this.hass, this.entities?.program));
  const manualSpeed = toNumber(safeState(this.hass, this.entities?.fan_speed));
  const realSpeed = getSpeedStep(toNumber(safeState(this.hass, this.entities?.duty_cycle_fan_1)));
  const fanAnim = powerState && realSpeed > 0 ? "fan-anim" : "";

  const holidayModeDays_Min = 1;
  const holidayModeDays_Max = 60;
  const holidayModeDays_Value = toNumber(safeState(this.hass, this.entities?.holiday_mode_days), 1);
  const holidayModeDays_Percentage = ((holidayModeDays_Value - holidayModeDays_Min) / (holidayModeDays_Max - holidayModeDays_Min)) * 100;

  return html`
<ha-card>
  <div class="spinner ${!this.spinner ? 'hidden-element' : ''}">
    <ha-icon icon="mdi:loading"></ha-icon>
  </div>

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
        style="${realSpeed > 0 ? `animation-duration: ${getFanAnimationSpeed(realSpeed)};` : ''}"
        viewBox="0 0 24 24"
        width="112" height="112">
        <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" />
      </svg>
    </div>

    <div class="status-indicator">

      <ha-icon 
        class="${alertTitle.length > 0 ? 'alert' : 'hidden-element'}"
        title="${alertTitle}"
        icon="mdi:alert"
        @click="${() => this.openModal(alertTitle)}">
      </ha-icon>

      <ha-icon 
        class="${!boost ? 'off' : 'on'}"
        title="${boostTitle}"
        icon="mdi:fan-plus"
        @click="${() => this.openModal(boostTitle)}">
      </ha-icon>

      <ha-icon 
        class="${!bypass ? 'off' : 'on'}"
        title="${bypassTitle}"
        icon="mdi:debug-step-over"
        @click="${() => this.openModal(bypassTitle)}">
      </ha-icon>

      <ha-icon 
        class="${!defrost ? 'off' : 'on'}"
        title="${defrostTitle}"
        icon="mdi:car-defrost-front"
        @click="${() => this.openModal(defrostTitle)}">
      </ha-icon>

    </div>

  </div>  

  <div class="mode-selector">
    ${Object.keys(SabianaVmcMode).map(mode => html`
      <button
        aria-label="${mode}"
        class="mode-button ${modeState === mode ? "selected" : ""}"
        @click=${() => this.selectMode(toSabianaVmcMode(mode))}
        title="${localize(lang, toSabianaVmcModeLocalization(mode))}"
        ?disabled="${!powerState}">
        <ha-icon icon="${toSabianaVmcModeIcon(mode)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="speed-manual ${modeState !== SabianaVmcMode.Manual ? 'hidden-element' : ''}">
    ${Array.from({ length: 4 }, (_, speed) => html`
      <button 
        aria-label="${speed}"
        class="speed-button ${manualSpeed === speed ? 'selected' : ''}"
        @click="${() => this.setFanSpeed(speed)}"
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
        @click="${() => this.setProgram(program)}"
        ?disabled="${!powerState}">
        <ha-icon icon="mdi:numeric-${program + 1}"></ha-icon>
      </button>
      `)}
  </div>

  <div
    class="holiday-mode-days ${modeState !== SabianaVmcMode.Holiday ? 'hidden-element' : ''} range-container">
    <div class="range-header">
        <span class="range-label">${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.holiday_mode_days_set)}</span>
        <span class="range-value" id="valueDisplay">${holidayModeDays_Value}</span>
    </div>
    <div class="range-wrapper">
        <div class="range-progress" style="width: ${holidayModeDays_Percentage}%"></div>
        <input type="range" id="brightness" 
          min="${holidayModeDays_Min}"
          max="${holidayModeDays_Max}"
          step="1"
          .value="${holidayModeDays_Value}"
          @input="${(e: Event) => this.setHolidayModeModeDays(Number((e.target as HTMLInputElement).value))}"
        >
    </div>    
  </div>

  <div class="footer">
    <div></div>
    <div class="version">v${CARD_VERSION}</div>
  </div>

  ${this.modalMessage.length > 0 ? html`
    <div class="modal" @click="${this.closeModal}">
      <div class="modal-content" @click="${(e: Event) => e.stopPropagation()}">
        <span class="close" @click="${this.closeModal}">&times;</span>
        <p style="white-space: pre-line">${this.modalMessage}</p>
      </div>
    </div>` : ''}

</ha-card>
`;
}

function getSpeedStep(currentPercent: number): number {
  const steps = [
    { speed: 0, percent: 0 },
    { speed: 1, percent: 40 },
    { speed: 2, percent: 55 },
    { speed: 3, percent: 70 },
    { speed: 4, percent: 85 },
  ];

  // Trova lo step la cui percentuale è la più vicina alla lettura corrente
  let closest = steps[0];
  let minDistance = Math.abs(currentPercent - steps[0].percent);

  for (let i = 1; i < steps.length; i++) {
    const distance = Math.abs(currentPercent - steps[i].percent);
    if (distance < minDistance) {
      closest = steps[i];
      minDistance = distance;
    }
  }
  return closest.speed;
}

function getFanAnimationSpeed(speed: number): string {
  switch (speed) {
    case 1:
      return "4s";    // lenta
    case 2:
      return "2.5s";
    case 3:
      return "1.6s";
    case 4:
      return "0.8s";    // veloce
    default:
      return "0s";    // ferma
  }
}

function getIconForSpeed(speed: number): string {
  switch (speed) {
    case 0: return "mdi:fan-speed-1";
    case 1: return "mdi:fan-speed-2";
    case 2: return "mdi:fan-speed-3";
    case 3: return "mdi:fan-plus";
    default: return "mdi:fan";
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

function getAlertTitle(hass: HomeAssistant, entities?: SabianaEntities): string {
  let result = '';

  const addLine = (line: string) => {
    if (result.length > 0) {
      result += '\n';
    }
    result += line;
  };

  if (getEntityBool(hass, entities?.t1_probe_failure)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.t1_probe_failure));
  if (getEntityBool(hass, entities?.t2_probe_failure)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.t2_probe_failure));
  if (getEntityBool(hass, entities?.t3_probe_failure)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.t3_probe_failure));
  if (getEntityBool(hass, entities?.t4_probe_failure)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.t4_probe_failure));
  if (getEntityBool(hass, entities?.timekeeper_failure)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.timekeeper_failure));
  if (getEntityBool(hass, entities?.frost_alarm_t1_probe)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.frost_alarm_t1_probe));
  if (getEntityBool(hass, entities?.frost_alarm_t2_probe)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.frost_alarm_t2_probe));
  if (getEntityBool(hass, entities?.fireplace_alarm)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.fireplace_alarm));
  if (getEntityBool(hass, entities?.pressure_transducer_failure)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.pressure_transducer_failure));
  if (getEntityBool(hass, entities?.filter_alarm)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.filter_alarm));
  if (getEntityBool(hass, entities?.fans_failure)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.fans_failure));
  if (getEntityBool(hass, entities?.rh_or_co2_sensor_failure)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.rh_or_co2_sensor_failure));
  if (getEntityBool(hass, entities?.fan_thermic_input_alarm)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.fan_thermic_input_alarm));
  if (getEntityBool(hass, entities?.pre_heating_alarm)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.pre_heating_alarm));
  if (getEntityBool(hass, entities?.pre_frost_alarm_t2)) addLine(localize(hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.pre_frost_alarm_t2));

  return result;
}