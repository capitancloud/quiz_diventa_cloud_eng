import LegalModal from './LegalModal';

interface Props {
  onClose: () => void;
}

const OWNER = 'Eugenio Carlo Fontana';
const ADDRESS = 'Via Borgo Baldassarre Paoli 53, 50022 Greve in Chianti (FI) – Italia';
const VAT = '07097370485';
const CF = 'FNTGCR88B12A564Z';
const EMAIL = 'ilcapitancloud@gmail.com';
const SITE = 'https://quiz.capitancloud.it';

function H2({ children }: { children: React.ReactNode }) {
  return <h3 className="text-white font-bold text-base mt-6 mb-2">{children}</h3>;
}

function P({ children }: { children: React.ReactNode; className?: string }) {
  return <p className="text-slate-300 text-sm leading-relaxed">{children}</p>;
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="text-slate-300 text-sm leading-relaxed ml-4 list-disc">{children}</li>;
}

export default function PrivacyPolicyModal({ onClose }: Props) {
  return (
    <LegalModal title="Informativa sulla Privacy" onClose={onClose}>
      <P>
        Ultimo aggiornamento: <strong className="text-white">luglio 2025</strong>
      </P>
      <P>
        La presente informativa è resa ai sensi dell'art. 13 del Regolamento UE 2016/679
        (GDPR) e del D.Lgs. 196/2003 (Codice Privacy) come modificato dal D.Lgs. 101/2018,
        agli utenti che interagiscono con il sito <strong className="text-white">{SITE}</strong>.
      </P>

      <H2>1. Titolare del trattamento</H2>
      <P>
        <strong className="text-white">{OWNER}</strong><br />
        {ADDRESS}<br />
        P. IVA: {VAT} – C.F.: {CF}<br />
        Email: <a href={`mailto:${EMAIL}`} className="text-[#0073E6] underline hover:text-[#3399FF]">{EMAIL}</a>
      </P>

      <H2>2. Tipologie di dati trattati e finalità</H2>
      <P>Il Titolare raccoglie e tratta le seguenti categorie di dati personali:</P>
      <ul className="mt-2 space-y-2">
        <Li>
          <strong className="text-white">Dati di navigazione.</strong> I sistemi informatici acquisiscono automaticamente, durante la navigazione, i dati trasmessi dal browser: indirizzi IP, tipo di browser, sistema operativo, pagine visitate, data e ora della visita. Sono trattati per garantire il corretto funzionamento del sito (base giuridica: interesse legittimo, art. 6 par. 1 lett. f GDPR) e, previo consenso, per scopi analitici e pubblicitari.
        </Li>
        <Li>
          <strong className="text-white">Dati forniti volontariamente.</strong> Nome, cognome e indirizzo e-mail inseriti nel modulo del quiz, trattati per: (a) inviare la comunicazione richiesta e la profilazione del risultato (base giuridica: esecuzione di un servizio, art. 6 par. 1 lett. b); (b) inviare comunicazioni commerciali e newsletter sul tema Cloud/AWS, previo consenso esplicito (art. 6 par. 1 lett. a).
        </Li>
        <Li>
          <strong className="text-white">Dati di provenienza.</strong> Il parametro <code className="bg-white/10 px-1 rounded text-xs">utm_source</code> eventualmente presente nell'URL viene salvato come campo "provenienza" per misurare l'efficacia dei canali di acquisizione.
        </Li>
        <Li>
          <strong className="text-white">Cookie e tecnologie di tracciamento.</strong> Si veda la sezione Cookie Policy.
        </Li>
      </ul>

      <H2>3. Modalità del trattamento</H2>
      <P>
        I dati sono trattati con strumenti elettronici, con misure di sicurezza adeguate a
        prevenire accessi non autorizzati, perdita o divulgazione. Il trattamento avviene
        esclusivamente per le finalità indicate. Nessun processo decisionale automatizzato
        produce effetti giuridici significativi sull'interessato.
      </P>

      <H2>4. Responsabili del trattamento e destinatari</H2>
      <P>I dati possono essere comunicati a:</P>
      <ul className="mt-2 space-y-2">
        <Li>
          <strong className="text-white">MailerLite</strong> (MailerLite UAB, Vilnius) – piattaforma di email marketing, designata Responsabile del trattamento. Dati trasferiti in UE/SEE con garanzie adeguate. Privacy: <a href="https://www.mailerlite.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#0073E6] underline">mailerlite.com/legal/privacy-policy</a>.
        </Li>
        <Li>
          <strong className="text-white">Netlify Inc.</strong> (San Francisco, USA) – hosting e gestione dei form. Trasferimento extra-UE coperto da clausole contrattuali standard (SCC). Privacy: <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#0073E6] underline">netlify.com/privacy</a>.
        </Li>
        <Li>
          <strong className="text-white">Google LLC</strong> (USA) – Google Analytics (previo consenso), con anonimizzazione IP. Dati trattati tramite SCC. Privacy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0073E6] underline">policies.google.com/privacy</a>.
        </Li>
        <Li>
          <strong className="text-white">Meta Platforms Ireland Ltd.</strong> – Meta Pixel (previo consenso) per la misurazione delle conversioni. Privacy: <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-[#0073E6] underline">facebook.com/privacy/policy</a>.
        </Li>
        <Li>
          <strong className="text-white">TikTok Ireland Ltd.</strong> – TikTok Pixel (previo consenso) per la misurazione delle conversioni. Privacy: <a href="https://www.tiktok.com/legal/page/eea/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[#0073E6] underline">tiktok.com/legal/page/eea/privacy-policy</a>.
        </Li>
        <Li>
          <strong className="text-white">Zapier Inc.</strong> (USA) – eventuale automazione tramite webhook (previo consenso). Privacy: <a href="https://zapier.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0073E6] underline">zapier.com/privacy</a>.
        </Li>
      </ul>
      <P className="mt-2">
        Nessun dato viene venduto a terzi.
      </P>

      <H2>5. Trasferimento extra-UE</H2>
      <P>
        Alcuni destinatari indicati al punto 4 hanno sede negli USA o in altri Paesi extra-SEE.
        I trasferimenti avvengono nel rispetto degli artt. 44-49 GDPR, tramite Clausole
        Contrattuali Standard adottate dalla Commissione Europea o altre garanzie adeguate.
        Su richiesta è possibile ottenere copia delle garanzie adottate.
      </P>

      <H2>6. Periodo di conservazione</H2>
      <ul className="mt-2 space-y-2">
        <Li>Dati di navigazione: max 12 mesi, salvo obblighi di legge.</Li>
        <Li>Nome ed e-mail: conservati fino alla revoca del consenso o alla cancellazione esplicita della lista, max 5 anni dall'ultima interazione.</Li>
        <Li>Dati analitici aggregati (Google Analytics): secondo le impostazioni della piattaforma (default 14 mesi).</Li>
        <Li>Cookie di consenso: 12 mesi dal rilascio del consenso.</Li>
      </ul>

      <H2>7. Diritti dell'interessato</H2>
      <P>
        L'interessato può esercitare in qualsiasi momento i diritti previsti dagli artt. 15-22 GDPR:
      </P>
      <ul className="mt-2 space-y-1">
        <Li>Accesso ai propri dati personali (art. 15).</Li>
        <Li>Rettifica di dati inesatti (art. 16).</Li>
        <Li>Cancellazione ("diritto all'oblio") (art. 17).</Li>
        <Li>Limitazione del trattamento (art. 18).</Li>
        <Li>Portabilità dei dati (art. 20).</Li>
        <Li>Opposizione al trattamento (art. 21).</Li>
        <Li>Revoca del consenso in qualsiasi momento senza pregiudicare la liceità del trattamento basato sul consenso prestato prima della revoca (art. 7 par. 3).</Li>
      </ul>
      <P>
        Per esercitare i propri diritti, scrivere a:{' '}
        <a href={`mailto:${EMAIL}`} className="text-[#0073E6] underline hover:text-[#3399FF]">{EMAIL}</a>. Il Titolare risponde entro 30 giorni dalla ricezione della richiesta.
      </P>
      <P>
        L'interessato ha altresì il diritto di proporre reclamo all'Autorità Garante per la
        protezione dei dati personali (Garante Privacy – <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#0073E6] underline">garanteprivacy.it</a>).
      </P>

      <H2>8. Minori</H2>
      <P>
        Il sito non è destinato a minori di 18 anni. Il Titolare non raccoglie
        consapevolmente dati personali di minori. Se vengono rilevati dati di minori,
        saranno cancellati senza indugio.
      </P>

      <H2>9. Modifiche alla presente informativa</H2>
      <P>
        La presente informativa può essere aggiornata in qualsiasi momento. Le modifiche
        sostanziali saranno comunicate agli iscritti via e-mail e/o con un avviso sul sito.
        La data di "Ultimo aggiornamento" in cima al documento indica la versione in vigore.
      </P>
    </LegalModal>
  );
}
