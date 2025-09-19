# 📦 Docker
Docker viene utilizzato per avere un ambiente su cui fare le prove di sviluppo. Con la configurazione impostata correttamente (.env) si dovrebbe avere una replica in locale della cartella `/config` così da poter verificare e modificare eventuali file con relativa semplicità. La configurazione si occupa anche di copiare il file generato dalla compilazione direttamente nella cartella `/config/www/`. Questo semplifica molto il deploy ed i test.

# ⚡ Configurazione Vite
Vite viene utilizzato per compilare la card TypeScript e i file CSS separati.
Per l'utilizzo vedere le automazioni di *Task Explorer*.

# 🛠 Task Explorer

Il progetto utilizza Task Explorer (VSCode) per facilitare lo sviluppo e l'esecuzione di comandi comuni.

## Task principali:

- **npm**
    - `dev`: avvia Vite in modalità sviluppo.
    - `build`: compila la card TypeScript in JavaScript pronto per HA.
    - `gen:localize-keys`: genera automaticamente il file `localize-keys.ts` a partire dai file di traduzione JSON.
- **docker**
    - `Aggiorna immagine`: aggiorna l'istanza con l'ultima versione disponibile di HA.
    - `Avvia`: avvia il container di sviluppo.
    - `Ferma`: ferma il container di sviluppo.
    - `Log in tempo reale`: permette di vedere eventuali log del container.
    - `Riavvia`: ferma e avvia il container di sviluppo.
- **vite**
    - `Compila`: compila il codice e lo rende disponibile nella cartella `/dist`. Se il container docker è avviato viene automaticamente aggiornato.
    
        **N.B.**: ATTENZIONE alla cache del browser che potrebbe impedire il caricamento corretto delle modifiche.
    - `Dev mode (hot-reload)`: compila il codice ogni volta che un file viene modificato.