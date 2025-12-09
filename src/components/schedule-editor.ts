// schedule-editor.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { localize } from '../localize';
import { LOC_KEYS } from '../localize-keys';
import { safeState, getEntityValue, getIconForSpeed, toNumber } from '../commons';
import { HomeAssistant } from 'custom-card-helpers';
import { SabianaEntities } from '../configuration';

interface HourSchedule {
  hour: number;
  speed: number; // 1, 2, 3, or 4
}

interface WeekSchedule {
  [day: number]: HourSchedule[];
}

interface JsonInterval {
  t: string; // time "HH:MM" (23:59 if not set)
  s: number; // speed (255 if not set)
}

interface JsonDay {
  d: number; // day (1-7)
  sb: number; // speed before (255 if not set)
  i: JsonInterval[]; // intervals
}

@customElement('schedule-editor')
export class ScheduleEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) entities!: SabianaEntities;
  @property({ type: String }) lang = 'en';
  @property({ type: Object }) schedule: WeekSchedule = {};
  @property({ type: String }) label = '';

  @state() private selectedSpeed: number = 1;
  @state() private isDragging: boolean = false;
  @state() private workingSchedule: WeekSchedule = {};
  @state() private hasChanges: boolean = false;

  private userTimerProgram?: number = undefined;

  static styles = css`
    :host {
      display: block;
    }

    .schedule-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .schedule-header {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .speed-selector {
      display: flex;
      gap: 8px;
      background: var(--card-background-color);
    }

    .speed-option {
      flex: 1;
      padding: 12px;
      border: 2px solid var(--divider-color);
      background: var(--card-background-color);
      border-radius: 8px;
      cursor: pointer;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .speed-option:hover {
      opacity: 0.8;
    }

    .speed-option.active {
      border-width: 3px;
      transform: scale(1.02);
    }

    .speed-option.speed-0 {
      background: #008CFF;
      color: white;
    }

    .speed-option.speed-0.active {
      border-color: #0042BD;
    }

    .speed-option.speed-1 {
      background: #4CAF50;
      color: white;
    }

    .speed-option.speed-1.active {
      border-color: #2E7D32;
    }

    .speed-option.speed-2 {
      background: #FF9800;
      color: white;
    }

    .speed-option.speed-2.active {
      border-color: #E65100;
    }

    .speed-option.speed-3 {
      background: #F44336;
      color: white;
    }

    .speed-option.speed-3.active {
      border-color: #C62828;
    }

    .schedule-grid {
      display: flex;
      flex-direction: column;
      gap: 0;
      background: var(--card-background-color);
      overflow: hidden;
    }

    .hours-header {
      display: grid;
      grid-template-columns: 35px repeat(24, 1fr);
      border-bottom: 1px solid var(--divider-color);
      padding: 8px 4px;
      font-size: 10px;
      color: var(--secondary-text-color);
      text-align: center;
    }

    .hour-number {
      font-weight: 500;
    }

    .day-row {
      display: grid;
      grid-template-columns: 35px repeat(24, 1fr);
      border-bottom: 1px solid var(--divider-color);
      min-height: 30px;
    }

    .day-row:last-child {
      border-bottom: none;
    }

    .day-label {
      display: flex;
      align-items: center;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color);
      border-right: 1px solid var(--divider-color);
    }

    .day-label.weekend {
      color: var(--secondary-text-color);
    }

    .hour-cell {
      cursor: pointer;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      transition: opacity 0.1s ease;
      position: relative;
      user-select: none;
    }

    .hour-cell:hover {
      opacity: 0.8;
    }

    .hour-cell.speed-0 {
      background: #008CFF;
    }

    .hour-cell.speed-1 {
      background: #4CAF50;
    }

    .hour-cell.speed-2 {
      background: #FF9800;
    }

    .hour-cell.speed-3 {
      background: #F44336;
    }

    .quick-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .action-button {
      padding: 4px 12px;
      background: var(--primary-color);
      color: var(--text-primary-color);
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: opacity 0.2s ease;
    }

    .action-button:hover {
      opacity: 0.8;
    }

    .action-button.secondary {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
    }

    .save-actions {
      display: flex;
      gap: 8px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
    }

    .action-button.save {
      flex: 1;
    }

    .action-button.cancel {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      flex: 1;
    }

    .action-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  private dayNames: string[] = [
    LOC_KEYS.ui.card.sabiana_vmc.programs.settings.days.monday,
    LOC_KEYS.ui.card.sabiana_vmc.programs.settings.days.tuesday,
    LOC_KEYS.ui.card.sabiana_vmc.programs.settings.days.wednesday,
    LOC_KEYS.ui.card.sabiana_vmc.programs.settings.days.thursday,
    LOC_KEYS.ui.card.sabiana_vmc.programs.settings.days.friday,
    LOC_KEYS.ui.card.sabiana_vmc.programs.settings.days.saturday,
    LOC_KEYS.ui.card.sabiana_vmc.programs.settings.days.sunday
  ];

  constructor() {
    super();
    this.schedule = {};
    for (let day = 0; day < 7; day++) {
      this.schedule[day] = Array.from({ length: 24 }, (_, hour) => ({
        hour,
        speed: 0 // Default speed
      }));
    }
    this.workingSchedule = this.deepCloneSchedule(this.schedule);

    // Event listeners globali per gestire mouse up ovunque
    this.handleMouseUp = this.handleMouseUp.bind(this);

  }

  private deepCloneSchedule(schedule: WeekSchedule): WeekSchedule {
    const cloned: WeekSchedule = {};
    for (let day = 0; day < 7; day++) {
      cloned[day] = schedule[day].map(h => ({ ...h }));
    }
    return cloned;
  }

  firstUpdated() {
    this.label = this.label || localize(this.lang, LOC_KEYS.ui.card.sabiana_vmc.programs.settings.title);

    this.dayNames = this.dayNames.map(key => this.capitalizeFirstLetter(localize(this.lang, key)));

    this.userTimerProgram = toNumber(safeState(this.hass, this.entities.program));

    const days: JsonDay[] = [];
    for (let i = 1; i <= 7; i++) {
      const key = (`utp${this.userTimerProgram - 4 + 1}_d${i}`) as keyof SabianaEntities;
      const entityId = this.entities[key] as string;
      const value = safeState(this.hass, entityId);
      if (value && value.length > 0 && value !== 'undefined') {
        days.push(JSON.parse(value));
      }
    }

    this.setWeekSchedule(days);
    this.workingSchedule = this.deepCloneSchedule(this.schedule);
    this.hasChanges = false;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('schedule')) {
      this.workingSchedule = this.deepCloneSchedule(this.schedule);
      this.hasChanges = false;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  private handleMouseUp(): void {
    this.isDragging = false;
  }

  private selectSpeed(speed: number): void {
    this.selectedSpeed = speed;
  }

  private setHourSpeed(day: number, hour: number, startDrag: boolean = false): void {
    if (startDrag) {
      this.isDragging = true;
    }

    this.workingSchedule[day] = this.workingSchedule[day].map(h =>
      h.hour === hour ? { ...h, speed: this.selectedSpeed } : h
    );
    this.hasChanges = true;
    this.requestUpdate();
  }

  private onMouseEnterCell(day: number, hour: number): void {
    if (this.isDragging) {
      this.setHourSpeed(day, hour, false);
    }
  }

  private setAllSpeed(speed: number): void {
    for (let day = 0; day < 7; day++) {
      this.workingSchedule[day] = this.workingSchedule[day].map(h => ({ ...h, speed }));
    }
    this.hasChanges = true;
    this.requestUpdate();
  }

  private copyToWeekdays(): void {
    const mondaySchedule = [...this.workingSchedule[0]];
    for (let day = 1; day < 5; day++) {
      this.workingSchedule[day] = mondaySchedule.map(h => ({ ...h }));
    }
    this.hasChanges = true;
    this.requestUpdate();
  }

  private copyToWeekend(): void {
    const saturdaySchedule = [...this.workingSchedule[5]];
    this.workingSchedule[6] = saturdaySchedule.map(h => ({ ...h }));
    this.hasChanges = true;
    this.requestUpdate();
  }

  private saveChanges(): void {
    const clonedSchedule = this.deepCloneSchedule(this.workingSchedule);
    this.saveCompleteSchedule(this.userTimerProgram || 0, clonedSchedule);
    this.hasChanges = false;
  }

  private cancelChanges(): void {
    this.workingSchedule = this.deepCloneSchedule(this.schedule);
    this.hasChanges = false;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="schedule-container">
        <div class="schedule-header">${this.label} ${(this.userTimerProgram || 0) + 1}</div>
        
        <div class="speed-selector">
          ${[0, 1, 2, 3].map(speed => html`
            <div
              title="${this.getSpeedName(speed)}"
              class="speed-option speed-${speed} ${this.selectedSpeed === speed ? 'active' : ''}"
              @click="${() => this.selectSpeed(speed)}"
            >
              <ha-icon icon="${getIconForSpeed(speed)}"></ha-icon>
            </div>
          `)}
            
          <button 
            title="${localize(this.lang, LOC_KEYS.ui.card.sabiana_vmc.programs.settings.reset)}"
            class="action-button" 
            @click="${() => this.setAllSpeed(0)}">
            <ha-icon icon="mdi:trash-can-outline"></ha-icon>
          </button>
        </div>

        <div class="schedule-grid">
          <div class="hours-header">
            <div></div>
            ${Array.from({ length: 24 }, (_, i) => html`
              <div class="hour-number">${i}</div>
            `)}
          </div>

          ${this.dayNames.map((name, dayIndex) => html`
            <div class="day-row">
              <div class="day-label ${dayIndex >= 5 ? 'weekend' : ''}">${name.substring(0, 3)}</div>
              ${this.workingSchedule[dayIndex].map(item => html`
                <div
                  class="hour-cell speed-${item.speed}"
                  @mousedown="${() => this.setHourSpeed(dayIndex, item.hour, true)}"
                  @mouseenter="${() => this.onMouseEnterCell(dayIndex, item.hour)}"
                  title="${name} ${item.hour}:00 - V${item.speed}"
                ></div>
              `)}
            </div>
          `)}
        </div>

        <div class="quick-actions">
          <button class="action-button secondary" @click="${() => this.copyToWeekdays()}">
            <ha-icon icon="mdi:content-copy"></ha-icon>
            ${this.dayNames[0]} = ${this.dayNames[1]}-${this.dayNames[4]}
            </button>
            <button class="action-button secondary" @click="${() => this.copyToWeekend()}">
            <ha-icon icon="mdi:content-copy"></ha-icon>
            ${this.dayNames[5]} = ${this.dayNames[6]}
          </button>
        </div>
        
        <div class="save-actions">
          <button 
            class="action-button save" 
            @click="${() => this.saveChanges()}"
            ?disabled="${!this.hasChanges}"
          >
            <ha-icon icon="mdi:content-save"></ha-icon> ${localize(this.lang, LOC_KEYS.ui.card.sabiana_vmc.programs.settings.save)}
          </button>
          <button 
            class="action-button cancel" 
            @click="${() => this.cancelChanges()}"
            ?disabled="${!this.hasChanges}"
          >
            <ha-icon icon="mdi:content-save-off-outline"></ha-icon> ${localize(this.lang, LOC_KEYS.ui.card.sabiana_vmc.programs.settings.cancel)}
          </button>
        </div>
      </div>
    `;
  }

  private getSpeedName(speed: number): string {
    switch (speed) {
      case 2:
        return getEntityValue(this.hass, this.entities.speed_2, this.lang, 0);
      case 3:
        return getEntityValue(this.hass, this.entities.speed_3, this.lang, 0);
      case 4:
        return getEntityValue(this.hass, this.entities.speed_4, this.lang, 0);
      default:
        return '';
    }
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private setWeekSchedule(jsonData: JsonDay[]): void {

    jsonData.forEach(dayData => {
      // Filters only intervals not equals to "23:59"
      // Convert JsonInterval to HourSchedule
      const validIntervals = dayData?.i?.filter(interval => {
        return interval.t !== "23:59";
      })?.map(interval => {
        return { hour: parseInt(interval.t.split(':')[0], 10), speed: interval.s };
      });
      // Add initial speed at hour 0
      validIntervals?.unshift({
        hour: 0,
        speed: dayData.sb
      });

      this.schedule[dayData.d - 1].forEach(hour => {
        // Find the latest interval before or at this hour
        let applicableSpeed = 0;
        for (let i = 0; i < validIntervals?.length || 0; i++) {
          if (validIntervals[i].hour <= hour.hour) {
            applicableSpeed = validIntervals[i].speed;
          } else {
            break;
          }
        }
        hour.speed = applicableSpeed > 4 ? 0 : applicableSpeed;;
      });

    });

  }

  async saveCompleteSchedule(programNumber: number, scheduleDays: WeekSchedule) {
    programNumber = programNumber - 4 + 1; // Mappa 4-7 a 1-4
    for (let day = 0; day < 7; day++) {
      if (!scheduleDays[day] || scheduleDays[day].length !== 24) {
        console.error(`Invalid schedule for day ${day + 1}`);
        return;
      }
    }

    // Converti ogni giorno in JSON compresso    
    const daysJson = Object.entries(scheduleDays).map(([dayStr, hours]) =>
      JSON.stringify(this.compressDay24ToSabiana(Number(dayStr), hours))
    );

    try {
      await this.hass.callService('esphome', this.entities.service_utp_write, {
        program_number: programNumber,
        day1_json: daysJson[0],
        day2_json: daysJson[1],
        day3_json: daysJson[2],
        day4_json: daysJson[3],
        day5_json: daysJson[4],
        day6_json: daysJson[5],
        day7_json: daysJson[6]
      });

      console.log(`Program ${programNumber} saved successfully!`);

      // Opzionale: attendi un po' e ricarico i dati
      setTimeout(async () => {
        this.firstUpdated();
      }, 2000);

    } catch (error) {
      console.error(`❌ Failed to save program ${programNumber}:`, error);
      alert('Errore nel salvataggio!');
    }
  }

  private pad2(n: number): string {
    return n.toString().padStart(2, "0");
  }

  private toTimeStringFromHour(hour: number): string {
    return `${this.pad2(hour)}:00`;
  }

  private compressDay24ToSabiana(day: number, daySchedule: HourSchedule[]): JsonDay {
    if (daySchedule.length !== 24) {
      throw new Error("daySchedule deve avere esattamente 24 elementi");
    }

    // Ordino per sicurezza
    const sorted = [...daySchedule].sort((a, b) => a.hour - b.hour);

    const intervals: JsonInterval[] = [];

    // Primo blocco
    const standBySpeed = sorted[0].speed;
    let currentSpeed = sorted[0].speed;

    for (let i = 1; i < sorted.length; i++) {
      const entry = sorted[i];

      if (entry.speed !== currentSpeed) {
        // c'è un cambio rispetto a currentSpeed
        // chiudo il blocco precedente e apro un nuovo cambio
        intervals.push({
          t: this.toTimeStringFromHour(entry.hour),
          s: entry.speed,
        });

        currentSpeed = entry.speed;
      }
    }

    // Se più di 8 cambi, tieni i primi 8
    if (intervals.length > 8) {
      intervals.length = 8;
    }

    // Padding con 23:59 / 0 fino a 8
    while (intervals.length < 8) {
      intervals.push({
        t: "23:59",
        s: 0,
      });
    }

    return {
      d: day,
      sb: standBySpeed,
      i: intervals,
    };
  }
}
