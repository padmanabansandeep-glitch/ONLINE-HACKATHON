import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  UserCheck,
  GraduationCap,
  Users,
  Shield,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RefreshCw
} from 'lucide-react';

export default function LoginPage({ setActiveTab }) {
  const { login, switchRole } = useAuth();
  const { language, t } = useLanguage();

  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Role details config
  const roleConfigs = {
    student: {
      titleEn: "Student Portal",
      titleTa: "மாணவர் தளம்",
      descEn: "Take aptitude assessments, explore trades & build roadmaps",
      descTa: "திறன் மதிப்பீடு, தொழிற்கல்வி படிப்புகள் மற்றும் முன்னேற்ற வரைபடம்",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      icon: GraduationCap,
    },
    parent: {
      titleEn: "Parent & Guardian Portal",
      titleTa: "பெற்றோர் தளம்",
      descEn: "Review course fees, safety metrics & collaborate in Family Hub",
      descTa: "கட்டண விவரங்கள், வேலை பாதுகாப்பு மற்றும் குடும்ப ஆலோசனை மையம்",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      icon: Users,
    },
    admin: {
      titleEn: "Administrator & Faculty Console",
      titleTa: "நிர்வாகி & ஆசிரியர் தளம்",
      descEn: "Manage course catalog, review feedback & analytics",
      descTa: "பாடத்திட்ட மேலாண்மை, கருத்துக்கள் மற்றும் தள புள்ளிவிவரங்கள்",
      badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800",
      icon: Shield,
    }
  };

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    setStatusMessage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setStatusMessage({ type: 'error', text: language === 'ta' ? 'மின்னஞ்சல் மற்றும் கடவுச்சொல்லை நிரப்பவும்' : 'Please provide both email and password.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    // Simulate authenticating for seamless UX feedback
    setTimeout(() => {
      login(email, password, selectedRole);
      setIsLoading(false);
      setStatusMessage({ type: 'success', text: language === 'ta' ? 'வெற்றிகரமாக உள்நுழைந்துள்ளீர்கள்!' : 'Logged in successfully! Redirecting...' });

      setTimeout(() => {
        if (selectedRole === 'admin') setActiveTab('admin');
        else if (selectedRole === 'parent') setActiveTab('parentDashboard');
        else setActiveTab('dashboard');
      }, 500);
    }, 600);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSuccess(true);
    setTimeout(() => {
      setForgotModalOpen(false);
      setResetSuccess(false);
      setResetEmail('');
      setStatusMessage({
        type: 'success',
        text: language === 'ta'
          ? 'கடவுச்சொல் மீட்டமைப்பு இணைப்பு உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டது!'
          : 'Password reset link sent to your registered email address!'
      });
    }, 1800);
  };

  const currentRoleConfig = roleConfigs[selectedRole];

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4 animate-in fade-in duration-300">
      {/* Decorative Glow Background */}
      <div className="relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-32 bg-brand-500/20 dark:bg-brand-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-7 relative z-10 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-[11px] font-bold text-brand-700 dark:text-brand-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>{language === 'ta' ? 'அங்கீகரிக்கப்பட்ட உள்நுழைவு' : 'Verified Vocational Career Portal'}</span>
            </div>

            <div className="w-14 h-14 rounded-2xl gradient-banner flex items-center justify-center text-white mx-auto shadow-lg shadow-brand-500/25 group hover:rotate-6 transition-transform">
              <Compass className="w-7 h-7" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {language === 'ta' ? 'விஸ்டா AI உள்நுழைவு' : 'Sign in to VISTA AI'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              {language === 'ta'
                ? 'உங்கள் தொழிற்கல்வி எதிர்காலம் மற்றும் குடும்ப ஆதரவு கணக்கில் இணையுங்கள்'
                : 'Access your personalized vocational guidance, family hub & career milestones'}
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              {language === 'ta' ? 'பயனர் வகை தேர்வு செய்யவும்' : 'Select Account Type'}
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              {Object.keys(roleConfigs).map((roleKey) => {
                const conf = roleConfigs[roleKey];
                const Icon = conf.icon;
                const isSelected = selectedRole === roleKey;
                return (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => handleRoleSelect(roleKey)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="capitalize">{language === 'ta' ? (roleKey === 'student' ? 'மாணவர்' : roleKey === 'parent' ? 'பெற்றோர்' : 'நிர்வாகி') : roleKey}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Role Description Card */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${currentRoleConfig.badgeColor}`}>
              <currentRoleConfig.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-900 dark:text-white">
                {language === 'ta' ? currentRoleConfig.titleTa : currentRoleConfig.titleEn}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {language === 'ta' ? currentRoleConfig.descTa : currentRoleConfig.descEn}
              </p>
            </div>
          </div>

          {/* Status Alert */}
          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in ${
                statusMessage.type === 'error'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
              }`}
            >
              {statusMessage.type === 'error' ? (
                <AlertCircle className="w-4 h-4 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Email Field */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {language === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={selectedRole === 'admin' ? 'admin@vista.gov.in' : (selectedRole === 'parent' ? 'parent@vista.edu' : 'student@vista.edu')}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-bold text-slate-700 dark:text-slate-300">
                  {language === 'ta' ? 'கடவுச்சொல்' : 'Password'}
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-brand-600 dark:text-brand-400 hover:underline font-semibold text-[11px]"
                >
                  {language === 'ta' ? 'கடவுச்சொல் மறந்ததா?' : 'Forgot password?'}
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-600 border-slate-300 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800"
                />
                <span>{language === 'ta' ? 'என்னை நினைவில் கொள்' : 'Remember this device'}</span>
              </label>

              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>SSL Secured</span>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 text-white font-extrabold text-sm shadow-xl shadow-brand-500/25 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{language === 'ta' ? 'உள்நுழைகிறது...' : 'Signing in...'}</span>
                </>
              ) : (
                <>
                  <span>{language === 'ta' ? 'உள்நுழைவு' : `Sign In as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick guest bypass */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('courses')}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors underline"
            >
              {language === 'ta' ? 'உள்நுழையாமல் படிப்புகளை மட்டும் பார்க்க விரும்புகிறீர்களா?' : 'Or continue exploring courses as Guest'}
            </button>
          </div>

          {/* Footer Switching to Register */}
          <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5">
            <span>{language === 'ta' ? 'புதிய கணக்கு வேண்டுமா?' : "Don't have an account yet?"}</span>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              {language === 'ta' ? 'இப்போதே பதிவு செய்யவும்' : 'Create Free Account'}
            </button>
          </div>

          {/* Trust Footnotes */}
          <div className="pt-2 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>NSDC Aligned</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-brand-500" />
              <span>Consent-Based Hub</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-violet-500" />
              <span>Bilingual Guidance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="glass-card max-w-sm w-full p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center mx-auto">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'ta' ? 'கடவுச்சொல் மீட்டமைக்க' : 'Reset Your Password'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ta'
                  ? 'உங்கள் பதிவு செய்யப்பட்ட மின்னஞ்சல் முகவரியை உள்ளிடவும்'
                  : 'Enter your registered email and we will send you a reset link'}
              </p>
            </div>

            {resetSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Link sent! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-3 text-xs">
                <div>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 shadow-sm"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
