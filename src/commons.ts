/**
 * Restituisce lo stato di un'entità, o undefined se non disponibile
 */
export function safeState(hass: any, entityId?: string, defaultValue: any | undefined = undefined): string | undefined {
  if (!entityId) return defaultValue;
  return hass.states[entityId]?.state;
};

/**
 * Formatta un numero in base alla lingua e al numero di decimali
 */
export function formatNumber(value: number | undefined, lang: string = 'en', decimals: number = 1): string {
  if (value === undefined || isNaN(value)) return 'n/a';
  return new Intl.NumberFormat(lang, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Aggiunge l'unità di misura dell'entità al valore formattato
 */
export function withUnit(hass: any, entityId?: string, formattedValue?: string): string {
  if (!entityId || !formattedValue) return formattedValue ?? 'n/a';
  const unit = hass.states[entityId]?.attributes?.unit_of_measurement;
  return unit ? `${formattedValue} ${unit}` : formattedValue;
};

/**
 * Estrae lo stato, lo converte in numero, lo formatta e aggiunge l'unità
 */
export function getEntityValue(
  hass: any,
  entityId?: string,
  lang: string = 'en',
  decimals: number = 1
): string {
  const raw = safeState(hass, entityId);
  const num = raw !== undefined ? parseFloat(raw) : undefined;
  const formatted = formatNumber(num, lang, decimals);
  return withUnit(hass, entityId, formatted);
};

/**
 * Converte una stringa o un numero in numero, con valore di default
 * 
 * @param value Valore da convertire
 * @param [defaultValue=0] Valore di default se conversione fallisce
 */
export function toNumber(value: string | number | undefined, defaultValue: number = 0): number {
  if (value === undefined) return defaultValue;
  if (typeof value === 'number') return value;
  const num = parseFloat(value);
  return isNaN(num) ? defaultValue : num;
};


/**
 * Valida se un valore di temperatura è ragionevole
 * 
 * @param {number} temp - Valore da validare
 * @returns {boolean} True se valido
 */
export function isValidTemperature(temp: number) {
  const t = toNumber(temp);
  return !isNaN(t) && t > -50 && t < 100; // Range ragionevole per VMC
}