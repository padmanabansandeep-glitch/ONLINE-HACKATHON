import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Users,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Zap,
  Wrench,
  Stethoscope,
  Sprout,
  DollarSign,
  Layers,
  ChevronRight,
  LogIn
} from 'lucide-react';

export default function LandingPage({ setActiveTab }) {
  const { currentUser, switchRole } = useAuth();
  const { language, t } = useLanguage();

  const sectorList = [
    { name: "Information Technology & Hardware", nameTa: "கணினி & ஐடி வன்பொருள்", icon: Cpu, count: "8 Courses", color: "from-blue-500 to-indigo-600" },
    { name: "Electrical & Industrial Maintenance", nameTa: "மின்சாரம் & தொழிற்துறை வயரிங்", icon: Zap, count: "6 Courses", color: "from-amber-500 to-orange-600" },
    { name: "Automotive & Electric Vehicle (EV)", nameTa: "ஆட்டோமொபைல் & EV தொழில்நுட்பம்", icon: Wrench, count: "5 Courses", color: "from-rose-500 to-red-600" },
    { name: "Healthcare & Patient Support", nameTa: "சுகாதாரம் & நோயாளி பராமரிப்பு", icon: Stethoscope, count: "4 Courses", color: "from-emerald-500 to-teal-600" },
    { name: "Smart Agriculture & Hydroponics", nameTa: "நவீன விவசாயம் & பசுமைக்குடில்", icon: Sprout, count: "4 Courses", color: "from-green-500 to-emerald-600" },
    { name: "Financial Accounting & Tally GST", nameTa: "கணக்கியல், ஜிஎஸ்டி & டாலி", icon: DollarSign, count: "5 Courses", color: "from-purple-500 to-violet-600" },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center px-4 relative z-10 space-y-6">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-brand-200 dark:border-brand-800 text-xs font-semibold text-brand-700 dark:text-brand-300 shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>{language === 'ta' ? 'AI தொழிற்கல்வி & குடும்ப கலந்தாய்வு தளம்' : 'AI Vocational Career Counselling & Family Support'}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            {t('heroTitle')}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-violet-600 text-white font-bold text-sm shadow-xl shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Compass className="w-5 h-5" />
              <span>{t('getStartedBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className="px-6 py-3.5 rounded-2xl glass-card text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all flex items-center gap-2 shadow-sm"
            >
              <BookOpen className="w-5 h-5 text-brand-500" />
              <span>{t('exploreCoursesBtn')}</span>
            </button>

            <button
              onClick={() => setActiveTab('family')}
              className="px-6 py-3.5 rounded-2xl bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-200 border border-violet-200 dark:border-violet-700/60 font-bold text-sm hover:bg-violet-100 dark:hover:bg-violet-900/60 transition-all flex items-center gap-2 shadow-sm"
            >
              <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              <span>{t('familySupportBtn')}</span>
            </button>

            <button
              onClick={() => setActiveTab('login')}
              className="px-5 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-bold text-sm transition-all flex items-center gap-2 shadow-sm"
            >
              <LogIn className="w-4 h-4 text-brand-500" />
              <span>{language === 'ta' ? 'உள்நுழைய' : 'Sign In'}</span>
            </button>
          </div>

          {/* Quick Stats Bar */}
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="glass-card p-4 rounded-2xl text-center border border-slate-200/90 dark:border-slate-800 shadow-sm">
              <div className="text-2xl font-black text-brand-600 dark:text-brand-400">12,000+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('quickStatsStudents')}</div>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center border border-slate-200/90 dark:border-slate-800 shadow-sm">
              <div className="text-2xl font-black text-violet-600 dark:text-violet-400">50+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('quickStatsCourses')}</div>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center border border-slate-200/90 dark:border-slate-800 shadow-sm">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">94%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('quickStatsFamilies')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Vocational Education Matters Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t('featuresTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t('featuresSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-3xl card-hover-glow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('feature1Title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('feature1Desc')}</p>
          </div>

          <div className="glass-card p-6 rounded-3xl card-hover-glow space-y-3 border-2 border-brand-500/30">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('feature2Title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('feature2Desc')}</p>
          </div>

          <div className="glass-card p-6 rounded-3xl card-hover-glow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('feature3Title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('feature3Desc')}</p>
          </div>

          <div className="glass-card p-6 rounded-3xl card-hover-glow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('feature4Title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('feature4Desc')}</p>
          </div>
        </div>
      </section>

      {/* Vocational Sectors Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
              {language === 'ta' ? 'வேலைவாய்ப்பு நிறைந்த துறைகள்' : 'High-Demand Vocational Fields'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {language === 'ta' ? 'தொழில்நுட்ப மற்றும் செய்முறை துறைகள்' : 'Explore Career Sectors'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('courses')}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>{language === 'ta' ? 'அனைத்து படிப்புகளையும் காண்க' : 'View all 12 courses'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectorList.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                onClick={() => setActiveTab('courses')}
                className="glass-card p-5 rounded-2xl card-hover-glow cursor-pointer group border border-slate-200 dark:border-slate-800 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sec.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {language === 'ta' ? sec.nameTa : sec.name}
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{sec.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Spotlight on Family Decision-Support Hub */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-violet-500/30 bg-gradient-to-br from-violet-50/50 via-white to-brand-50/50 dark:from-violet-950/20 dark:via-slate-900 dark:to-brand-950/20 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300">
                {language === 'ta' ? 'தனித்துவ அம்சம்' : 'Flagship Feature'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                {language === 'ta'
                  ? 'குடும்ப முடிவு-ஆதரவு மையம்: மாணவர்கள் & பெற்றோர் ஒன்றாக முடிவெடுங்கள்'
                  : 'Family Decision-Support Hub: No Confusion, Total Clarity'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'ta'
                  ? 'மாணவர்கள் தங்கள் ஆர்வத்தைப் பதிவு செய்யலாம்; பெற்றோர்கள் கட்டண விவரங்கள், தங்குமிடம் மற்றும் வேலை பாதுகாப்பை ஆராயலாம். 6 இலக்க இணைப்புக் குறியீடு மூலம் இருவரும் ஒரே இடத்தில் ஆலோசிக்கலாம்.'
                  : 'Empowering students and parents to transparently review fees, course duration, job safety, and career growth without forced agreement. Connect securely using consent-based 6-digit invitation codes.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{language === 'ta' ? 'வெளிப்படையான கட்டண விவரங்கள்' : 'Transparent Tuition & Living Costs'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{language === 'ta' ? 'இருதரப்பு விவாதக் குறிப்புகள்' : 'Student & Parent Mutual Comments'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{language === 'ta' ? 'குடும்ப முடிவு சரிபார்ப்புப் பட்டியல்' : 'Decision Alignment Checklist'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{language === 'ta' ? 'பாதுகாப்பான அனுமதிக் கட்டுப்பாடு' : 'Consent-Driven Privacy Protection'}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('family')}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-brand-600 text-white font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>{language === 'ta' ? 'குடும்ப மையத்திற்கு செல்லவும்' : 'Open Family Decision Hub'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Preview Card */}
            <div className="lg:col-span-5">
              <div className="glass-card p-5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Family Link: VISTA-7294</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    Connected
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900/40 text-xs">
                    <div className="font-bold text-brand-700 dark:text-brand-300">🎓 Student: Ananya</div>
                    <div className="text-slate-600 dark:text-slate-400 text-[11px] mt-1">
                      "Interested in Computer Applications & Software (IT). Great tech internship prospects!"
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-xs">
                    <div className="font-bold text-emerald-700 dark:text-emerald-300">👨‍👧 Parent: Ramesh</div>
                    <div className="text-slate-600 dark:text-slate-400 text-[11px] mt-1">
                      "Fees are ₹15,000-₹35,000 which fits our savings. Approved for discussion."
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-[11px] font-semibold text-center text-slate-700 dark:text-slate-300">
                  Status: <span className="text-brand-600 dark:text-brand-400 font-bold">Family Agreed on Pathway</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
