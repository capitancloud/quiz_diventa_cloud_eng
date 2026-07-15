# Deploy su Netlify — Capitan Cloud Quiz

## Prerequisiti

- Account GitHub (gratuito)
- Account Netlify (gratuito su [netlify.com](https://netlify.com))
- Node.js 18+ installato in locale

---

## 1. Push del repo su GitHub

```bash
# Dalla root del progetto
git init
git add .
git commit -m "feat: initial quiz app"

# Crea un nuovo repository su github.com, poi:
git remote add origin https://github.com/TUO_USERNAME/TUO_REPO.git
git branch -M main
git push -u origin main
```

---

## 2. Collegamento su Netlify

1. Accedi a [app.netlify.com](https://app.netlify.com)
2. Clicca **"Add new site"** → **"Import an existing project"**
3. Scegli **GitHub** e autorizza l'accesso
4. Seleziona il repository del quiz
5. Netlify rileverà automaticamente `netlify.toml` — verifica le impostazioni:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Clicca **"Deploy site"**

---

## 3. Environment Variables

Vai su **Site settings → Environment variables** e aggiungi:

| Key | Value | Note |
|-----|-------|------|
| `VITE_LEAD_WEBHOOK_URL` | `https://...` | Zapier/Make/ActiveCampaign webhook. Lascia vuoto se non usato. |
| `VITE_CTA_URL` | `https://capitancloud.it/percorso-90gg` | URL della sales page (già configurato come default) |

> **Importante:** dopo aver aggiunto le variabili, fai un nuovo deploy ("Trigger deploy" → "Deploy site") affinché vengano incluse nella build.

---

## 4. Netlify Forms — Raccolta Lead

Il form è già configurato con `data-netlify="true"` e il file `public/__forms.html` per il rilevamento a build time.

Per abilitare e visualizzare i lead:

1. **Site settings → Forms** — verifica che sia attivo
2. I lead raccolti si trovano in **Forms → quiz-lead** nel pannello Netlify
3. Puoi configurare **notifiche email** automatiche in **Forms → quiz-lead → Form notifications**
4. Per integrazioni avanzate (ConvertKit, ActiveCampaign) usa il campo `VITE_LEAD_WEBHOOK_URL`

---

## 5. Test in locale

```bash
# Installa dipendenze
npm install

# Copia il file di configurazione env
cp .env.example .env
# Modifica .env con i tuoi valori se necessario

# Avvia il server di sviluppo
npm run dev
# → apre su http://localhost:5173

# Build di produzione
npm run build

# Anteprima della build di produzione in locale
npm run preview
# → apre su http://localhost:4173
```

---

## 6. Dominio personalizzato (opzionale)

1. **Site settings → Domain management → Add custom domain**
2. Aggiungi il tuo dominio e segui le istruzioni per configurare il DNS
3. Netlify gestisce automaticamente il certificato SSL (Let's Encrypt)

---

## Struttura URL parametri profilo

Al termine del quiz, il bottone CTA reindirizza a:

```
https://capitancloud.it/percorso-90gg?profile=tag1_tag2_tag3_...
```

I tag rappresentano le risposte dell'utente e possono essere letti dalla sales page per personalizzare il contenuto o come dati di tracciamento per Meta Ads / Google Analytics.
