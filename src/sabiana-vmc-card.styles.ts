import { css } from "lit";

export const cardStyles = css`
  ha-card {
    padding: 16px;
    background-color: var(--card-background-color);
    color: var(--wa-color-neutral-fill-loud);
    border-radius: 12px;
    width: 100%; /* Usa tutto lo spazio orizzontale */
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }

  .hidden-element {
    display: none !important;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }

  .header .name {
    font-size: var(--ha-card-header-font-size, var(--ha-font-size-2xl));
    letter-spacing: -0.012em;
    line-height: var(--ha-line-height-expanded);
    font-weight: var(--ha-font-weight-normal);
    color: var(--ha-card-header-color, var(--primary-text-color));
  }

  .main-row {
    display: flex;
    align-items: center;      /* allineamento verticale */
    // justify-content: start;   /* allinea gli elementi all'inizio */
    // gap: 24px;                /* distanza tra temperature e ventola */
    margin-bottom: 16px;
  }
  
  /* Stili per la sezione delle temperature */
  .temps {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 60px;          /* opzionale: larghezza minima delle temperature */
    flex: 1;
  }

  .temps div {
    display: flex;
    align-items: center;
    min-width: 60px;
    white-space: nowrap;
  }

  .temps ha-icon {
    font-size: 1.5em;
    cursor: pointer;
    padding-right: 8px;
  }

  /* Stili per l'indicatore di stato */
  .status-indicator {
    display: grid;
    grid-template-columns: repeat(2, auto); /* 2 colonne di icone */
    gap: 6px 12px;                           /* row-gap col-gap */
    margin-left: auto;                       /* spinge l'indicatore a destra */
    flex: 1;
    justify-content: end;                    /* allinea la griglia a destra */
    align-items: center;
    text-align: right;
  }

  /* piccolo adattamento responsive: 1 colonna su schermi stretti */
  @media (max-width: 420px) {
    .status-indicator {
      grid-template-columns: repeat(1, auto);
      gap: 6px;
    }
  }

  .status-indicator ha-icon {
    font-size: 1.5em;
    cursor: pointer;
  }

  .status-indicator ha-icon.on {
    color: var(--primary-color);
  }

  .status-indicator ha-icon.off {
    color: var(--disabled-text-color);
  }

  .status-indicator .alert {
    color: var(--error-color, #d32f2f);
  }

  .status-indicator .warning {
    color: var(--wa-color-warning-fill-loud, #ff9342);
  }

  /* Stili per il pulsante di accensione */
  .power-button {
    border: none;
    cursor: pointer;
    font-size: 1.1em;
    border-radius: 50%;
    color: var(--primary-text-color);
    transition: background-color 0.3s;
  }

  .power-button:hover {
    background-color: var(--ha-color-fill-neutral-loud-active);
  }

  .power-button-on {
    color: var(--error-color, #d32f2f);
  }

  .power-button-off {
    color: var(--disabled-text-color, #9e9e9e);
  }

  /* Stili per pulsanti raggruppati */
  .group-selector {
    display: flex;
    margin-bottom: 16px;
    background: var(--card-background-color);
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.03);
    border: 1px solid var(--divider-color);  
  }

  .group-button {
    flex: 1;
    padding: 10px 0;
    background: none;
    border: none;
    border-right: 1px solid #fff; /* Bordo bianco tra pulsanti */    
    color: var(--wa-color-neutral-fill-loud);
    cursor: pointer;
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, color 0.15s;
    border-radius: 0;             /* Nessun arrotondamento di default */
    outline: none;
    padding: 4px;
    container-type: inline-size;
  }

  .group-button:first-child {
    border-top-left-radius: 30px;    /* Estremo sinistro arrotondato a cerchio */
    border-bottom-left-radius: 30px;
  }

  .group-button:last-child {
    border-top-right-radius: 30px;   /* Estremo destro arrotondato a cerchio */
    border-bottom-right-radius: 30px;
    border-right: none; /* Nessun bordo dopo l’ultimo */
  }

  .group-button:hover {
    background: var(--wa-color-neutral-fill-normal);
  }

  .group-button.selected {
    background: var(--ha-color-fill-primary-normal-resting);
    color: var(--ha-color-fill-primary-loud-active);
    font-weight: 600;
  }

  .group-button:disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }

  /* Stili per il selettore del programma */
  .program-selection {
    display: flex;
    margin-bottom: 16px;
    background: var(--card-background-color);
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.03);
    border: 1px solid var(--divider-color);
  }

  .program-button {
    flex: 1;
    padding: 10px 0;
    background: none;
    border: none;
    border-right: 1px solid #fff; /* Bordo bianco tra pulsanti */    
    color: var(--wa-color-neutral-fill-loud);
    cursor: pointer;
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, color 0.15s;
    border-radius: 0;             /* Nessun arrotondamento di default */
    outline: none;
    padding: 4px;
  }

  .program-button:first-child {
    border-top-left-radius: 30px;    /* Estremo sinistro arrotondato a cerchio */
    border-bottom-left-radius: 30px;
  }

  .program-button:last-child {
    border-top-right-radius: 30px;   /* Estremo destro arrotondato a cerchio */
    border-bottom-right-radius: 30px;
    border-right: none; /* Nessun bordo dopo l’ultimo */
  }

  .program-button:hover {
    background: var(--wa-color-neutral-fill-normal);
  }

  .program-button.selected {
    background: var(--ha-color-fill-primary-normal-resting);
    color: var(--ha-color-fill-primary-loud-active);
    font-weight: 600;
  }

  .program-button:disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }

  /* Stili per la selezione dei giorni della modalità vacanza */
  .holiday-mode-days {
    
  }

  /* Stili per la ventola centrale */
  .fan-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--wa-color-neutral-fill-loud);
    user-select: none;
    flex: 1;
  }

  .fan-anim {
    animation-name: spinFan;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    transform-origin: center center;
  }

  @keyframes spinFan {
    100% {
      transform: rotate(-360deg);
    }
  }

  /* Stili per la modale */
  .modal {
    display: block;
    position: fixed;
    z-index: 999;
    left: 0; top: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.4);
    color: #333;
  }
  .modal-content {
    background: #fff;
    margin: 15% auto;
    padding: 16px;
    border-radius: 8px;
    width: 320px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  }
  .close {
    float: right;
    cursor: pointer;
    font-size: 22px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
  }

  .version {
    font-size: 0.75em;
    color: var(--secondary-text-color);
    user-select: none;
  }

  /* Stili per lo Spinner */
  .spinner {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    border-radius: 8px;
  }

  .spinner ha-icon {
    animation: spin 1s linear infinite;
    width: 48px;
    height: 48px;
    color: var(--primary-color);
  }

  @keyframes spin {
    0%   { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
  }
`;