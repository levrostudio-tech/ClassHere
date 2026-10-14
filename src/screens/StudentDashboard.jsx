import React, { useState, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FileText,
  BookOpen,
  Star,
  History,
  Calendar,
  Clock,
  ChevronRight,
  X,
  Search,
  Download,
  BookMarked,
  Sparkles,
  LogOut,
  CheckCircle2,
} from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useRealtimeTimetable } from '../hooks/useRealtimeTimetable';
import { getISTNow } from '../lib/timetableService';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll visibility for bottom nav
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollTopRef = useRef(0);

  // Active modal state: 'syllabus' | 'history' | 'students' | null
  const [activeModal, setActiveModal] = useState(null);

  // Search query within modals
  const [modalSearch, setModalSearch] = useState('');

  // Handle student name passed in navigation state, default to "Prof. Mehta" matching the reference mockup
  const studentName = location.state?.studentName || location.state?.name || 'Prof. Mehta';
  const studentRollNumber = location.state?.rollNumber || localStorage.getItem('classhere_roll_number') || '104821';

  // Real-time IST timetable hook for current weekday
  const {
    istTime,
    ongoingClass,
    upcomingClasses,
    finishedClasses,
    allClasses,
    isLoading,
  } = useRealtimeTimetable();

  // Handle scroll to smoothly hide/show bottom navigation bar
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

  // Student specific mock data for the action items
  const syllabusData = [
    { subject: 'English Communication', code: 'EC-101', units: 4, completed: 65, color: '#0075FF' },
    { subject: 'Python Programming', code: 'CS-102', units: 5, completed: 48, color: '#10B981' },
    { subject: 'Mathematics (Discrete & Linear)', code: 'MA-103', units: 5, completed: 52, color: '#8B5CF6' },
    { subject: 'Computer Fundamentals', code: 'CS-104', units: 4, completed: 40, color: '#F59E0B' },
    { subject: 'Python Lab', code: 'CS-102L', units: 10, completed: 70, color: '#EC4899' },
  ];

  const importantTopicsData = [
    {
      id: 'python',
      code: 'PN',
      badgeBg: 'bg-[#EAF3FF] dark:bg-[#162238]',
      badgeText: 'text-[#0075FF] dark:text-[#3894FF]',
      subject: 'Programming using Python',
      markedText: '4 of 20 topics marked important',
      progress: 20,
      progressColor: 'bg-[#0075FF] dark:bg-[#3894FF]',
      textColor: 'text-[#0075FF] dark:text-[#3894FF]',
      filesCount: '8 files',
    },
    {
      id: 'maths',
      code: 'AS',
      badgeBg: 'bg-[#F5E8FF] dark:bg-[#2E1065]/40',
      badgeText: 'text-[#9333EA] dark:text-[#C084FC]',
      subject: 'Applied & Discrete Mathematics',
      markedText: '3 of 18 topics marked important',
      progress: 17,
      progressColor: 'bg-[#0075FF] dark:bg-[#3894FF]',
      textColor: 'text-[#0075FF] dark:text-[#3894FF]',
      filesCount: '5 files',
    },
    {
      id: 'comp_fund',
      code: 'CS',
      badgeBg: 'bg-[#E8F9EE] dark:bg-[#064E3B]/30',
      badgeText: 'text-[#16A34A] dark:text-[#34D399]',
      subject: 'Computer Fundamentals',
      markedText: '2 of 16 topics marked important',
      progress: 13,
      progressColor: 'bg-[#0075FF] dark:bg-[#3894FF]',
      textColor: 'text-[#0075FF] dark:text-[#3894FF]',
      filesCount: '4 files',
    },
    {
      id: 'comm_eng',
      code: 'CH',
      badgeBg: 'bg-[#FEF3C7] dark:bg-[#451A03]/30',
      badgeText: 'text-[#D97706] dark:text-[#FBBF24]',
      subject: 'Communication Skills in English',
      markedText: '3 of 15 topics marked important',
      progress: 20,
      progressColor: 'bg-[#0075FF] dark:bg-[#3894FF]',
      textColor: 'text-[#0075FF] dark:text-[#3894FF]',
      filesCount: '6 files',
    },
    {
      id: 'internet',
      code: 'IT',
      badgeBg: 'bg-[#F3E8FF] dark:bg-[#2E1065]/40',
      badgeText: 'text-[#8B5CF6] dark:text-[#A78BFA]',
      subject: 'Introduction to Internet',
      markedText: '2 of 14 topics marked important',
      progress: 14,
      progressColor: 'bg-[#0075FF] dark:bg-[#3894FF]',
      textColor: 'text-[#0075FF] dark:text-[#3894FF]',
      filesCount: '3 files',
    },
    {
      id: 'python_lab',
      code: 'PB',
      badgeBg: 'bg-[#FEE2E2] dark:bg-[#450A0A]/30',
      badgeText: 'text-[#EF4444] dark:text-[#F87171]',
      subject: 'Practical: Python Lab',
      markedText: '1 of 10 topics marked important',
      progress: 10,
      progressColor: 'bg-[#16A34A] dark:bg-[#4ADE80]',
      textColor: 'text-[#16A34A] dark:text-[#4ADE80]',
      filesCount: '2 files',
    },
  ];

  const historyData = [
    { id: 1, title: 'Introduction to Functions & Scope', subject: 'Python', time: 'Yesterday, 10:00 AM', room: 'Room 204', faculty: 'Dr. Aman Sharma' },
    { id: 2, title: 'Matrix Inverses & Cramer\'s Rule', subject: 'Mathematics', time: '08 Oct, 11:00 AM', room: 'Room 108', faculty: 'Dr. Neha Verma' },
    { id: 3, title: 'Von Neumann Architecture Details', subject: 'Computer Fundamentals', time: '07 Oct, 12:00 PM', room: 'Room 108', faculty: 'Prof. Rajiv Kapoor' },
    { id: 4, title: 'Phonetics & Pronunciation Workshop', subject: 'English Communication', time: '06 Oct, 9:00 AM', room: 'Room 101', faculty: 'Mrs. Simran Kaur' },
  ];


  return (
    <div className="relative h-full flex flex-col bg-[#FDFDFE] dark:bg-[#0B0F19] transition-colors duration-200 select-none overflow-hidden font-sans">
      {/* Scrollable Container */}
      <div
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-5 sm:px-6 pt-3 pb-24 no-scrollbar space-y-4"
      >
        {/* ======================================================== */}
        {/* TOP BAR: ClassHere Brand Logo + Theme toggle + User Avatar Pill */}
        {/* ======================================================== */}
        <header className="flex items-center justify-between pt-1">
          <div className="flex items-center">
            <span className="text-[25px] font-black tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
              Class
            </span>
            <span className="text-[25px] font-black tracking-tight text-[#0075FF] dark:text-[#3894FF]">
              Here
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('classhere_role');
                localStorage.removeItem('classhere_roll_number');
                navigate('/');
              }}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-200 flex items-center justify-center text-slate-600 hover:text-red-500 shadow-xs apple-btn cursor-pointer transition-all"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </header>

        {/* ======================================================== */}
        {/* GREETING & DATE ROW */}
        {/* ======================================================== */}
        <div className="flex items-end justify-between pt-0.5">
          <div>
            <p className="text-[13px] font-medium text-[#64748B] dark:text-[#94A3B8] leading-none mb-1">
              {istTime.greeting || 'Good morning,'}
            </p>
            <h1 className="text-[23px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight">
              {studentName}
            </h1>
          </div>

          {/* Date Selector Pill */}
          <div
            onClick={() => navigate('/timetable', { state: { role: 'student' } })}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0F6FE] dark:bg-[#162036] border border-[#E2EDFD] dark:border-[#223354] rounded-[11px] cursor-pointer hover:bg-blue-100/60 dark:hover:bg-[#1E2E4A] apple-tab shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0075FF] dark:text-[#3894FF]" />
            <span className="text-[12px] font-bold text-[#334155] dark:text-[#CBD5E1]">
              {istTime.formattedDate || 'Thursday, 24 Sep'}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4 QUICK ACTION CARDS (Notes, Syllabus, Important Topics, Lecture History) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-4 gap-2.5">
          {[
            { id: 'notes', title: 'Notes', icon: FileText },
            { id: 'syllabus', title: 'Syllabus', icon: BookOpen },
            { id: 'important', title: 'Important Topics', icon: Star },
            { id: 'history', title: 'Lecture History', icon: History },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                onClick={() => {
                  if (action.id === 'important') {
                    navigate('/important-topics', { state: { role: 'student' } });
                  } else if (action.id === 'notes') {
                    navigate('/notes', { state: { role: 'student' } });
                  } else {
                    setActiveModal(action.id);
                  }
                }}
                className="flex flex-col items-center justify-center py-3 px-1 bg-[#F1F6FE] dark:bg-[#162238] border border-[#E2EDFD] dark:border-[#223354] rounded-[16px] apple-card hover:bg-[#E7F0FD] dark:hover:bg-[#1C2C47] cursor-pointer shadow-xs group"
              >
                <div className="text-[#0075FF] dark:text-[#3894FF] mb-1.5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5.5 h-5.5 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-[#0F172A] dark:text-[#F8FAFC] text-center leading-tight whitespace-normal break-words h-7 flex items-center justify-center w-full px-0.5">
                  {action.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* TODAY'S CLASSES HEADER */}
        {/* ======================================================== */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <h2 className="text-[19px] font-extrabold text-[#0F172A] tracking-tight">
              Today’s Classes
            </h2>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {istTime?.weekdayName || 'Today'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/timetable', { state: { role: 'student' } })}
            className="flex items-center gap-0.5 px-3 py-1 bg-[#EFF6FF] rounded-full text-[#0075FF] text-[12px] font-bold hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <span>View Timetable</span>
          </button>
        </div>

        {/* Dynamic Real-Time Class Status */}
        {ongoingClass ? (
          /* ONGOING CLASS CARD */
          <div className="bg-[#EEFAF2] border border-[#CEEFDB] rounded-[18px] p-4 shadow-sm relative overflow-hidden apple-card">
            {/* Status Row */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] apple-live-pulse" />
                <span className="text-[13px] font-bold text-[#15803D]">Ongoing</span>
                <span className="text-[12.5px] font-medium text-[#64748B]">
                  · {ongoingClass.startTime} to {ongoingClass.endTime}
                </span>
              </div>
              <span className="bg-[#DCFCE7] text-[#166534] text-[11px] font-bold px-2.5 py-0.5 rounded-[7px]">
                {ongoingClass.room}
              </span>
            </div>

            {/* Subject & Grade */}
            <div className="mb-3">
              <h3 className="text-[17px] font-extrabold text-[#0F172A] tracking-tight leading-snug">
                {ongoingClass.subject}
              </h3>
              <p className="text-[12.5px] font-medium text-[#64748B] mt-0.5">
                {ongoingClass.grade || 'B.Sc AI/ML – 1st Year'}
              </p>
            </div>

            {/* Progress Bar & Time Left */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-[#D3EEDC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#16A34A] rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${ongoingClass.progress || 0}%` }}
                />
              </div>
              <span className="text-[12px] font-bold text-[#16A34A] shrink-0 text-right tabular-nums">
                {ongoingClass.remainingLabel || `${ongoingClass.minutesLeft} min left`}
              </span>
            </div>
          </div>
        ) : upcomingClasses && upcomingClasses.length > 0 ? (
          /* BREAK / NEXT CLASS UP BANNER */
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[18px] p-4 shadow-xs relative overflow-hidden apple-card">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0075FF] animate-pulse" />
                <span className="text-[13px] font-bold text-[#0075FF]">Next Up</span>
                <span className="text-[12.5px] font-medium text-[#64748B]">
                  · Starts at {upcomingClasses[0].startTime}
                </span>
              </div>
              <span className="bg-[#EFF6FF] text-[#0075FF] text-[11px] font-bold px-2.5 py-0.5 rounded-[7px] border border-[#DBEAFE]">
                {upcomingClasses[0].room}
              </span>
            </div>
            <div className="mb-2">
              <h3 className="text-[16px] font-extrabold text-[#0F172A] tracking-tight leading-snug">
                {upcomingClasses[0].subject}
              </h3>
              <p className="text-[12px] font-medium text-[#64748B] mt-0.5">
                {upcomingClasses[0].grade || 'B.Sc AI/ML – 1st Year'}
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9] text-[12px]">
              <span className="font-medium text-[#64748B] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0075FF]" /> Time until start
              </span>
              <span className="font-bold text-[#0075FF] tabular-nums">
                {upcomingClasses[0].remainingLabel || 'Starting soon'}
              </span>
            </div>
          </div>
        ) : allClasses && allClasses.length > 0 ? (
          /* ALL CLASSES FINISHED FOR TODAY */
          <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-[18px] p-4.5 text-center shadow-xs apple-card">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-[15px] font-bold text-[#166534]">All Classes Finished Today</h3>
            <p className="text-[12px] text-[#15803D] mt-0.5">
              Great job! All scheduled lectures for today have concluded.
            </p>
          </div>
        ) : (
          /* NO CLASSES SCHEDULED TODAY */
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[18px] p-4.5 text-center shadow-xs apple-card">
            <p className="text-[14px] font-bold text-[#0F172A]">No Classes Scheduled Today</p>
            <p className="text-[12px] text-[#64748B] mt-0.5">
              Enjoy your holiday or revise topics from the Subjects tab.
            </p>
          </div>
        )}

        {/* UPCOMING CLASSES LIST */}
        {upcomingClasses && upcomingClasses.length > (ongoingClass ? 0 : 1) && (
          <div className="space-y-2.5 pt-1">
            <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider px-0.5">
              Upcoming Schedule
            </p>
            {(ongoingClass ? upcomingClasses : upcomingClasses.slice(1)).map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#EEF2F6] rounded-[16px] p-3.5 flex items-center justify-between shadow-card hover:shadow-card-hover apple-card"
              >
                {/* Left: Time Block */}
                <div className="w-[52px] shrink-0 text-center">
                  <p className="text-[14px] font-bold text-[#0F172A] leading-tight">
                    {item.startTime}
                  </p>
                  <p className="text-[11px] font-medium text-[#64748B] leading-tight mt-0.5">
                    to {item.endTime}
                  </p>
                </div>

                {/* Vertical subtle divider */}
                <div className="w-[1px] h-9 bg-[#E2E8F0] shrink-0 mx-2" />

                {/* Middle: Subject & Grade */}
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-[14.5px] font-bold text-[#0F172A] leading-snug truncate">
                    {item.subject}
                  </h4>
                  <p className="text-[12px] font-normal text-[#64748B] truncate mt-0.5">
                    {item.grade || 'B.Sc AI/ML – 1st Year'}
                  </p>
                </div>

                {/* Right: Room & Upcoming Badge */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="bg-[#F1F5F9] text-[#475569] text-[10.5px] font-semibold px-2 py-0.5 rounded-[6px]">
                    {item.room}
                  </span>
                  <div className="flex items-center gap-1 bg-[#F8FAFC] px-1.5 py-0.5 rounded-[6px]">
                    <Clock className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[10px] font-medium text-[#64748B] tabular-nums">
                      {item.remainingLabel || 'Upcoming'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* BOTTOM NAVIGATION: Unified standard 4-tab bar (Home, Classes, Subjects, Profile) */}
      {/* ======================================================== */}
      <BottomNav
        activeTab="home"
        isVisible={isNavVisible}
      />



      {/* ======================================================== */}
      {/* MODAL 2: Syllabus Modal */}
      {/* ======================================================== */}
      {activeModal === 'syllabus' && (
        <div className="absolute inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white dark:bg-[#131B2E] w-full rounded-t-[28px] sm:rounded-[24px] p-5 max-h-[82vh] overflow-y-auto apple-sheet border border-slate-100 dark:border-[#1E293B] shadow-2xl transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[10px] bg-[#EAF3FF] dark:bg-[#162238] text-[#0075FF] dark:text-[#3894FF] flex items-center justify-center">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">Course Syllabus</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {syllabusData.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#F8FAFC] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354] rounded-[14px]"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[14px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                      {item.subject}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-[6px] bg-slate-200/60 dark:bg-[#223354] text-slate-700 dark:text-[#94A3B8]">
                      {item.code}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11.5px] text-[#64748B] dark:text-[#94A3B8] mb-2">
                    <span>{item.units} Units Total</span>
                    <span className="font-bold text-[#0075FF] dark:text-[#3894FF]">{item.completed}% Completed</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E2E8F0] dark:bg-[#223354] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.completed}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: Important Topics Modal */}
      {/* ======================================================== */}
      {activeModal === 'important' && (
        <div className="absolute inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white dark:bg-[#131B2E] w-full rounded-t-[28px] sm:rounded-[24px] p-5 max-h-[85vh] overflow-y-auto apple-sheet border border-slate-100 dark:border-[#1E293B] shadow-2xl transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B] mb-3.5">
              <div>
                <h3 className="text-[19px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">Important Topics</h3>
                <p className="text-[12px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                  Semester 1 · B.Sc. (AI & ML)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {importantTopicsData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveModal(null);
                    navigate('/important-topics', { state: { role: 'student' } });
                  }}
                  className="p-3.5 bg-[#F8FAFC] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354] rounded-[18px] cursor-pointer hover:border-[#CBD5E1] dark:hover:border-[#2B3B59] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-11 h-11 rounded-[13px] flex items-center justify-center font-bold text-[14.5px] shrink-0 ${item.badgeBg} ${item.badgeText}`}
                    >
                      {item.code}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="text-[14px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                            {item.subject}
                          </h4>
                          <p className="text-[12px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                            {item.markedText}
                          </p>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-[#1A2640] border border-slate-200 dark:border-[#26354D] flex items-center justify-center text-[#64748B] dark:text-[#94A3B8] shrink-0">
                          <ChevronRight className="w-3.5 h-3.5 stroke-[2.2]" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 mt-2">
                        <div className="flex-1 h-1.5 bg-[#E2E8F0] dark:bg-[#1E293B] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${item.progressColor}`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className={`text-[12px] font-bold shrink-0 ${item.textColor}`}>
                          {item.progress}%
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 mt-1.5 text-[#64748B] dark:text-[#94A3B8]">
                        <FileText className="w-3 h-3 stroke-[2]" />
                        <span className="text-[11.5px] font-medium">{item.filesCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                navigate('/important-topics', { state: { role: 'student' } });
              }}
              className="w-full mt-4 h-11 rounded-[14px] bg-[#0075FF] hover:bg-[#0066E0] text-white font-bold text-[14px] cursor-pointer"
            >
              Open Full Screen
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: Lecture History Modal */}
      {/* ======================================================== */}
      {activeModal === 'history' && (
        <div className="absolute inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white dark:bg-[#131B2E] w-full rounded-t-[28px] sm:rounded-[24px] p-5 max-h-[82vh] overflow-y-auto apple-sheet border border-slate-100 dark:border-[#1E293B] shadow-2xl transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[10px] bg-[#EAF3FF] dark:bg-[#162238] text-[#0075FF] dark:text-[#3894FF] flex items-center justify-center">
                  <History className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">Lecture History</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {historyData.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-[#F8FAFC] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354] rounded-[14px]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[14px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                      {item.title}
                    </h4>
                    <span className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[12px] font-medium text-[#0075FF] dark:text-[#3894FF]">
                    {item.subject} • {item.faculty}
                  </p>
                  <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                    Conducted in {item.room}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
