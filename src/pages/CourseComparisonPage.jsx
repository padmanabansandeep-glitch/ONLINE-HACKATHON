import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Scale,
  Sparkles,
  IndianRupee,
  Clock,
  GraduationCap,
  Briefcase,
  TrendingUp,
  MapPin,
  ShieldCheck,
  X,
  Plus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function CourseComparisonPage({ setActiveTab, onSelectCourse }) {
  const { recommendedCourses, compareCourseIds, toggleCompareCourse, studentProfile } = useAuth();
  const { language, t } = useLanguage();

  const maxBudget = Number(studentProfile.maxBudget) || 25000;

  // Selected courses for comparison
  const selectedCourses = recommendedCourses.filter((c) => compareCourseIds.includes(c.id));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                {language === 'ta' ? 'படிப்புகளின் நேரடி ஒப்பீடு' : 'Side-by-Side Evaluation'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t('comparisonTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t('comparisonSubtitle')}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('courses')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ta' ? 'கூடுதல் படிப்பு சேர்க்க' : 'Add More Courses'}</span>
          </button>
        </div>
      </div>

      {/* Comparison Content */}
      {selectedCourses.length > 0 ? (
        <div className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60">
                  <th className="p-4 sm:p-6 w-1/4 text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Evaluation Metric
                  </th>
                  {selectedCourses.map((course) => {
                    const title = language === 'ta' && course.titleTa ? course.titleTa : course.title;
                    const category = language === 'ta' && course.categoryTa ? course.categoryTa : course.category;
                    return (
                      <th key={course.id} className="p-4 sm:p-6 w-1/4 align-top relative">
                        <button
                          onClick={() => toggleCompareCourse(course.id)}
                          title="Remove from comparison"
                          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                          {category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                          {title}
                        </h3>
                        <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{course.matchScore}% {language === 'ta' ? 'பொருத்தம்' : 'Match'}</span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {/* Row 1: Estimated Total Cost */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 sm:p-6 font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-emerald-500" />
                    <span>{t('compareMetricFee')}</span>
                  </td>
                  {selectedCourses.map((c) => (
                    <td key={c.id} className="p-4 sm:p-6 font-extrabold text-sm text-slate-900 dark:text-white">
                      {c.feeFormatted}
                    </td>
                  ))}
                </tr>

                {/* Row 2: Budget Suitability */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 sm:p-6 font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{t('compareMetricSuitability')}</span>
                  </td>
                  {selectedCourses.map((c) => {
                    const isUnder = c.feeMax <= maxBudget;
                    const isPartial = c.feeMin <= maxBudget;
                    return (
                      <td key={c.id} className="p-4 sm:p-6">
                        {isUnder ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            100% Within Budget
                          </span>
                        ) : isPartial ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            Base Fee Matches Budget
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                            Requires Higher Budget
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Row 3: Course Duration */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 sm:p-6 font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-violet-500" />
                    <span>{t('compareMetricDuration')}</span>
                  </td>
                  {selectedCourses.map((c) => (
                    <td key={c.id} className="p-4 sm:p-6 font-semibold text-slate-800 dark:text-slate-200">
                      {language === 'ta' && c.durationTa ? c.durationTa : c.duration}
                    </td>
                  ))}
                </tr>

                {/* Row 4: Minimum Eligibility */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 sm:p-6 font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-brand-500" />
                    <span>{t('compareMetricEligibility')}</span>
                  </td>
                  {selectedCourses.map((c) => (
                    <td key={c.id} className="p-4 sm:p-6 text-slate-700 dark:text-slate-300 font-medium">
                      {language === 'ta' && c.eligibilityTa ? c.eligibilityTa : c.eligibility}
                    </td>
                  ))}
                </tr>

                {/* Row 5: Core Skills Taught */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 sm:p-6 font-bold text-slate-700 dark:text-slate-300">
                    {t('compareMetricSkills')}
                  </td>
                  {selectedCourses.map((c) => {
                    const skills = language === 'ta' && c.skillsGainedTa ? c.skillsGainedTa : c.skillsGained;
                    return (
                      <td key={c.id} className="p-4 sm:p-6 text-slate-600 dark:text-slate-400">
                        <ul className="space-y-1">
                          {(skills || []).slice(0, 4).map((sk, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-brand-500">•</span>
                              <span>{sk}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    );
                  })}
                </tr>

                {/* Row 6: Entry-level Jobs */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 sm:p-6 font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-500" />
                    <span>{t('compareMetricJobs')}</span>
                  </td>
                  {selectedCourses.map((c) => {
                    const roles = language === 'ta' && c.potentialRolesTa ? c.potentialRolesTa : c.potentialRoles;
                    return (
                      <td key={c.id} className="p-4 sm:p-6 text-slate-700 dark:text-slate-300">
                        <div className="flex flex-wrap gap-1">
                          {(roles || []).map((r, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Row 7: Higher Studies Pathway */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 sm:p-6 font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-violet-500" />
                    <span>{t('compareMetricFurther')}</span>
                  </td>
                  {selectedCourses.map((c) => (
                    <td key={c.id} className="p-4 sm:p-6 text-slate-600 dark:text-slate-400 text-xs">
                      {language === 'ta' && c.furtherEducationTa ? c.furtherEducationTa : c.furtherEducation}
                    </td>
                  ))}
                </tr>

                {/* Row 8: Action row */}
                <tr>
                  <td className="p-4 sm:p-6 font-bold text-slate-400">Actions</td>
                  {selectedCourses.map((c) => (
                    <td key={c.id} className="p-4 sm:p-6">
                      <button
                        onClick={() => onSelectCourse(c)}
                        className="w-full py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-sm transition-all"
                      >
                        {t('courseDetails')}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-md mx-auto space-y-4">
          <Scale className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t('noCoursesSelected')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Visit the course explorer to shortlist and click the comparison icon on 2 to 4 courses.
          </p>
          <button
            onClick={() => setActiveTab('courses')}
            className="px-5 py-2.5 rounded-2xl bg-brand-600 text-white font-bold text-xs shadow-md"
          >
            {t('exploreCoursesBtn')}
          </button>
        </div>
      )}

      {/* Advisory Neutral Comparison Statement */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs leading-relaxed flex items-start gap-2 border border-slate-200 dark:border-slate-700">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          {language === 'ta'
            ? 'ஒப்பீட்டுக் கொள்கை: இந்த ஒப்பீடு கட்டணங்கள் மற்றும் தகுதிகளின் நடுநிலையான தொகுப்பாகும். எந்த ஒரு படிப்பையும் அனைவருக்கும் பொதுவான சிறந்த தேர்வாக தளம் தன்னிச்சையாக அறிவிக்காது.'
            : 'Neutral Comparison Principle: This comparison presents verified fee structures, eligibility requirements, and duration without declaring any single course as universally superior. Family alignment and individual student passion should guide the final decision.'}
        </p>
      </div>
    </div>
  );
}
