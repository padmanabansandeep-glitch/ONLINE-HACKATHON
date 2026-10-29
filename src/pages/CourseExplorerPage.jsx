import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import CourseCard from '../components/CourseCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Scale,
  Sparkles,
  BookOpen,
  IndianRupee,
  GraduationCap,
  Clock,
  RotateCcw
} from 'lucide-react';

export default function CourseExplorerPage({ setActiveTab, onSelectCourse }) {
  const { recommendedCourses, compareCourseIds } = useAuth();
  const { language, t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEligibility, setSelectedEligibility] = useState('all');
  const [maxBudgetFilter, setMaxBudgetFilter] = useState(40000);
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance' | 'feeAsc' | 'durationAsc'

  // Categories list
  const categories = useMemo(() => {
    const set = new Set();
    recommendedCourses.forEach((c) => set.add(c.category));
    return Array.from(set);
  }, [recommendedCourses]);

  // Filtering & Sorting logic
  const filteredCourses = useMemo(() => {
    return recommendedCourses.filter((course) => {
      // 1. Search Query
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const titleMatch = (course.title || '').toLowerCase().includes(query) ||
                           (course.titleTa || '').toLowerCase().includes(query);
        const skillMatch = (course.skillsGained || []).some(s => s.toLowerCase().includes(query));
        const roleMatch = (course.potentialRoles || []).some(r => r.toLowerCase().includes(query));
        if (!titleMatch && !skillMatch && !roleMatch) return false;
      }

      // 2. Category
      if (selectedCategory !== 'all' && course.category !== selectedCategory) {
        return false;
      }

      // 3. Eligibility
      if (selectedEligibility !== 'all') {
        if (selectedEligibility === '10th' && course.minQualificationLevel !== '10th') {
          return false;
        }
        if (selectedEligibility === '12th' && course.minQualificationLevel === 'Graduate') {
          return false;
        }
      }

      // 4. Budget
      if (course.feeMin > maxBudgetFilter) {
        return false;
      }

      // 5. Duration
      if (selectedDuration === 'short' && course.durationMonths > 5) return false;
      if (selectedDuration === 'medium' && (course.durationMonths <= 5 || course.durationMonths > 11)) return false;
      if (selectedDuration === 'long' && course.durationMonths < 12) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'feeAsc') return a.feeMin - b.feeMin;
      if (sortBy === 'durationAsc') return a.durationMonths - b.durationMonths;
      return (b.matchScore || 0) - (a.matchScore || 0);
    });
  }, [recommendedCourses, searchQuery, selectedCategory, selectedEligibility, maxBudgetFilter, selectedDuration, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedEligibility('all');
    setMaxBudgetFilter(40000);
    setSelectedDuration('all');
    setSortBy('relevance');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                {language === 'ta' ? 'அனைத்து தொழிற்கல்வி படிப்புகள்' : 'Curated Vocational Catalog'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t('navCourses')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {language === 'ta'
                ? 'அரசு மற்றும் தொழில் துறை அங்கீகாரம் பெற்ற தொழில்நுட்ப படிப்புகளை ஆராயுங்கள்.'
                : 'Explore accredited short-term certificates, ITI trades, and skill development diplomas.'}
            </p>
          </div>

          {/* Quick shortcut to comparison page */}
          <button
            onClick={() => setActiveTab('compare')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-card border border-brand-200 dark:border-brand-800 text-xs font-bold text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-950/60 shadow-sm transition-all self-start sm:self-auto"
          >
            <Scale className="w-4 h-4 text-brand-500" />
            <span>{t('navCompare')}</span>
            <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-[11px] font-extrabold flex items-center justify-center">
              {compareCourseIds.length}
            </span>
          </button>
        </div>

        {/* Search Input */}
        <div className="mt-6 relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Filter and Sorting Bar */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Category Filter */}
          <div>
            <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
              {t('filterCategory')}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">{t('allCategories')}</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Eligibility Filter */}
          <div>
            <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
              {t('filterEligibility')}
            </label>
            <select
              value={selectedEligibility}
              onChange={(e) => setSelectedEligibility(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">{t('allEligibilities')}</option>
              <option value="10th">Class 10 Pass Eligible</option>
              <option value="12th">Class 12 Pass Eligible</option>
            </select>
          </div>

          {/* Duration Filter */}
          <div>
            <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
              {t('filterDuration')}
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">Any Duration</option>
              <option value="short">Short-term (1-5 Months)</option>
              <option value="medium">Mid-term (6-11 Months)</option>
              <option value="long">1 - 2 Years (Full Diploma)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="relevance">Highest Match Score</option>
              <option value="feeAsc">Fee: Low to High</option>
              <option value="durationAsc">Duration: Shortest First</option>
            </select>
          </div>
        </div>

        {/* Budget Slider & Reset */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              <span>{t('filterBudget')}:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                ₹{maxBudgetFilter.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="40000"
              step="1000"
              value={maxBudgetFilter}
              onChange={(e) => setMaxBudgetFilter(Number(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Showing <strong>{filteredCourses.length}</strong> courses
            </span>
            <button
              onClick={resetFilters}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelectCourse={onSelectCourse}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-md mx-auto space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No courses match your filter criteria
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try adjusting your maximum fee budget or clearing category filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
