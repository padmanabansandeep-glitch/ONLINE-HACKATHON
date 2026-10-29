import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';

export default function RegisterPage({ setActiveTab }) {
  const { register } = useAuth();
  const { language, t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // ONLY 'student' or 'parent'

  const handleSubmit = (e) => {
    e.preventDefault();
    // Safety check: ensure ordinary registration NEVER allows 'admin'
    const safeRole = role === 'admin' ? 'student' : role;
    register(name, email, password, safeRole);
    if (safeRole === 'parent') {
      setActiveTab('parentDashboard');
    } else {
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl gradient-banner flex items-center justify-center text-white mx-auto shadow-md shadow-brand-500/20">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t('register')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create your vocational guidance profile
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ananya Sharma / அன்பு"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Role Selection: Restricted to Student or Parent Only */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {t('selectRole')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  role === 'student'
                    ? 'border-brand-500 bg-brand-50/80 dark:bg-brand-950/60 text-brand-900 dark:text-brand-200'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs">🎓 {t('studentRole')}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Explore courses & career roadmaps</div>
              </button>

              <button
                type="button"
                onClick={() => setRole('parent')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  role === 'parent'
                    ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs">👨‍👧 {t('parentRole')}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Review fees & discuss pathways</div>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 italic">
              * Note: Administrator accounts are strictly assigned via verified organization credentials.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-violet-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          Already have an account?{' '}
          <button
            onClick={() => setActiveTab('login')}
            className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
          >
            {t('login')}
          </button>
        </div>
      </div>
    </div>
  );
}
