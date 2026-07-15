export const tagToInsight: Record<string, string> = {
  needs_direction:
    'Avere una roadmap chiara è il primo passo: senza direzione anche le persone più capaci restano ferme.',
  confidence_gap:
    'Non devi essere un programmatore per lavorare nel cloud — la maggior parte dei ruoli Cloud richiede logica e metodo, non codice.',
  time_objection:
    'Un percorso strutturato di 90 giorni, anche a ritmo ridotto, è sufficiente per ottenere la prima certificazione AWS.',
  high_intent:
    'Hai già la mentalità giusta: serve solo il percorso corretto per trasformare la motivazione in risultati concreti.',
  stagnant:
    'La stagnazione professionale è uno dei segnali più chiari che è il momento di investire in un settore in crescita come il cloud.',
  underpaid:
    'I professionisti cloud certificati guadagnano mediamente il 40% in più rispetto ai ruoli IT tradizionali — il mercato premia chi investe in queste skill.',
  burnout:
    'Il cloud offre percorsi di crescita concreti: certificazioni riconosciute che aprono le porte a ruoli richiesti e ben retribuiti nel mercato IT.',
  new_entrant:
    'Entrare nel mercato del lavoro direttamente nel settore cloud è una delle mosse più strategiche che puoi fare nel 2024.',
  urgent:
    "La necessità di un cambiamento economico reale è il carburante più potente per completare un percorso di formazione: usa questa urgenza a tuo favore.",
  growth_seeker:
    'Vuoi di più — e nel cloud "di più" è la norma: stipendi più alti, ruoli più interessanti, opportunità internazionali.',
  opportunistic:
    'Agire da una posizione di stabilità ti dà un vantaggio enorme: puoi formarti senza pressione e scegliere il momento giusto per fare il salto.',
  stuck_high:
    'Sentirti bloccato costantemente è il segnale che il tuo settore attuale ha raggiunto il suo tetto — il cloud non ne ha.',
  stuck_medium:
    "Quella sensazione occasionale di blocco è spesso l'anticamera di una svolta: meglio agire prima che diventi una certezza.",
  preventive:
    'Anticipare un problema prima che si manifesti è una qualità rara — e il settore cloud premia esattamente questo tipo di pensiero strategico.',
  beginner_curious:
    'La curiosità è il tuo asset principale: partire da zero nel cloud è normale, e chi inizia con il giusto metodo raggiunge risultati sorprendentemente rapidi.',
  aware_stuck:
    "Sapere che il cloud è importante ma non sapere da dove iniziare è l'ostacolo più comune — e più risolvibile con la guida giusta.",
  self_taught_failed:
    'Studiare da soli spesso fallisce per mancanza di struttura e feedback: un percorso guidato cambia tutto.',
  cert_focused:
    'La certificazione AWS è il primo segnale concreto che il mercato legge sul tuo CV — e con il metodo giusto la raggiungi in 90 giorni.',
  career_focused:
    'Avere un CV pronto per i colloqui cloud significa sapere cosa scrivere, come presentarsi e come superare i primi screening tecnici.',
  skill_focused:
    'Le competenze pratiche sono quelle che ti fanno assumere: in 90 giorni puoi costruire progetti reali che dimostrano il tuo valore senza anni di esperienza.',
  job_goal:
    'Un lavoro stabile nel cloud è un obiettivo realistico entro 6-12 mesi con il percorso giusto — non è un sogno, è un piano.',
  cert_goal:
    'Le certificazioni AWS sono riconosciute globalmente e aprono porte in aziende di ogni dimensione: sono il passaporto del professionista cloud.',
  freedom_goal:
    'La libertà geografica e di scelta è uno dei benefit più concreti della carriera cloud — e non è riservata a pochi.',
  low_commit:
    'Anche meno di un ora al giorno, se costante e ben strutturata, può portarti alla prima certificazione AWS in pochi mesi.',
  aligned_commit:
    'Due ore al giorno sono perfette per seguire un percorso intensivo senza sacrificare il resto della tua vita.',
  high_commit:
    'Con questa disponibilità di tempo e la giusta guida, puoi ottenere risultati straordinari in un tempo molto più breve della media.',
  low_intent:
    "L'incertezza è normale all'inizio — spesso basta avere più informazioni concrete per trasformarla in decisione.",
  medium_intent:
    'Essere nella fase di valutazione è il momento ideale per raccogliere le informazioni giuste e scegliere con chiarezza.',
  employed_switcher:
    'Cambiare carriera da dipendente richiede coraggio e pianificazione — e chi lo fa nel cloud raramente torna indietro.',
  new_grad:
    'Iniziare la carriera nel cloud da neolaureato è una scelta che tra 5 anni ti renderà uno dei professionisti più richiesti sul mercato.',
  job_seeker:
    'Investire in una certificazione cloud mentre cerchi lavoro ti differenzia immediatamente dalla maggior parte dei candidati.',
  freelancer_switcher:
    'Le competenze cloud si combinano perfettamente con la mentalità freelance: molti dei nostri studenti costruiscono un business solido attorno al cloud.',
};

export function getTopInsights(tags: string[], count = 2): { tag: string; insight: string }[] {
  return tags
    .filter((tag) => tagToInsight[tag])
    .slice(0, count)
    .map((tag) => ({ tag, insight: tagToInsight[tag] }));
}
