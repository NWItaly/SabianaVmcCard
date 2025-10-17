import { LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cardStyles } from './sabiana-vmc-card.styles';
import { renderCard } from './sabiana-vmc-card-view';
import { localize } from './localize';
import { LOC_KEYS } from './localize-keys';
import type { HomeAssistant, LovelaceCard } from 'custom-card-helpers';
import { SabianaVmcMode } from './sabiana-vmc-mode';
import { createSabianaEntities, SabianaEntities, SabianaVmcCardConfig } from './configuration';

@customElement('sabiana-vmc-card')
export class SabianaVmcCard
  extends LitElement
  implements LovelaceCard {

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config?: SabianaVmcCardConfig;
  @property({ attribute: false }) entities?: SabianaEntities;
  @property({ attribute: false }) modalMessage: string = "";
  @state() protected error?: string;

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
      // Genera le entities con il prefisso specificato
      this.entities = createSabianaEntities(this.config.entity_prefix);
      //Controllo che esistano tutte le entità
      for (const [key, value] of Object.entries(this.entities)) {
        // console.log(`Entity for ${key}: ${value}`);
        if (!this.hass?.states) continue;
        if (!this.hass.states[value]) {
          this.error = localize(
            this.hass?.language ?? 'en',
            LOC_KEYS.ui.card.sabiana_vmc.errors.missing_entity,
            { entity: key }
          );
        }
      };
    }
  }

  render = renderCard;

  getCardSize() {
    return 3;
  }

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

  connectedCallback() {
    super.connectedCallback();
    // Esempio: avvia timer, listener, o abbonamenti  
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Pulisci timer, listener per evitare memory leak  
  }

  //#region  "Modale"
  openModal(message: string) {
    this.modalMessage = message;
  }

  closeModal() {
    this.modalMessage = "";
  }
  //#endregion
}
