import { html } from "lit";
import { SabianaVmcCard } from "./sabiana-vmc-card";
import { localize } from "./localize";
import { getEntityValue, safeState, toNumber, getEntityBool, getIconForSpeed } from "./commons";
import { LOC_KEYS } from "./localize-keys";
import { SabianaVmcMode, toSabianaVmcMode, toSabianaVmcModeIcon, toSabianaVmcModeLocalization } from "./sabiana-vmc-mode";
import { SabianaEntities } from "./configuration";
import { HomeAssistant } from "custom-card-helpers";
import './components/range-slider';
import './components/toggle-switch';
import './components/schedule-editor';
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
  const time2ReplaceFilter = calcTime2ReplaceFilter(this.hass, lang, this.entities);
  const alerts = getAlertTitle(this.hass, this.entities);
  const alertTitle = alerts || localize(this.hass.language, LOC_KEYS.ui.card.sabiana_vmc.messages.no_alert);
  const boost = safeState(this.hass, this.entities?.boost, 'off') === 'on';
  const boostTitle = boost ? localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.boost_on) : localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.boost_off);
  const boostDescription = '\n\n' + localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.boost_description);
  const flush = safeState(this.hass, this.entities?.flush, 'off') === 'on';
  const flushTitle = flush ? localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.flush_on) : localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.flush_off);
  const flushDescription = '\n\n' + localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.flush_description);
  const bypass = safeState(this.hass, this.entities?.bypass, 'off') === 'on';
  const bypassTitle = bypass ? localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.bypass_on) : localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.bypass_off);
  const bypassDescription = '\n\n' + localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.bypass_description);
  const defrost = safeState(this.hass, this.entities?.defrost, 'off') === 'on';
  const defrostTitle = defrost ? localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.defrost_on) : localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.defrost_off);
  const modeState = safeState(this.hass, this.entities?.mode) || '';
  const programSelection = toNumber(safeState(this.hass, this.entities?.program));
  const manualSpeed = toNumber(safeState(this.hass, this.entities?.fan_speed));
  const realSpeed = getSpeedStep(toNumber(safeState(this.hass, this.entities?.duty_cycle_fan_1)));
  const fanAnim = powerState && realSpeed > 0 ? "fan-anim" : "";

  const holidayModeDays = toNumber(safeState(this.hass, this.entities?.holiday_mode_days), 1);
  const temp_for_free_cooling = toNumber(safeState(this.hass, this.entities?.temp_for_free_cooling), 26);
  const temp_for_free_heating = toNumber(safeState(this.hass, this.entities?.temp_for_free_heating), 20);
  const boost_time = toNumber(safeState(this.hass, this.entities?.boost_time), 180);
  const filter_life = toNumber(safeState(this.hass, this.entities?.filter_life), 180);

  return html`
<ha-card>
  <div class="spinner ${!this.spinner() ? 'hidden-element' : ''}">
    <ha-icon icon="mdi:loading"></ha-icon>
  </div>

  <div class="header">
    <div class="name">
      Sabiana ${model}
    </div>
    <toggle-switch
      .checked="${powerState}"
      @toggle-changed="${(e: CustomEvent) => this.togglePower()}"
    ></toggle-switch>
  </div>

  <div class="main-row">

    <div class="temps">
      <div>
        <ha-icon 
          title="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.temperature.internal)}"
          icon="mdi:home-thermometer"
          @click="${() => this.openModal(localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.temperature_in))}">
        </ha-icon>
        <div>${getEntityValue(this.hass, this.entities?.temp_in)}</div>
      </div>      
      <div>
        <ha-icon 
          title="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.temperature.flow)}"
          icon="mdi:home-import-outline"
          @click="${() => this.openModal(localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.temperature_flow))}">
        </ha-icon>
        <div>${getEntityValue(this.hass, this.entities?.temp_flow)}</div>
      </div>
      <div>
        <ha-icon 
          title="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.temperature.efficiency)}"
          icon="mdi:swap-vertical"
          @click="${() => this.openModal(localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.efficiency))}">
        </ha-icon>
        <div>${calcEfficiency(this.hass, this.entities)} %</div>
      </div>
      <div>
        <ha-icon 
          title="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.temperature.disposal)}"
          icon="mdi:home-export-outline"
          @click="${() => this.openModal(localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.temperature_disposal))}">
        </ha-icon>
        <div>${getEntityValue(this.hass, this.entities?.temp_disposal)}</div>
      </div>
      <div>
        <ha-icon 
          title="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.temperature.external)}"
          icon="mdi:home-thermometer-outline"
          @click="${() => this.openModal(localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.temperature_out))}">
        </ha-icon>
        <div>${getEntityValue(this.hass, this.entities?.temp_external)}</div>
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
        width="140" height="140">
        <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" />
      </svg>
    </div>

    <div class="status-indicator">

      <ha-icon 
        class="${alerts?.length > 0 ? 'alert' : 'off'}"
        title="${alertTitle}"
        icon="mdi:alert"
        @click="${() => this.openModal(alertTitle)}">
      </ha-icon>

      <ha-icon 
        class="${time2ReplaceFilter.days <= 0 ? 'alert' : time2ReplaceFilter.days < 10 ? 'warning' : 'off'}"
        title="${time2ReplaceFilter.title}"
        icon="mdi:air-filter"
        @click="${() => { this.modalFilterLife = true; this.openModal(time2ReplaceFilter.message); }}">
      </ha-icon>

      <ha-icon 
        class="${!boost ? 'off' : 'on'}"
        title="${boostTitle}"
        icon="mdi:fan-plus"
        @click="${() => { this.modalBoost = true; this.openModal(boostTitle + boostDescription); }}">
      </ha-icon>

      <ha-icon 
        class="${!bypass ? 'off' : 'on'}"
        title="${bypassTitle}"
        icon="mdi:debug-step-over"
        @click="${() => { this.modalTemp4Bypass = true; this.openModal(bypassTitle + bypassDescription); }}">
      </ha-icon>

      <ha-icon 
        class="${!flush ? 'off' : 'on'}"
        title="${flushTitle}"
        icon="mdi:weather-windy"
        @click="${() => { this.modalFlush = true; this.openModal(flushTitle + flushDescription); }}">
      </ha-icon>

      <ha-icon 
        class="${!defrost ? 'off' : 'on'}"
        title="${defrostTitle}"
        icon="mdi:car-defrost-front"
        @click="${() => this.openModal(defrostTitle)}">
      </ha-icon>

    </div>

  </div>  

  <div class="group-selector">
    ${Object.keys(SabianaVmcMode).map(mode => html`
      <button
        aria-label="${mode}"
        class="group-button ${modeState === mode ? "selected" : ""}"
        @click=${() => this.selectMode(toSabianaVmcMode(mode))}
        title="${localize(lang, toSabianaVmcModeLocalization(mode))}"
        ?disabled="${!powerState}">
        <ha-icon icon="${toSabianaVmcModeIcon(mode)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="group-selector ${modeState !== SabianaVmcMode.Manual ? 'hidden-element' : ''}">
    ${Array.from({ length: 4 }, (_, speed) => html`
      <button 
        aria-label="${speed}"
        class="group-button ${manualSpeed === speed ? 'selected' : ''}"
        @click="${() => this.setFanSpeed(speed)}"
        ?disabled="${!powerState}">
        <ha-icon icon="${getIconForSpeed(speed)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="program-selection ${modeState !== SabianaVmcMode.Program ? 'hidden-element' : ''}">
    ${Array.from({ length: 8 }, (_, program) => html`
      <button 
        aria-label="${getLabelForProgram(lang, program)}"
        title="${getLabelForProgram(lang, program)}"
        class="program-button ${programSelection === program ? 'selected' : ''}"
        @click="${() => this.setProgram(program)}"
        ?disabled="${!powerState}">
        <ha-icon icon="mdi:numeric-${program + 1}"></ha-icon>
      </button>
      `)}
      <button 
        aria-label="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.programs.settings.title)}"
        title="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.programs.settings.title)}"
        class="program-button ${programSelection >= 4 ? '' : 'hidden-element'}"
        @click="${() => this.programSettings()}"
        ?disabled="${!powerState}">
        <ha-icon icon="mdi:cog"></ha-icon>
      </button>
  </div>

  <div
    class="holiday-group-days ${modeState !== SabianaVmcMode.Holiday ? 'hidden-element' : ''} range-container">
    <range-slider 
      label="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.holiday_mode_days_set)}" 
      .min="${1}" 
      .max="${60}"
      .value="${holidayModeDays}"
      @value-changed="${(e: CustomEvent) => this.setHolidayModeModeDays(e.detail.value)}"
      ></range-slider>
  </div>

  <div class="footer">
    <div></div>
    <div class="version">v${CARD_VERSION}</div>
  </div>

  ${this.modalShouldBeOpen() ? html`
    <div class="modal" @click="${this.closeModal}">
      <div class="modal-content" @click="${(e: Event) => e.stopPropagation()}">
        <span class="close" @click="${this.closeModal}">&times;</span>
        <p style="white-space: pre-line">${this.modalMessage}</p>

        ${this.modalTemp4Bypass ? html`
          <range-slider 
            label="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.temp_for_free_cooling_set)}" 
            .min="${10}" 
            .max="${35}"
            .value="${temp_for_free_cooling}"
            @value-changed="${(e: CustomEvent) => this.setTempForFreeCooling(e.detail.value)}"
            ></range-slider>

          <range-slider 
            label="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.temp_for_free_heating_set)}" 
            .min="${10}" 
            .max="${30}"
            .value="${temp_for_free_heating}"
            @value-changed="${(e: CustomEvent) => this.setTempForFreeHeating(e.detail.value)}"
            ></range-slider>
        ` : ''}

        ${this.modalBoost ? html`
          <range-slider 
            label="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.boost_time_set)}" 
            .min="${15}" 
            .max="${240}"
            .value="${boost_time}"
            @value-changed="${(e: CustomEvent) => this.setBoostTime(e.detail.value)}"
            ></range-slider>
        ` : ''}

        ${this.modalFilterLife ? html`
          <range-slider 
            label="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.filter_life)}" 
            .min="${30}" 
            .max="${400}"
            .value="${filter_life}"
            @value-changed="${(e: CustomEvent) => this.setFilterLife(e.detail.value)}"
            ></range-slider>

          <div
            class="program-selection">
            <button 
              aria-label="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.filter_reset)}"
              title="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.filter_reset)}"
              class="program-button"
              @click="${() => this.resetFilterCounter()}">
              <ha-icon icon="mdi:filter-check"></ha-icon>
            </button>
          </div>
        ` : ''}

        ${this.modalFlush ? html`
          <toggle-switch
            label="${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.flush_mode)}"
            .checked="${flush}"
            @toggle-changed="${(e: CustomEvent) => this.setFlush(e.detail.checked)}"
          ></toggle-switch>
          `: ''}

        ${this.modalScheduleSettings ? html`
          <schedule-editor
            .hass="${this.hass}"
            .entities="${this.entities}"
            .lang="${lang}"
            @schedule-changed="${(e: CustomEvent) => this.saveSchedule(e.detail.schedule)}"
          ></schedule-editor>
          `: ''}

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

function calcEfficiency(hass: HomeAssistant, entities?: SabianaEntities): number {
  const tempIn = toNumber(safeState(hass, entities?.temp_in));
  const tempExternal = toNumber(safeState(hass, entities?.temp_external));
  const tempFlow = toNumber(safeState(hass, entities?.temp_flow));
  const tempDisposal = toNumber(safeState(hass, entities?.temp_disposal));

  const deltaSupply = tempFlow - tempExternal;   // variazione subita dall'aria immessa
  const deltaExtract = tempIn - tempDisposal;    // variazione subita dall'aria estratta

  let efficiency = 0;

  // Verifica validità dei sensori
  if (isFinite(deltaSupply) && isFinite(deltaExtract) && Math.abs(deltaExtract) > 0.5) {

    // Modalità riscaldamento (aria esterna più fredda dell’estratta)
    if (tempExternal < tempIn) {
      // Heating
      efficiency = (deltaSupply / deltaExtract) * 100;
    }
    // Modalità raffrescamento (aria esterna più calda dell’estratta)
    else if (tempExternal > tempIn) {
      // Cooling
      efficiency = (-(deltaSupply) / -(deltaExtract)) * 100; // stesso concetto ma con segni invertiti
    }

    // Caso bypass: nessun recupero sensibile (mandata ≈ esterna)
    if (Math.abs(tempFlow - tempExternal) < 0.5) {
      // Bypass
      efficiency = 0;
    }

    // Clamp tra 0 e 100 per evitare valori assurdi
    if (efficiency !== undefined) {
      efficiency = Math.max(0, Math.min(100, efficiency));
      efficiency = Math.round(efficiency);
    }
  }

  return efficiency;
}

function calcTime2ReplaceFilter(hass: HomeAssistant, lang: string, entities?: SabianaEntities): { days: number, title: string, message: string } {
  let result = { days: 0, title: 'N/A', message: '' };
  const filter_counter = toNumber(safeState(hass, entities?.filter_counter));
  const filter_life = toNumber(safeState(hass, entities?.filter_life));

  let usedLife = 0;
  if (isFinite(filter_counter) && isFinite(filter_life) && filter_life > 0) {
    usedLife = filter_counter * 15; // in minutes
    usedLife = usedLife / 60; // in hours
    usedLife = Math.round(usedLife / 24); // in days
    result.days = filter_life - usedLife;
  }

  if (result.days < 0) {
    result.title = localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.filter_overdue);
  }
  else {
    result.title = localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.filter_2_replace, { days: '' + result.days });
  }

  if (usedLife > 0) {
    result.message = localize(lang, LOC_KEYS.ui.card.sabiana_vmc.messages.filter_used, { days: '' + usedLife }) + '\n';
    result.message += result.title;
  }

  return result;
}