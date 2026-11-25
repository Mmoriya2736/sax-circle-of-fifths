import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import CircleOfFifthsSVG from './components/CircleOfFifthsSVG';
import StatsBar from './components/StatsBar';
import ControlBar from './components/ControlBar';
import AnswerGrid from './components/AnswerGrid';
import FeedbackBanner from './components/FeedbackBanner';
import PeekStudyPanel from './components/PeekStudyPanel';
import {
  generateQuestion,
  loadPersistedData,
  savePersistedData,
} from './utils/quizEngine';

export default function App() {
  const persisted = useRef(loadPersistedData());

  // Practice filters
  const [scope, setScope] = useState('major'); // 'major' | 'minor' | 'mixed'
  const [promptStyle, setPromptStyle] = useState('both'); // 'text' | 'visual' | 'both'
  const [sortOrder, setSortOrder] = useState('chromatic'); // 'chromatic' | 'fifths'
  const [saxMode, setSaxMode] = useState('concert'); // 'concert' | 'eb' | 'bb'
  const [showHebrewNotes, setShowHebrewNotes] = useState(true);

  // Peek / Reference mode
  const [isPeekMode, setIsPeekMode] = useState(false);
  const [selectedPeekKey, setSelectedPeekKey] = useState(null);

  // Persisted stats & spaced-repetition state
  const [bestStreak, setBestStreak] = useState(persisted.current.bestStreak);
  const [weakKeys, setWeakKeys] = useState(persisted.current.weakKeys);

  // Session stats
  const [streak, setStreak] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [totalResponseMs, setTotalResponseMs] = useState(0);

  // Active question & feedback
  const [question, setQuestion] = useState(() =>
    generateQuestion({
      scope: 'major',
      promptStyle: 'both',
      weakKeys: persisted.current.weakKeys,
      lastKeyId: null,
    })
  );
  const [feedback, setFeedback] = useState(null);

  const questionStartRef = useRef(Date.now());
  const advanceTimerRef = useRef(null);

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearAdvanceTimer();
  }, [clearAdvanceTimer]);

  useEffect(() => {
    savePersistedData({
      bestStreak,
      weakKeys,
    });
  }, [bestStreak, weakKeys]);

  const startNextQuestion = useCallback(
    (nextScope = scope, nextPromptStyle = promptStyle, nextWeakKeys = weakKeys) => {
      clearAdvanceTimer();
      setFeedback(null);
      setQuestion((prev) =>
        generateQuestion({
          scope: nextScope,
          promptStyle: nextPromptStyle,
          weakKeys: nextWeakKeys,
          lastKeyId: prev?.targetKey?.id || null,
        })
      );
      questionStartRef.current = Date.now();
    },
    [scope, promptStyle, weakKeys, clearAdvanceTimer]
  );

  const handleScopeChange = (newScope) => {
    setScope(newScope);
    if (!isPeekMode) {
      startNextQuestion(newScope, promptStyle, weakKeys);
    }
  };

  const handlePromptStyleChange = (newStyle) => {
    setPromptStyle(newStyle);
    if (!isPeekMode) {
      startNextQuestion(scope, newStyle, weakKeys);
    }
  };

  const handleTogglePeek = () => {
    clearAdvanceTimer();
    if (isPeekMode) {
      setIsPeekMode(false);
      setSelectedPeekKey(null);
      startNextQuestion(scope, promptStyle, weakKeys);
    } else {
      setFeedback(null);
      setIsPeekMode(true);
    }
  };

  const handleAnswer = (chosenKey) => {
    if (feedback || isPeekMode) return;

    const elapsedMs = Math.max(150, Date.now() - questionStartRef.current);
    const isCorrect = chosenKey.id === question.targetKey.id;

    setSessionTotal((n) => n + 1);
    setTotalResponseMs((ms) => ms + elapsedMs);

    const targetId = question.targetKey.id;
    const nextWeakKeys = { ...weakKeys };

    if (isCorrect) {
      setSessionCorrect((n) => n + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((best) => Math.max(best, next));
        return next;
      });

      if (nextWeakKeys[targetId]) {
        const nextConsecutive = (nextWeakKeys[targetId].consecutiveCorrect || 0) + 1;
        if (nextConsecutive >= 2) {
          delete nextWeakKeys[targetId];
        } else {
          nextWeakKeys[targetId] = {
            ...nextWeakKeys[targetId],
            consecutiveCorrect: nextConsecutive,
          };
        }
      }
    } else {
      setStreak(0);
      nextWeakKeys[targetId] = {
        consecutiveCorrect: 0,
        misses: (nextWeakKeys[targetId]?.misses || 0) + 1,
      };
    }

    setWeakKeys(nextWeakKeys);
    setFeedback({
      isCorrect,
      chosenKey,
      elapsedMs,
    });

    // 600ms auto-advance on right answer (1400ms if sax transposition hint is active so user can read it)
    const delayMs = isCorrect ? (saxMode === 'concert' ? 600 : 1400) : 3600;

    clearAdvanceTimer();
    advanceTimerRef.current = setTimeout(() => {
      startNextQuestion(scope, promptStyle, nextWeakKeys);
    }, delayMs);
  };

  const handleResetSession = () => {
    clearAdvanceTimer();
    setStreak(0);
    setSessionCorrect(0);
    setSessionTotal(0);
    setTotalResponseMs(0);
    startNextQuestion(scope, promptStyle, weakKeys);
  };

  const accuracy = sessionTotal > 0 ? (sessionCorrect / sessionTotal) * 100 : 0;
  const avgTimeMs = sessionTotal > 0 ? totalResponseMs / sessionTotal : 0;
  const weakCount = Object.keys(weakKeys).length;

  return (
    <div className="min-h-screen flex flex-col text-slate-100" dir="rtl">
      {/* Header */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_18px_rgba(245,158,11,0.35)] shrink-0">
              <span className="text-slate-950 font-extrabold text-lg leading-none">5</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-50 leading-tight">
                מעגל הקווינטות
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-400">
                מאמן סולמות אינטראקטיבי לנגני סקסופון
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetSession}
            title="איפוס נתוני האימון הנוכחי"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">איפוס סשן</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-5">
        {/* Stats Bar */}
        <StatsBar
          streak={streak}
          bestStreak={bestStreak}
          accuracy={accuracy}
          avgTimeMs={avgTimeMs}
          sessionTotal={sessionTotal}
          weakCount={weakCount}
        />

        {/* Practice Controls */}
        <ControlBar
          scope={scope}
          onScopeChange={handleScopeChange}
          promptStyle={promptStyle}
          onPromptStyleChange={handlePromptStyleChange}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          saxMode={saxMode}
          onSaxModeChange={setSaxMode}
          showHebrewNotes={showHebrewNotes}
          onToggleHebrewNotes={() => setShowHebrewNotes((v) => !v)}
          isPeekMode={isPeekMode}
          onTogglePeek={handleTogglePeek}
        />

        {/* Workspace Grid: SVG Wheel + Quiz/Reference Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Circle of Fifths SVG */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/55 border border-slate-800/80 p-4 sm:p-5 flex flex-col items-center">
            <CircleOfFifthsSVG
              question={question}
              feedback={feedback}
              isPeekMode={isPeekMode}
              selectedPeekKey={selectedPeekKey}
              onSelectPeekKey={setSelectedPeekKey}
              scope={scope}
            />
            <div className="mt-3 flex items-center justify-center gap-5 text-[11.5px] text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                טבעת חיצונית: מז&apos;ור
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500/70" />
                טבעת פנימית: מינור מקביל
              </span>
            </div>
          </div>

          {/* Quiz Prompt + Answer Grid OR Reference Study Panel */}
          <div className="lg:col-span-7 space-y-4">
            {isPeekMode ? (
              <PeekStudyPanel
                selectedKey={selectedPeekKey}
                onExitPeek={handleTogglePeek}
              />
            ) : (
              <>
                {/* Prompt Card */}
                <div className="rounded-2xl bg-slate-900/75 border border-slate-800/90 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11.5px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {question.badge}
                    </span>

                    {question.isWeakReview && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                        <Sparkles className="w-3 h-3" />
                        חזרה מחוזקת
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3 text-xl sm:text-2xl font-bold text-slate-50 leading-snug">
                    {question.promptParts.prefix}
                    {question.promptParts.ltrToken && (
                      <span
                        dir="ltr"
                        className="music-ltr mx-1.5 px-2 py-0.5 rounded-lg bg-slate-800/90 border border-slate-700/80 text-amber-300 font-mono-music"
                      >
                        {question.promptParts.ltrToken}
                      </span>
                    )}
                    {question.promptParts.suffix}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
                    {question.promptSub}
                  </p>
                </div>

                {/* Instant Feedback Banner */}
                <FeedbackBanner
                  question={question}
                  feedback={feedback}
                  saxMode={saxMode}
                  onNext={() => startNextQuestion(scope, promptStyle, weakKeys)}
                />

                {/* All-Options Clickable Answer Grid */}
                <div className="rounded-2xl bg-slate-900/55 border border-slate-800/80 p-4 sm:p-5">
                  <AnswerGrid
                    scope={scope}
                    sortOrder={sortOrder}
                    showHebrewNotes={showHebrewNotes}
                    question={question}
                    feedback={feedback}
                    disabled={isPeekMode}
                    onAnswer={handleAnswer}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
