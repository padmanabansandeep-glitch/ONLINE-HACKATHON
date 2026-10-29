import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCourses } from '../data/coursesData';
import { calculateCourseRecommendations } from '../services/recommendationEngine';

const AuthContext = createContext();

// Sample Initial Student Profile
const defaultStudentProfile = {
  name: "Ananya Sharma",
  nameTa: "அன்பு செல்வன்",
  ageGroup: "16-18",
  qualification: "12th",
  stream: "Science (Maths & Physics)",
  gradeRange: "75% - 85%",
  favouriteSubjects: ["Physics", "Computer Science", "Mechanics"],
  interests: ["Software & Web", "Hardware Troubleshooting", "Renewable Energy"],
  skills: ["Basic Python", "PC Assembly", "Circuit Reading"],
  workEnvironment: "hybrid", // workshop, lab, office, field, hybrid
  careerGoal: "Become a qualified technician / developer and build a sustainable career",
  studyLocation: "Chennai / Coimbatore / Hybrid",
  maxBudget: 25000,
  durationPreference: "medium", // short, medium, diploma, all
  languagePreference: "en",
  familyLinkCode: "VISTA-7294",
  familyLinked: true,
  linkedParentName: "Ramesh Sharma",
};

// Initial assessment scores
const defaultDomainScores = {
  tech: 85,
  electronics: 78,
  automobile: 62,
  creative: 65,
  healthcare: 40,
  agriculture: 45,
  business: 55,
};

// Initial Roadmap milestones
const defaultRoadmapMilestones = [
  { id: 1, titleEn: "Learn HTML5, CSS3, Modern Tailwind & Responsive Layouts", titleTa: "HTML5, CSS3 மற்றும் நவீன Tailwind தள அமைப்புகள் கற்றல்", completed: true },
  { id: 2, titleEn: "Master JavaScript (ES6+), DOM, and API fetching", titleTa: "ஜாவாஸ்கிரிப்ட் மற்றும் ஏபிஐ தரவு மேலாண்மை", completed: true },
  { id: 3, titleEn: "Build 3 Real-World Portfolio Projects & Host on GitHub", titleTa: "3 செய்முறை திட்டங்கள் உருவாக்கி கிட்ஹப்பில் பதிவேற்றுதல்", completed: false },
  { id: 4, titleEn: "Earn NCVT / NASSCOM Industry Recognized Skill Certificate", titleTa: "அங்கீகரிக்கப்பட்ட தொழில் திறன் சான்றிதழ் பெறுதல்", completed: false },
  { id: 5, titleEn: "Complete a 3-Month Industry Internship or Apprenticeship", titleTa: "3 மாத தொழிற்சாலை பயிற்சி (Apprenticeship) நிறைவு செய்தல்", completed: false },
  { id: 6, titleEn: "Prepare Technical Resume, Mock Interviews & Apply for Junior Roles", titleTa: "தொழில்முறை ரெஸ்யூம் மற்றும் நேர்காணல் தயாரிப்பு", completed: false },
];

// Initial Family Discussions
const defaultFamilyDiscussions = [
  {
    id: "disc-1",
    courseId: "course-c13",
    courseTitle: "Computer Applications & Software (IT)",
    studentNote: "I really like this course because I enjoy computer software, office productivity, and programming fundamentals.",
    parentNote: "The ₹10,000 to ₹25,000 fee is well within our budget. I want to ensure there is active job placement assistance.",
    studentSupport: "Strongly Support",
    parentSupport: "Supportive with Discussion",
    date: "Yesterday at 4:30 PM",
    comments: [
      { sender: "parent", text: "Is the training online or classroom in Guindy?", time: "Yesterday 4:45 PM" },
      { sender: "student", text: "It has a hybrid option with weekend classroom labs at TNSDC center.", time: "Yesterday 5:10 PM" }
    ]
  },
  {
    id: "disc-2",
    courseId: "course-c01",
    courseTitle: "Graphic Design & UI/UX (Creative & Design)",
    studentNote: "A good second choice because I know how to work with Photoshop and Figma creative interfaces.",
    parentNote: "Very practical trade. Design and multimedia jobs exist in every media agency and IT company.",
    studentSupport: "Interested",
    parentSupport: "Strongly Support",
    date: "2 days ago",
    comments: []
  }
];

export function AuthProvider({ children }) {
  // Current logged in user
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('vista_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return null;
  });

  // Course repository - strictly 19 courses from 1_courses.csv (C01 - C19)
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('vista_courses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If cached array contains old demo courses (like course-1) or lacks code property, discard cache
        const hasLegacyDemo = parsed.some(c => c.id === 'course-1' || c.id === 'course-2' || !c.code || !c.code.startsWith('C'));
        if (!hasLegacyDemo && Array.isArray(parsed) && parsed.length >= initialCourses.length) {
          return parsed;
        }
      } catch (e) { /* ignore */ }
    }
    localStorage.setItem('vista_courses', JSON.stringify(initialCourses));
    return initialCourses;
  });

  // Student Profile
  const [studentProfile, setStudentProfile] = useState(() => {
    const saved = localStorage.getItem('vista_student_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return defaultStudentProfile;
  });

  // Domain Assessment Scores
  const [domainScores, setDomainScores] = useState(() => {
    const saved = localStorage.getItem('vista_assessment_scores');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return defaultDomainScores;
  });

  // Shortlisted / Saved Course IDs (strictly C01 - C19)
  const [savedCourseIds, setSavedCourseIds] = useState(() => {
    const saved = localStorage.getItem('vista_saved_courses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(id => id.startsWith('course-c'))) {
          return parsed;
        }
      } catch (e) { /* ignore */ }
    }
    return ["course-c01", "course-c07", "course-c10"];
  });

  // Compare Courses (Max 4, strictly C01 - C19)
  const [compareCourseIds, setCompareCourseIds] = useState(() => {
    const saved = localStorage.getItem('vista_compare_courses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(id => id.startsWith('course-c'))) {
          return parsed;
        }
      } catch (e) { /* ignore */ }
    }
    return ["course-c01", "course-c07", "course-c10"];
  });

  // Career Roadmap
  const [selectedRoadmapCareer, setSelectedRoadmapCareer] = useState(() => {
    const saved = localStorage.getItem('vista_roadmap_career');
    if (saved && !saved.includes('Full Stack')) {
      return saved;
    }
    return "Computer Applications & Software Specialist (C13)";
  });

  const [roadmapMilestones, setRoadmapMilestones] = useState(() => {
    const saved = localStorage.getItem('vista_roadmap_milestones');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return defaultRoadmapMilestones;
  });

  // Family Discussions
  const [familyDiscussions, setFamilyDiscussions] = useState(() => {
    const saved = localStorage.getItem('vista_discussions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return defaultFamilyDiscussions;
  });

  // Decision Status
  const [finalDecisionStatus, setFinalDecisionStatus] = useState(() => {
    return localStorage.getItem('vista_decision_status') || "Under Family Discussion";
  });

  // User Feedbacks
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem('vista_feedbacks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      { id: 1, name: "Kavitha R.", role: "Parent", rating: 5, comment: "Comparing course fees side by side helped our family choose an ITI electrician course without taking any loan. Thank you!", date: "24 Oct 2026" },
      { id: 2, name: "Suresh Kumar", role: "Student", rating: 5, comment: "The Tamil chatbot explained the difference between diploma and ITI very simply. Now pursuing web development.", date: "25 Oct 2026" },
    ];
  });

  // Sync state to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('vista_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('vista_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('vista_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('vista_student_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    localStorage.setItem('vista_assessment_scores', JSON.stringify(domainScores));
  }, [domainScores]);

  useEffect(() => {
    localStorage.setItem('vista_saved_courses', JSON.stringify(savedCourseIds));
  }, [savedCourseIds]);

  useEffect(() => {
    localStorage.setItem('vista_compare_courses', JSON.stringify(compareCourseIds));
  }, [compareCourseIds]);

  useEffect(() => {
    localStorage.setItem('vista_roadmap_milestones', JSON.stringify(roadmapMilestones));
  }, [roadmapMilestones]);

  useEffect(() => {
    localStorage.setItem('vista_roadmap_career', selectedRoadmapCareer);
  }, [selectedRoadmapCareer]);

  useEffect(() => {
    localStorage.setItem('vista_discussions', JSON.stringify(familyDiscussions));
  }, [familyDiscussions]);

  useEffect(() => {
    localStorage.setItem('vista_decision_status', finalDecisionStatus);
  }, [finalDecisionStatus]);

  useEffect(() => {
    localStorage.setItem('vista_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  // Auth Methods
  const login = (email, password, roleHint = 'student') => {
    // In demo/production-ready hybrid, accept test login or create user object
    const role = email.includes('admin') ? 'admin' : (email.includes('parent') ? 'parent' : (roleHint || 'student'));
    const userObj = {
      uid: `user-${Date.now()}`,
      email,
      displayName: role === 'admin' ? 'Admin Controller' : (role === 'parent' ? 'Ramesh Sharma (Parent)' : 'Ananya Sharma'),
      role,
      photoURL: role === 'admin' 
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
        : (role === 'parent' 
            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80')
    };
    setCurrentUser(userObj);
    return userObj;
  };

  const register = (name, email, password, role = 'student') => {
    // Prevent registering as admin
    const safeRole = role === 'admin' ? 'student' : role;
    const userObj = {
      uid: `user-${Date.now()}`,
      email,
      displayName: name,
      role: safeRole,
      photoURL: safeRole === 'parent'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    setCurrentUser(userObj);
    return userObj;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Instant Demo Switcher for fast evaluation
  const switchRole = (newRole) => {
    if (newRole === 'admin') {
      setCurrentUser({
        uid: "admin-master-01",
        email: "director.admin@vista.gov.in",
        displayName: "Director / Admin Console",
        role: "admin",
        photoURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      });
    } else if (newRole === 'parent') {
      setCurrentUser({
        uid: "parent-ramesh-01",
        email: "ramesh.parent@vista.edu",
        displayName: "Ramesh Sharma (Parent)",
        role: "parent",
        photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      });
    } else {
      setCurrentUser({
        uid: "student-ananya-01",
        email: "ananya.student@vista.edu",
        displayName: "Ananya Sharma",
        role: "student",
        photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      });
    }
  };

  // Course actions
  const toggleSaveCourse = (courseId) => {
    setSavedCourseIds((prev) => {
      if (prev.includes(courseId)) {
        return prev.filter((id) => id !== courseId);
      }
      return [...prev, courseId];
    });
  };

  const toggleCompareCourse = (courseId) => {
    setCompareCourseIds((prev) => {
      if (prev.includes(courseId)) {
        return prev.filter((id) => id !== courseId);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 courses at a time.");
        return prev;
      }
      return [...prev, courseId];
    });
  };

  const toggleMilestone = (milestoneId) => {
    setRoadmapMilestones((prev) =>
      prev.map((m) => (m.id === milestoneId ? { ...m, completed: !m.completed } : m))
    );
  };

  // Admin Catalog operations
  const addCourse = (newCourse) => {
    const courseWithId = {
      ...newCourse,
      id: `course-${Date.now()}`,
      rating: 4.8,
      featured: false,
    };
    setCourses((prev) => [courseWithId, ...prev]);
    return courseWithId;
  };

  const addMultipleCourses = (newCourses) => {
    const coursesWithIds = newCourses.map((c, idx) => ({
      ...c,
      id: c.id || `course-${Date.now()}-${idx}`,
      rating: c.rating || 4.7,
      featured: false,
    }));
    setCourses((prev) => [...coursesWithIds, ...prev]);
    return coursesWithIds;
  };

  const updateCourse = (courseId, updatedFields) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, ...updatedFields } : c))
    );
  };

  const deleteCourse = (courseId) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    setSavedCourseIds((prev) => prev.filter((id) => id !== courseId));
    setCompareCourseIds((prev) => prev.filter((id) => id !== courseId));
  };

  // Family linking
  const linkParentWithCode = (code) => {
    if (code.trim().toUpperCase() === studentProfile.familyLinkCode.toUpperCase()) {
      setStudentProfile((prev) => ({
        ...prev,
        familyLinked: true,
      }));
      return true;
    }
    return false;
  };

  const addDiscussionComment = (discussionId, commentText, sender = 'student') => {
    setFamilyDiscussions((prev) =>
      prev.map((d) => {
        if (d.id === discussionId) {
          const newComments = [
            ...(d.comments || []),
            { sender, text: commentText, time: 'Just now' }
          ];
          return { ...d, comments: newComments };
        }
        return d;
      })
    );
  };

  // Calculated course recommendations with scores
  const recommendedCourses = calculateCourseRecommendations(courses, studentProfile, domainScores);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        switchRole,
        studentProfile,
        setStudentProfile,
        domainScores,
        setDomainScores,
        courses,
        recommendedCourses,
        savedCourseIds,
        toggleSaveCourse,
        compareCourseIds,
        toggleCompareCourse,
        selectedRoadmapCareer,
        setSelectedRoadmapCareer,
        roadmapMilestones,
        toggleMilestone,
        familyDiscussions,
        addDiscussionComment,
        finalDecisionStatus,
        setFinalDecisionStatus,
        feedbacks,
        setFeedbacks,
        addCourse,
        addMultipleCourses,
        updateCourse,
        deleteCourse,
        linkParentWithCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
