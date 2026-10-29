import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import {
  Compass,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  UserCheck,
  ShieldAlert,
  LogOut,
  ChevronDown,
  Sparkles,
  BookOpen,
  Users,
  Award,
  LogIn
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const { currentUser, logout, switchRole } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return { label: t('adminRole'), bg: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-800' };
      case 'parent':
        return { label: t('parentRole'), bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' };
      default:
        return { label: t('studentRole'), bg: 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 border-brand-200 dark:border-brand-800' };
    }
  };

  const currentBadge = getRoleBadge(currentUser?.role || 'student');

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab(currentUser ? (currentUser.role === 'parent' ? 'parentDashboard' : (currentUser.role === 'admin' ? 'admin' : 'dashboard')) : 'login')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl gradient-banner flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  VISTA <span className="gradient-text">AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                  {language === 'ta' ? 'தமிழ்' : 'EduVoc'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                {language === 'ta' ? 'தொழிற்கல்வி & குடும்ப முடிவு தளம்' : 'Vocational Counselling & Family Hub'}
              </p>
            </div>
          </div>

          {/* Quick Header Nav Links (Desktop) - Only when logged in */}
          {currentUser && (
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {currentUser?.role === 'parent' ? 'Parent Hub' : (currentUser?.role === 'admin' ? 'Admin Hub' : t('navDashboard'))}
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'courses'
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('navCourses')}
              </button>
              <button
                onClick={() => setActiveTab('compare')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'compare'
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('navCompare')}
              </button>
              <button
                onClick={() => setActiveTab('family')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                  activeTab === 'family'
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-brand-500" />
                {t('navFamily')}
              </button>
              <button
                onClick={() => setActiveTab('chatbot')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                  activeTab === 'chatbot'
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-violet-500 animate-spin" />
                {t('navChatbot')}
              </button>
            </nav>
          )}

          {/* Right Action Icons: Language, Dark Mode, Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              title="Toggle English / தமிழ்"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Globe className="w-4 h-4 text-brand-500" />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle Dark / Light Mode"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Role Badge (When logged in) */}
            {currentUser && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${currentBadge.bg}`}>
                <span className="w-2 h-2 rounded-full bg-current" />
                <span className="hidden sm:inline">{currentBadge.label}</span>
              </div>
            )}

            {/* User Profile Avatar / Logout or Sign In */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                  title="View Profile"
                >
                  <img
                    src={currentUser?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                    alt={currentUser?.displayName || "User"}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/30"
                  />
                </button>
                <button
                  onClick={() => {
                    logout();
                    setActiveTab('login');
                  }}
                  title={t('logout')}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveTab('login')}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-700 hover:to-violet-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t('login')}</span>
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className="hidden sm:flex px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs transition-colors"
                >
                  {t('register')}
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-1 animate-in slide-in-from-top-4">
          {currentUser ? (
            <>
              <button
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                📊 {t('navDashboard')}
              </button>
              <button
                onClick={() => { setActiveTab('assessment'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                🎯 {t('navAssessment')}
              </button>
              <button
                onClick={() => { setActiveTab('courses'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                📚 {t('navCourses')}
              </button>
              <button
                onClick={() => { setActiveTab('compare'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ⚖️ {t('navCompare')}
              </button>
              <button
                onClick={() => { setActiveTab('family'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                👨‍👩‍👧 {t('navFamily')}
              </button>
              <button
                onClick={() => { setActiveTab('roadmap'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                🗺️ {t('navRoadmap')}
              </button>
              <button
                onClick={() => { setActiveTab('chatbot'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                🤖 {t('navChatbot')}
              </button>
              <button
                onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                👤 {t('navProfile')}
              </button>
              <button
                onClick={() => { logout(); setActiveTab('login'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('logout')}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setActiveTab('login'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{t('login')}</span>
              </button>
              <button
                onClick={() => { setActiveTab('register'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                📝 {t('register')}
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
