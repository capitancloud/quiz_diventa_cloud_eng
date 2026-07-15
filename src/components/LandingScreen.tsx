import { useEffect, useState } from 'react';

interface Props {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-5 py-12 overflow-hidden bg-[#080B14]">
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-15%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-[#0073E6]/15 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[450px] max-h-[450px] rounded-full bg-[#DDA808]/10 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
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
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#0073E6]/40 shadow-lg shadow-[#0073E6]/20">
            <img
              src="/capitan-cloud-logo.png"
              alt="Capitan Cloud"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Brand badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0073E6]/40 bg-[#0073E6]/10 text-[#0073E6] text-sm font-semibold tracking-wide">
            <span className="text-base">☁️</span>
            <span>Capitan Cloud</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold leading-snug mb-3">
          <span className="text-white">Scopri se la carriera da </span>
          <span className="text-[#DDA808]">Cloud Engineer</span>
          <span className="text-white"> fa per te (anche partendo da zero)</span>
        </h1>

        <p className="text-center text-slate-400 text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto">
          Rispondi a <strong className="text-white">9 domande</strong> e scopri se questo percorso è giusto per te — meno di 2 minuti, promesso!
        </p>

        {/* Social proof bullets */}
        <div className="mb-6 flex flex-col gap-3">
          {[
            { icon: '🎯', text: 'Se hai le attitudini giuste per questo ruolo, anche partendo da zero' },
            { icon: '📊', text: 'Quanto sei vicino a una carriera tech in un settore che assume' },
            { icon: '🧭', text: 'Il prossimo passo concreto per te, in base alle tue risposte' },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07]"
            >
              <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
              <p className="text-slate-300 text-sm leading-snug">{text}</p>
            </div>
          ))}
        </div>

        {/* Social proof trust line */}
        <p className="text-center text-slate-500 text-xs mb-3">
          ✅ 100.000+ persone formate · Nessun account richiesto
        </p>

        {/* CTA button */}
        <button
          onClick={onStart}
          className="w-full py-4 px-6 rounded-2xl text-[#0A0A0A] text-lg font-bold bg-[#F5B500] hover:bg-[#E0A800] active:bg-[#C99700] active:scale-[0.98] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B500] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B14]"
        >
          Scopri se è il percorso giusto per te →
        </button>
      </div>
    </div>
  );
}
