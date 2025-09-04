import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { cardStyles } from "./sabiana-vmc-card.styles";
import { renderCard } from "./sabiana-vmc-card-view";
import { localize } from "./localize";
import { LOC_KEYS } from "./localize-keys";

export interface SabianaVmcCardConfig {
  type: string;
  entity_model?: string;
  entity_temp_in?: string;
  entity_temp_out?: string;
  entity_power?: string;
  entity_mode?: string;
  entity_program?: string;
  entity_fan_speed?: string;
}

@customElement("sabiana-vmc-card")
export class SabianaVmcCard extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) config?: SabianaVmcCardConfig;

  static styles = cardStyles;

  setConfig(config: SabianaVmcCardConfig) {
    if (!config.entity_temp_in || !config.entity_power) {
      throw new Error(localize(this.hass.language, LOC_KEYS.ui.card.sabiana_vmc.errors.missing_entity, { entity: "entity_temp_in/entity_power" }));
    }
    this.config = config;
  }

  render = renderCard;

  protected _togglePower() {
    if (!this.config?.entity_power) return;
    this.hass.callService("switch", "toggle", {
      entity_id: this.config.entity_power
    });
  }
}
