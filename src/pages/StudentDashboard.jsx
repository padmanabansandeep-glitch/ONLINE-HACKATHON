import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import CourseCard from '../components/CourseCard';
import {
  Compass,
  TrendingUp,
  Scale,
  Users,
  Bot,
  ArrowRight,
  CheckCircle,
  Bookmark,
  Sparkles,
  Award,
  Clock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function StudentDashboard({ setActiveTab, onSelectCourse }) {
  const {
    currentUser,
    studentProfile,
    recommendedCourses,
    savedCourseIds,
    compareCourseIds,
    roadmapMilestones,
    familyDiscussions,
    selectedRoadmapCareer,
    finalDecisionStatus
  } = useAuth();
  const { language, t } = useLanguage();

  // Profile completion calculation
  const profileFields = [
    studentProfile.name,
    studentProfile.qualification,
    studentProfile.stream,
    studentProfile.maxBudget,
    studentProfile.careerGoal,
    studentProfile.workEnvironment,
  ];
  const completedFields = profileFields.filter(Boolean).length;
  const profilePercent = Math.round((completedFields / profileFields.length) * 100);

  // Roadmap calculation
  const completedMilestones = roadmapMilestones.filter((m) => m.completed).length;
  const roadmapPercent = Math.round((completedMilestones / roadmapMilestones.length) * 100);

  // Top recommendations (expanded to top 6 vocational courses)
  const topRecommendations = recommendedCourses.slice(0, 6);

  // Shortlisted courses
  const savedCoursesList = recommendedCourses.filter((c) => savedCourseIds.includes(c.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-brand-600/10 via-violet-600/10 to-transparent relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-800 dark:bg-brand-900/60 dark:text-brand-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'மாணவர் டாஷ்போர்டு' : 'Student Career Workspace'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t('welcomeBack')}, {studentProfile.name || currentUser?.displayName || "Student"}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              {language === 'ta'
                ? `உங்கள் தகுதி (${studentProfile.qualification}) மற்றும் பட்ஜெட் (₹${Number(studentProfile.maxBudget).toLocaleString('en-IN')}) அடிப்படையில் சிறந்த தொழிற்கல்வி படிப்புகள் தயார் செய்யப்பட்டுள்ளன.`
                : `Matched against your qualification (${studentProfile.qualification}) and family budget (₹${Number(studentProfile.maxBudget).toLocaleString('en-IN')}).`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span>{language === 'ta' ? 'மதிப்பீட்டை புதுப்பி' : 'Update Assessment'}</span>
            </button>
            <button
              onClick={() => setActiveTab('family')}
              className="px-4 py-2.5 rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200 dark:border-violet-800 font-bold text-xs hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-all flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              <span>{t('navFamily')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Overview Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Profile Completion */}
        <div 
          onClick={() => setActiveTab('profile')}
          className="glass-card p-5 rounded-2xl cursor-pointer card-hover-glow border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Profile Completion</span>
            <span className="text-xs font-extrabold text-brand-600 dark:text-brand-400">{profilePercent}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mb-3">
            <div
              className="bg-brand-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${profilePercent}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <span>{studentProfile.qualification} • {studentProfile.stream}</span>
            <ChevronRight className="w-3 h-3 ml-auto" />
          </span>
        </div>

        {/* Career Assessment Status */}
        <div 
          onClick={() => setActiveTab('assessmentResults')}
          className="glass-card p-5 rounded-2xl cursor-pointer card-hover-glow border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Interest Assessment</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              Active
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white mt-1 truncate">
            Top: Information Tech
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-2">
            <span>View Radar Affinity Chart</span>
            <ChevronRight className="w-3 h-3 ml-auto" />
          </span>
        </div>

        {/* Roadmap Progress */}
        <div 
          onClick={() => setActiveTab('roadmap')}
          className="glass-card p-5 rounded-2xl cursor-pointer card-hover-glow border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Roadmap Progress</span>
            <span className="text-xs font-extrabold text-violet-600 dark:text-violet-400">{roadmapPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mb-3">
            <div
              className="bg-gradient-to-r from-violet-600 to-brand-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${roadmapPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <span>{completedMilestones} of {roadmapMilestones.length} Milestones Done</span>
            <ChevronRight className="w-3 h-3 ml-auto" />
          </span>
        </div>

        {/* Family Decision Alignment */}
        <div 
          onClick={() => setActiveTab('family')}
          className="glass-card p-5 rounded-2xl cursor-pointer card-hover-glow border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Family Status</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
              Linked
            </span>
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-white mt-1 truncate">
            {finalDecisionStatus}
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-2">
            <span>Parent: {studentProfile.linkedParentName}</span>
            <ChevronRight className="w-3 h-3 ml-auto" />
          </span>
        </div>
      </div>

      {/* Top Recommended Courses */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-500" />
              <span>{t('recommendedCoursesTitle')}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta'
                ? 'உங்கள் ஆர்வம் மற்றும் குடும்ப பட்ஜெட்டிற்கு மிகவும் பொருத்தமான படிப்புகள்.'
                : 'Highest affinity match scores based on your background, preferences and budget.'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('courses')}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>{language === 'ta' ? 'அனைத்தையும் காண்க' : 'View all'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRecommendations.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelectCourse={onSelectCourse}
            />
          ))}
        </div>
      </section>

      {/* Two Column: Family Discussions Snippet & AI Assistant Shortcut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Family Discussion Snippet (7 cols) */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-violet-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('jointShortlistTitle')}
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('family')}
              className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
            >
              Open Hub &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {familyDiscussions.slice(0, 2).map((disc) => (
              <div
                key={disc.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{disc.courseTitle}</span>
                  <span className="text-[10px] text-slate-400">{disc.date}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  "{disc.studentNote}"
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                    Student: {disc.studentSupport}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    Parent: {disc.parentSupport}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Career Counsellor Prompt Box (5 cols) */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 bg-gradient-to-br from-brand-50/40 to-violet-50/40 dark:from-brand-950/20 dark:to-violet-950/20">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('chatbotTitle')}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'ta'
                ? '10 அல்லது 12-ஆம் வகுப்பிற்குப் பிறகு என்ன படிக்கலாம், குறைந்த கட்டண படிப்புகள் எவை என்று AI ஆலோசகரிடம் தமிழில் அல்லது ஆங்கிலத்தில் கேளுங்கள்.'
                : 'Have questions about course fees, ITI vs Diploma, or career pathways? Get fast, grounded guidance from VISTA AI.'}
            </p>

            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('chatbot')}
                className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 hover:border-brand-500 transition-colors shadow-sm"
              >
                💬 {language === 'ta' ? '10-ஆம் வகுப்பு முடித்தபின் என்ன படிக்கலாம்?' : 'Which vocational courses can I study after Class 10?'}
              </button>
              <button
                onClick={() => setActiveTab('chatbot')}
                className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 hover:border-brand-500 transition-colors shadow-sm"
              >
                💬 {language === 'ta' ? 'குறைந்த செலவில் படிக்கும் தொழிற்கல்விகள் எவை?' : 'Which options fit my education budget?'}
              </button>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('chatbot')}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'ta' ? 'AI ஆலோசகருடன் உரையாட தொடங்கு' : 'Chat with AI Counsellor'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
