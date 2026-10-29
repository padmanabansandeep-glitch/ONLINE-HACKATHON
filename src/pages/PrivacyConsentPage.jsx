import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldCheck,
  Lock,
  Eye,
  KeyRound,
  FileText,
  UserCheck,
  Server,
  AlertCircle
} from 'lucide-react';

export default function PrivacyConsentPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {t('navPrivacy')}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta'
                ? 'மாணவர் தரவுப் பாதுகாப்பு மற்றும் பெற்றோர் ஒப்புதல் வழிகாட்டுதல்கள்.'
                : 'Student information protection, role-based authorization, and parental consent architecture.'}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Privacy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
            <KeyRound className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            1. Consent-Driven Family Linking
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Parents or guardians can only view a student’s shortlisted courses and assessment trends if the student explicitly generates and shares their unique 6-digit family access code. No unauthorized third party can browse student data.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            2. Cloud Firestore Security Rules
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Data security is enforced directly at the database layer via strict Firebase Security Rules. Read and write privileges to private profiles require validated authentication tokens and explicit link verification.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            3. Strict Role Separation
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Public user registration only provides Student or Parent accounts. Administrator capabilities (course catalog modifications and global analytics) are guarded by server-enforced claims and administrator credentials.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            4. Zero Secret Exposure
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            AI API credentials and cloud functions execute securely on the server-side. Sensitive student demographic fields are never monetized or exposed to commercial marketing networks.
          </p>
        </div>
      </div>

      {/* Advisory Statement */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-xs leading-relaxed flex items-start gap-2 border border-slate-200 dark:border-slate-700">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          Students may revoke family access links or update their data sharing preferences at any time through their Profile Settings.
        </p>
      </div>
    </div>
  );
}
