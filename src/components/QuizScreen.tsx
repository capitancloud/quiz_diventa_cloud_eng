import { useEffect, useRef, useState } from 'react';
import { Question } from '../data/questions';

interface Props {
  question: Question;
  currentStep: number;
  totalSteps: number;
  onAnswer: (tag: string) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export default function QuizScreen({
  question,
  currentStep,
  totalSteps,
  onAnswer,
  onBack,
  canGoBack,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const prevStep = useRef(currentStep);

  useEffect(() => {
    setVisible(false);
    setSelected(null);
    const t = setTimeout(() => setVisible(true), 80);
    prevStep.current = currentStep;
    return () => clearTimeout(t);
  }, [currentStep]);

  const handleSelect = (tag: string) => {
    if (selected) return;
    setSelected(tag);
    setTimeout(() => onAnswer(tag), 340);
  };

  const progressPct = ((currentStep - 1) / totalSteps) * 100;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-5 py-10 overflow-hidden bg-[#080B14]">
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-15%] right-[-10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-[#0073E6]/12 blur-[110px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full bg-[#DDA808]/08 blur-[100px]" />
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
        className={`relative z-10 w-full max-w-lg transition-all duration-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Header: back + step counter */}
        <div className="flex items-center justify-between mb-5">
          {canGoBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-slate-400 hover:text-white text-sm font-medium transition-colors active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Indietro
            </button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-slate-300 text-xs font-semibold tabular-nums">
            <span className="text-[#0073E6]">{currentStep}</span>
            <span className="text-slate-600">/</span>
            <span>{totalSteps}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/[0.06] rounded-full mb-7 overflow-hidden">
          <div
            className="h-full bg-[#0073E6] rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Question card */}
        <div
          className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 mb-5"
        >
          <p className="text-white text-xl sm:text-2xl font-bold leading-snug">
            {question.question}
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {question.options.map((opt) => {
            const isSelected = selected === opt.tag;
            const isOther = selected !== null && !isSelected;
            return (
              <button
                key={opt.tag}
                onClick={() => handleSelect(opt.tag)}
                disabled={selected !== null}
                className={`w-full text-left px-5 py-4 rounded-2xl border font-medium text-base leading-snug transition-all duration-150 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0073E6] ${
                  isSelected
                    ? 'border-[#0073E6] bg-[#0073E6]/20 text-white scale-[1.01]'
                    : isOther
                    ? 'border-white/[0.04] bg-transparent text-slate-600 cursor-not-allowed'
                    : 'border-white/[0.08] bg-white/[0.03] text-slate-200 hover:border-[#0073E6]/60 hover:bg-[#0073E6]/08 hover:text-white cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-[#0073E6] bg-[#0073E6]' : 'border-white/20'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span>{opt.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
