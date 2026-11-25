import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import StatsBar from './components/StatsBar';
import ControlBar from './components/ControlBar';
import AnswerGrid from './components/AnswerGrid';
import FeedbackBanner from './components/FeedbackBanner';
import CheatSheetModal from './components/CheatSheetModal';
import JazzAudioPlayer from './components/JazzAudioPlayer';
import SaxBackgroundDecor, { SaxBadgeIcon } from './components/SaxBackgroundDecor';
import {
  generateQuestion,
  loadPersistedData,
  savePersistedData,
} from './utils/quizEngine';

export default function App() {
  const persisted = useRef(loadPersistedData());

  // Practice settings
  const [scope, setScope] = useState('major'); // 'major' | 'minor' | 'mixed'
  const [sortOrder, setSortOrder] = useState('chromatic'); // 'chromatic' | 'fifths'
  const [saxMode, setSaxMode] = useState('concert'); // 'concert' | 'eb' | 'bb'
  const [showHebrewNotes, setShowHebrewNotes] = useState(true);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

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
      weakKeys: persisted.current.weakKeys,
      lastScaleId: null,
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
    (nextScope = scope, nextWeakKeys = weakKeys) => {
      clearAdvanceTimer();
      setFeedback(null);
      setQuestion((prev) =>
        generateQuestion({
          scope: nextScope,
          weakKeys: nextWeakKeys,
          lastScaleId: prev?.targetScale?.id || null,
        })
      );
      questionStartRef.current = Date.now();
    },
    [scope, weakKeys, clearAdvanceTimer]
  );

  const handleScopeChange = (newScope) => {
    setScope(newScope);
    startNextQuestion(newScope, weakKeys);
  };

  const handleAnswer = (chosenScale) => {
    if (feedback) return;

    const elapsedMs = Math.max(150, Date.now() - questionStartRef.current);
    const isCorrect = chosenScale.id === question.targetScale.id;

    setSessionTotal((n) => n + 1);
    setTotalResponseMs((ms) => ms + elapsedMs);

    const targetId = question.targetScale.id;
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
      chosenScale,
      elapsedMs,
    });

    // 600ms auto-advance on right answer (1400ms when sax transposition hint is active)
    const delayMs = isCorrect ? (saxMode === 'concert' ? 600 : 1400) : 3800;

    clearAdvanceTimer();
    advanceTimerRef.current = setTimeout(() => {
      startNextQuestion(scope, nextWeakKeys);
    }, delayMs);
  };

  const handleResetSession = () => {
    clearAdvanceTimer();
    setStreak(0);
    setSessionCorrect(0);
    setSessionTotal(0);
    setTotalResponseMs(0);
    startNextQuestion(scope, weakKeys);
  };

  const accuracy = sessionTotal > 0 ? (sessionCorrect / sessionTotal) * 100 : 0;
  const avgTimeMs = sessionTotal > 0 ? totalResponseMs / sessionTotal : 0;
  const weakCount = Object.keys(weakKeys).length;

  const isMajorQ = question.targetScale.quality === 'major';
  const isSharpQ = question.targetScale.accidentalType === 'sharp';
  const isFlatQ = question.targetScale.accidentalType === 'flat';

  return (
    <div className="min-h-screen flex flex-col text-slate-100 relative" dir="rtl">
      {/* Subtle Golden Saxophone & Floating Musical Note Background Layer */}
      <SaxBackgroundDecor />

      {/* Header */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.38)] shrink-0">
              <SaxBadgeIcon className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-50 leading-tight">
                מעגל הקווינטות — סימני היתק
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-400">
                אימון דיאזים ובמולים לנגני סקסופון
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

      {/* Main Content — Clean Centered Layout */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-4 sm:space-y-5">
        {/* Background Smooth Jazz Saxophone Mini-Player */}
        <JazzAudioPlayer />

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
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          saxMode={saxMode}
          onSaxModeChange={setSaxMode}
          showHebrewNotes={showHebrewNotes}
          onToggleHebrewNotes={() => setShowHebrewNotes((v) => !v)}
          onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
        />

        {/* Focused Key Signature Prompt Card */}
        <section
          className={`rounded-2xl border p-5 sm:p-7 backdrop-blur-sm transition-colors ${
            isMajorQ
              ? 'bg-gradient-to-b from-amber-500/[0.08] to-slate-900/85 border-amber-500/30'
              : 'bg-gradient-to-b from-sky-500/[0.09] to-slate-900/85 border-sky-500/30'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${
                isMajorQ
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                  : 'bg-sky-500/20 text-sky-300 border-sky-400/40'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isMajorQ ? 'bg-amber-400' : 'bg-sky-400'
                }`}
              />
              {isMajorQ ? "סולם מז'ור" : 'סולם מינור'}
            </span>

            {question.isWeakReview && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                <Sparkles className="w-3 h-3" />
                חזרה מחוזקת
              </span>
            )}
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-slate-100 leading-relaxed">
            מהו הסולם{' '}
            <span
              className={`inline-block px-2.5 py-0.5 rounded-lg font-extrabold ${
                isMajorQ
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35'
                  : 'bg-sky-500/20 text-sky-300 border border-sky-500/35'
              }`}
            >
              {isMajorQ ? "המז'ורי" : 'המינורי'}
            </span>{' '}
            {question.isZero ? (
              <>
                שאין בו{' '}
                <strong className="font-extrabold text-white underline decoration-slate-500 underline-offset-4">
                  דיאזים או במולים (0)
                </strong>
                ?
              </>
            ) : (
              <>
                שיש בו{' '}
                <strong
                  className={`font-extrabold ${
                    isSharpQ
                      ? 'text-amber-200'
                      : isFlatQ
                      ? 'text-sky-200'
                      : 'text-white'
                  }`}
                >
                  {question.signaturePhrase}
                </strong>
                ?
              </>
            )}
          </h2>
        </section>

        {/* Instant Feedback Banner */}
        <FeedbackBanner
          question={question}
          feedback={feedback}
          saxMode={saxMode}
          onNext={() => startNextQuestion(scope, weakKeys)}
        />

        {/* All-Options Clickable Answer Grid */}
        <section className="rounded-2xl bg-slate-900/65 backdrop-blur-sm border border-slate-800/80 p-4 sm:p-5">
          <AnswerGrid
            scope={scope}
            sortOrder={sortOrder}
            showHebrewNotes={showHebrewNotes}
            question={question}
            feedback={feedback}
            onAnswer={handleAnswer}
          />
        </section>
      </main>

      {/* Cheat Sheet Reference Modal */}
      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        saxMode={saxMode}
      />
    </div>
  );
}
