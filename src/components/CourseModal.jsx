import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Sparkles,
  Clock,
  GraduationCap,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  BookOpen,
  MapPin,
  Bookmark,
  BookmarkCheck,
  Scale
} from 'lucide-react';

export default function CourseModal({ course, onClose, onSetRoadmap }) {
  const { savedCourseIds, toggleSaveCourse, compareCourseIds, toggleCompareCourse } = useAuth();
  const { language, t } = useLanguage();

  if (!course) return null;

  const isSaved = savedCourseIds.includes(course.id);
  const isCompared = compareCourseIds.includes(course.id);

  const title = language === 'ta' && course.titleTa ? course.titleTa : course.title;
  const category = language === 'ta' && course.categoryTa ? course.categoryTa : course.category;
  const eligibility = language === 'ta' && course.eligibilityTa ? course.eligibilityTa : course.eligibility;
  const duration = language === 'ta' && course.durationTa ? course.durationTa : course.duration;
  const overview = language === 'ta' && course.overviewTa ? course.overviewTa : course.overview;
  const skillsGained = language === 'ta' && course.skillsGainedTa ? course.skillsGainedTa : course.skillsGained;
  const potentialRoles = language === 'ta' && course.potentialRolesTa ? course.potentialRolesTa : course.potentialRoles;
  const furtherEducation = language === 'ta' && course.furtherEducationTa ? course.furtherEducationTa : course.furtherEducation;
  const explanation = language === 'ta' && course.explanationTa ? course.explanationTa : course.explanationEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="glass-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
              {category}
            </span>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {course.matchScore || 85}% {language === 'ta' ? 'பொருத்தம்' : 'Match Affinity'}
            </span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            {overview}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <GraduationCap className="w-4 h-4 text-brand-500" />
              <span className="text-[11px] font-semibold uppercase">{t('eligibility')}</span>
            </div>
            <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{eligibility}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Clock className="w-4 h-4 text-violet-500" />
              <span className="text-[11px] font-semibold uppercase">{t('duration')}</span>
            </div>
            <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{duration}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <IndianRupee className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-semibold uppercase">{t('fees')}</span>
            </div>
            <div className="font-bold text-sm text-emerald-600 dark:text-emerald-400">{course.feeFormatted}</div>
          </div>
        </div>

        {/* Why this matches you (AI Explainability) */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-brand-50 to-violet-50 dark:from-brand-950/40 dark:to-violet-950/40 border border-brand-200 dark:border-brand-800/60">
          <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300 font-bold text-xs mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span>{t('whyMatch')}</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {explanation || "Matches based on strong domain interests, academic eligibility, and accessibility within your educational budget."}
          </p>
        </div>

        {/* Skills Gained Section */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">
            {t('skillsLearned')}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(skillsGained || []).map((skill, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Career Opportunities & Higher Studies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs mb-2">
              <Briefcase className="w-4 h-4" />
              <span>{t('jobOpportunities')}</span>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              {(potentialRoles || []).map((role, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  <span>{role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>{t('furtherStudies')}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {furtherEducation}
            </p>
          </div>
        </div>

        {/* Institute & Accreditation Source */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-6 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{t('sourceInfo')}</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p><strong className="text-slate-700 dark:text-slate-300">Curriculum Source:</strong> {course.source}</p>
            <p><strong className="text-slate-700 dark:text-slate-300">Verified Centers:</strong> {course.verifiedInstitute}</p>
            <p className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.location}</span>
            </p>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveCourse(course.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                isSaved
                  ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{isSaved ? t('savedCourse') : t('saveCourse')}</span>
            </button>

            <button
              onClick={() => toggleCompareCourse(course.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                isCompared
                  ? 'bg-brand-50 text-brand-600 border-brand-200 dark:bg-brand-950/40 dark:border-brand-900 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{isCompared ? t('comparedBtn') : t('compareBtn')}</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (onSetRoadmap) onSetRoadmap(title);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 text-white text-xs font-bold shadow-md hover:scale-[1.02] transition-all"
          >
            <TrendingUp className="w-4 h-4" />
            <span>{language === 'ta' ? 'தொழில் வரைபடம் தொடங்கு' : 'Generate Career Roadmap'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
