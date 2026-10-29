import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';
import {
  TrendingUp,
  CheckCircle2,
  Circle,
  Award,
  Briefcase,
  Layers,
  Sparkles,
  BookOpen,
  ArrowRight,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

export default function CareerRoadmapPage({ setActiveTab }) {
  const {
    selectedRoadmapCareer,
    setSelectedRoadmapCareer,
    roadmapMilestones,
    toggleMilestone,
    studentProfile
  } = useAuth();
  const { language, t } = useLanguage();

  const completedCount = roadmapMilestones.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / roadmapMilestones.length) * 100);

  const handleMilestoneClick = (id) => {
    toggleMilestone(id);
    const m = roadmapMilestones.find((x) => x.id === id);
    if (!m.completed) {
      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        /* ignore */
      }
    }
  };

  const careerOptions = [
    "Computer Applications & Software Specialist (C13)",
    "Graphic Design & UI/UX Specialist (C01)",
    "Electrician & Domestic Wiring Technician (C10)",
    "Automobile Technology Specialist (C07)",
    "Electric Vehicle (EV) Technology Specialist (C08)",
    "Accounting & Taxation (Tally, GST) Professional (C04)",
    "Healthcare Assistant (Patient Care) (C14)",
    "Solar & Renewable Energy Technician (C11)",
    "Precision Agriculture (Drone & Sensor Tech) (C19)"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-brand-600/10 via-violet-600/10 to-transparent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 dark:bg-brand-900/60 dark:text-brand-200 text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'தனிப்பயன் தொழில் வரைபடம்' : 'Personalized Milestone Tracker'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t('roadmapTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              {t('roadmapSubtitle')}
            </p>
          </div>

          {/* Career Target Dropdown */}
          <div className="glass-card p-3 rounded-2xl border border-brand-200 dark:border-brand-800/60 self-start md:self-auto">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Active Career Pathway
            </label>
            <select
              value={selectedRoadmapCareer}
              onChange={(e) => setSelectedRoadmapCareer(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-brand-700 dark:text-brand-300 focus:outline-none"
            >
              {careerOptions.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress Bar & Counter */}
        <div className="mt-8 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
            <span>{t('overallProgress')}</span>
            <span className="text-brand-600 dark:text-brand-400 font-extrabold">{progressPercent}% Completed</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-600 to-violet-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400">
            {completedCount} of {roadmapMilestones.length} milestones successfully marked as accomplished.
          </div>
        </div>
      </div>

      {/* 6 Step Interactive Milestone Progression */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-500" />
          <span>Step-by-Step Vocational Progression</span>
        </h3>

        <div className="space-y-3">
          {roadmapMilestones.map((m, idx) => {
            const isCompleted = m.completed;
            const phaseLabel = t(`milestone${m.id}`) || `Phase ${m.id}`;
            const title = language === 'ta' && m.titleTa ? m.titleTa : m.titleEn;

            return (
              <div
                key={m.id}
                onClick={() => handleMilestoneClick(m.id)}
                className={`glass-card p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 card-hover-glow ${
                  isCompleted
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 shrink-0" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      {phaseLabel}
                    </span>
                    <h4 className={`text-sm font-bold mt-0.5 ${isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                      {title}
                    </h4>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {isCompleted ? 'Accomplished' : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practical Action Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
            🛠️
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Hands-on Projects
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Build at least 3 tangible demonstration projects (e.g. interactive website, domestic wiring board, or PC diagnosis lab).
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
            📜
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Key Certifications
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Earn NCVT / NASSCOM / DGT government or sector skill council certificates to validate trade credentials with employers.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-xs">
            🏢
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Apprenticeship (NAPS)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Register on the National Apprenticeship Promotion Scheme (NAPS) portal to access paid on-the-job training in industrial plants.
          </p>
        </div>
      </div>

      {/* Advisory Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs leading-relaxed flex items-start gap-2 border border-slate-200 dark:border-slate-700">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          Milestone Progression Advisory: These milestones serve as structured educational guidance. Timelines vary depending on student study pace and institutional availability.
        </p>
      </div>
    </div>
  );
}
