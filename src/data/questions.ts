export interface Option {
  label: string;
  tag: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: 'Se potessi lavorare anche da remoto in un settore in forte crescita, guadagnando in modo stabile, cosa ti fermerebbe di più oggi?',
    options: [
      { label: 'Non so da dove iniziare', tag: 'needs_direction' },
      { label: "Penso di non essere abbastanza \"tecnico\"", tag: 'confidence_gap' },
      { label: 'Non ho tempo per un percorso lungo', tag: 'time_objection' },
      { label: 'Niente, sono pronto a partire', tag: 'high_intent' },
    ],
  },
  {
    id: 2,
    question: 'Come descriveresti la tua situazione lavorativa attuale?',
    options: [
      { label: 'Stabile ma senza crescita reale', tag: 'stagnant' },
      { label: 'Stipendio insufficiente rispetto a quanto vorrei', tag: 'underpaid' },
      { label: 'Stress alto, poca soddisfazione', tag: 'burnout' },
      { label: 'Sto valutando di entrare nel mondo del lavoro', tag: 'new_entrant' },
    ],
  },
  {
    id: 3,
    question: 'Quanto sei soddisfatto della tua stabilità economica attuale?',
    options: [
      { label: 'Per niente, ho bisogno di un cambiamento', tag: 'urgent' },
      { label: 'Va bene ma vorrei di più', tag: 'growth_seeker' },
      { label: 'Sono soddisfatto ma curioso di nuove opportunità', tag: 'opportunistic' },
    ],
  },
  {
    id: 4,
    question: 'Ti sei mai sentito bloccato in un settore senza sbocchi di crescita?',
    options: [
      { label: 'Sì, costantemente', tag: 'stuck_high' },
      { label: 'Qualche volta', tag: 'stuck_medium' },
      { label: 'No, ma temo possa succedere', tag: 'preventive' },
    ],
  },
  {
    id: 5,
    question: 'Cosa ti manca di più oggi per fare il salto?',
    options: [
      { label: 'Una certificazione che dia credibilità', tag: 'cert_focused' },
      { label: 'Un metodo per trovare lavoro', tag: 'career_focused' },
      { label: 'Competenze tecniche solide', tag: 'skill_focused' },
    ],
  },
  {
    id: 6,
    question: 'Tra 12 mesi, cosa vorresti poter dire di te stesso?',
    options: [
      { label: 'Ho un nuovo lavoro stabile nel settore IT', tag: 'job_goal' },
      { label: 'Ho certificazioni riconosciute in mano', tag: 'cert_goal' },
      { label: 'Ho più libertà su come organizzo il mio lavoro', tag: 'freedom_goal' },
    ],
  },
  {
    id: 7,
    question: 'Quanto tempo potresti dedicare ogni giorno a un percorso di formazione?',
    options: [
      { label: "Almeno un'ora", tag: 'low_commit' },
      { label: 'Circa 2 ore', tag: 'aligned_commit' },
      { label: 'Anche di più, voglio accelerare', tag: 'high_commit' },
    ],
  },
  {
    id: 8,
    question: 'Su una scala da 1 a 10, quanto sei motivato a fare un cambiamento serio adesso?',
    options: [
      { label: '1-4: Ci penso ma non sono ancora sicuro', tag: 'low_intent' },
      { label: '5-7: Sono interessato, valuto le opzioni', tag: 'medium_intent' },
      { label: '8-10: Sono pronto, cerco solo la strada giusta', tag: 'high_intent' },
    ],
  },
  {
    id: 9,
    question: 'Qual è la tua situazione attuale?',
    options: [
      { label: 'Dipendente in cerca di cambio carriera', tag: 'employed_switcher' },
      { label: 'Studente/neolaureato', tag: 'new_grad' },
      { label: 'Disoccupato/in cerca di prima occupazione', tag: 'job_seeker' },
      { label: 'Freelance/partita IVA in altro settore', tag: 'freelancer_switcher' },
    ],
  },
];
