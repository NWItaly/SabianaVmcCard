# 📝 Suggerimenti e best practice per lo sviluppo

Questi consigli ti aiuteranno a mantenere il progetto pulito, modulare e pronto per l'evoluzione futura.

## 1. Struttura dei file

- Mantieni separati HTML, CSS e TypeScript per facilitare la manutenzione.
- I file di traduzione (`en.json`, `it.json`, ecc.) devono restare in `src/translations/`.

**N.B.**: Il file `localize-keys.ts` viene generato automaticamente; non modificare manualmente.

## 2. Localizzazione

- Usa sempre la funzione localize(lang, key, params) per qualsiasi stringa, anche messaggi di errore o tooltip.
- Inserisci sempre eventuali parametri come {entity} o {version} nei JSON.

## 3. Task Explorer

- Utilizza i task definiti (`dev`, `build`, `gen:localize-keys`, ecc.) per automatizzare operazioni comuni.
- Non modificare manualmente i file compilati in `www/sabiana-vmc-card`; usa sempre Vite per la build.

## 4. Versionamento

- Aggiorna la versione della card in package.json ad ogni rilascio o test significativo.
- Mostrare la versione in alto a destra della card aiuta a identificare facilmente quale build è in uso.

## 5. Testing

- Verifica le modifiche in ambiente Docker prima di aggiornare la card in Home Assistant.
- Usa il `Ctrl+F5` del browser per forzare il refresh della cache dei file JS durante lo sviluppo.

## 6. Contributi

- Mantieni le funzioni modulari (safeState, formatNumber, withUnit, getEntityValue) per favorire il riuso.
- Documenta ogni nuova entità o funzione nei commenti e aggiorna eventuali file di traduzione.