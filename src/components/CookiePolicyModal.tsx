import LegalModal from './LegalModal';

interface Props {
  onClose: () => void;
  onOpenPrivacy: () => void;
  onRevoke: () => void;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h3 className="text-white font-bold text-base mt-6 mb-2">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-300 text-sm leading-relaxed">{children}</p>;
}

interface CookieRowProps {
  name: string;
  provider: string;
  purpose: string;
  type: string;
  duration: string;
}

function CookieRow({ name, provider, purpose, type, duration }: CookieRowProps) {
  const typeColor =
    type === 'Tecnico'
      ? 'text-emerald-400 bg-emerald-400/10'
      : type === 'Analitico'
      ? 'text-blue-400 bg-blue-400/10'
      : 'text-purple-400 bg-purple-400/10';

  return (
    <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-3 space-y-1">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <code className="text-white text-xs font-mono bg-white/10 px-2 py-0.5 rounded">{name}</code>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColor}`}>{type}</span>
      </div>
      <p className="text-slate-400 text-xs"><span className="text-slate-500">Provider:</span> {provider}</p>
      <p className="text-slate-400 text-xs"><span className="text-slate-500">Scopo:</span> {purpose}</p>
      <p className="text-slate-400 text-xs"><span className="text-slate-500">Durata:</span> {duration}</p>
    </div>
  );
}

export default function CookiePolicyModal({ onClose, onOpenPrivacy, onRevoke }: Props) {
  return (
    <LegalModal title="Cookie Policy" onClose={onClose}>
      <P>
        Ultimo aggiornamento: <strong className="text-white">luglio 2025</strong>
      </P>
      <P>
        La presente Cookie Policy illustra come il sito{' '}
        <strong className="text-white">quiz.capitancloud.it</strong> utilizza i cookie e
        tecnologie di tracciamento analoghe, in conformità all'art. 122 del D.Lgs. 196/2003
        (Codice Privacy), al Provvedimento del Garante dell'8 maggio 2014 e alla Linea guida
        del 10 giugno 2021, nonché al Regolamento UE 2016/679 (GDPR).
      </P>
      <P>
        Per informazioni complete sul trattamento dei dati personali consulta la{' '}
        <button
          onClick={onOpenPrivacy}
          className="underline text-[#0073E6] hover:text-[#3399FF] transition-colors"
        >
          Privacy Policy
        </button>.
      </P>

      <H2>1. Che cosa sono i cookie</H2>
      <P>
        I cookie sono piccoli file di testo che i siti web salvano nel dispositivo dell'utente
        quando vengono visitati. Consentono al sito di ricordare le azioni e le preferenze
        (login, lingua, dimensione font, ecc.) per un certo periodo, in modo che l'utente non
        debba reinserirle ad ogni visita. Tecnologie simili (pixel, beacon, localStorage)
        funzionano in maniera analoga.
      </P>

      <H2>2. Categorie di cookie utilizzati</H2>

      <p className="text-white font-semibold text-sm mt-4 mb-2">🟢 Cookie tecnici (sempre attivi)</p>
      <P>
        Strettamente necessari per il funzionamento del sito e l'erogazione del servizio.
        Non richiedono il consenso dell'utente (art. 122 Codice Privacy, esecl. comma 1).
      </P>
      <div className="space-y-2 mt-3">
        <CookieRow
          name="cc_consent_v1"
          provider="Quiz Capitan Cloud (1st party)"
          purpose="Memorizza le preferenze di consenso cookie dell'utente."
          type="Tecnico"
          duration="12 mesi"
        />
        <CookieRow
          name="sessionStorage (quiz_tags)"
          provider="Quiz Capitan Cloud (1st party)"
          purpose="Memorizza le risposte del quiz durante la sessione. Cancellato alla chiusura del browser."
          type="Tecnico"
          duration="Sessione"
        />
      </div>

      <p className="text-white font-semibold text-sm mt-6 mb-2">🔵 Cookie analitici (previo consenso)</p>
      <P>
        Utilizzati per raccogliere informazioni aggregate e anonime sull'utilizzo del sito,
        al fine di migliorare l'esperienza utente. Richiedono il consenso.
      </P>
      <div className="space-y-2 mt-3">
        <CookieRow
          name="_ga, _ga_*"
          provider="Google LLC (Google Analytics 4)"
          purpose="Distingue gli utenti unici, misura sessioni e interazioni."
          type="Analitico"
          duration="2 anni / 13 mesi"
        />
        <CookieRow
          name="_gid"
          provider="Google LLC (Google Analytics 4)"
          purpose="Distingue gli utenti. Usato per limitare la frequenza delle richieste."
          type="Analitico"
          duration="24 ore"
        />
        <CookieRow
          name="_gat"
          provider="Google LLC (Google Analytics 4)"
          purpose="Limita il numero di richieste al server di Google."
          type="Analitico"
          duration="1 minuto"
        />
      </div>
      <P>
        Google Analytics è configurato con anonimizzazione IP. I dati non sono ceduti a terzi
        per scopi commerciali. Informazioni: <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-[#0073E6] underline">policies.google.com/technologies/cookies</a>.
        Opt-out: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#0073E6] underline">tools.google.com/dlpage/gaoptout</a>.
      </P>

      <p className="text-white font-semibold text-sm mt-6 mb-2">🟣 Cookie di marketing e profilazione (previo consenso)</p>
      <P>
        Utilizzati per misurare le conversioni delle campagne pubblicitarie e, ove applicabile,
        per mostrare annunci pertinenti agli utenti su piattaforme terze. Richiedono il consenso
        esplicito (art. 122 Codice Privacy).
      </P>
      <div className="space-y-2 mt-3">
        <CookieRow
          name="_fbp, _fbc, fr"
          provider="Meta Platforms Ireland Ltd. (Meta Pixel)"
          purpose="Misura le conversioni delle inserzioni Facebook/Instagram, ottimizza il pubblico."
          type="Marketing"
          duration="3 mesi / sessione"
        />
        <CookieRow
          name="tt_webid, _ttp"
          provider="TikTok Ireland Ltd. (TikTok Pixel)"
          purpose="Misura le conversioni delle inserzioni TikTok, crea pubblici simili."
          type="Marketing"
          duration="13 mesi"
        />
        <CookieRow
          name="__SnapchatPixel (futuro)"
          provider="Snap Group Ltd."
          purpose="Misurazione conversioni Snapchat Ads (non ancora attivo)."
          type="Marketing"
          duration="13 mesi"
        />
        <CookieRow
          name="LinkedIn Insight Tag (futuro)"
          provider="LinkedIn Ireland Unlimited Company"
          purpose="Misurazione conversioni LinkedIn Ads (non ancora attivo)."
          type="Marketing"
          duration="180 giorni"
        />
      </div>

      <H2>3. Gestione del consenso</H2>
      <P>
        Al primo accesso al sito viene mostrato un banner che consente di: accettare tutti i
        cookie, rifiutare i cookie facoltativi o personalizzare le scelte per categoria.
        Il consenso è revocabile in qualsiasi momento cliccando il pulsante qui sotto o
        ripristinando le impostazioni del browser.
      </P>
      <button
        onClick={onRevoke}
        className="mt-3 inline-block py-2 px-4 rounded-xl border border-white/20 text-slate-300 text-sm hover:bg-white/[0.06] transition-colors"
      >
        ↩ Modifica le tue preferenze cookie
      </button>

      <H2>4. Come disabilitare i cookie dal browser</H2>
      <P>
        Puoi disabilitare tutti i cookie direttamente dalle impostazioni del browser. Tieni
        presente che la disabilitazione dei cookie tecnici potrebbe compromettere il
        funzionamento del sito.
      </P>
      <ul className="mt-2 space-y-1">
        {[
          { name: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
          { name: 'Firefox', url: 'https://support.mozilla.org/it/kb/Gestione%20dei%20cookie' },
          { name: 'Safari', url: 'https://support.apple.com/it-it/guide/safari/sfri11471/mac' },
          { name: 'Edge', url: 'https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
        ].map(({ name, url }) => (
          <li key={name} className="text-slate-300 text-sm ml-4 list-disc">
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#0073E6] underline hover:text-[#3399FF]">{name}</a>
          </li>
        ))}
      </ul>

      <H2>5. Aggiornamenti</H2>
      <P>
        La presente Cookie Policy è aggiornata ogni volta che vengono introdotti nuovi
        strumenti di tracciamento o rimossi quelli esistenti. La data in cima indica la
        versione in vigore. Le modifiche sostanziali saranno notificate tramite il banner
        del consenso.
      </P>
    </LegalModal>
  );
}
