import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('toggle-switch')
export class ToggleSwitch extends LitElement {
  @property({ type: Boolean }) checked = false;
  @property({ type: String }) label = '';
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: block;
    }

    .toggle-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      cursor: pointer;
      user-select: none;
    }

    .toggle-container.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .toggle-label {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      flex: 1;
    }

    .toggle-wrapper {
      position: relative;
      width: 40px;
      height: 20px;
    }

    .toggle-track {
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--disabled-text-color);
      border-radius: 10px;
      transition: background-color 0.2s ease;
    }

    .toggle-track.checked {
      background: var(--primary-color);
    }

    .toggle-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      background: var(--card-background-color, #fff);
      border-radius: 50%;
      transition: transform 0.2s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .toggle-thumb.checked {
      transform: translateX(20px);
    }

    .toggle-container:not(.disabled):hover .toggle-track {
      filter: brightness(1.1);
    }

    .toggle-container:not(.disabled):active .toggle-thumb {
      width: 20px;
    }

    .toggle-container:not(.disabled):active .toggle-thumb.checked {
      transform: translateX(16px);
    }

    /* Nasconde l'input reale ma lo mantiene accessibile */
    input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
  `;

  private handleClick(): void {
    if (this.disabled) return;
    
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('toggle-changed', { 
      detail: { checked: this.checked },
      bubbles: true,
      composed: true 
    }));
  }

  render() {
    return html`
      <div 
        class="toggle-container ${this.disabled ? 'disabled' : ''}"
        @click="${this.handleClick}"
      >
        <span class="toggle-label">${this.label}</span>
        <div class="toggle-wrapper">
          <div class="toggle-track ${this.checked ? 'checked' : ''}"></div>
          <div class="toggle-thumb ${this.checked ? 'checked' : ''}"></div>
          <input 
            type="checkbox" 
            .checked="${this.checked}"
            ?disabled="${this.disabled}"
            aria-label="${this.label}"
          >
        </div>
      </div>
    `;
  }
}