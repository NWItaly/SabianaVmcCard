/**
 * Restituisce lo stato di un'entità, o undefined se non disponibile
 */
export function safeState(hass: any, entityId?: string): string | undefined {
  if (!entityId) return undefined;
  return hass.states[entityId]?.state;
}

/**
 * Formatta un numero in base alla lingua e al numero di decimali
 */
export function formatNumber(value: number | undefined, lang: string = "en", decimals: number = 1): string {
  if (value === undefined || isNaN(value)) return "n/a";
  return new Intl.NumberFormat(lang, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Aggiunge l'unità di misura dell'entità al valore formattato
 */
export function withUnit(hass: any, entityId?: string, formattedValue?: string): string {
  if (!entityId || !formattedValue) return formattedValue ?? "n/a";
  const unit = hass.states[entityId]?.attributes?.unit_of_measurement;
  return unit ? `${formattedValue} ${unit}` : formattedValue;
}

/**
 * Estrae lo stato, lo converte in numero, lo formatta e aggiunge l'unità
 */
export function getEntityValue(
  hass: any,
  entityId?: string,
  lang: string = "en",
  decimals: number = 1
): string {
  const raw = safeState(hass, entityId);
  const num = raw !== undefined ? parseFloat(raw) : undefined;
  const formatted = formatNumber(num, lang, decimals);
  return withUnit(hass, entityId, formatted);
}
