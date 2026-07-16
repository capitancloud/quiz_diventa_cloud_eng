import { useState, useEffect } from 'react';
import {
  CookieConsent,
  ConsentState,
  StoredConsent,
  loadConsent,
  saveConsent,
  isConsentValid,
} from '../hooks/useCookieConsent';

interface Props {
  onConsent: (consent: StoredConsent) => void;
  onOpenPrivacy: () => void;
  onOpenCookiePolicy: () => void;
}

export default function CookieBanner({ onConsent, onOpenPrivacy, onOpenCookiePolicy }: Props) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs] = useState<CookieConsent>({ analytics: false, marketing: false });

  useEffect(() => {
    const stored = loadConsent();
    if (stored && isConsentValid(stored)) {
      onConsent(stored);
    } else {
      // Small delay so the banner doesn't flash during hydration
      const t = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, []);

  function accept(state: ConsentState, preferences: CookieConsent) {
    const stored = saveConsent(state, preferences);
    setVisible(false);
    onConsent(stored);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Preferenze cookie"
      className="fixed inset-x-0 bottom-0 z-[9999] px-4 pb-4 sm:pb-6"
    >
      <div className="mx-auto max-w-2xl rounded-2xl bg-[#0E1424] border border-white/10 shadow-2xl shadow-black/60 p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl flex-shrink-0">🍪</span>
          <div>
            <h2 className="text-white font-bold text-base leading-snug">
              Usiamo i cookie
            </h2>
            <p className="text-slate-400 text-sm mt-1 leading-relaxed">
              Questo sito utilizza cookie tecnici necessari al funzionamento e, previo tuo consenso,
              cookie analitici e di profilazione per migliorare l'esperienza e misurare le campagne.
              Puoi accettare tutto, rifiutare i facoltativi o personalizzare le tue scelte.{' '}
              <button
                onClick={onOpenCookiePolicy}
                className="underline text-[#0073E6] hover:text-[#3399FF] transition-colors"
              >
                Cookie Policy
              </button>
              {' '}–{' '}
              <button
                onClick={onOpenPrivacy}
                className="underline text-[#0073E6] hover:text-[#3399FF] transition-colors"
              >
                Privacy Policy
              </button>
              .
            </p>
          </div>
        </div>

        {/* Granular preferences (expanded) */}
        {expanded && (
          <div className="mb-4 space-y-3 border-t border-white/10 pt-4">
            {/* Technical - always on */}
            <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/[0.04]">
              <div>
                <p className="text-white text-sm font-semibold">Cookie tecnici</p>
                <p className="text-slate-400 text-xs mt-0.5">
                  Necessari per il funzionamento del sito. Non richiedono consenso.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex-shrink-0 ml-3">
                Sempre attivi
              </span>
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/[0.04]">
              <div>
                <p className="text-white text-sm font-semibold">Cookie analitici</p>
                <p className="text-slate-400 text-xs mt-0.5">
                  Google Analytics e strumenti simili per capire come viene usato il sito
                  (dati aggregati e anonimi).
                </p>
              </div>
              <Toggle
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
                label="Cookie analitici"
              />
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/[0.04]">
              <div>
                <p className="text-white text-sm font-semibold">Cookie di marketing</p>
                <p className="text-slate-400 text-xs mt-0.5">
                  Meta Pixel, TikTok Pixel e simili per misurare le conversioni delle campagne
                  pubblicitarie.
                </p>
              </div>
              <Toggle
                checked={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
                label="Cookie di marketing"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-1">
          <button
            onClick={() => accept('accepted_all', { analytics: true, marketing: true })}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-[#F5B500] hover:bg-[#E0A800] active:bg-[#C99700] text-[#0A0A0A] transition-colors"
          >
            Accetta tutti
          </button>

          {expanded ? (
            <button
              onClick={() => accept('custom', prefs)}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-[#0073E6] hover:bg-[#005FBF] text-white transition-colors"
            >
              Salva preferenze
            </button>
          ) : (
            <button
              onClick={() => setExpanded(true)}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm border border-white/20 text-slate-300 hover:bg-white/[0.06] transition-colors"
            >
              Gestisci preferenze
            </button>
          )}

          <button
            onClick={() => accept('rejected_all', { analytics: false, marketing: false })}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm border border-white/20 text-slate-400 hover:bg-white/[0.04] transition-colors"
          >
            Rifiuta facoltativi
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Tiny toggle component ─────────────────────────────────── */
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 ml-3 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0073E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1424] ${
        checked ? 'bg-[#0073E6]' : 'bg-white/20'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 mt-0.5 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}
