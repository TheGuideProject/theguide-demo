# TheGuide — Demo

Demo interattiva di **TheGuide**, l'AI travel companion per l'Italia.
App mobile simulata all'interno di uno schermo telefono (bezel + notch) con navigazione a 5 tab e 20+ schermate esplorabili.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- CSS puro con design tokens (nessuna libreria UI)
- Zero backend — tutto lato client, dati demo statici

## Avvio locale

```bash
npm install
npm run dev
```

App su `http://localhost:3000`.

## Build produzione

```bash
npm run build
npm run start
```

Next.js rispetta la variabile `PORT` (necessaria per Railway).

## Deploy su Railway

1. Fork/clone questo repo su GitHub.
2. Su Railway: **New Project → Deploy from GitHub repo** e seleziona il repo.
3. Railway rileva `railway.json` + `nixpacks.toml` automaticamente.
4. Non servono variabili d'ambiente.
5. Al termine del build, apri il dominio generato da Railway.

## Struttura

```
app/              # Next.js App Router (layout, page, global CSS)
components/
  App.tsx         # orchestratore stato (tab + modal)
  PhoneChrome.tsx # cornice telefono + status bar
  BottomNav.tsx   # tab bar 5 voci
  screens/        # 21 schermate (welcome, chat, map, wallet, ...)
lib/
  types.ts        # ScreenId, TabId
  constants.ts    # POI, showcase laterale
```

## Schermate incluse

Onboarding (welcome, chat con Iris), Scoperta (mappa, dettaglio POI, AR, SmartLens monumento/menu),
Viaggio (itinerario, audio player, evento live, gruppo, kids, accessibilità),
Payments (wallet, convert USD→EUR, mappa partner, QR slide-to-pay, ricevuta, TravelPass),
Account (profile con badge + XP).

## Licenza

Demo proprietaria — TheGuide Project.
