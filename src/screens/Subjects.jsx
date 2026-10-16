import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Star,
} from 'lucide-react';
import BottomNav from '../components/BottomNav';

// Detailed data for subjects, matching user mockup specifically for Python Programming
const SUBJECT_DETAILS = {
  py: {
    name: 'Python Programming',
    badge: 'B.Sc AI/ML',
    progress: 60,
    completedTopics: 24,
    totalTopics: 40,
    units: [
      {
        number: '01',
        title: 'Introduction to Python',
        completedText: '5 of 6 topics completed',
        progress: 83,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '02',
        title: 'Variables and Data Types',
        completedText: '4 of 8 topics completed',
        progress: 50,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
      {
        number: '03',
        title: 'Operators',
        completedText: '3 of 6 topics completed',
        progress: 50,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
      {
        number: '04',
        title: 'Control Flow (If-Else, Loops)',
        completedText: '6 of 8 topics completed',
        progress: 75,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '05',
        title: 'Functions',
        completedText: '4 of 7 topics completed',
        progress: 57,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
      {
        number: '06',
        title: 'Lists, Tuples and Dictionaries',
        completedText: '2 of 5 topics completed',
        progress: 40,
        barColor: 'bg-[#F59E0B]',
        textColor: 'text-[#D97706]',
      },
    ],
    importantTopics: [
      'Python Functions and Arguments',
      'List Comprehension',
      'File Handling in Python',
    ],
  },
  ec: {
    name: 'English Communication',
    badge: 'B.Sc AI/ML',
    progress: 92,
    completedTopics: 28,
    totalTopics: 30,
    units: [
      {
        number: '01',
        title: 'Communication Basics & Models',
        completedText: '5 of 5 topics completed',
        progress: 100,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '02',
        title: 'Phonetics & Pronunciation',
        completedText: '6 of 6 topics completed',
        progress: 100,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '03',
        title: 'Technical & Business Writing',
        completedText: '7 of 8 topics completed',
        progress: 88,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '04',
        title: 'Reading Comprehension & Analysis',
        completedText: '5 of 5 topics completed',
        progress: 100,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '05',
        title: 'Presentation & Public Speaking',
        completedText: '3 of 4 topics completed',
        progress: 75,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '06',
        title: 'Interviews & Group Discussions',
        completedText: '2 of 2 topics completed',
        progress: 100,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
    ],
    importantTopics: [
      'Formal Letter & Email Etiquette',
      'Active vs Passive Voice in Reports',
      'Phonetic Transcription Fundamentals',
    ],
  },
  ma: {
    name: 'Mathematics',
    badge: 'B.Sc AI/ML',
    progress: 64,
    completedTopics: 23,
    totalTopics: 36,
    units: [
      {
        number: '01',
        title: 'Matrices & System of Equations',
        completedText: '6 of 6 topics completed',
        progress: 100,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '02',
        title: 'Eigenvalues & Eigenvectors',
        completedText: '4 of 6 topics completed',
        progress: 67,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
      {
        number: '03',
        title: 'Differential Calculus & Limits',
        completedText: '5 of 8 topics completed',
        progress: 62,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
      {
        number: '04',
        title: 'Vector Spaces & Subspaces',
        completedText: '4 of 6 topics completed',
        progress: 67,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
      {
        number: '05',
        title: 'Probability Distributions',
        completedText: '3 of 5 topics completed',
        progress: 60,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
      {
        number: '06',
        title: 'Discrete Relations & Graphs',
        completedText: '1 of 5 topics completed',
        progress: 20,
        barColor: 'bg-[#F59E0B]',
        textColor: 'text-[#D97706]',
      },
    ],
    importantTopics: [
      'Cayley-Hamilton Theorem Applications',
      'Cramer’s Rule & Matrix Inversion',
      'Bayes Theorem & Conditional Probability',
    ],
  },
  cf: {
    name: 'Computer Fundamentals',
    badge: 'B.Sc AI/ML',
    progress: 56,
    completedTopics: 20,
    totalTopics: 36,
    units: [
      {
        number: '01',
        title: 'Evolution & Generations of Computers',
        completedText: '5 of 5 topics completed',
        progress: 100,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '02',
        title: 'Von Neumann Architecture & CPU',
        completedText: '4 of 6 topics completed',
        progress: 67,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
      {
        number: '03',
        title: 'Memory Hierarchy (RAM, Cache, SSD)',
        completedText: '4 of 7 topics completed',
        progress: 57,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
      {
        number: '04',
        title: 'Number Systems & Boolean Logic',
        completedText: '3 of 6 topics completed',
        progress: 50,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
      {
        number: '05',
        title: 'Operating System Principles',
        completedText: '3 of 7 topics completed',
        progress: 43,
        barColor: 'bg-[#F59E0B]',
        textColor: 'text-[#D97706]',
      },
      {
        number: '06',
        title: 'Computer Networks & Internet',
        completedText: '1 of 5 topics completed',
        progress: 20,
        barColor: 'bg-[#F59E0B]',
        textColor: 'text-[#D97706]',
      },
    ],
    importantTopics: [
      'Instruction Cycle & Register Organization',
      'Binary Arithmetic & 2’s Complement',
      'Virtual Memory & Paging Mechanisms',
    ],
  },
  pu: {
    name: 'Punjabi',
    badge: 'B.Sc AI/ML',
    progress: 88,
    completedTopics: 22,
    totalTopics: 25,
    units: [
      {
        number: '01',
        title: 'Gurmukhi Script & Alphabet',
        completedText: '4 of 4 topics completed',
        progress: 100,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '02',
        title: 'Grammar & Sentence Syntax',
        completedText: '5 of 5 topics completed',
        progress: 100,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '03',
        title: 'Poetry & Classical Literature',
        completedText: '4 of 5 topics completed',
        progress: 80,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '04',
        title: 'Essay Writing & Comprehension',
        completedText: '5 of 5 topics completed',
        progress: 100,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '05',
        title: 'Modern Punjabi Prose',
        completedText: '3 of 4 topics completed',
        progress: 75,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '06',
        title: 'Official Translation & Terminology',
        completedText: '1 of 2 topics completed',
        progress: 50,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
    ],
    importantTopics: [
      'Muharni & Vowel Signs Rules',
      'Karak and Samas Formations',
      'Idioms and Muhavare in Context',
    ],
  },
  ev: {
    name: 'Environmental Science',
    badge: 'B.Sc AI/ML',
    progress: 72,
    completedTopics: 21,
    totalTopics: 29,
    units: [
      {
        number: '01',
        title: 'Ecosystems & Biodiversity',
        completedText: '5 of 5 topics completed',
        progress: 100,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '02',
        title: 'Natural Resources Management',
        completedText: '4 of 5 topics completed',
        progress: 80,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '03',
        title: 'Environmental Pollution Control',
        completedText: '4 of 6 topics completed',
        progress: 67,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
      {
        number: '04',
        title: 'Climate Change & Global Warming',
        completedText: '4 of 5 topics completed',
        progress: 80,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '05',
        title: 'Environmental Legislation & Acts',
        completedText: '3 of 5 topics completed',
        progress: 60,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
      {
        number: '06',
        title: 'Sustainable Development Goals',
        completedText: '1 of 3 topics completed',
        progress: 33,
        barColor: 'bg-[#F59E0B]',
        textColor: 'text-[#D97706]',
      },
    ],
    importantTopics: [
      'Carbon Footprint & Mitigation Protocols',
      'Solid Waste Management Techniques',
      'Air & Water Pollution Act Provisions',
    ],
  },
  la: {
    name: 'Practical: Python Lab',
    badge: 'B.Sc AI/ML',
    progress: 80,
    completedTopics: 16,
    totalTopics: 20,
    units: [
      {
        number: '01',
        title: 'Basic Syntax & Expressions Lab',
        completedText: '4 of 4 topics completed',
        progress: 100,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '02',
        title: 'Control Flow & Loops Lab',
        completedText: '3 of 3 topics completed',
        progress: 100,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '03',
        title: 'String & List Operations Lab',
        completedText: '3 of 4 topics completed',
        progress: 75,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '04',
        title: 'Dictionary & Set Manipulations',
        completedText: '3 of 4 topics completed',
        progress: 75,
        barColor: 'bg-[#16A34A]',
        textColor: 'text-[#16A34A]',
      },
      {
        number: '05',
        title: 'File I/O & Exception Lab',
        completedText: '2 of 3 topics completed',
        progress: 67,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
      {
        number: '06',
        title: 'Mini Capstone Project Review',
        completedText: '1 of 2 topics completed',
        progress: 50,
        barColor: 'bg-[#0075FF]',
        textColor: 'text-[#0075FF]',
      },
    ],
    importantTopics: [
      'Matrix Multiplication in Pure Python',
      'File Parsing & CSV Generation',
      'Exception Handling with Try-Except-Finally',
    ],
  },
};

export default function Subjects() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('current');
  const [selectedBatch, setSelectedBatch] = useState('B.Sc AI/ML – 1st Year');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    if (location.state?.subjectId) {
      const match = subjectsList.find((s) => s.id === location.state.subjectId);
      if (match) {
        setSelectedSubject(match);
      } else {
        setSelectedSubject({ id: location.state.subjectId, name: 'Python Programming' });
      }
    }
  }, [location.state?.subjectId]);

  const batches = [
    'B.Sc AI/ML – 1st Year',
    'B.Sc AI/ML – 2nd Year',
    'BCA – 1st Year',
  ];

  const handleScroll = (e) => {
    const currentScrollTop = e.target.scrollTop;
    const diff = currentScrollTop - lastScrollTopRef.current;

    if (Math.abs(diff) < 5) return;

    if (diff > 0 && currentScrollTop > 30) {
      setIsNavVisible(false);
    } else if (diff < 0) {
      setIsNavVisible(true);
    }

    lastScrollTopRef.current = currentScrollTop;
  };

  const subjectsList = [
    {
      id: 'ec',
      code: 'EC',
      name: 'English Communication',
      grade: 'B.Sc AI/ML – 1st Year',
      progress: 92,
      colorType: 'green',
      avatarBg: 'bg-[#EAF3FF]',
      avatarText: 'text-[#0075FF]',
    },
    {
      id: 'py',
      code: 'PY',
      name: 'Python Programming',
      grade: 'B.Sc AI/ML – 1st Year',
      progress: 60,
      colorType: 'blue',
      avatarBg: 'bg-[#F3E8FF]',
      avatarText: 'text-[#9333EA]',
    },
    {
      id: 'ma',
      code: 'MA',
      name: 'Mathematics',
      grade: 'B.Sc AI/ML – 1st Year',
      progress: 64,
      colorType: 'green',
      avatarBg: 'bg-[#E8F9EE]',
      avatarText: 'text-[#16A34A]',
    },
    {
      id: 'cf',
      code: 'CF',
      name: 'Computer Fundamentals',
      grade: 'B.Sc AI/ML – 1st Year',
      progress: 56,
      colorType: 'blue',
      avatarBg: 'bg-[#FEF3C7]',
      avatarText: 'text-[#D97706]',
    },
    {
      id: 'pu',
      code: 'PU',
      name: 'Punjabi',
      grade: 'B.Sc AI/ML – 1st Year',
      progress: 88,
      colorType: 'green',
      avatarBg: 'bg-[#FEE2E2]',
      avatarText: 'text-[#DC2626]',
    },
    {
      id: 'ev',
      code: 'EV',
      name: 'Environmental Science',
      grade: 'B.Sc AI/ML – 1st Year',
      progress: 72,
      colorType: 'blue',
      avatarBg: 'bg-[#EDE9FE]',
      avatarText: 'text-[#7C3AED]',
    },
    {
      id: 'la',
      code: 'LA',
      name: 'Practical: Python Lab',
      grade: 'B.Sc AI/ML – 1st Year',
      progress: 80,
      colorType: 'blue',
      avatarBg: 'bg-[#DCFCE7]',
      avatarText: 'text-[#15803D]',
    },
  ];

  // Resolve detail data for currently selected subject
  const detailData = selectedSubject
    ? SUBJECT_DETAILS[selectedSubject.id] || {
        name: selectedSubject.name,
        badge: 'B.Sc AI/ML',
        progress: selectedSubject.progress || 60,
        completedTopics: Math.round(((selectedSubject.progress || 60) / 100) * 40),
        totalTopics: 40,
        units: SUBJECT_DETAILS.py.units,
        importantTopics: SUBJECT_DETAILS.py.importantTopics,
      }
    : null;

  return (
    <div className="relative h-full flex flex-col bg-[#F8FAFC] select-none overflow-hidden font-sans">
      {/* Scrollable Container */}
      <div
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar px-5 sm:px-6 pt-4 pb-24 space-y-4"
      >
        {selectedSubject && detailData ? (
          /* ======================================================== */
          /* EXACT SUBJECT DETAIL DESIGN MATCHING USER REFERENCE MOCKUP */
          /* ======================================================== */
          <div className="space-y-4 animate-dropdown-pop">
            {/* Top Header: Back Arrow, Subject Name, Batch Pill */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => setSelectedSubject(null)}
                  className="p-1 -ml-1 text-[#0F172A] hover:bg-slate-200/60 active:scale-95 rounded-full transition-all cursor-pointer shrink-0"
                  aria-label="Go back"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.6]" />
                </button>
                <h1 className="text-[20px] sm:text-[21px] font-black text-[#0F172A] tracking-tight truncate">
                  {detailData.name}
                </h1>
              </div>
              <span className="bg-[#EAF3FF] text-[#0075FF] text-[12px] font-bold px-3 py-1 rounded-full shrink-0">
                {detailData.badge || 'B.Sc AI/ML'}
              </span>
            </div>

            {/* Overall Progress Card */}
            <div className="bg-white border border-[#EEF2F6] rounded-[22px] p-5 shadow-card flex items-center gap-5 apple-card">
              {/* Circular Progress Ring Gauge */}
              <div className="relative w-[76px] h-[76px] flex items-center justify-center shrink-0">
                <svg className="w-[76px] h-[76px] -rotate-90 shrink-0" viewBox="0 0 76 76">
                  <circle
                    cx="38"
                    cy="38"
                    r={30}
                    stroke="#EAF3FF"
                    strokeWidth="6.5"
                    fill="transparent"
                  />
                  <circle
                    cx="38"
                    cy="38"
                    r={30}
                    stroke="#0075FF"
                    strokeWidth="6.5"
                    strokeDasharray={2 * Math.PI * 30}
                    strokeDashoffset={2 * Math.PI * 30 * (1 - (detailData.progress || 60) / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <span className="absolute text-[17px] font-black text-[#0F172A] tracking-tight">
                  {detailData.progress || 60}%
                </span>
              </div>

              {/* Progress Text & Horizontal Bar */}
              <div className="flex-1 min-w-0">
                <h2 className="text-[17px] font-extrabold text-[#0F172A] tracking-tight leading-snug">
                  Overall Progress
                </h2>
                <p className="text-[13px] font-medium text-[#64748B] mt-0.5 mb-2.5">
                  {detailData.completedTopics} of {detailData.totalTopics} topics completed
                </p>
                <div className="w-full h-2 bg-[#EAF3FF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0075FF] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${detailData.progress || 60}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Section Header: Syllabus Overview */}
            <div className="flex items-center justify-between pt-1">
              <h2 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight">
                Syllabus Overview
              </h2>
              <span className="bg-[#EAF3FF] text-[#0075FF] text-[12px] font-bold px-3 py-1 rounded-full">
                {detailData.units.length} Units
              </span>
            </div>

            {/* Syllabus Units Cards */}
            <div className="space-y-2.5">
              {detailData.units.map((unit) => (
                <div
                  key={unit.number}
                  className="bg-white border border-[#EEF2F6] rounded-[20px] p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-card hover:shadow-card-hover transition-all apple-card"
                >
                  {/* Unit Number Box */}
                  <div className="w-11 h-11 rounded-[14px] bg-[#EAF3FF] text-[#0075FF] flex items-center justify-center font-black text-[15px] shrink-0">
                    {unit.number}
                  </div>

                  {/* Title & Completed topics */}
                  <div className="flex-1 min-w-0 pr-1.5">
                    <h3 className="text-[14.5px] font-bold text-[#0F172A] leading-snug truncate">
                      {unit.title}
                    </h3>
                    <p className="text-[12px] font-medium text-[#64748B] mt-0.5 truncate">
                      {unit.completedText}
                    </p>
                  </div>

                  {/* Progress Bar & Percentage & Chevron */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <div className="w-16 sm:w-20 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${unit.barColor} rounded-full transition-all duration-500`}
                        style={{ width: `${unit.progress}%` }}
                      />
                    </div>
                    <span
                      className={`text-[12.5px] font-bold ${unit.textColor} tabular-nums min-w-[32px] text-right`}
                    >
                      {unit.progress}%
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#94A3B8] stroke-[2.2]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Important Topics Card */}
            <div className="bg-white border border-[#EEF2F6] rounded-[22px] p-4.5 sm:p-5 shadow-card apple-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B] shrink-0" />
                  <h3 className="text-[16.5px] font-extrabold text-[#0F172A] tracking-tight">
                    Important Topics
                  </h3>
                </div>
                <span className="bg-[#EAF3FF] text-[#0075FF] text-[11.5px] font-bold px-3 py-1 rounded-full">
                  {detailData.importantTopics.length} Marked
                </span>
              </div>

              <div>
                {detailData.importantTopics.map((topic, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 py-2.5 ${
                      idx < detailData.importantTopics.length - 1 ? 'border-b border-[#F1F5F9]' : ''
                    }`}
                  >
                    <Star className="w-4 h-4 fill-[#0075FF] text-[#0075FF] shrink-0" />
                    <span className="text-[13.5px] font-semibold text-[#0F172A] leading-snug">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* MAIN SUBJECTS LIST */
          /* ======================================================== */
          <>
            {/* Header: Title and Batch Dropdown Pill */}
            <div className="flex items-center justify-between pt-1 relative">
              <h1 className="text-[25px] font-extrabold text-[#0F172A] tracking-tight leading-none">
                My Subjects
              </h1>

              {/* Batch Selector Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded-[12px] text-[12.5px] font-semibold text-[#475569] hover:bg-slate-200/70 apple-tab cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#64748B]" />
                  <span className="truncate max-w-[130px]">{selectedBatch}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-9 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30 apple-dropdown">
                    {batches.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          setSelectedBatch(b);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                          selectedBatch === b
                            ? 'font-bold text-[#0075FF] bg-blue-50'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Semester Filter Tabs */}
            <div className="flex items-center gap-2 px-1 pt-1">
              <button
                type="button"
                onClick={() => setActiveTab('current')}
                className={`px-4 py-1.5 rounded-full text-[13.5px] apple-tab cursor-pointer ${
                  activeTab === 'current'
                    ? 'bg-[#EAF3FF] text-[#0075FF] font-bold shadow-xs'
                    : 'text-[#64748B] font-medium hover:text-[#0F172A]'
                }`}
              >
                Current Semester
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-full text-[13.5px] apple-tab cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#EAF3FF] text-[#0075FF] font-bold shadow-xs'
                    : 'text-[#64748B] font-medium hover:text-[#0F172A]'
                }`}
              >
                All Subjects
              </button>
            </div>

            {/* Subjects List Cards */}
            <div className="space-y-2.5 pt-1">
              {subjectsList.map((sub) => {
                const isGreen = sub.colorType === 'green';
                const barColor = isGreen ? 'bg-[#10B981]' : 'bg-[#0075FF]';
                const textColor = isGreen ? 'text-[#16A34A]' : 'text-[#0075FF]';

                return (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSubject(sub)}
                    className="bg-white border border-[#EEF2F6] rounded-[18px] p-3.5 flex items-center gap-3.5 shadow-card hover:shadow-card-hover apple-card cursor-pointer group active:scale-[0.99] transition-all"
                  >
                    {/* Avatar Badge with Subject Initials */}
                    <div
                      className={`w-11 h-11 rounded-full ${sub.avatarBg} flex items-center justify-center shrink-0 font-bold text-[14px] ${sub.avatarText}`}
                    >
                      {sub.code}
                    </div>

                    {/* Subject Details & Progress Bar */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold text-[#0F172A] truncate leading-snug">
                        {sub.name}
                      </h3>
                      <p className="text-[12px] font-normal text-[#64748B] truncate mt-0.5 mb-2 leading-tight">
                        {sub.grade}
                      </p>

                      {/* Progress Bar & Percentage row */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-[195px] h-2 bg-[#EEF2F6] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${barColor} rounded-full transition-all duration-500`}
                            style={{ width: `${sub.progress}%` }}
                          />
                        </div>
                        <span
                          className={`text-[12.5px] font-bold ${textColor} shrink-0 tabular-nums`}
                        >
                          {sub.progress}%
                        </span>
                      </div>
                    </div>

                    {/* Right Arrow Button */}
                    <div className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center shrink-0 group-hover:bg-[#E2E8F0] group-hover:text-[#0F172A] transition-colors">
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav activeTab="subjects" isVisible={isNavVisible} />
    </div>
  );
}
