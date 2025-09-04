import { html } from "lit";
import type { SabianaVmcCard } from "./sabiana-vmc-card";
import { localize } from "./localize";
import { getEntityValue, safeState } from "./commons";
import { LOC_KEYS } from "./localize-keys";
declare const __CARD_VERSION__: string;

export function renderCard(this: SabianaVmcCard) {
  if (!this.hass || !this.config) return html``;

  const lang = this.hass.language;
  const CARD_VERSION = __CARD_VERSION__;
  const model = safeState(this.hass, this.config.entity_model);
  const tempIn = getEntityValue(this.hass, this.config.entity_temp_in);
  const tempOut = getEntityValue(this.hass, this.config.entity_temp_out);
  const tempExtracted = getEntityValue(this.hass, this.config.entity_temp_out);
  const tempDisposal = getEntityValue(this.hass, this.config.entity_temp_out);

  return html`
  <ha-card>
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div class="title">${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.title)} ${model ?? "?"}</div>
      <div style="font-size:10px; color:gray;">v${CARD_VERSION}</div>
    </div>
    <div>${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.temperature.internal)}: ${tempIn ?? "n/a"}</div>
    <div>${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.temperature.supply)}: ${tempOut ?? "n/a"}</div>
    <div>${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.temperature.exhaust)}: ${tempExtracted ?? "n/a"}</div>
    <div>${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.temperature.disposal)}: ${tempDisposal ?? "n/a"}</div>
    <mwc-button @click=${this._togglePower}>
      ${localize(lang, LOC_KEYS.ui.card.sabiana_vmc.actions.power)}
    </mwc-button>
  </ha-card>
`;
}
