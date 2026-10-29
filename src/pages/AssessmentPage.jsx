import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { assessmentQuestions } from '../data/assessmentQuestions';
import { calculateDomainScores } from '../services/recommendationEngine';
import { scoreCoursesFromAnswers } from '../data/csvDataset';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function AssessmentPage({ onAssessmentComplete }) {
  const { domainScores, setDomainScores } = useAuth();
  const { language, t } = useLanguage();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = assessmentQuestions.length;
  const currentQ = assessmentQuestions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.questionId || currentQ.id]: option,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      // 1. Calculate and update domain scores
      const calculatedScores = calculateDomainScores(selectedAnswers);
      setDomainScores(calculatedScores);

      // 2. Calculate CSV exact scoring from 3_answer_course_mapping.csv
      const csvAnswerCodes = {};
      Object.entries(selectedAnswers).forEach(([qid, opt]) => {
        const key = qid.toString().startsWith('Q') ? qid.toString() : `Q${qid}`;
        csvAnswerCodes[key] = opt.optionId || 'A';
      });
      const scoredCsvCourses = scoreCoursesFromAnswers(csvAnswerCodes);
      localStorage.setItem('vista_csv_answers', JSON.stringify(csvAnswerCodes));
      localStorage.setItem('vista_csv_scored_courses', JSON.stringify(scoredCsvCourses));

      setIsSubmitting(false);
      if (onAssessmentComplete) {
        onAssessmentComplete();
      }
    }, 800);
  };

  const selectedForCurrent = selectedAnswers[currentQ.questionId || currentQ.id];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const canProceed = Boolean(selectedForCurrent);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            {language === 'ta' ? 'AI தொழிற்கல்வி மதிப்பீடு' : 'Vocational Interest Discovery'}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {t('assessmentTitle')}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          {t('assessmentSubtitle')}
        </p>

        {/* Progress Bar */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
            <span>
              {t('questionProgress')} {currentIndex + 1} {t('of')} {totalQuestions}
            </span>
            <span className="text-brand-600 dark:text-brand-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-600 to-violet-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
          {language === 'ta' && currentQ.questionTa ? currentQ.questionTa : currentQ.questionEn}
        </h2>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedForCurrent === option;
            const text = language === 'ta' && option.textTa ? option.textTa : option.textEn;

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(option)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 card-hover-glow ${
                  isSelected
                    ? 'bg-brand-50/80 dark:bg-brand-950/60 border-brand-500 text-brand-900 dark:text-brand-100 shadow-sm'
                    : 'bg-white/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {option.optionId || String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-xs sm:text-sm font-medium leading-relaxed">{text}</span>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('prevBtn')}</span>
          </button>

          {!isLastQuestion ? (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
            >
              <span>{t('nextBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed || isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:scale-105 active:scale-95 disabled:opacity-40 text-white text-xs font-extrabold shadow-md shadow-emerald-500/25 transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <span>{t('calculatingMatches')}</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t('submitAssessment')}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mandatory Guidance Disclaimer Note */}
      <div className="p-4 rounded-2xl bg-amber-50/70 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200 border border-amber-200 dark:border-amber-900/40 text-xs leading-relaxed flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p>{t('assessmentDisclaimer')}</p>
      </div>
    </div>
  );
}
