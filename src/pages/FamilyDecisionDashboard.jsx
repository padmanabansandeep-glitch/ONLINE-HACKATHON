import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Users,
  KeyRound,
  ShieldCheck,
  CheckSquare,
  Square,
  MessageSquare,
  Send,
  Sparkles,
  IndianRupee,
  Clock,
  HeartHandshake,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export default function FamilyDecisionDashboard({ onSelectCourse }) {
  const {
    currentUser,
    studentProfile,
    recommendedCourses,
    familyDiscussions,
    addDiscussionComment,
    finalDecisionStatus,
    setFinalDecisionStatus,
    linkParentWithCode
  } = useAuth();
  const { language, t } = useLanguage();

  const [inputCode, setInputCode] = useState('');
  const [linkMsg, setLinkMsg] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeCommentCourseId, setActiveCommentCourseId] = useState(null);
  const [commentText, setCommentText] = useState('');

  // Checklist state
  const [checklist, setChecklist] = useState({
    budget: true,
    commute: true,
    passion: true,
    jobs: false,
    growth: true,
  });

  const toggleChecklist = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(studentProfile.familyLinkCode || "VISTA-7294");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    const success = linkParentWithCode(inputCode);
    if (success) {
      setLinkMsg({ type: 'success', text: t('parentLinkedSuccess') });
    } else {
      setLinkMsg({ type: 'error', text: language === 'ta' ? 'தவறான குறியீடு. 6 இலக்கக் குறியீட்டை சரிபார்க்கவும்.' : 'Invalid code. Please check the student’s 6-digit family link code.' });
    }
  };

  const handleSendComment = (discussionId) => {
    if (!commentText.trim()) return;
    const sender = currentUser?.role === 'parent' ? 'parent' : 'student';
    addDiscussionComment(discussionId, commentText, sender);
    setCommentText('');
    setActiveCommentCourseId(null);
  };

  const isParent = currentUser?.role === 'parent';

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-violet-600/10 via-brand-600/10 to-transparent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200 text-xs font-bold">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'குடும்ப ஆலோசனை மையம்' : 'Family Collaborative Decision Hub'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t('familyHubTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              {t('familyHubSubtitle')}
            </p>
          </div>

          {/* Secure Consent Code Pill */}
          <div className="glass-card p-4 rounded-2xl border border-violet-200 dark:border-violet-800/60 flex items-center gap-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t('yourShareCode')}
              </span>
              <span className="text-lg font-black tracking-widest text-violet-600 dark:text-violet-400">
                {studentProfile.familyLinkCode || "VISTA-7294"}
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className="p-2 rounded-xl bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/60 dark:hover:bg-violet-900/40 text-violet-600 dark:text-violet-300 transition-colors"
              title="Copy Family Link Code"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Parental Consent Link Card (If Parent is visiting or linking) */}
      {isParent && !studentProfile.familyLinked && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-violet-500/40 space-y-4">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-violet-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t('linkParentTitle')}
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {t('linkParentDesc')}
          </p>

          <form onSubmit={handleLinkSubmit} className="flex gap-3 max-w-md">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="e.g. VISTA-7294"
              required
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Connect
            </button>
          </form>

          {linkMsg && (
            <div className={`p-3 rounded-xl text-xs font-semibold ${
              linkMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
            }`}>
              {linkMsg.text}
            </div>
          )}
        </div>
      )}

      {/* Side-by-Side Perspectives: Student Preference vs Parent Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Preferences Card */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
                🎓
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('studentView')}</h3>
                <span className="text-[11px] text-slate-400">Student: {studentProfile.name}</span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
              Passionate & Skills
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <p><strong>Primary Interest:</strong> {studentProfile.interests?.join(', ') || 'Web Development, IT & Electrical'}</p>
            <p><strong>Preferred Work Environment:</strong> {studentProfile.workEnvironment || 'Hybrid'}</p>
            <p><strong>Stated Ambition:</strong> "{studentProfile.careerGoal || 'To secure a stable technical job and gain real hands-on experience'}"</p>
          </div>
        </div>

        {/* Parent / Guardian Preferences Card */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                👨‍👧
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('parentView')}</h3>
                <span className="text-[11px] text-slate-400">Parent: {studentProfile.linkedParentName}</span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              Budget & Safety Focus
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <p><strong>Max Family Budget:</strong> ₹{Number(studentProfile.maxBudget).toLocaleString('en-IN')}</p>
            <p><strong>Preferred Duration:</strong> 6 to 12 Months (Quick employability)</p>
            <p><strong>Key Parent Priority:</strong> "Verified institute accreditation, affordable tuition without loans, and clear job placement support."</p>
          </div>
        </div>
      </div>

      {/* Shortlisted Courses Discussion Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-violet-500" />
            <span>{t('jointShortlistTitle')}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'ta'
              ? 'இருவரும் இந்த படிப்புகளை ஆய்வு செய்து கருத்துக்களை பரிமாறிக்கொள்ளுங்கள்.'
              : 'Review shortlisted courses together, leave mutual comments, and indicate support levels.'}
          </p>
        </div>

        <div className="space-y-5">
          {familyDiscussions.map((disc) => (
            <div
              key={disc.id}
              className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {disc.courseTitle}
                </h3>
                <span className="text-xs text-slate-400">{disc.date}</span>
              </div>

              {/* Student Note */}
              <div className="p-3.5 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900/40 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-brand-800 dark:text-brand-300">
                  <span>🎓 Student's Perspective:</span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-200 dark:bg-brand-900 text-[10px]">
                    {disc.studentSupport}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{disc.studentNote}"
                </p>
              </div>

              {/* Parent Note */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <span>👨‍👧 Parent's Perspective:</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-[10px]">
                    {disc.parentSupport}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{disc.parentNote}"
                </p>
              </div>

              {/* Interactive Comment Thread */}
              <div className="space-y-2 pt-2">
                {(disc.comments || []).map((c, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 text-xs ${c.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md p-3 rounded-2xl ${
                        c.sender === 'parent'
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : 'bg-brand-600 text-white rounded-bl-none'
                      }`}
                    >
                      <div className="text-[10px] font-bold opacity-80 mb-0.5">
                        {c.sender === 'parent' ? 'Parent (Ramesh)' : 'Student (Ananya)'} • {c.time}
                      </div>
                      <p>{c.text}</p>
                    </div>
                  </div>
                ))}

                {/* Add new comment box */}
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={activeCommentCourseId === disc.id ? commentText : ''}
                    onFocus={() => setActiveCommentCourseId(disc.id)}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={t('addCommentPlaceholder')}
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <button
                    onClick={() => handleSendComment(disc.id)}
                    className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t('postComment')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Decision Checklist & Final Selection Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Checklist (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t('familyChecklistTitle')}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'ta'
              ? 'இருவரும் இணைந்து இந்த 5 முக்கிய அம்சங்களை சரிபார்க்கவும்:'
              : 'Both student and parent should ensure these 5 pillars are satisfied before finalizing admission:'}
          </p>

          <div className="space-y-3">
            {[
              { key: 'budget', label: t('chkBudget') },
              { key: 'commute', label: t('chkCommute') },
              { key: 'passion', label: t('chkPassion') },
              { key: 'jobs', label: t('chkJobProspects') },
              { key: 'growth', label: t('chkGrowth') },
            ].map((item) => (
              <div
                key={item.key}
                onClick={() => toggleChecklist(item.key)}
                className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {checklist[item.key] ? (
                  <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5" />
                )}
                <span className={`text-xs font-medium leading-relaxed ${checklist[item.key] ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final Selection Status (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 bg-gradient-to-br from-violet-50/30 to-brand-50/30 dark:from-violet-950/20 dark:to-brand-950/20">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t('finalSelectionTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {language === 'ta'
                ? 'மாணவர் தன் விருப்பப்படி குடும்ப முடிவின் தற்போதைய நிலையை புதுப்பிக்கலாம்.'
                : 'The student updates the active stage of application once family consensus is reached.'}
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t('currentStatus')}
              </label>
              <select
                value={finalDecisionStatus}
                onChange={(e) => setFinalDecisionStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-brand-700 dark:text-brand-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="Under Family Discussion">{t('statusUnderDiscussion')}</option>
                <option value="Family Agreed on Course">{t('statusAgreed')}</option>
                <option value="Application Submitted">{t('statusApplicationSubmitted')}</option>
              </select>
            </div>

            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <div className="font-bold text-slate-800 dark:text-slate-200">Current Preferred Course:</div>
              <div className="text-brand-600 dark:text-brand-400 font-semibold">
                {recommendedCourses?.[0]?.title || "Computer Applications & Software (IT)"}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed">
            * VISTA AI does not enforce decisions automatically. The student retains final agency over their education.
          </div>
        </div>
      </div>
    </div>
  );
}
