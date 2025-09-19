# Workflow di sviluppo:

1. Clona repository: git clone https://github.com/NWItaly/SabianaVmcCard.git  
2. Avvia ambiente Docker (copia .env con configurazione e usa task explorer):  
   docker compose up -d  
3. Avvia sviluppatore con hot-reload: npm run dev  
4. Compila la card per produzione: npm run build  
5. Copia i file compilati in /config/www/ di Home Assistant per il deploy  
6. Aggiungi la card tramite HACS o manualmente in Lovelace UI  

Nota: svuota la cache del browser dopo aggiornamenti per vedere le modifiche.
