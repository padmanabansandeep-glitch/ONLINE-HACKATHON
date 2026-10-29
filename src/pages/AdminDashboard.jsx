import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldAlert,
  BookOpen,
  Plus,
  Trash2,
  Edit,
  TrendingUp,
  MessageSquare,
  Users,
  CheckCircle,
  IndianRupee,
  Sparkles,
  X,
  Save,
  Star,
  FileUp,
  FileDown,
  Download,
  AlertCircle,
  Database,
  Search,
  FileText
} from 'lucide-react';
import {
  CSV_COURSES,
  CSV_QUESTIONS,
  CSV_ANSWER_MAPPINGS,
  CSV_STUDENT_ANALYTICS,
  CSV_BENCHMARK_STUDENTS
} from '../data/csvDataset';

export default function AdminDashboard({ onSelectCourse }) {
  const {
    currentUser,
    courses,
    addCourse,
    addMultipleCourses,
    updateCourse,
    deleteCourse,
    feedbacks
  } = useAuth();
  const { language, t } = useLanguage();

  const [activeTab, setActiveAdminTab] = useState('courses'); // 'courses' | 'analytics' | 'feedback' | 'csv_datasets'
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const csvFileRef = useRef(null);

  // CSV Datasets Viewer state
  const [csvActiveFile, setCsvActiveFile] = useState('1_courses');
  const [csvSearchQuery, setCsvSearchQuery] = useState('');

  // New course form
  const [formData, setFormData] = useState({
    title: '',
    titleTa: '',
    category: 'Information Technology',
    categoryTa: 'தகவல் தொழில்நுட்பம்',
    categoryKey: 'tech',
    eligibility: 'Class 10 or 12 Pass',
    eligibilityTa: '10-ஆம் அல்லது 12-ஆம் வகுப்பு தேர்ச்சி',
    minQualificationLevel: '10th',
    duration: '6 Months',
    durationTa: '6 மாதங்கள்',
    durationMonths: 6,
    feeMin: 8000,
    feeMax: 20000,
    feeFormatted: '₹8,000 - ₹20,000',
    source: 'NSDC / TNSDC Accredited',
    verifiedInstitute: 'Govt ITI & Vocational Hubs',
    location: 'Statewide Across Tamil Nadu',
    overview: '',
    overviewTa: '',
    skillsGained: ['Technical Assembly', 'System Diagnosis', 'Quality Inspection'],
    potentialRoles: ['Junior Technician', 'Field Associate']
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCourse = (e) => {
    e.preventDefault();
    if (editingCourse) {
      updateCourse(editingCourse.id, formData);
      setEditingCourse(null);
    } else {
      addCourse(formData);
    }
    setShowAddModal(false);
    // Reset form
    setFormData({
      title: '',
      titleTa: '',
      category: 'Information Technology',
      categoryTa: 'தகவல் தொழில்நுட்பம்',
      categoryKey: 'tech',
      eligibility: 'Class 10 or 12 Pass',
      eligibilityTa: '10-ஆம் அல்லது 12-ஆம் வகுப்பு தேர்ச்சி',
      minQualificationLevel: '10th',
      duration: '6 Months',
      durationTa: '6 மாதங்கள்',
      durationMonths: 6,
      feeMin: 8000,
      feeMax: 20000,
      feeFormatted: '₹8,000 - ₹20,000',
      source: 'NSDC / TNSDC Accredited',
      verifiedInstitute: 'Govt ITI & Vocational Hubs',
      location: 'Statewide Across Tamil Nadu',
      overview: '',
      overviewTa: '',
      skillsGained: ['Technical Assembly', 'System Diagnosis'],
      potentialRoles: ['Junior Technician']
    });
  };

  const startEdit = (course) => {
    setEditingCourse(course);
    setFormData({ ...course });
    setShowAddModal(true);
  };

  // CSV Import Parser
  const handleCSVUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setImportStatus({ type: 'error', text: 'Please select a valid .csv spreadsheet file.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (!text || typeof text !== 'string') {
          setImportStatus({ type: 'error', text: 'The selected CSV file appears to be empty.' });
          return;
        }

        const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
        if (lines.length < 2) {
          setImportStatus({ type: 'error', text: 'CSV must contain a header row and at least one course data row.' });
          return;
        }

        // CSV line parser respecting quotation marks
        const parseRow = (row) => {
          const cells = [];
          let current = '';
          let inQuotes = false;
          for (let i = 0; i < row.length; i++) {
            const char = row[i];
            if (char === '"' || char === "'") {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              cells.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          cells.push(current.trim());
          return cells.map((c) => c.replace(/^["']|["']$/g, '').trim());
        };

        const headers = parseRow(lines[0]).map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
        const newCourses = [];

        for (let i = 1; i < lines.length; i++) {
          const values = parseRow(lines[i]);
          if (values.length < 2 || !values[0]) continue;

          const row = {};
          headers.forEach((h, idx) => {
            row[h] = values[idx] || '';
          });

          const title = row.title || row.coursename || values[0];
          if (!title) continue;

          const category = row.category || row.sector || 'Vocational Skills';
          const eligibility = row.eligibility || 'Class 10 or 12 Pass';
          const duration = row.duration || '6 Months';
          const feeMin = parseInt(row.feemin || row.minfee || row.fee || '8000', 10) || 8000;
          const feeMax = parseInt(row.feemax || row.maxfee || '20000', 10) || 20000;
          const feeFormatted = `₹${feeMin.toLocaleString()} - ₹${feeMax.toLocaleString()}`;
          const overview = row.overview || row.description || `${title} vocational curriculum.`;

          const rawSkills = row.skills || row.skillsgained || 'Practical Assembly, Troubleshooting';
          const skillsGained = rawSkills.includes(';')
            ? rawSkills.split(';').map((s) => s.trim())
            : rawSkills.split(',').map((s) => s.trim());

          const rawRoles = row.roles || row.potentialroles || 'Technician, Specialist';
          const potentialRoles = rawRoles.includes(';')
            ? rawRoles.split(';').map((r) => r.trim())
            : rawRoles.split(',').map((r) => r.trim());

          newCourses.push({
            title,
            titleTa: row.titleta || '',
            category,
            categoryTa: row.categoryta || '',
            categoryKey: category.toLowerCase().includes('tech') || category.toLowerCase().includes('soft')
              ? 'tech'
              : (category.toLowerCase().includes('electr')
                  ? 'electronics'
                  : (category.toLowerCase().includes('auto') ? 'automobile' : 'creative')),
            eligibility,
            eligibilityTa: row.eligibilityta || '',
            minQualificationLevel: eligibility.includes('10') ? '10th' : '12th',
            duration,
            durationTa: row.durationta || '',
            durationMonths: parseInt(duration, 10) || 6,
            feeMin,
            feeMax,
            feeFormatted,
            source: row.source || 'NSDC / Accredited Training Partner',
            verifiedInstitute: row.institute || 'Government ITI & Vocational Hubs',
            location: row.location || 'Statewide Across Tamil Nadu',
            overview,
            overviewTa: row.overviewta || '',
            skillsGained,
            potentialRoles,
          });
        }

        if (newCourses.length === 0) {
          setImportStatus({ type: 'error', text: 'Could not extract valid course rows. Please verify your column headers.' });
          return;
        }

        addMultipleCourses(newCourses);
        setImportStatus({
          type: 'success',
          text: `Success! Imported ${newCourses.length} course(s) from "${file.name}" into VISTA catalog.`
        });
        if (csvFileRef.current) csvFileRef.current.value = '';
      } catch (err) {
        setImportStatus({ type: 'error', text: `Failed to parse CSV: ${err.message}` });
      }
    };
    reader.readAsText(file);
  };

  // Download Sample CSV
  const handleDownloadSampleCSV = () => {
    const csvContent =
      `Title,Category,Eligibility,Duration,FeeMin,FeeMax,Location,Source,Overview,Skills,PotentialRoles\n` +
      `"Solar PV Installation & Maintenance","Electrical & Renewable Energy","Class 10 Pass","6 Months",10000,22000,"Tamil Nadu","TNSDC Accredited","Hands-on solar panel wiring, inverters and rooftop installations.","Rooftop Survey;Inverter Wiring;Earthing Setup","Solar Installation Tech;Maintenance Lead"\n` +
      `"EV Two-Wheeler Service Specialist","Automobile & EV","Class 10 or 12 Pass","6 Months",12000,25000,"Chennai / Coimbatore","DGT Accredited","Battery pack diagnosis and motor controller maintenance for electric vehicles.","Lithium Battery Inspection;Motor Servicing","EV Service Tech;Diagnostic Lead"\n` +
      `"Data Entry & Office Automation","Information Technology","Class 10 Pass","3 Months",5000,12000,"Statewide Across TN","NSDC Accredited","Computer fundamentals, advanced MS Office, typing and database management.","Spreadsheet Modelling;Fast Typing;Database Entry","Office Assistant;Data Entry Operator"`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'vista_courses_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Catalog to CSV
  const handleExportCatalogCSV = () => {
    const headers = ["Title", "Category", "Eligibility", "Duration", "FeeMin", "FeeMax", "Location", "Source", "Overview"];
    const rows = courses.map((c) => [
      `"${(c.title || '').replace(/"/g, '""')}"`,
      `"${(c.category || '').replace(/"/g, '""')}"`,
      `"${(c.eligibility || '').replace(/"/g, '""')}"`,
      `"${(c.duration || '').replace(/"/g, '""')}"`,
      c.feeMin || 0,
      c.feeMax || 0,
      `"${(c.location || '').replace(/"/g, '""')}"`,
      `"${(c.source || '').replace(/"/g, '""')}"`,
      `"${(c.overview || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `vista_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download raw CSV files directly
  const handleDownloadCsvFile = (fileType) => {
    let content = '';
    let filename = '';
    if (fileType === '1_courses') {
      filename = '1_courses.csv';
      content = 'course_id,course_name,field,description\n' +
        CSV_COURSES.map((c) => `"${c.course_id}","${c.course_name}","${c.field}","${c.description}"`).join('\n');
    } else if (fileType === '2_questions') {
      filename = '2_questions_options.csv';
      content = 'question_id,question_text,option_id,option_text\n' +
        CSV_QUESTIONS.flatMap((q) =>
          q.options.map((o) => `"${q.question_id}","${q.question_text.replace(/"/g, '""')}","${o.option_id}","${o.option_text.replace(/"/g, '""')}"`)
        ).join('\n');
    } else if (fileType === '3_mapping') {
      filename = '3_answer_course_mapping.csv';
      content = 'question_id,option_id,course_id,weight,course_name\n' +
        CSV_ANSWER_MAPPINGS.map((m) => `"${m.question_id}","${m.option_id}","${m.course_id}",${m.weight},"${m.course_name}"`).join('\n');
    } else if (fileType === '4_synthetic') {
      filename = '4_synthetic_student_responses.csv';
      content = 'student_id,Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q8,Q9,recommended_course_id,recommended_course,top_score,second_course,third_course\n' +
        CSV_BENCHMARK_STUDENTS.map(
          (s) =>
            `"${s.student_id}","${s.Q1}","${s.Q2}","${s.Q3}","${s.Q4}","${s.Q5}","${s.Q6}","${s.Q7}","${s.Q8}","${s.Q9}","${s.recommended_course_id}","${s.recommended_course}",${s.top_score},"${s.second_course}","${s.third_course}"`
        ).join('\n');
    }

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If user is not admin, show guard warning
  if (currentUser?.role !== 'admin') {
    return (
      <div className="glass-card rounded-3xl p-12 text-center max-w-lg mx-auto border border-rose-200 dark:border-rose-900 space-y-4">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Access Restricted</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          You are currently viewing as <strong>{currentUser?.role || 'student'}</strong>. Switch role to <strong>Administrator</strong> using the top role switcher in the navbar to test this module.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-rose-600/10 via-amber-600/10 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                System Administration
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t('adminTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t('adminSubtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {/* Hidden CSV file input */}
            <input
              type="file"
              ref={csvFileRef}
              accept=".csv,text/csv"
              onChange={handleCSVUpload}
              className="hidden"
            />

            {/* Import CSV Button */}
            <button
              onClick={() => csvFileRef.current?.click()}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold text-xs shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
              title="Upload and bulk-import courses from CSV"
            >
              <FileUp className="w-4 h-4 text-emerald-600" />
              <span>Import CSV</span>
            </button>

            {/* Download Template CSV */}
            <button
              onClick={handleDownloadSampleCSV}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold shadow-sm transition-all"
              title="Download a pre-formatted CSV template"
            >
              <Download className="w-3.5 h-3.5 text-brand-500" />
              <span>Sample CSV</span>
            </button>

            {/* Export Catalog to CSV */}
            <button
              onClick={handleExportCatalogCSV}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold shadow-sm transition-all"
              title="Export all current courses to a CSV spreadsheet"
            >
              <FileDown className="w-3.5 h-3.5 text-violet-500" />
              <span>Export CSV</span>
            </button>

            {/* Add Single Course Modal Button */}
            <button
              onClick={() => {
                setEditingCourse(null);
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addNewCourseBtn')}</span>
            </button>
          </div>
        </div>

        {/* CSV Import Feedback Alert */}
        {importStatus && (
          <div
            className={`mt-4 p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in ${
              importStatus.type === 'error'
                ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
            }`}
          >
            <div className="flex items-center gap-2">
              {importStatus.type === 'error' ? (
                <AlertCircle className="w-4 h-4 shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              )}
              <span>{importStatus.text}</span>
            </div>
            <button
              onClick={() => setImportStatus(null)}
              className="p-1 hover:opacity-75 transition-opacity"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setActiveAdminTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'courses'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            📚 {t('tabCourses')} ({courses.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'analytics'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            📈 {t('tabStats')}
          </button>
          <button
            onClick={() => setActiveAdminTab('feedback')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'feedback'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            ⭐ {t('tabFeedback')} ({feedbacks.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('csv_datasets')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'csv_datasets'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            📑 CSV Datasets & Benchmarks (4)
          </button>
        </div>
      </div>

      {/* Tab 1: Course Catalog Management Table */}
      {activeTab === 'courses' && (
        <div className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[11px]">
                  <th className="p-4">Course Name & Sector</th>
                  <th className="p-4">Eligibility</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Tuition Fee</th>
                  <th className="p-4">Verified Accreditation</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white">{course.title}</div>
                      <div className="text-[11px] text-slate-400">{course.category}</div>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                      {course.eligibility}
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">
                      {course.duration}
                    </td>
                    <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                      {course.feeFormatted}
                    </td>
                    <td className="p-4 text-slate-500 text-[11px]">
                      {course.source}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => startEdit(course)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit course"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(t('deleteCourseConfirm'))) {
                            deleteCourse(course.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Delete course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Analytics Overview */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500">Active Students</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">12,480</div>
            <span className="text-[10px] text-emerald-600 font-bold">+18% this month</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500">Assessments Taken</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">9,820</div>
            <span className="text-[10px] text-brand-600 font-bold">78% completion rate</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500">Family Links Created</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">4,350</div>
            <span className="text-[10px] text-violet-600 font-bold">94% consensus reached</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500">Top In-Demand Sector</span>
            <div className="text-base font-black text-slate-900 dark:text-white truncate">
              IT Support & Web Dev
            </div>
            <span className="text-[10px] text-amber-600 font-bold">Followed by Electrician & EV</span>
          </div>
        </div>
      )}

      {/* Tab 3: User Feedbacks */}
      {activeTab === 'feedback' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">{fb.name} ({fb.role})</div>
                  <div className="flex text-amber-400">
                    {'★'.repeat(fb.rating)}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  "{fb.comment}"
                </p>
                <div className="text-[10px] text-slate-400">{fb.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: CSV Datasets & Benchmarks (All 4 Files) */}
      {activeTab === 'csv_datasets' && (
        <div className="space-y-6 animate-in fade-in">
          {/* File Switcher & Search Bar */}
          <div className="glass-card rounded-3xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* File selector pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: '1_courses', label: '1_courses.csv', count: `${CSV_COURSES.length} Courses` },
                  { id: '2_questions', label: '2_questions_options.csv', count: `${CSV_QUESTIONS.length} Questions` },
                  { id: '3_mapping', label: '3_answer_course_mapping.csv', count: `${CSV_ANSWER_MAPPINGS.length} Rules` },
                  { id: '4_synthetic', label: '4_synthetic_student_responses.csv', count: `${CSV_STUDENT_ANALYTICS.totalStudents} Benchmarks` }
                ].map((file) => (
                  <button
                    key={file.id}
                    onClick={() => {
                      setCsvActiveFile(file.id);
                      setCsvSearchQuery('');
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      csvActiveFile === file.id
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 scale-[1.02]'
                        : 'bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{file.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                        csvActiveFile === file.id
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-slate-900 text-slate-500'
                      }`}
                    >
                      {file.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Action Buttons & Search */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={csvSearchQuery}
                    onChange={(e) => setCsvSearchQuery(e.target.value)}
                    placeholder="Search in this CSV..."
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 w-48 sm:w-56"
                  />
                </div>
                <button
                  onClick={() => handleDownloadCsvFile(csvActiveFile)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sub-view: 1_courses.csv */}
          {csvActiveFile === '1_courses' && (
            <div className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[11px]">
                      <th className="p-4 w-24">Course ID</th>
                      <th className="p-4">Course Name</th>
                      <th className="p-4">Vocational Sector</th>
                      <th className="p-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {CSV_COURSES.filter(
                      (c) =>
                        !csvSearchQuery ||
                        c.course_id.toLowerCase().includes(csvSearchQuery.toLowerCase()) ||
                        c.course_name.toLowerCase().includes(csvSearchQuery.toLowerCase()) ||
                        c.field.toLowerCase().includes(csvSearchQuery.toLowerCase())
                    ).map((c) => (
                      <tr key={c.course_id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-bold text-brand-600 dark:text-brand-400">
                          {c.course_id}
                        </td>
                        <td className="p-4 font-bold text-slate-900 dark:text-white">
                          {c.course_name}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {c.field}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">
                          {c.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-view: 2_questions_options.csv */}
          {csvActiveFile === '2_questions' && (
            <div className="space-y-4">
              {CSV_QUESTIONS.filter(
                (q) =>
                  !csvSearchQuery ||
                  q.question_id.toLowerCase().includes(csvSearchQuery.toLowerCase()) ||
                  q.question_text.toLowerCase().includes(csvSearchQuery.toLowerCase()) ||
                  q.options.some((o) => o.option_text.toLowerCase().includes(csvSearchQuery.toLowerCase()))
              ).map((q) => (
                <div
                  key={q.question_id}
                  className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-black bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                      {q.question_id}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {q.question_text}
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
                    {q.options.map((opt) => (
                      <div
                        key={opt.option_id}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs"
                      >
                        <span className="w-6 h-6 rounded-lg bg-brand-500 text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                          {opt.option_id}
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">
                          {opt.option_text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sub-view: 3_answer_course_mapping.csv */}
          {csvActiveFile === '3_mapping' && (
            <div className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[11px]">
                      <th className="p-4 w-28">Question</th>
                      <th className="p-4 w-24">Choice</th>
                      <th className="p-4 w-28">Course ID</th>
                      <th className="p-4 w-24">Weight</th>
                      <th className="p-4">Target Vocational Course</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {CSV_ANSWER_MAPPINGS.filter(
                      (m) =>
                        !csvSearchQuery ||
                        m.question_id.toLowerCase().includes(csvSearchQuery.toLowerCase()) ||
                        m.option_id.toLowerCase().includes(csvSearchQuery.toLowerCase()) ||
                        m.course_id.toLowerCase().includes(csvSearchQuery.toLowerCase()) ||
                        m.course_name.toLowerCase().includes(csvSearchQuery.toLowerCase())
                    ).map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                          {m.question_id}
                        </td>
                        <td className="p-4">
                          <span className="w-6 h-6 rounded-md bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold inline-flex items-center justify-center font-mono">
                            {m.option_id}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold text-rose-600 dark:text-rose-400">
                          {m.course_id}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              m.weight >= 4
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                          >
                            +{m.weight} pts
                          </span>
                        </td>
                        <td className="p-4 font-medium text-slate-900 dark:text-white">
                          {m.course_name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-view: 4_synthetic_student_responses.csv */}
          {csvActiveFile === '4_synthetic' && (
            <div className="space-y-4">
              {/* Analytics Header Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Total Benchmark Responses</div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                    {CSV_STUDENT_ANALYTICS.totalStudents.toLocaleString()}
                  </div>
                </div>
                <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Model Questions</div>
                  <div className="text-xl sm:text-2xl font-black text-brand-600 dark:text-brand-400 mt-1">
                    9 Questions
                  </div>
                </div>
                <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Vocational Trades</div>
                  <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">
                    19 Courses
                  </div>
                </div>
                <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Top Scoring Algorithm</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                    Weighted Match
                  </div>
                </div>
              </div>

              {/* Table of Responses */}
              <div className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[11px]">
                        <th className="p-4 w-24">Student ID</th>
                        <th className="p-4">Q1 - Q9 Responses</th>
                        <th className="p-4">1st Recommended Course</th>
                        <th className="p-4">Score</th>
                        <th className="p-4">2nd Choice</th>
                        <th className="p-4">3rd Choice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {CSV_BENCHMARK_STUDENTS.filter(
                        (s) =>
                          !csvSearchQuery ||
                          s.student_id.toLowerCase().includes(csvSearchQuery.toLowerCase()) ||
                          s.recommended_course.toLowerCase().includes(csvSearchQuery.toLowerCase()) ||
                          s.recommended_course_id.toLowerCase().includes(csvSearchQuery.toLowerCase())
                      ).map((s) => (
                        <tr key={s.student_id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                          <td className="p-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                            {s.student_id}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-1">
                              {['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9'].map((q) => (
                                <span
                                  key={q}
                                  className="w-5 h-5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700"
                                  title={`${q}: ${s[q]}`}
                                >
                                  {s[q]}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span className="font-mono text-[10px] text-brand-600 dark:text-brand-400 font-bold">
                                [{s.recommended_course_id}]
                              </span>
                              <span>{s.recommended_course}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                              {s.top_score} pts
                            </span>
                          </td>
                          <td className="p-4 text-slate-600 dark:text-slate-400 text-[11px]">
                            {s.second_course}
                          </td>
                          <td className="p-4 text-slate-500 dark:text-slate-400 text-[11px]">
                            {s.third_course}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="glass-card rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingCourse ? 'Edit Vocational Course' : t('addNewCourseBtn')}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Course Title (English)</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Course Title (Tamil / தமிழ்)</label>
                <input
                  type="text"
                  name="titleTa"
                  value={formData.titleTa || ''}
                  onChange={handleInputChange}
                  placeholder="எ.கா: கணினி வன்பொருள் & நெட்வொர்க்"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  >
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electrical & Energy">Electrical & Energy</option>
                    <option value="Automotive & Mechanical">Automotive & Mechanical</option>
                    <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                    <option value="Agriculture & Allied Trades">Agriculture & Allied Trades</option>
                    <option value="Business & Commerce">Business & Commerce</option>
                    <option value="Creative Arts & Media">Creative Arts & Media</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Minimum Eligibility</label>
                  <select
                    name="minQualificationLevel"
                    value={formData.minQualificationLevel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  >
                    <option value="10th">Class 10 Pass</option>
                    <option value="12th">Class 12 Pass</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Min Fee (₹)</label>
                  <input
                    type="number"
                    name="feeMin"
                    value={formData.feeMin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Max Fee (₹)</label>
                  <input
                    type="number"
                    name="feeMax"
                    value={formData.feeMax}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Fee Display Text</label>
                <input
                  type="text"
                  name="feeFormatted"
                  value={formData.feeFormatted}
                  onChange={handleInputChange}
                  placeholder="e.g. ₹8,000 - ₹18,000"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Curriculum Source / Authority</label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  placeholder="e.g. NCVT / NSDC / TNSDC"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Overview Description</label>
                <textarea
                  name="overview"
                  rows={2}
                  value={formData.overview}
                  onChange={handleInputChange}
                  placeholder="Practical training summary..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md"
                >
                  <Save className="w-3.5 h-3.5 inline mr-1" />
                  <span>{t('save')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
