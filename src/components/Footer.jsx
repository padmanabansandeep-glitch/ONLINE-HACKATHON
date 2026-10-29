import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Compass, Heart, Shield, Award, CheckCircle } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const { language, t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md py-12 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl gradient-banner flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                VISTA <span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {language === 'ta'
                ? 'மாணவர்கள் மற்றும் குடும்பங்கள் தொழிற்கல்வி, ஐடிஐ மற்றும் திறன் படிப்புகளை தேர்வு செய்ய உதவும் AI வழிகாட்டி தளம்.'
                : 'AI-enabled career counselling and family decision-support platform dedicated to vocational and technical education.'}
            </p>
            <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'அங்கீகரிக்கப்பட்ட பாடத்திட்ட தரவுகள்' : 'Aligned with NSDC & DGT Guidelines'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              {language === 'ta' ? 'தள வழிசெலுத்தல்' : 'Platform Modules'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => setActiveTab('assessment')} className="hover:text-brand-600 transition-colors">
                  {t('navAssessment')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-brand-600 transition-colors">
                  {t('navCourses')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compare')} className="hover:text-brand-600 transition-colors">
                  {t('navCompare')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('family')} className="hover:text-brand-600 transition-colors">
                  {t('navFamily')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('chatbot')} className="hover:text-brand-600 transition-colors">
                  {t('navChatbot')}
                </button>
              </li>
            </ul>
          </div>

          {/* Vocational Sectors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              {language === 'ta' ? 'தொழில் துறைகள்' : 'Vocational Fields'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>Information Technology & Hardware</li>
              <li>Electrician & Industrial Power</li>
              <li>EV & Automotive Technology</li>
              <li>General Duty Healthcare Support</li>
              <li>Smart Agriculture & Hydroponics</li>
              <li>Financial Accounting & GST</li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              {language === 'ta' ? 'தனியுரிமை & வெளிப்படைத்தன்மை' : 'Trust & Compliance'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              {language === 'ta'
                ? 'அனைத்து மாணவர் சுயவிவரங்களும் பெற்றோரின் நேரடி ஒப்புதல் மற்றும் குறியீடு அடிப்படையிலேயே பகிரப்படுகின்றன.'
                : 'Student information is protected with role-based access. Family data is accessible strictly through mutual consent codes.'}
            </p>
            <button
              onClick={() => setActiveTab('privacy')}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              {t('navPrivacy')} &rarr;
            </button>
          </div>
        </div>

        {/* Disclaimer Notice & Copyright */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 dark:text-slate-500">
          <p>
            © {new Date().getFullYear()} VISTA AI. Developed for Vocational Education & Family Career Guidance.
          </p>
          <p className="text-center sm:text-right max-w-lg">
            {language === 'ta'
              ? 'குறிப்பு: இந்த தளம் கல்வி மற்றும் தொழில் வழிகாட்டுதலுக்கானது. இறுதி சேர்க்கை விவரங்களை அங்கீகரிக்கப்பட்ட கல்லூரிகளில் உறுதி செய்யவும்.'
              : 'Notice: Recommendations are decision-support guidance, not guaranteed admission or salary endorsements.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
