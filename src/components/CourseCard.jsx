import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Clock,
  GraduationCap,
  Bookmark,
  BookmarkCheck,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';

export default function CourseCard({ course, onSelectCourse, onGenerateRoadmap, showPrice = false }) {
  const { savedCourseIds, toggleSaveCourse, compareCourseIds, toggleCompareCourse } = useAuth();
  const { language, t } = useLanguage();

  const isSaved = savedCourseIds.includes(course.id);
  const isCompared = compareCourseIds.includes(course.id);

  const title = language === 'ta' && course.titleTa ? course.titleTa : course.title;
  const category = language === 'ta' && course.categoryTa ? course.categoryTa : course.category;
  const eligibility = language === 'ta' && course.eligibilityTa ? course.eligibilityTa : course.eligibility;
  const duration = language === 'ta' && course.durationTa ? course.durationTa : course.duration;
  const overview = language === 'ta' && course.overviewTa ? course.overviewTa : course.overview;

  const matchScore = course.matchScore || 82;
  const getScoreBadgeColor = (score) => {
    if (score >= 85) return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    if (score >= 70) return 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border-brand-200 dark:border-brand-800';
    return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
  };

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col justify-between card-hover-glow border border-slate-200/80 dark:border-slate-800 relative group overflow-hidden">
      {/* Top Banner & Match Indicator */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {category}
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xs font-extrabold px-2.5 py-1 rounded-full border flex items-center gap-1 shadow-sm ${getScoreBadgeColor(
                matchScore
              )}`}
            >
              <Sparkles className="w-3 h-3" />
              {matchScore}% {language === 'ta' ? 'பொருத்தம்' : 'Match'}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelectCourse(course)}
          className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 cursor-pointer transition-colors leading-snug mb-2"
        >
          {title}
        </h3>

        {/* Overview snippet */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {overview}
        </p>

        {/* Meta badges: Eligibility, Duration */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
            <GraduationCap className="w-4 h-4 text-brand-500 shrink-0" />
            <span className="truncate font-medium">{eligibility}</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
            <Clock className="w-4 h-4 text-violet-500 shrink-0" />
            <span className="truncate font-medium">{duration}</span>
          </div>
        </div>

        {/* Top 3 Skills preview */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {(course.skillsGained || []).slice(0, 3).map((sk, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-900/40"
              >
                {sk}
              </span>
            ))}
            {(course.skillsGained || []).length > 3 && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 text-slate-400">
                +{(course.skillsGained.length - 3)} more
              </span>
            )}
          </div>
        </div>

        {/* Verified source info */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 mb-4 truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span className="truncate">{course.source}</span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {/* Bookmark / Shortlist */}
          <button
            onClick={() => toggleSaveCourse(course.id)}
            title={isSaved ? t('savedCourse') : t('saveCourse')}
            className={`p-2 rounded-xl border transition-colors ${
              isSaved
                ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900'
                : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>

          {/* Compare Toggle */}
          <button
            onClick={() => toggleCompareCourse(course.id)}
            title={isCompared ? t('comparedBtn') : t('compareBtn')}
            className={`p-2 rounded-xl border transition-colors ${
              isCompared
                ? 'bg-brand-50 text-brand-600 border-brand-200 dark:bg-brand-950/40 dark:border-brand-900 font-bold'
                : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* View Details modal button */}
        <button
          onClick={() => onSelectCourse(course)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all hover:scale-[1.02]"
        >
          <span>{t('courseDetails')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
