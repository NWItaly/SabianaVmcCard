import { isValidTemperature } from "./commons";

/**
 * Calcoli per l'efficienza e le prestazioni di un sistema VMC
 * 
 * Temperature nomenclatura Sabiana:
 * temp_out = Temperatura aria esterna (ingresso) -> T1
 * temp_in = Temperatura aria di mandata (uscita verso ambiente) -> T2
 * temp_exhaust = Temperatura aria viziata estratta (ingresso da ambiente) -> T3
 * temp_disposal = Temperatura aria di smaltimento (uscita verso esterno) -> T4
 */
export class VmcCalculations {

    /**
     * Calcola l'efficienza sensibile del recuperatore di calore
     * Formula: η = (temp_in - temp_out) / (temp_exhaust - temp_out) × 100
     * 
     * @param {number} temp_out - Temperatura aria esterna (°C)
     * @param {number} temp_in - Temperatura aria di mandata (°C) 
     * @param {number} temp_exhaust - Temperatura aria estratta (°C)
     * @returns {number} Efficienza in percentuale (0-100%)
     */
    static calculateSensibleEfficiency(temp_out: number, temp_in: number, temp_exhaust: number) {
        // Validazione input
        if (!isValidTemperature(temp_out) || !isValidTemperature(temp_in) || !isValidTemperature(temp_exhaust)) {
            return 0;
        }

        const deltaT_recupero = temp_in - temp_out;  // Riscaldamento/raffreddamento ottenuto
        const deltaT_disponibile = temp_exhaust - temp_out;  // Differenza termica disponibile

        // Evita divisione per zero
        if (Math.abs(deltaT_disponibile) < 0.1) {
            return 0;
        }

        const efficiency = (deltaT_recupero / deltaT_disponibile) * 100;

        // Limita il risultato tra 0 e 100%
        return Math.max(0, Math.min(100, efficiency));
    }

    /**
     * Calcola l'efficienza reale dello scambiatore (con temp_disposal)
     * Formula: η = (temp_in - temp_out) / (temp_exhaust - temp_disposal) × 100
     * Questa è più accurata perché considera le perdite di carico termico
     * 
     * @param {number} temp_out - Temperatura aria esterna (°C)
     * @param {number} temp_in - Temperatura aria di mandata (°C)
     * @param {number} temp_exhaust - Temperatura aria estratta (°C)
     * @param {number} temp_disposal - Temperatura aria di smaltimento (°C)
     * @returns {number} Efficienza reale in percentuale (0-100%)
     */
    static calculateRealEfficiency(temp_out: number, temp_in: number, temp_exhaust: number, temp_disposal: number) {
        // Validazione input
        if (!isValidTemperature(temp_out) || !isValidTemperature(temp_in) ||
            !isValidTemperature(temp_exhaust) || !isValidTemperature(temp_disposal)) {
            return this.calculateSensibleEfficiency(temp_out, temp_in, temp_exhaust); // Fallback
        }

        const deltaT_recupero = temp_in - temp_out;  // Energia recuperata
        const deltaT_scambiatore = temp_exhaust - temp_disposal;  // Energia ceduta dallo scambiatore

        // Evita divisione per zero
        if (Math.abs(deltaT_scambiatore) < 0.1) {
            return this.calculateSensibleEfficiency(temp_out, temp_in, temp_exhaust); // Fallback
        }

        const efficiency = (deltaT_recupero / deltaT_scambiatore) * 100;

        // Limita il risultato tra 0 e 100%
        return Math.max(0, Math.min(100, efficiency));
    }

    /**
     * Calcola le perdite di carico termico
     * Indica quanto calore si perde tra temp_exhaust e temp_disposal
     * 
     * @param {number} temp_exhaust - Temperatura aria estratta (°C)
     * @param {number} temp_disposal - Temperatura aria di smaltimento (°C)
     * @returns {number} Perdite termiche in °C
     */
    static calculateThermalLosses(temp_exhaust: number, temp_disposal: number) {
        if (!isValidTemperature(temp_exhaust) || !isValidTemperature(temp_disposal)) {
            return 0;
        }

        return Math.abs(temp_exhaust - temp_disposal);
    }

    /**
     * Determina la modalità di funzionamento in base alle temperature
     * 
     * @param {number} temp_out - Temperatura esterna
     * @param {number} temp_exhaust - Temperatura estratta
     * @returns {string} Modalità: 'heating', 'cooling', 'neutral'
     */
    static getOperatingMode(temp_out: number, temp_exhaust: number, deltaTMax: number = 2) {
        if (!isValidTemperature(temp_out) || !isValidTemperature(temp_exhaust)) {
            return 'unknown';
        }

        const deltaT = temp_exhaust - temp_out;

        if (deltaT > deltaTMax) {
            return 'heating';  // Riscaldamento (interno più caldo)
        } else if (deltaT < -deltaTMax) {
            return 'cooling';  // Raffrescamento (esterno più caldo) 
        } else {
            return 'neutral';  // Condizioni neutre
        }
    }

    /**
     * Calcola il risparmio energetico stimato
     * 
     * @param {number} efficiency - Efficienza del recuperatore (%)
     * @param {number} airflow - Portata aria (m³/h)
     * @param {number} deltaT - Differenza di temperatura (°C)
     * @returns {number} Potenza risparmiata in kW
     */
    static calculateEnergySavings(efficiency: number, airflow = 180, deltaT: number) {
        if (!efficiency || !deltaT || !airflow) return 0;

        // Costanti fisiche aria
        const airDensity = 1.2;  // kg/m³ (densità aria a 20°C)
        const specificHeat = 1.005; // kJ/kg·K (calore specifico aria)

        // Conversione portata da m³/h a kg/s
        const massFlow = (airflow * airDensity) / 3600;

        // Potenza termica recuperata: P = ṁ × cp × ΔT × η
        const recoveredPower = massFlow * specificHeat * Math.abs(deltaT) * (efficiency / 100);

        return recoveredPower; // kW
    }

    /**
     * Ottieni tutti i calcoli in un oggetto
     * 
     * @param {number} temp_out - Temperatura aria esterna (°C)
     * @param {number} temp_in - Temperatura aria di mandata (°C)
     * @param {number} temp_exhaust - Temperatura aria estratta (°C)
     * @param {number} temp_disposal - Temperatura aria di smaltimento (°C)
     * @returns {Object} Tutti i calcoli
     */
    static getAllCalculations(temp_out: number, temp_in: number, temp_exhaust: number, temp_disposal: number) {
        return {
            sensibleEfficiency: this.calculateSensibleEfficiency(temp_out, temp_in, temp_exhaust),
            realEfficiency: this.calculateRealEfficiency(temp_out, temp_in, temp_exhaust, temp_disposal),
            thermalLosses: this.calculateThermalLosses(temp_exhaust, temp_disposal),
            operatingMode: this.getOperatingMode(temp_out, temp_exhaust),
            energySavings: this.calculateEnergySavings(
                this.calculateRealEfficiency(temp_out, temp_in, temp_exhaust, temp_disposal),
                180,
                temp_exhaust - temp_out
            )
        };
    }
}