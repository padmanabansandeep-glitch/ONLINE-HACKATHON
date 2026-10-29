import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CourseModal from './components/CourseModal';
import AnimatedBackground from './components/AnimatedBackground';

// Pages
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import AssessmentPage from './pages/AssessmentPage';
import AssessmentResultsPage from './pages/AssessmentResultsPage';
import CourseExplorerPage from './pages/CourseExplorerPage';
import CourseComparisonPage from './pages/CourseComparisonPage';
import FamilyDecisionDashboard from './pages/FamilyDecisionDashboard';
import CareerRoadmapPage from './pages/CareerRoadmapPage';
import ChatbotPage from './pages/ChatbotPage';
import StudentProfilePage from './pages/StudentProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyConsentPage from './pages/PrivacyConsentPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function MainApp() {
  const { currentUser, setSelectedRoadmapCareer } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState(() => (currentUser ? 'dashboard' : 'login'));
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);

  // If user is not logged in, enforce login page (or register page if selected)
  useEffect(() => {
    if (!currentUser && activeTab !== 'register' && activeTab !== 'login') {
      setActiveTab('login');
    }
  }, [currentUser, activeTab]);

  const handleSelectCourse = (course) => {
    setSelectedCourseModal(course);
  };

  const handleSetRoadmap = (careerTitle) => {
    setSelectedRoadmapCareer(careerTitle);
    setActiveTab('roadmap');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'dashboard':
        return (
          <StudentDashboard
            setActiveTab={setActiveTab}
            onSelectCourse={handleSelectCourse}
          />
        );
      case 'parentDashboard':
        return (
          <ParentDashboard
            setActiveTab={setActiveTab}
            onSelectCourse={handleSelectCourse}
          />
        );
      case 'assessment':
        return (
          <AssessmentPage
            onAssessmentComplete={() => setActiveTab('assessmentResults')}
          />
        );
      case 'assessmentResults':
        return (
          <AssessmentResultsPage
            setActiveTab={setActiveTab}
            onSelectCourse={handleSelectCourse}
          />
        );
      case 'courses':
        return (
          <CourseExplorerPage
            setActiveTab={setActiveTab}
            onSelectCourse={handleSelectCourse}
          />
        );
      case 'compare':
        return (
          <CourseComparisonPage
            setActiveTab={setActiveTab}
            onSelectCourse={handleSelectCourse}
          />
        );
      case 'family':
        return (
          <FamilyDecisionDashboard
            onSelectCourse={handleSelectCourse}
          />
        );
      case 'roadmap':
        return <CareerRoadmapPage setActiveTab={setActiveTab} />;
      case 'chatbot':
        return <ChatbotPage />;
      case 'profile':
        return (
          <StudentProfilePage
            onProfileUpdated={() => setActiveTab('dashboard')}
          />
        );
      case 'admin':
        return (
          <AdminDashboard
            onSelectCourse={handleSelectCourse}
          />
        );
      case 'privacy':
        return <PrivacyConsentPage />;
      case 'login':
        return <LoginPage setActiveTab={setActiveTab} />;
      case 'register':
        return <RegisterPage setActiveTab={setActiveTab} />;
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Container with Collapsible Sidebar (on non-landing views) */}
        <div className="flex-1 flex w-full">
          {currentUser && activeTab !== 'landing' && activeTab !== 'login' && activeTab !== 'register' && (
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          )}

          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
            {renderActiveTab()}
          </main>
        </div>

        {/* Modal for Course Details */}
        {selectedCourseModal && (
          <CourseModal
            course={selectedCourseModal}
            onClose={() => setSelectedCourseModal(null)}
            onSetRoadmap={handleSetRoadmap}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
