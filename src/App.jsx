import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import StatsBar from './components/StatsBar';
import ControlBar from './components/ControlBar';
import AnswerGrid from './components/AnswerGrid';
import SignatureAnswerGrid from './components/SignatureAnswerGrid';
import FeedbackBanner from './components/FeedbackBanner';
import CheatSheetModal from './components/CheatSheetModal';
import JazzAudioPlayer from './components/JazzAudioPlayer';
import CircleOfFifthsSVG from './components/CircleOfFifthsSVG';
import SaxBackgroundDecor, { SaxBadgeIcon } from './components/SaxBackgroundDecor';
import {
  generateQuestion,
  isAnswerCorrect,
  loadPersistedData,
  savePersistedData,
} from './utils/quizEngine';
import { sfxEngine } from './utils/sfxEngine';
import { jazzAudioEngine } from './utils/jazzAudioEngine';

export default function App() {
  const persisted = useRef(loadPersistedData());

  // Practice settings
  const [scope, setScope] = useState('major'); // 'major' | 'minor' | 'mixed'
  const [promptStyle, setPromptStyle] = useState('all'); // 'scale' | 'count' | 'visual' | 'all' (default)
  const [sortOrder, setSortOrder] = useState('chromatic'); // 'chromatic' | 'fifths'
  const [saxMode, setSaxMode] = useState('concert'); // 'concert' | 'eb' | 'bb'
  const [showHebrewNotes, setShowHebrewNotes] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);
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
      promptStyle: 'all',
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
    (nextScope = scope, nextPromptStyle = promptStyle, nextWeakKeys = weakKeys) => {
      clearAdvanceTimer();
      setFeedback(null);
      setQuestion((prev) =>
        generateQuestion({
          scope: nextScope,
          promptStyle: nextPromptStyle,
          weakKeys: nextWeakKeys,
          lastScaleId: prev?.targetScale?.id || null,
        })
      );
      questionStartRef.current = Date.now();
    },
    [scope, promptStyle, weakKeys, clearAdvanceTimer]
  );

  const handleScopeChange = (newScope) => {
    setScope(newScope);
    startNextQuestion(newScope, promptStyle, weakKeys);
  };

  const handlePromptStyleChange = (newStyle) => {
    setPromptStyle(newStyle);
    startNextQuestion(scope, newStyle, weakKeys);
  };

  const handleAnswer = (chosenOption) => {
    if (feedback) return;

    const elapsedMs = Math.max(150, Date.now() - questionStartRef.current);
    const isCorrect = isAnswerCorrect(question, chosenOption);

    // Play immediate Cheer or Boo SFX (gently ducking background music without interrupting it)
    if (sfxEnabled) {
      jazzAudioEngine.duckBriefly(isCorrect ? 950 : 1150);
      if (isCorrect) {
        sfxEngine.playCheer();
      } else {
        sfxEngine.playBoo();
      }
    }

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
      chosenScale: question.mode === 'count' ? null : chosenOption,
      chosenOption,
      elapsedMs,
    });

    const delayMs = isCorrect ? (saxMode === 'concert' ? 600 : 1400) : 3800;

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

  const isMajorQ = question.targetScale.quality === 'major';
  const isSharpQ = question.targetScale.accidentalType === 'sharp';
  const isFlatQ = question.targetScale.accidentalType === 'flat';
  const showWheelPanel = promptStyle === 'visual' || promptStyle === 'all';
  const baseNoteLtr = question.targetScale.label.replace(/m$/, '');

  const modeBadgeLabel =
    question.mode === 'visual'
      ? 'זיהוי על המעגל'
      : question.mode === 'count'
      ? 'זיהוי כמות דיאזים/במולים'
      : 'זיהוי סולם לפי סימנים';

  return (
    <div className="min-h-screen flex flex-col text-slate-100 relative" dir="rtl">
      {/* Subtle Golden Saxophone & Floating Musical Note Background Layer */}
      <SaxBackgroundDecor />

      {/* Header */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
        <div
          className={`${
            showWheelPanel ? 'max-w-6xl' : 'max-w-4xl'
          } mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 transition-all`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.38)] shrink-0">
              <SaxBadgeIcon className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-50 leading-tight">
                מעגל הקווינטות — סימני היתק
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-400">
                אימון דיאזים, במולים וזיהוי על המעגל לנגני סקסופון
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
      <main
        className={`relative z-10 flex-1 w-full ${
          showWheelPanel ? 'max-w-6xl' : 'max-w-4xl'
        } mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-4 sm:space-y-5 transition-all`}
      >
        {/* Ad-Free Local MP3 Romantic Saxophone Player + Independent SFX Toggle */}
        <JazzAudioPlayer
          sfxEnabled={sfxEnabled}
          onToggleSfx={() => setSfxEnabled((v) => !v)}
        />

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
          onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
        />

        {/* Quiz Workspace */}
        <div
          className={
            showWheelPanel
              ? 'grid grid-cols-1 lg:grid-cols-12 gap-5 items-start'
              : 'space-y-4'
          }
        >
          {showWheelPanel && (
            <div className="lg:col-span-5 rounded-2xl bg-slate-900/65 backdrop-blur-sm border border-slate-800/85 p-4 sm:p-5 flex flex-col items-center">
              <CircleOfFifthsSVG
                question={question}
                feedback={feedback}
                scope={scope}
              />
              <div className="mt-3 flex items-center justify-center gap-5 text-[11.5px] text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  טבעת חיצונית: מז&apos;ור
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  טבעת פנימית: מינור מקביל
                </span>
              </div>
            </div>
          )}

          <div className={showWheelPanel ? 'lg:col-span-7 space-y-4' : 'space-y-4'}>
            {/* Prompt Card */}
            <section
              className={`rounded-2xl border p-5 sm:p-6 backdrop-blur-sm transition-colors ${
                isMajorQ
                  ? 'bg-gradient-to-b from-amber-500/[0.08] to-slate-900/85 border-amber-500/30'
                  : 'bg-gradient-to-b from-sky-500/[0.09] to-slate-900/85 border-sky-500/30'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
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

                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/80">
                    {modeBadgeLabel}
                  </span>
                </div>

                {question.isWeakReview && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    <Sparkles className="w-3 h-3" />
                    חזרה מחוזקת
                  </span>
                )}
              </div>

              {question.mode === 'visual' ? (
                <div className="mt-3.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-100 leading-relaxed">
                    זהה את הסולם{' '}
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-lg font-extrabold ${
                        isMajorQ
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35'
                          : 'bg-sky-500/20 text-sky-300 border border-sky-500/35'
                      }`}
                    >
                      {isMajorQ ? "המז'ורי (טבעת חיצונית)" : 'המינורי (טבעת פנימית)'}
                    </span>{' '}
                    המסומן במעגל
                  </h2>
                  <p className="mt-1.5 text-xs text-slate-400">
                    במיקומים אנהרמוניים (5, 6 או 7), בחירה בכל אחת מהחלופות תיחשב נכונה.
                  </p>
                </div>
              ) : question.mode === 'count' ? (
                <div className="mt-3.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-100 leading-relaxed">
                    כמה דיאזים או במולים יש בסולם{' '}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-lg font-extrabold ${
                        isMajorQ
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35'
                          : 'bg-sky-500/20 text-sky-300 border border-sky-500/35'
                      }`}
                    >
                      <span dir="ltr" className="music-ltr">
                        {baseNoteLtr}
                      </span>
                      <span>{isMajorQ ? "מז'ור" : 'מינור'}</span>
                    </span>
                    ?
                  </h2>
                  {showHebrewNotes && (
                    <p className="mt-1.5 text-xs text-slate-400">
                      ({question.targetScale.hebrewFull})
                    </p>
                  )}
                </div>
              ) : (
                <h2 className="mt-3.5 text-xl sm:text-2xl font-bold text-slate-100 leading-relaxed">
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
              )}
            </section>

            {/* Instant Feedback Banner */}
            <FeedbackBanner
              question={question}
              feedback={feedback}
              saxMode={saxMode}
              onNext={() => startNextQuestion(scope, promptStyle, weakKeys)}
            />

            {/* Dynamic Answer Grid: 15 Key Signature Buttons (for 'count') OR Scale Grid (for 'scale' & 'visual') */}
            <section className="rounded-2xl bg-slate-900/65 backdrop-blur-sm border border-slate-800/80 p-4 sm:p-5">
              {question.mode === 'count' ? (
                <SignatureAnswerGrid
                  question={question}
                  feedback={feedback}
                  onAnswer={handleAnswer}
                />
              ) : (
                <AnswerGrid
                  scope={scope}
                  sortOrder={sortOrder}
                  showHebrewNotes={showHebrewNotes}
                  question={question}
                  feedback={feedback}
                  onAnswer={handleAnswer}
                />
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Full Circle + Cheat Sheet Reference Modal */}
      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        saxMode={saxMode}
      />
    </div>
  );
}
