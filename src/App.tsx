import { useReducer, useState } from 'react';
import { questions } from './data/questions';
import LandingScreen from './components/LandingScreen';
import QuizScreen from './components/QuizScreen';
import EmailGateScreen from './components/EmailGateScreen';
import ResultScreen from './components/ResultScreen';
import CookieBanner from './components/CookieBanner';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import CookiePolicyModal from './components/CookiePolicyModal';
import { StoredConsent, clearConsent } from './hooks/useCookieConsent';

type Screen = 'landing' | 'quiz' | 'email' | 'result';
type LegalModal = 'none' | 'privacy' | 'cookies';

interface State {
  screen: Screen;
  step: number;
  tags: string[];
  user: { name: string; email: string } | null;
}

type Action =
  | { type: 'START' }
  | { type: 'ANSWER'; tag: string }
  | { type: 'BACK' }
  | { type: 'SUBMIT_EMAIL'; name: string; email: string };

const TOTAL = questions.length;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return { ...state, screen: 'quiz', step: 0 };

    case 'ANSWER': {
      const newTags = [...state.tags];
      newTags[state.step] = action.tag;
      const nextStep = state.step + 1;
      if (nextStep >= TOTAL) {
        return { ...state, tags: newTags, screen: 'email' };
      }
      return { ...state, tags: newTags, step: nextStep };
    }

    case 'BACK': {
      if (state.step === 0) {
        return { ...state, screen: 'landing', step: 0, tags: [] };
      }
      return { ...state, step: state.step - 1 };
    }

    case 'SUBMIT_EMAIL':
      return {
        ...state,
        screen: 'result',
        user: { name: action.name, email: action.email },
      };

    default:
      return state;
  }
}

const initialState: State = {
  screen: 'landing',
  step: 0,
  tags: [],
  user: null,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [source] = useState<string>(
    () => new URLSearchParams(window.location.search).get('utm_source') ?? 'diretto'
  );

  // Cookie consent
  const [consent, setConsent] = useState<StoredConsent | null>(null);
  const [legalModal, setLegalModal] = useState<LegalModal>('none');

  function handleConsent(stored: StoredConsent) {
    setConsent(stored);
    // Here you can conditionally load analytics/pixels based on stored.preferences
    // e.g. if (stored.preferences.analytics) { initGA(); }
    // e.g. if (stored.preferences.marketing) { initMetaPixel(); }
  }

  function handleRevoke() {
    clearConsent();
    setConsent(null);
    setLegalModal('none');
  }

  const showBanner = consent === null;

  return (
    <>
      {/* ── Main quiz screens ──────────────────────────── */}
      {state.screen === 'landing' && (
        <LandingScreen onStart={() => dispatch({ type: 'START' })} />
      )}

      {state.screen === 'quiz' && (
        <QuizScreen
          key={state.step}
          question={questions[state.step]}
          currentStep={state.step + 1}
          totalSteps={TOTAL}
          onAnswer={(tag) => dispatch({ type: 'ANSWER', tag })}
          onBack={() => dispatch({ type: 'BACK' })}
          canGoBack={true}
        />
      )}

      {state.screen === 'email' && (
        <EmailGateScreen
          tags={state.tags}
          source={source}
          onSubmit={(name, email) =>
            dispatch({ type: 'SUBMIT_EMAIL', name, email })
          }
        />
      )}

      {state.screen === 'result' && state.user && (
        <ResultScreen name={state.user.name} tags={state.tags} />
      )}

      {/* ── Persistent footer ─────────────────────────── */}
      <footer className="fixed bottom-0 left-0 right-0 z-[9990] pointer-events-none">
        {/* Invisible spacer so the footer doesn't overlap the cookie banner */}
        <div className="flex justify-center pb-2 pointer-events-auto">
          <div className="flex gap-4 text-xs text-slate-600">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-slate-400 transition-colors underline underline-offset-2"
            >
              Privacy Policy
            </button>
            <span aria-hidden>·</span>
            <button
              onClick={() => setLegalModal('cookies')}
              className="hover:text-slate-400 transition-colors underline underline-offset-2"
            >
              Cookie Policy
            </button>
            <span aria-hidden>·</span>
            <button
              onClick={handleRevoke}
              className="hover:text-slate-400 transition-colors underline underline-offset-2"
            >
              Gestisci cookie
            </button>
          </div>
        </div>
      </footer>

      {/* ── Cookie banner ─────────────────────────────── */}
      {showBanner && (
        <CookieBanner
          onConsent={handleConsent}
          onOpenPrivacy={() => setLegalModal('privacy')}
          onOpenCookiePolicy={() => setLegalModal('cookies')}
        />
      )}

      {/* ── Legal modals ──────────────────────────────── */}
      {legalModal === 'privacy' && (
        <PrivacyPolicyModal onClose={() => setLegalModal('none')} />
      )}
      {legalModal === 'cookies' && (
        <CookiePolicyModal
          onClose={() => setLegalModal('none')}
          onOpenPrivacy={() => setLegalModal('privacy')}
          onRevoke={handleRevoke}
        />
      )}
    </>
  );
}
