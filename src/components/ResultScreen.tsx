import { useEffect, useState } from 'react';
import { getTopInsights } from '../data/insights';

interface Props {
  name: string;
  tags: string[];
}


const TAG_LABELS: Record<string, string> = {
  needs_direction: 'Cerca Direzione',
  confidence_gap: 'Costruisce Fiducia',
  time_objection: 'Gestisce il Tempo',
  high_intent: 'Alta Motivazione',
  stagnant: 'Pronto al Cambiamento',
  underpaid: 'Cerca Crescita Economica',
  burnout: 'Cerca Equilibrio',
  new_entrant: 'Nuovo nel Mercato',
  urgent: 'Urgenza di Cambiamento',
  growth_seeker: 'Orientato alla Crescita',
  opportunistic: 'Pensa Strategicamente',
  stuck_high: 'Cerca Sbocchi',
  stuck_medium: 'Vede i Segnali',
  preventive: 'Proattivo',
  cert_focused: 'Obiettivo Certificazione',
  career_focused: 'Obiettivo Colloquio',
  skill_focused: 'Orientato alle Skill',
  job_goal: 'Obiettivo Lavoro',
  cert_goal: 'Obiettivo Certificazione',
  freedom_goal: 'Cerca Libertà',
  low_commit: 'Formazione Flessibile',
  aligned_commit: 'Ritmo Sostenibile',
  high_commit: 'Massima Dedizione',
  low_intent: 'Esplora le Opzioni',
  medium_intent: 'Valuta con Attenzione',
  employed_switcher: 'Dipendente in Transizione',
  new_grad: 'Neolaureato',
  job_seeker: 'In Cerca di Lavoro',
  freelancer_switcher: 'Freelance in Evoluzione',
};

function getProfileTitle(tags: string[]): string {
  if (tags.includes('high_intent') || tags.includes('high_commit')) return 'Cloud Engineer ad Alto Potenziale';
  if (tags.includes('burnout') || tags.includes('urgent')) return 'Candidato Pronto al Salto';
  if (tags.includes('cert_focused') || tags.includes('needs_direction')) return 'Cloud Starter in Crescita';
  if (tags.includes('freedom_goal') || tags.includes('freelancer_switcher')) return 'Cloud Professional in Formazione';
  return 'Potenziale Cloud Engineer';
}

export default function ResultScreen({ name, tags }: Props) {
  const [visible, setVisible] = useState(false);
  const insights = getTopInsights(tags, 2);
  const profileTitle = getProfileTitle(tags);

  const ctaUrl = (() => {
    const base = (import.meta.env.VITE_CTA_URL as string | undefined) ?? 'https://capitancloud.it';
    return `${base}?profile=${tags.join('_')}`;
  })();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-5 py-12 overflow-hidden bg-[#080B14]">
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-[#0073E6]/15 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[55vw] h-[55vw] max-w-[500px] max-h-[500px] rounded-full bg-[#DDA808]/10 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div
        className={`relative z-10 w-full max-w-lg transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        {/* Success badge */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-[#0073E6] flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-white mb-1 leading-tight">
          Il tuo profilo, <span className="text-[#DDA808]">{name}</span>
        </h2>
        <p className="text-center text-slate-400 text-sm mb-6">Analisi basata sulle tue risposte</p>

        {/* Profile card */}
        <div className="rounded-2xl border border-[#0073E6]/25 bg-[#0D1117] p-6 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0073E6]/15 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">☁️</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Profilo rilevato</p>
              <p className="text-white font-bold text-lg leading-tight">{profileTitle}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#0073E6]/10 border border-[#0073E6]/20 text-[#60A5FA] text-xs font-medium"
              >
                {TAG_LABELS[tag] ?? tag}
              </span>
            ))}
          </div>
        </div>

        {/* Insights */}
        {insights.length > 0 && (
          <div className="flex flex-col gap-3 mb-6">
            <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold px-1">La tua analisi</p>
            {insights.map(({ tag, insight }) => (
              <div
                key={tag}
                className="flex items-start gap-3 px-4 py-4 rounded-xl border border-white/[0.07] bg-white/[0.02]"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0073E6]/15 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-[#0073E6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl text-white text-lg font-bold bg-[#0073E6] hover:bg-[#005FC2] active:bg-[#004DA0] active:scale-[0.98] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0073E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B14]"
        >
          Scopri il percorso giusto per te
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>

        <p className="text-center text-slate-600 text-xs mt-4">
          Percorso personalizzato basato sul tuo profilo · Capitan Cloud
        </p>
      </div>
    </div>
  );
}
