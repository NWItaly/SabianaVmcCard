import { LitElement, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { cardStyles } from './sabiana-vmc-card.styles';
import { renderCard } from './sabiana-vmc-card-view';
import { localize } from './localize';
import { LOC_KEYS } from './localize-keys';
import type { HomeAssistant, LovelaceCard } from 'custom-card-helpers';
import { SabianaVmcMode } from './sabiana-vmc-mode';
import { createSabianaEntities, SabianaEntities, SabianaVmcCardConfig } from './configuration';
import { safeState } from './commons';

@customElement('sabiana-vmc-card')
export class SabianaVmcCard
  extends LitElement
  implements LovelaceCard {

  @state() hass!: HomeAssistant;
  @state() protected config?: SabianaVmcCardConfig;
  @state() protected entities?: SabianaEntities;
  @state() protected modalMessage: string = "";
  @state() protected error?: string;
  @state() protected spinnerSelectMode: boolean = false;
  @state() protected spinnerFlush: boolean = false;
  @state() protected modalTemp4Bypass: boolean = false;
  @state() protected modalFlush: boolean = false;
  @state() protected modalBoost: boolean = false;
  @state() protected modalFilterLife: boolean = false;
  @state() protected modalScheduleSettings: boolean = false;

  static styles = cardStyles;

  setConfig(config: SabianaVmcCardConfig) {

    if (!config.entity_prefix || typeof config.entity_prefix !== 'string' || config.entity_prefix.trim() === '') {
      this.error = localize(
        this.hass?.language ?? 'en',
        LOC_KEYS.ui.card.sabiana_vmc.errors.missing_config,
        { key: 'entity_prefix' }
      );
    }

    this.config = config;
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);

    if (changedProps.has('config')) {
      if (!this.hass || !this.config?.entity_prefix) {
        return;
      }
      // Generate entities with calculated prefix
      this.entities = createSabianaEntities(this.config.entity_prefix);
      // Check all entities if exists
      if (this.hass?.states) {
        for (const [key, value] of Object.entries(this.entities)) {
          // console.log(`Entity for ${key}: ${value}`);
          // Services doesn't have states
          if (!key.startsWith('service') && !this.hass.states[value]) {
            this.error = localize(
              this.hass?.language ?? 'en',
              LOC_KEYS.ui.card.sabiana_vmc.errors.missing_entity,
              { entity: key }
            );
          }
        };
      }
    }
    else if (this.spinnerSelectMode && changedProps.has('hass')) {
      const oldHA = changedProps.get('hass') as HomeAssistant | undefined;
      const oldMode = safeState(oldHA, this.entities?.mode);
      const newMode = safeState(this.hass, this.entities?.mode);

      if (oldMode !== newMode) {
        console.log('La modalità di funzionamento è cambiata:', newMode);
        this.spinnerSelectMode = false;
      }
    }
    else if (this.spinnerFlush && changedProps.has('hass')) {
      const oldHA = changedProps.get('hass') as HomeAssistant | undefined;
      const oldFlush = safeState(oldHA, this.entities?.flush);
      const newFlush = safeState(this.hass, this.entities?.flush);

      if (oldFlush !== newFlush) {
        console.log('La modalità Flush è cambiata:', newFlush);
        this.spinnerFlush = false;
      }
    }

  }

  render = renderCard;

  getCardSize() {
    return 3;
  }

  connectedCallback() {
    super.connectedCallback();
    // Esempio: avvia timer, listener, o abbonamenti  
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Pulisci timer, listener per evitare memory leak  
  }

  spinner(): boolean {
    return this.spinnerSelectMode || this.spinnerFlush;
  }

  //#region User actions

  protected togglePower() {
    if (!this.entities?.power) return;
    this.hass.callService('switch', 'toggle', { entity_id: this.entities.power });
  }

  protected selectMode(mode: SabianaVmcMode | undefined) {
    if (!this.entities?.mode || !mode) return;

    let entityId = '';
    switch (mode) {
      case SabianaVmcMode.Manual:
        entityId = this.entities?.mode_command_manual || '';
        break;
      case SabianaVmcMode.Holiday:
        entityId = this.entities?.mode_command_holiday || '';
        break;
      case SabianaVmcMode.Party:
        entityId = this.entities?.mode_command_party || '';
        break;
      case SabianaVmcMode.Program:
        entityId = this.entities?.mode_command_program || '';
        break;
      default:
        entityId = this.entities?.mode_command_auto || '';
        break;
    }
    if (!entityId) return;

    this.hass.callService('switch', 'toggle', { entity_id: entityId });
    this.spinnerSelectMode = true;
  }

  protected setFanSpeed(speed: number) {
    if (!this.entities?.fan_speed) return;
    this.hass.callService('number', 'set_value', {
      entity_id: this.entities?.fan_speed,
      value: speed
    });
  }

  protected setProgram(program: number) {
    if (!this.entities?.program) return;
    this.hass.callService('number', 'set_value', {
      entity_id: this.entities?.program,
      value: program
    });
  }

  protected async programSettings() {
    if (!this.entities?.service_utp_refresh) return;

    await this.hass.callService('esphome', this.entities.service_utp_refresh);
    this.modalScheduleSettings = true;
  }

  protected setHolidayModeModeDays(days: number) {
    if (!this.entities?.holiday_mode_days) return;
    if (days < 1) days = 1;
    if (days > 60) days = 60;
    this.hass.callService('number', 'set_value', {
      entity_id: this.entities?.holiday_mode_days,
      value: days
    });
  }

  protected setTempForFreeCooling(temp: number) {
    if (!this.entities?.temp_for_free_cooling) return;
    if (temp < 10) temp = 10;
    if (temp > 35) temp = 35;
    this.hass.callService('number', 'set_value', {
      entity_id: this.entities?.temp_for_free_cooling,
      value: temp
    });
  }

  protected setTempForFreeHeating(temp: number) {
    if (!this.entities?.temp_for_free_heating) return;
    if (temp < 10) temp = 10;
    if (temp > 30) temp = 30;
    this.hass.callService('number', 'set_value', {
      entity_id: this.entities?.temp_for_free_heating,
      value: temp
    });
  }

  protected setFlush(active: boolean) {
    if (!this.entities?.flush) return;
    this.hass.callService('switch', active ? 'turn_on' : 'turn_off', {
      entity_id: this.entities?.flush
    });
    this.spinnerFlush = true;
    this.closeModal();
  }

  protected setBoostTime(minutes: number) {
    if (!this.entities?.boost_time) return;
    if (minutes < 15) minutes = 15;
    if (minutes > 240) minutes = 240;
    this.hass.callService('number', 'set_value', {
      entity_id: this.entities?.boost_time,
      value: minutes
    });
  }

  protected setFilterLife(minutes: number) {
    if (!this.entities?.filter_life) return;
    if (minutes < 30) minutes = 30;
    if (minutes > 400) minutes = 400;
    this.hass.callService('number', 'set_value', {
      entity_id: this.entities?.filter_life,
      value: minutes
    });
  }

  protected resetFilterCounter() {
    if (!this.entities?.reset_filter_counter) return;
    this.hass.callService('button', 'press', {
      entity_id: this.entities?.reset_filter_counter
    });
    this.closeModal();
  }

  //#endregion

  //#region Modale

  modalShouldBeOpen(): boolean {
    return this.modalMessage !== "" ||
      this.modalTemp4Bypass ||
      this.modalFlush ||
      this.modalBoost ||
      this.modalFilterLife ||
      this.modalScheduleSettings;
  }

  openModal(message: string) {
    this.modalMessage = message;
  }

  closeModal() {
    this.modalMessage = "";
    this.modalTemp4Bypass = false;
    this.modalFlush = false;
    this.modalBoost = false;
    this.modalFilterLife = false;
    this.modalScheduleSettings = false;
  }
  //#endregion

}
