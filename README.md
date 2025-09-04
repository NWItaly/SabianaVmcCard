# SabianaVmcCard
Interfaccia grafica per vedere e comandare una VMC della Sabiana.

## 📦 Docker
Docker viene utilizzato per avere un ambiente su cui fare le prove di sviluppo. Con la configurazione impostata correttamente (.env) si dovrebbe avere una replica in locale della cartella `/config` così da poter verificare e modificare eventuali file con relativa semplicità. La configurazione si occupa anche di copiare il file generato dalla compilazione direttamente nella cartella `/config/www/`. Questo semplifica molto il deploy ed i test.

## ⚡ Configurazione Vite
Vite viene utilizzato per compilare la card TypeScript e i file CSS separati.
Per l'utilizzo vedere le automazioni di *Task Explorer*.

## 🛠 Task Explorer

Il progetto utilizza Task Explorer (VSCode) per facilitare lo sviluppo e l'esecuzione di comandi comuni.

### Task principali:

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

## 🟢 Installazione tramite HACS

La Sabiana VMC Card può essere installata come custom card tramite HACS.

Passaggi:

- Apri Home Assistant e vai su HACS → Frontend.
- Clicca sul pulsante “Esplora e aggiungi repository personalizzati”.
- Inserisci il link del repository GitHub: `https://github.com/NWItaly/SabianaVmcCard.git`
- Scegli Category: Lovelace e conferma l’aggiunta.
- Dopo aver aggiunto il repository, cerca Sabiana VMC Card nella lista dei frontend disponibili e clicca su Install.

Una volta installata, la card sarà disponibile per essere aggiunta alle tue dashboard Lovelace tramite l’editor YAML o la modalità manuale.

## ⚙️ Configurazione base della card

Esempio di configurazione minima in YAML:
``` yaml
type: 'custom:sabiana-vmc-card'
entity_temp_in: sensor.vmc_temp_in
entity_temp_out: sensor.vmc_temp_out
entity_temp_extracted: sensor.vmc_temp_extracted
entity_temp_disposal: sensor.vmc_temp_disposal
entity_efficiency: sensor.vmc_efficiency
```

Sostituisci le entity_… con le entità reali del tuo Home Assistant.

La card rileva automaticamente la lingua dell'interfaccia e mostra i testi tradotti secondo i file JSON.

## 📚 Guide dettagliate
- 📖 [Best practice](BESTPRACTICE.md)

## Licenza d'uso
Questo software è fornito "così com'è", senza alcuna garanzia espressa o implicita.
L'autore declina ogni responsabilità per eventuali danni diretti o indiretti derivanti dall'uso di questo progetto. L'uso è consentito esclusivamente per scopi personali, didattici o di test.
È vietata la distribuzione commerciale senza autorizzazione scritta dell'autore.

## Riferimenti esterni
- [Home Assistant](https://www.home-assistant.io/)
- [Docker](https://www.docker.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

### TODO

## 💬 Supporto

- 🐛 **Bug o problemi?** [Apri un Issue](../../issues)
- 📧 **Altro?** Contatta @NWItaly

---
⭐ **Ti piace il progetto?** Metti una stella! Aiuta altri utenti a trovarlo.