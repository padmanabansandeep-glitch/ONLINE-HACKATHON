import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Scale,
  Users,
  MapPin,
  Bot,
  User,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  FileText,
  Settings,
  HeartHandshake,
  TrendingUp,
  Award
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { currentUser } = useAuth();
  const { t, language } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);

  const role = currentUser?.role || 'student';

  const studentNavItems = [
    { id: 'dashboard', label: t('navDashboard'), icon: LayoutDashboard },
    { id: 'assessment', label: t('navAssessment'), icon: Compass, badge: 'AI' },
    { id: 'courses', label: t('navCourses'), icon: BookOpen },
    { id: 'compare', label: t('navCompare'), icon: Scale },
    { id: 'family', label: t('navFamily'), icon: Users, highlight: true },
    { id: 'roadmap', label: t('navRoadmap'), icon: TrendingUp },
    { id: 'chatbot', label: t('navChatbot'), icon: Bot, pulse: true },
    { id: 'profile', label: t('navProfile'), icon: User },
  ];

  const parentNavItems = [
    { id: 'parentDashboard', label: 'Parent Overview', icon: HeartHandshake },
    { id: 'family', label: t('navFamily'), icon: Users, highlight: true },
    { id: 'courses', label: 'Explore Shortlisted Courses', icon: BookOpen },
    { id: 'compare', label: t('navCompare'), icon: Scale },
    { id: 'chatbot', label: 'Ask Career Counsellor', icon: Bot },
    { id: 'privacy', label: t('navPrivacy'), icon: FileText },
  ];

  const adminNavItems = [
    { id: 'admin', label: t('navAdmin'), icon: ShieldAlert, highlight: true },
    { id: 'courses', label: 'Manage Courses', icon: BookOpen },
    { id: 'dashboard', label: 'Student View Preview', icon: LayoutDashboard },
    { id: 'privacy', label: 'Consent Audits', icon: FileText },
  ];

  const navItems = role === 'admin' ? adminNavItems : (role === 'parent' ? parentNavItems : studentNavItems);

  return (
    <aside
      className={`hidden md:flex flex-col transition-all duration-300 glass-card border-r border-slate-200 dark:border-slate-800 ${
        collapsed ? 'w-20' : 'w-64'
      } shrink-0 min-h-[calc(100vh-4rem)] p-3 justify-between sticky top-16 z-30`}
    >
      <div>
        {/* Toggle Collapse Button */}
        <div className="flex items-center justify-between mb-4 px-2">
          {!collapsed && (
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {role === 'admin' ? 'Administration' : (role === 'parent' ? 'Parent Portal' : 'Student Navigation')}
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 ml-auto transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-violet-600 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : item.highlight ? 'text-brand-500 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500'
                  }`}
                />
                {!collapsed && (
                  <span className="truncate text-left flex-1">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-brand-200 text-brand-800 dark:bg-brand-900 dark:text-brand-200">
                    {item.badge}
                  </span>
                )}
                {!collapsed && item.pulse && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer info */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors ${
            activeTab === 'privacy' ? 'text-brand-600 dark:text-brand-400 font-bold' : ''
          }`}
          title="Privacy Policy & Consent"
        >
          <FileText className="w-4 h-4 shrink-0" />
          {!collapsed && <span>{t('navPrivacy')}</span>}
        </button>

        {!collapsed && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-brand-50 to-violet-50 dark:from-brand-950/40 dark:to-violet-950/40 border border-brand-100 dark:border-brand-900/50 text-[11px] text-slate-600 dark:text-slate-400">
            <div className="font-bold text-slate-900 dark:text-slate-100 mb-0.5 flex items-center gap-1.5">
              <span>{language === 'ta' ? 'நம்பகமான கல்வி' : 'Verified Guidance'}</span>
            </div>
            <p className="line-clamp-2">
              {language === 'ta'
                ? 'அரசு ITI & NSDC தரவுகளின் அடிப்படையிலானது'
                : 'Aligned with NSDC, DGT & TNSDC vocational frameworks'}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
