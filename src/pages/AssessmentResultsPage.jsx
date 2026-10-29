import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import CourseCard from '../components/CourseCard';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import {
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function AssessmentResultsPage({ setActiveTab, onSelectCourse }) {
  const { domainScores, recommendedCourses, setSelectedRoadmapCareer } = useAuth();
  const { language, t } = useLanguage();

  const [displayLimit, setDisplayLimit] = useState(6);

  const chartData = [
    { subject: language === 'ta' ? 'கணினி/ஐடி' : 'Information Tech', score: domainScores.tech || 65, fullMark: 100 },
    { subject: language === 'ta' ? 'மின்னணுவியல்' : 'Electronics & Hardware', score: domainScores.electronics || 70, fullMark: 100 },
    { subject: language === 'ta' ? 'சுகாதாரம்' : 'Healthcare & Care', score: domainScores.healthcare || 45, fullMark: 100 },
    { subject: language === 'ta' ? 'விவசாயம்' : 'Agri & Ecology', score: domainScores.agriculture || 50, fullMark: 100 },
    { subject: language === 'ta' ? 'வாகனவியல்' : 'Automotive / EV', score: domainScores.automobile || 60, fullMark: 100 },
    { subject: language === 'ta' ? 'வணிகம்' : 'Business & Finance', score: domainScores.business || 55, fullMark: 100 },
    { subject: language === 'ta' ? 'படைப்பாற்றல்' : 'Design & Creative', score: domainScores.creative || 65, fullMark: 100 },
  ];

  // Find top domain
  const sortedDomains = [...chartData].sort((a, b) => b.score - a.score);
  const topDomain = sortedDomains[0];

  const topRecommendedCourses = recommendedCourses.slice(0, displayLimit);

  const colors = ['#4f46e5', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-500/10 via-brand-500/10 to-transparent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'பகுப்பாய்வு முடிந்தது' : 'Analysis Complete'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t('resultsTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              {language === 'ta'
                ? `உங்கள் பதில்களின் அடிப்படையில் முதன்மை பரிந்துரைக்கப்பட்ட தொழிற்பிரிவு: ${topDomain.subject} (${topDomain.score}% பொருத்தம்).`
                : `Highest domain affinity identified in ${topDomain.subject} (${topDomain.score}% match score).`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('takeAgainBtn')}</span>
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t('exploreCoursesBtn')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid: Radar Chart + Strengths */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'ta' ? 'தொழில் ஆர்வம் ரேடார் வரைபடம்' : 'Vocational Interest Radar Profile'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta'
                ? '7 வெவ்வேறு தொழிற்கல்வி பிரிவுகளில் உங்கள் செய்முறை ஆர்வ அளவீடு.'
                : 'Comparative visual breakdown across 7 vocational industry sectors.'}
            </p>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" opacity={0.3} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                <Radar
                  name="Interest Affinity"
                  dataKey="score"
                  stroke="#4f46e5"
                  fill="#6366f1"
                  fillOpacity={0.45}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Primary Focus: <strong className="text-brand-600 dark:text-brand-400">{topDomain.subject}</strong></span>
            <span>Scale: 0 - 100% Affinity</span>
          </div>
        </div>

        {/* Identified Strengths & Key Factors (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-violet-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('strengthsIdentified')}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {language === 'ta'
                ? 'உங்கள் பதில்களிலிருந்து வெளிப்பட்ட முக்கிய செய்முறை ஆற்றல்கள்:'
                : 'Key practical aptitude traits highlighted during the interactive session:'}
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900/40 text-xs">
                <div className="font-bold text-brand-700 dark:text-brand-300 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-brand-500" />
                  <span>High Practical & Hands-on Aptitude</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Strong preference for tangible tools, component assembly, and active laboratory labs over passive lecture-only formats.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-xs">
                <div className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Logical Diagnostic Mindset</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Curiosity for troubleshooting faults in circuit boards, software bugs, Wi-Fi routers, or engine sensors.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-violet-50/70 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/40 text-xs">
                <div className="font-bold text-violet-700 dark:text-violet-300 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-violet-500" />
                  <span>Cost-Conscious Career Goal</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Clear intention to complete training within family budget and transition swiftly into apprenticeship or job placement.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedRoadmapCareer(topRecommendedCourses[0]?.title || "Computer Applications & Software (IT)");
              setActiveTab('roadmap');
            }}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-brand-600 text-white font-bold text-xs shadow-md shadow-violet-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>{t('viewRoadmapBtn')}</span>
          </button>
        </div>
      </div>

      {/* Suggested Courses Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-500" />
            <span>{t('recommendedCoursesTitle')}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'ta'
              ? 'உங்கள் மதிப்பீடு மற்றும் தகுதிக்கு மிகவும் பொருத்தமான படிப்புகளின் பட்டியல்.'
              : 'Directly actionable vocational paths matching your assessment profile.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRecommendedCourses.map((course, idx) => (
            <div key={course.id} className="relative group">
              {/* Rank Badge */}
              <div className="absolute -top-2.5 -left-2 z-10 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-brand-600 to-violet-600 text-white font-mono font-black text-[11px] shadow-md border-2 border-white dark:border-slate-900">
                Rank #{idx + 1}
              </div>
              <CourseCard
                course={course}
                onSelectCourse={onSelectCourse}
              />
            </div>
          ))}
        </div>

        {recommendedCourses.length > displayLimit && (
          <div className="text-center pt-3">
            <button
              onClick={() => setDisplayLimit((prev) => Math.min(recommendedCourses.length, prev + 6))}
              className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all"
            >
              ➕ {language === 'ta' ? 'கூடுதல் பரிந்துரைக்கப்பட்ட படிப்புகளைக் காண்க' : 'Show More Suggested Courses'} ({recommendedCourses.length - displayLimit} more)
            </button>
          </div>
        )}
      </section>

      {/* Advisory Guidance Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-xs leading-relaxed flex items-start gap-2 border border-slate-200 dark:border-slate-700">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          {language === 'ta'
            ? 'அறிவிப்பு: இந்த மதிப்பீட்டு முடிவுகள் உங்கள் ஆர்வங்களை கண்டறிய உதவும் கல்வி வழிகாட்டி மட்டுமே. இறுதி சேர்க்கை முடிவை எடுப்பதற்கு முன் பெற்றோருடன் கலந்தாலோசித்து கல்வி நிறுவனங்களில் உறுதி செய்யவும்.'
            : 'Advisory: These results represent educational decision-support guidance derived from your selected responses. Career success depends upon dedicated skill practice, curriculum completion, and employer hiring criteria.'}
        </p>
      </div>
    </div>
  );
}
