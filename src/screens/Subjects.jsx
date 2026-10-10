import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Home,
  Calendar,
  Users,
  Bookmark,
} from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function Subjects() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('current');
  const [selectedBatch, setSelectedBatch] = useState('B.Sc AI/ML – 1st Year');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollTopRef = useRef(0);

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
      name: 'Python',
      grade: 'B.Sc AI/ML – 1st Year',
      progress: 78,
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
      name: 'Lab',
      grade: 'B.Sc AI/ML – 1st Year',
      progress: 80,
      colorType: 'blue',
      avatarBg: 'bg-[#DCFCE7]',
      avatarText: 'text-[#15803D]',
    },
  ];

  return (
    <div className="relative h-full flex flex-col bg-[#FBFBFD] select-none overflow-hidden">
      {/* Scrollable Container */}
      <div
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar px-5 sm:px-6 pt-4 pb-24 space-y-4"
      >
        {/* Header: Title and Batch Dropdown Pill */}
        <div className="flex items-center justify-between pt-1 relative">
          <h1 className="text-[30px] font-extrabold text-[#0F172A] tracking-tight leading-none">
            My Subjects
          </h1>

          {/* Batch Selector Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded-[12px] text-[12px] font-semibold text-[#475569] hover:bg-slate-200/70 transition-colors cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="truncate max-w-[130px]">{selectedBatch}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-9 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30 animate-fadeIn">
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
            className={`px-3.5 py-1.5 rounded-full text-[13px] transition-all cursor-pointer ${
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
            className={`px-3.5 py-1.5 rounded-full text-[13px] transition-all cursor-pointer ${
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
                className="bg-white border border-[#EEF2F6] rounded-[18px] p-3.5 flex items-center gap-3.5 shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
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

                  {/* Progress Bar & Percentage row - longer and thicker */}
                  <div className="flex items-center gap-3">
                    {/* Track */}
                    <div className="flex-1 max-w-[195px] h-2 bg-[#EEF2F6] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${barColor} rounded-full transition-all duration-500`}
                        style={{ width: `${sub.progress}%` }}
                      />
                    </div>
                    {/* Percentage text */}
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
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav activeTab="subjects" isVisible={isNavVisible} />
    </div>
  );
}
