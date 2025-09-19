import { LOC_KEYS } from "./localize-keys";

export enum SabianaVmcMode {
    Auto = 'Auto',
    Program = 'Program',
    Party = 'Party',
    Holiday = 'Holiday',
    Manual = 'Manual'
}

/**
 * Converte una stringa in SabianaVmcMode, o undefined se non valido
 */
export function toSabianaVmcMode(mode: string): SabianaVmcMode | undefined {
    return Object.values(SabianaVmcMode).includes(mode as SabianaVmcMode)
        ? mode as SabianaVmcMode
        : undefined;
};

/**
 * Restituisce l'icona associata a una modalità SabianaVmcMode
 * @param mode Modalità da convertire
 * @returns 
 */
export function toSabianaVmcModeIcon(mode: string | SabianaVmcMode | undefined): string {
    const m = typeof mode === 'string' ? toSabianaVmcMode(mode) : mode;
    switch (m) {
        case SabianaVmcMode.Auto: return 'mdi:fan-auto';
        case SabianaVmcMode.Manual: return 'mdi:hand-back-right';
        case SabianaVmcMode.Party: return 'mdi:party-popper';
        case SabianaVmcMode.Program: return 'mdi:fan-clock';
        case SabianaVmcMode.Holiday: return 'mdi:beach';
        default: return 'mdi:help-circle';
    };
};

/**
 * Restituisce la key per la localizzazione a una modalità SabianaVmcMode
 * @param mode Modalità da convertire
 * @returns 
 */
export function toSabianaVmcModeLocalization(mode: string | SabianaVmcMode | undefined): string {
    const m = typeof mode === 'string' ? toSabianaVmcMode(mode) : mode;
    switch (m) {
        case SabianaVmcMode.Auto: return LOC_KEYS.ui.card.sabiana_vmc.modes.auto;
        case SabianaVmcMode.Manual: return LOC_KEYS.ui.card.sabiana_vmc.modes.manual;
        case SabianaVmcMode.Party: return LOC_KEYS.ui.card.sabiana_vmc.modes.party;
        case SabianaVmcMode.Program: return LOC_KEYS.ui.card.sabiana_vmc.modes.program;
        case SabianaVmcMode.Holiday: return LOC_KEYS.ui.card.sabiana_vmc.modes.holiday;
        default: return 'mdi:help-circle';
    };
};
