import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import CourseCard from '../components/CourseCard';
import {
  HeartHandshake,
  Users,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Scale,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen
} from 'lucide-react';

export default function ParentDashboard({ setActiveTab, onSelectCourse }) {
  const {
    currentUser,
    studentProfile,
    recommendedCourses,
    familyDiscussions,
    finalDecisionStatus
  } = useAuth();
  const { language, t } = useLanguage();

  const maxBudget = Number(studentProfile.maxBudget) || 25000;

  // Courses that fit 100% in family budget
  const budgetFittingCourses = recommendedCourses.filter((c) => c.feeMax <= maxBudget);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner for Parents */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-transparent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 text-xs font-bold">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'பெற்றோர் பார்வை' : 'Parent & Guardian Decision Portal'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {language === 'ta' ? `வணக்கம், ${studentProfile.linkedParentName}!` : `Welcome, ${studentProfile.linkedParentName || 'Parent / Guardian'}!`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              {language === 'ta'
                ? `உங்கள் மாணவர் ${studentProfile.name}-இன் தொழிற்கல்வி விருப்பங்களை பார்வையிட்டு, கட்டணம் மற்றும் வேலை பாதுகாப்பை ஆராயுங்கள்.`
                : `Review authorized recommendations, examine tuition fee structures, and align on career investments for ${studentProfile.name}.`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('family')}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>{t('navFamily')}</span>
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className="px-4 py-2.5 rounded-2xl glass-card border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <Scale className="w-4 h-4 text-emerald-500" />
              <span>{t('navCompare')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Overview Quick Metric Cards for Parent */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Stated Family Budget</span>
            <IndianRupee className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            ₹{maxBudget.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400">
            {budgetFittingCourses.length} courses completely within stated budget
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Family Discussion Status</span>
            <HeartHandshake className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-lg font-bold text-violet-600 dark:text-violet-400 truncate">
            {finalDecisionStatus}
          </div>
          <p className="text-[11px] text-slate-400">
            {familyDiscussions.length} courses shortlisted for active review
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Government Accreditation</span>
            <ShieldCheck className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            NSDC / DGT / ITI Scheme
          </div>
          <p className="text-[11px] text-slate-400">
            All courses backed by verified curriculums
          </p>
        </div>
      </div>

      {/* Recommended Courses Filtered for Parent Review */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <span>Recommended Courses for {studentProfile.name}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ranked by aptitude match and tuition affordability for family review.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('courses')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>View all courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.slice(0, 3).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelectCourse={onSelectCourse}
            />
          ))}
        </div>
      </section>

      {/* Parent Guidance & Financial Safety Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span>Parent Educational Investment Checklist</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Vocational education avoids large college loans while giving students fast, practical employability. Here is what we recommend parents check:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-slate-900 dark:text-white">1. Verify Institute Affiliation</div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              Ensure the training center is affiliated with NCVT (National Council for Vocational Training) or TNSDC for recognized certificates.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-slate-900 dark:text-white">2. Check NAPS Apprenticeship</div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              Most ITI and vocational graduates are eligible for paid apprenticeships (₹8,000 to ₹12,000 monthly stipend) immediately upon course completion.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-slate-900 dark:text-white">3. Lateral Entry Options</div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              Vocational ITI and Polytechnic certificates can be upgraded into degree engineering or higher diplomas at any point in the future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
