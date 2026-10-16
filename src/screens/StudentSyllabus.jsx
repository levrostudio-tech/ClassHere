import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Monitor,
  Database,
  MessageCircle,
  BookOpen,
} from 'lucide-react';

// Python Official Brand Logo Vector Icon
function PythonLogo({ className = 'w-7 h-7' }) {
  return (
    <svg className={className} viewBox="0 0 110 110" fill="none">
      <path
        d="M54.5 10C29.7 10 31.2 20.8 31.2 20.8L31.3 32H55V35.4H22.1C22.1 35.4 10 34 10 58.7C10 83.4 20.7 82.2 20.7 82.2H28.1V71.9C28.1 71.9 27.7 59.5 40.2 59.5H63.6C63.6 59.5 74.9 59.9 74.9 48.9V21.1C74.9 21.1 76.5 10 54.5 10ZM42.5 17.5C45.3 17.5 47.5 19.7 47.5 22.5C47.5 25.3 45.3 27.5 42.5 27.5C39.7 27.5 37.5 25.3 37.5 22.5C37.5 19.7 39.7 17.5 42.5 17.5Z"
        fill="#387EB8"
      />
      <path
        d="M55.5 100C80.3 100 78.8 89.2 78.8 89.2L78.7 78H55V74.6H87.9C87.9 74.6 100 76 100 51.3C100 26.6 89.3 27.8 89.3 27.8H81.9V38.1C81.9 38.1 82.3 50.5 69.8 50.5H46.4C46.4 50.5 35.1 50.1 35.1 61.1V88.9C35.1 88.9 33.5 100 55.5 100ZM67.5 92.5C64.7 92.5 62.5 90.3 62.5 87.5C62.5 84.7 64.7 82.5 67.5 82.5C70.3 82.5 72.5 84.7 72.5 87.5C72.5 90.3 70.3 92.5 67.5 92.5Z"
        fill="#FFE052"
      />
    </svg>
  );
}

// Mathematics Sigma Icon
function SigmaIcon({ className = 'text-[#9333EA] text-[26px]' }) {
  return (
    <span className={`font-serif font-black leading-none select-none ${className}`}>
      ∑
    </span>
  );
}

export default function StudentSyllabus() {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState('Semester 1');

  // Semester tabs list
  const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];

  // Subjects data structured specifically to match reference mockup
  const semesterSubjects = {
    'Semester 1': [
      {
        id: 'py',
        title: 'Python Programming',
        sections: '6 sections',
        topics: '40 topics',
        iconBg: 'bg-[#EAF3FF]',
        renderIcon: () => <PythonLogo className="w-7 h-7" />,
      },
      {
        id: 'ma',
        title: 'Mathematics',
        sections: '5 sections',
        topics: '32 topics',
        iconBg: 'bg-[#F5EDFF]',
        renderIcon: () => <SigmaIcon className="text-[#9333EA] text-[27px]" />,
      },
      {
        id: 'cf',
        title: 'Computer Fundamentals',
        sections: '5 sections',
        topics: '28 topics',
        iconBg: 'bg-[#EAF3FF]',
        renderIcon: () => <Monitor className="w-6 h-6 text-[#0075FF] stroke-[2.2]" />,
      },
      {
        id: 'dbms',
        title: 'Database Management Systems',
        sections: '4 sections',
        topics: '26 topics',
        iconBg: 'bg-[#E8F9EE]',
        renderIcon: () => <Database className="w-6 h-6 text-[#16A34A] stroke-[2.2]" />,
      },
      {
        id: 'ec',
        title: 'English Communication',
        sections: '5 sections',
        topics: '22 topics',
        iconBg: 'bg-[#FDF2F4]',
        renderIcon: () => <MessageCircle className="w-6 h-6 text-[#E11D48] stroke-[2.2]" />,
      },
      {
        id: 'pu',
        title: 'Punjabi',
        sections: '4 sections',
        topics: '20 topics',
        iconBg: 'bg-[#FEF6E8]',
        renderIcon: () => <BookOpen className="w-6 h-6 text-[#D97706] stroke-[2.2]" />,
      },
    ],
    'Semester 2': [
      {
        id: 'ds',
        title: 'Data Structures & Algorithms',
        sections: '6 sections',
        topics: '38 topics',
        iconBg: 'bg-[#EAF3FF]',
        renderIcon: () => <PythonLogo className="w-7 h-7" />,
      },
      {
        id: 'dm',
        title: 'Discrete Mathematics',
        sections: '5 sections',
        topics: '30 topics',
        iconBg: 'bg-[#F5EDFF]',
        renderIcon: () => <SigmaIcon className="text-[#9333EA] text-[27px]" />,
      },
      {
        id: 'os',
        title: 'Operating Systems',
        sections: '5 sections',
        topics: '32 topics',
        iconBg: 'bg-[#EAF3FF]',
        renderIcon: () => <Monitor className="w-6 h-6 text-[#0075FF] stroke-[2.2]" />,
      },
    ],
    'Semester 3': [
      {
        id: 'ai',
        title: 'Artificial Intelligence Foundations',
        sections: '6 sections',
        topics: '36 topics',
        iconBg: 'bg-[#EAF3FF]',
        renderIcon: () => <Monitor className="w-6 h-6 text-[#0075FF] stroke-[2.2]" />,
      },
      {
        id: 'stats',
        title: 'Probability & Applied Statistics',
        sections: '5 sections',
        topics: '28 topics',
        iconBg: 'bg-[#F5EDFF]',
        renderIcon: () => <SigmaIcon className="text-[#9333EA] text-[27px]" />,
      },
    ],
    'Semester 4': [
      {
        id: 'ml',
        title: 'Machine Learning Fundamentals',
        sections: '6 sections',
        topics: '42 topics',
        iconBg: 'bg-[#EAF3FF]',
        renderIcon: () => <Monitor className="w-6 h-6 text-[#0075FF] stroke-[2.2]" />,
      },
    ],
  };

  const currentSubjects = semesterSubjects[selectedSemester] || semesterSubjects['Semester 1'];

  const handleSubjectClick = (subject) => {
    // Navigate to Subjects view with this subject selected
    navigate('/subjects', { state: { subjectId: subject.id, role: 'student' } });
  };

  return (
    <div className="relative h-full flex flex-col bg-[#F8FAFC] select-none overflow-hidden font-sans">
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 sm:px-6 pt-3 pb-24 space-y-4">
        {/* ======================================================== */}
        {/* TOP HEADER: Back Button, Title, Subtitle, Batch Pill */}
        {/* ======================================================== */}
        <header className="pt-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/student-dashboard')}
                className="p-1 -ml-1 text-[#0F172A] hover:bg-slate-200/60 active:scale-95 rounded-full transition-all cursor-pointer"
                aria-label="Back to dashboard"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
              <h1 className="text-[26px] sm:text-[28px] font-black text-[#0F172A] tracking-tight leading-none">
                Syllabus
              </h1>
            </div>

            <span className="bg-[#EAF3FF] text-[#0075FF] text-[12px] font-bold px-3 py-1 rounded-full shrink-0">
              B.Sc AI/ML
            </span>
          </div>

          <p className="text-[13.5px] sm:text-[14px] font-medium text-[#64748B] pl-9">
            All subjects and topics for this semester
          </p>
        </header>

        {/* ======================================================== */}
        {/* SEMESTER FILTER PILLS */}
        {/* ======================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 pb-1">
          {semesters.map((sem) => {
            const isSelected = selectedSemester === sem;
            return (
              <button
                key={sem}
                type="button"
                onClick={() => setSelectedSemester(sem)}
                className={`px-4 py-2 rounded-[14px] text-[13px] whitespace-nowrap transition-all apple-tab cursor-pointer ${
                  isSelected
                    ? 'bg-[#EAF3FF] text-[#0075FF] font-bold shadow-xs'
                    : 'bg-[#F1F5F9] text-[#64748B] font-medium hover:text-[#0F172A] hover:bg-slate-200/70'
                }`}
              >
                {sem}
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* SUBJECT CARDS LIST */}
        {/* ======================================================== */}
        <div className="space-y-3 pt-1">
          {currentSubjects.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSubjectClick(item)}
              className="bg-white border border-[#EEF2F6] rounded-[22px] p-4 sm:p-4.5 flex items-center justify-between gap-3.5 shadow-card hover:shadow-card-hover apple-card transition-all cursor-pointer group active:scale-[0.99]"
            >
              {/* Left Container: Visual Icon Badge */}
              <div
                className={`w-[52px] h-[52px] rounded-[16px] ${item.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
              >
                {item.renderIcon()}
              </div>

              {/* Middle: Subject Title & Details */}
              <div className="flex-1 min-w-0 pr-1">
                <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#0F172A] tracking-tight leading-snug truncate">
                  {item.title}
                </h3>
                <p className="text-[13px] font-medium text-[#64748B] mt-0.5 truncate">
                  {item.sections} · {item.topics}
                </p>
              </div>

              {/* Right: Chevron Arrow */}
              <div className="text-[#64748B] group-hover:text-[#0F172A] group-hover:translate-x-0.5 transition-all shrink-0">
                <ChevronRight className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
