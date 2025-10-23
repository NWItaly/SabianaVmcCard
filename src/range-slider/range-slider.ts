import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('range-slider')
export class RangeSlider extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: String }) label = '';

  static styles = css`
    .range-container {
        display: flex;
        flex-direction: column;
    }

    .range-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .range-label {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color, #e1e1e1);
    }

    .range-value {
        font-size: 14px;
        color: var(--primary-color, #03a9f4);
        font-weight: 500;
    }
    
    .range-wrapper {
        position: relative;
    }

    .range-progress {
        position: absolute;
        height: 4px;
        background: var(--primary-color);
        border-radius: 2px 0 0 2px;
        pointer-events: none;
        top: 18px;
        left: 0;
        transition: width 0.1s ease;
    }

    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 40px;
        background: transparent;
        cursor: pointer;
        margin: 0;
    }

    /* Track */
    input[type="range"]::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        background: var(--disabled-text-color, #6f6f6f);
        border-radius: 2px;
    }

    input[type="range"]::-moz-range-track {
        width: 100%;
        height: 4px;
        background: var(--disabled-text-color, #6f6f6f);
        border-radius: 2px;
    }

    /* Thumb */
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: var(--primary-color, #03a9f4);
        cursor: pointer;
        margin-top: -8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: transform 0.1s ease, box-shadow 0.1s ease;
    }

    input[type="range"]::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: var(--primary-color, #03a9f4);
        cursor: pointer;
        border: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: transform 0.1s ease, box-shadow 0.1s ease;
    }

    /* Hover e Active states */
    input[type="range"]:hover::-webkit-slider-thumb {
        transform: scale(1.1);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    }

    input[type="range"]:hover::-moz-range-thumb {
        transform: scale(1.1);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    }

    input[type="range"]:active::-webkit-slider-thumb {
        transform: scale(1.15);
    }

    input[type="range"]:active::-moz-range-thumb {
        transform: scale(1.15);
    } 
  `;

  private handleInput(e: Event): void {
    const newValue = Number((e.target as HTMLInputElement).value);
    this.value = newValue;
    this.dispatchEvent(new CustomEvent('value-changed', { 
      detail: { value: newValue },
      bubbles: true,
      composed: true 
    }));
  }

  render() {
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;

    return html`
      <div class="range-container">
        <div class="range-header">
          <span class="range-label">${this.label}</span>
          <span class="range-value">${this.value}</span>
        </div>
        <div class="range-wrapper">
          <div class="range-progress" style="width: ${percentage}%"></div>
          <input 
            type="range" 
            min="${this.min}" 
            max="${this.max}" 
            step="${this.step}"
            .value="${this.value}"
            @input="${this.handleInput}"
          >
        </div>
      </div>
    `;
  }
}