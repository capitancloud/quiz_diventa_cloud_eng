import { useEffect, useState } from 'react';
import { submitLead } from '../lib/submitLead';

interface Props {
  tags: string[];
  onSubmit: (name: string, email: string) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailGateScreen({ tags, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const validate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!name.trim()) errs.name = 'Il nome è obbligatorio.';
    if (!email.trim()) {
      errs.email = "L'email è obbligatoria.";
    } else if (!EMAIL_REGEX.test(email)) {
      errs.email = 'Inserisci un indirizzo email valido.';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await submitLead({ name: name.trim(), email: email.trim(), tags });
      sessionStorage.setItem('cc_tags', JSON.stringify(tags));
      sessionStorage.setItem('cc_name', name.trim());
    } catch {
      // non-blocking
    } finally {
      setLoading(false);
      onSubmit(name.trim(), email.trim());
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-5 py-12 overflow-hidden bg-[#080B14]">
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-15%] w-[65vw] h-[65vw] max-w-[550px] max-h-[550px] rounded-full bg-[#0073E6]/12 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] max-w-[480px] max-h-[480px] rounded-full bg-[#DDA808]/08 blur-[110px]" />
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
        className={`relative z-10 w-full max-w-md transition-all duration-400 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        {/* Lock icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-[#0073E6]/15 border border-[#0073E6]/25 flex items-center justify-center">
            <svg className="w-8 h-8 text-[#0073E6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-center text-3xl font-extrabold text-white mb-2 leading-tight">
          Il tuo profilo è pronto!
        </h2>
        <p className="text-center text-slate-400 text-base mb-8 leading-relaxed">
          Inserisci nome ed email per sbloccare la tua analisi personale gratuita.
        </p>

        {/* Form card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
          <form name="quiz-lead" data-netlify="true" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="form-name" value="quiz-lead" />
            <input type="hidden" name="tags" value={tags.join(',')} />

            {/* Name field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-slate-300 text-sm font-semibold mb-1.5">
                Il tuo nome e cognome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Es. Marco Rossi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border text-white placeholder-slate-600 text-base transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0073E6] focus:border-transparent ${
                  errors.name ? 'border-red-500/60' : 'border-white/10 hover:border-white/20'
                }`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
            </div>

            {/* Email field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-slate-300 text-sm font-semibold mb-1.5">
                La tua email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="es. marco@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border text-white placeholder-slate-600 text-base transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0073E6] focus:border-transparent ${
                  errors.email ? 'border-red-500/60' : 'border-white/10 hover:border-white/20'
                }`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl text-white text-lg font-bold bg-[#0073E6] hover:bg-[#005FC2] active:bg-[#004DA0] active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0073E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1117]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 00-8 8z" />
                  </svg>
                  Elaborazione…
                </span>
              ) : (
                'Scopri il mio profilo →'
              )}
            </button>
          </form>
        </div>

        {/* Trust signal */}
        <p className="text-center text-slate-600 text-xs mt-4">
          🔒 I tuoi dati sono al sicuro. Nessuno spam, mai.
        </p>
      </div>
    </div>
  );
}
