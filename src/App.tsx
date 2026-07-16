import { useReducer, useState } from 'react';
import { questions } from './data/questions';
import LandingScreen from './components/LandingScreen';
import QuizScreen from './components/QuizScreen';
import EmailGateScreen from './components/EmailGateScreen';
import ResultScreen from './components/ResultScreen';

type Screen = 'landing' | 'quiz' | 'email' | 'result';

interface State {
  screen: Screen;
  step: number; // 0-based index into questions array
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

  if (state.screen === 'landing') {
    return <LandingScreen onStart={() => dispatch({ type: 'START' })} />;
  }

  if (state.screen === 'quiz') {
    const question = questions[state.step];
    return (
      <QuizScreen
        key={state.step}
        question={question}
        currentStep={state.step + 1}
        totalSteps={TOTAL}
        onAnswer={(tag) => dispatch({ type: 'ANSWER', tag })}
        onBack={() => dispatch({ type: 'BACK' })}
        canGoBack={true}
      />
    );
  }

  if (state.screen === 'email') {
    return (
      <EmailGateScreen
        tags={state.tags}
        source={source}
        onSubmit={(name, email) =>
          dispatch({ type: 'SUBMIT_EMAIL', name, email })
        }
      />
    );
  }

  if (state.screen === 'result' && state.user) {
    return <ResultScreen name={state.user.name} tags={state.tags} />;
  }

  return null;
}
