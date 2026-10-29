import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  User,
  GraduationCap,
  Briefcase,
  IndianRupee,
  MapPin,
  Clock,
  Heart,
  Wrench,
  CheckCircle,
  Save,
  Globe
} from 'lucide-react';

export default function StudentProfilePage({ onProfileUpdated }) {
  const { studentProfile, setStudentProfile } = useAuth();
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({ ...studentProfile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBudgetChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      maxBudget: Number(e.target.value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudentProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    if (onProfileUpdated) onProfileUpdated();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {t('navProfile')}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta'
                ? 'உங்கள் கல்வித் தகுதி, ஆர்வம் மற்றும் குடும்ப பட்ஜெட்டை புதுப்பிக்கவும்.'
                : 'Keep your educational background and budget preferences up to date to get tailored course matches.'}
            </p>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs font-semibold animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>{language === 'ta' ? 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!' : 'Profile details updated and saved successfully!'}</span>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Personal & Education */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-brand-500" />
            <span>Academic Background</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Age Group
              </label>
              <select
                name="ageGroup"
                value={formData.ageGroup || '16-18'}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Under 16">Under 16</option>
                <option value="16-18">16 - 18 Years (Post 10th/12th)</option>
                <option value="19-21">19 - 21 Years (Post Diploma/College)</option>
                <option value="22+">22+ Years (Career Shift / Reskilling)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Current Educational Qualification
              </label>
              <select
                name="qualification"
                value={formData.qualification || '12th'}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="10th">Class 10 Pass (SSLC)</option>
                <option value="12th">Class 12 Pass (HSC)</option>
                <option value="ITI">ITI Certified</option>
                <option value="Diploma">Polytechnic Diploma</option>
                <option value="Graduate">Undergraduate / College</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Academic Stream / Group
              </label>
              <input
                type="text"
                name="stream"
                value={formData.stream || ''}
                onChange={handleChange}
                placeholder="e.g., Science (Maths), Commerce, Vocational"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Marks / Percentage Range
              </label>
              <select
                name="gradeRange"
                value={formData.gradeRange || '75% - 85%'}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Above 85%">Distinction (Above 85%)</option>
                <option value="75% - 85%">First Class (75% - 85%)</option>
                <option value="60% - 75%">Second Class (60% - 75%)</option>
                <option value="50% - 60%">Pass (50% - 60%)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Preferred Study Language
              </label>
              <select
                name="languagePreference"
                value={formData.languagePreference || 'en'}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="en">English Medium</option>
                <option value="ta">Tamil Medium (தமிழ்)</option>
                <option value="bilingual">Bilingual (English + Tamil)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Budget & Preferences */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-500" />
            <span>Budget & Learning Preferences</span>
          </h3>

          <div className="space-y-4">
            {/* Budget Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Maximum Course Fee Budget (₹)
                </label>
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                  ₹{Number(formData.maxBudget || 25000).toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="3000"
                max="50000"
                step="1000"
                value={formData.maxBudget || 25000}
                onChange={handleBudgetChange}
                className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹3,000 (Govt Subsidized)</span>
                <span>₹25,000</span>
                <span>₹50,000 (Private Bootcamps)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Preferred Course Duration
                </label>
                <select
                  name="durationPreference"
                  value={formData.durationPreference || 'all'}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="all">Any Duration</option>
                  <option value="short">Short-term Fast Track (3 - 6 Months)</option>
                  <option value="medium">Standard Vocational (6 - 12 Months)</option>
                  <option value="diploma">Full ITI / Polytechnic Diploma (1 - 2 Years)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Preferred Work Environment
                </label>
                <select
                  name="workEnvironment"
                  value={formData.workEnvironment || 'hybrid'}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="office">Indoor Computer / Desk Office</option>
                  <option value="workshop">Industrial Workshop & Machine Lab</option>
                  <option value="field">Field Work, Outdoors & Rooftop Installation</option>
                  <option value="clinic">Clinical Ward & Hospital Support</option>
                  <option value="hybrid">Flexible Hybrid (Desk + Field)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Career Aspirations / Future Goals
                </label>
                <textarea
                  name="careerGoal"
                  rows={2}
                  value={formData.careerGoal || ''}
                  onChange={handleChange}
                  placeholder="e.g., I want to become a full stack developer or certified technician and start my own service center."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Preferred Study Location in Tamil Nadu
                </label>
                <input
                  type="text"
                  name="studyLocation"
                  value={formData.studyLocation || ''}
                  onChange={handleChange}
                  placeholder="e.g., Chennai, Coimbatore, Madurai, Trichy, Salem, or Online"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-violet-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{t('save')}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
