'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Trophy, RotateCcw, Brain } from 'lucide-react';
import { quizzes, QuizQuestion } from '@/data/quizzes';

interface QuizProps {
  slug: string;
}

export default function Quiz({ slug }: QuizProps) {
  const questions: QuizQuestion[] = useMemo(() => quizzes[slug] || [], [slug]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    new Array(questions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);

  const answeredCount = useMemo(() => answers.filter((a) => a !== null).length, [answers]);
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  const score = useMemo(() => {
    return answers.reduce((acc, answer, i) => {
      if (i >= questions.length) return acc;
      return acc + (answer === questions[i].correctAnswer ? 1 : 0);
    }, 0);
  }, [answers, questions]);

  const handleAnswer = useCallback((optionIndex: number) => {
    setAnswers((prev) => {
      if (prev[currentIndex] !== null) return prev;
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
    });
  }, [currentIndex]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setShowResult(false);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowResult(true);
    }
  }, [currentIndex, questions.length]);

  const handlePrev = useCallback(() => {
    if (showResult) {
      setShowResult(false);
    } else if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [showResult, currentIndex]);

  const handleReset = useCallback(() => {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentIndex(0);
    setShowResult(false);
  }, [questions.length]);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const getScoreMessage = () => {
    const pct = (score / questions.length) * 100;
    if (pct === 100) return 'Parfait ! Tu maîtrises le sujet !';
    if (pct >= 80) return 'Excellent ! Tu as de solides connaissances !';
    if (pct >= 60) return 'Bien joué ! Continue à apprendre !';
    if (pct >= 40) return 'Pas mal, mais tu peux encore progresser.';
    return 'Continue de lire l\'article et retente le quiz !';
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16 pt-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-light-primary/10 dark:bg-dark-primary/10">
          <Brain className="w-6 h-6 text-light-primary dark:text-dark-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display">Teste tes connaissances</h2>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            {questions.length} questions pour valider ta compréhension
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 sm:p-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
            <span>{answeredCount} / {questions.length} répondues</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-light-border dark:bg-dark-border overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Question Number Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {questions.map((_, i) => {
            const a = answers[i];
            const wasCorrect = a === questions[i].correctAnswer;
            let bgClass = 'bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border';
            if (a !== null) {
              bgClass = wasCorrect
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-400'
                : 'bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-400';
            }
            if (i === currentIndex && !showResult) {
              bgClass += ' ring-2 ring-light-primary dark:ring-dark-primary';
            }

            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-10 h-10 rounded-lg border text-sm font-semibold transition-all duration-200 hover:scale-105 ${bgClass}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {showResult ? (
            /* Final Score */
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-light-primary/10 dark:bg-dark-primary/10 mb-6">
                <Trophy className="w-10 h-10 text-light-primary dark:text-dark-primary" />
              </div>
              <h3 className="text-3xl font-bold font-display mb-2">
                {score} / {questions.length}
              </h3>
              <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8">
                {getScoreMessage()}
              </p>

              {/* Recap */}
              <div className="space-y-3 text-left max-w-lg mx-auto mb-8">
                {questions.map((q, i) => {
                  const correct = answers[i] === q.correctAnswer;
                  return (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all hover:scale-[1.01] ${
                        correct
                          ? 'border-emerald-500/30 bg-emerald-500/5'
                          : 'border-red-500/30 bg-red-500/5'
                      }`}
                    >
                      {correct ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                      <span className="text-sm line-clamp-1">{q.question}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-light-primary dark:bg-dark-primary text-white dark:text-dark-bg font-semibold transition-all hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
                Recommencer
              </button>
            </motion.div>
          ) : (
            /* Question */
            <motion.div
              key={`q-${currentIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-lg font-semibold mb-6">
                <span className="text-light-primary dark:text-dark-primary mr-2">Q{currentIndex + 1}.</span>
                {currentQuestion.question}
              </h3>

              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, i) => {
                  let optionClass = 'border-light-border dark:border-dark-border hover:border-light-primary dark:hover:border-dark-primary bg-light-bg dark:bg-dark-bg';

                  if (isAnswered) {
                    if (i === currentQuestion.correctAnswer) {
                      optionClass = 'border-emerald-500 bg-emerald-500/10';
                    } else if (i === selectedAnswer && !isCorrect) {
                      optionClass = 'border-red-500 bg-red-500/10';
                    } else {
                      optionClass = 'border-light-border dark:border-dark-border opacity-50';
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${optionClass} ${
                        !isAnswered ? 'cursor-pointer hover:scale-[1.01]' : 'cursor-default'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-light-surface dark:bg-dark-surface text-sm font-bold shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm sm:text-base">{option}</span>
                        {isAnswered && i === currentQuestion.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                        )}
                        {isAnswered && i === selectedAnswer && !isCorrect && i !== currentQuestion.correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-4 rounded-xl mb-6 ${
                      isCorrect
                        ? 'bg-emerald-500/10 border border-emerald-500/30'
                        : 'bg-red-500/10 border border-red-500/30'
                    }`}>
                      <p className="text-sm font-medium mb-1">
                        {isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse'}
                      </p>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-light-bg dark:hover:bg-dark-bg"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </button>

                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {currentIndex + 1} / {questions.length}
                </span>

                <button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-light-primary dark:bg-dark-primary text-white dark:text-dark-bg hover:scale-105"
                >
                  {currentIndex === questions.length - 1 ? 'Voir le score' : 'Suivant'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
