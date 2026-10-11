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

  // Active modal state: 'notes' | 'syllabus' | 'important' | 'history' | 'students' | 'profile' | null
  const [activeModal, setActiveModal] = useState(null);

  // Search query within modals
  const [modalSearch, setModalSearch] = useState('');

  // Handle student name passed in navigation state, default to "Prof. Mehta" matching the reference mockup
  const studentName = location.state?.studentName || location.state?.name || 'Prof. Mehta';

  // Real-time IST timetable hook for Thursday / current weekday
  const {
    istTime,
    ongoingClass,
    upcomingClasses,
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

  // Student specific mock data for the 4 action items
  const notesData = [
    { id: 1, title: 'Unit 2: Active & Passive Voice', subject: 'English Communication', date: 'Yesterday', pages: '8 pages', size: '1.4 MB' },
    { id: 2, title: 'Lists, Tuples & Dictionaries in Python', subject: 'Python', date: '08 Oct', pages: '14 pages', size: '2.8 MB' },
    { id: 3, title: 'Eigenvalues & Diagonalization Notes', subject: 'Mathematics', date: '06 Oct', pages: '11 pages', size: '2.1 MB' },
    { id: 4, title: 'CPU Architecture & Memory Hierarchy', subject: 'Computer Fundamentals', date: '04 Oct', pages: '19 pages', size: '3.5 MB' },
  ];

  const syllabusData = [
    { subject: 'English Communication', code: 'EC-101', units: 4, completed: 65, color: '#0075FF' },
    { subject: 'Python Programming', code: 'CS-102', units: 5, completed: 48, color: '#10B981' },
    { subject: 'Mathematics (Discrete & Linear)', code: 'MA-103', units: 5, completed: 52, color: '#8B5CF6' },
    { subject: 'Computer Fundamentals', code: 'CS-104', units: 4, completed: 40, color: '#F59E0B' },
    { subject: 'Python Lab', code: 'CS-102L', units: 10, completed: 70, color: '#EC4899' },
  ];

  const importantTopicsData = [
    { id: 1, topic: 'Mastering Pointers & Recursion in Lab', subject: 'Computer Fundamentals', weightage: 'High (15 Marks)' },
    { id: 2, topic: 'Rank of Matrices & System of Equations', subject: 'Mathematics', weightage: 'Very High (20 Marks)' },
    { id: 3, topic: 'List Comprehensions & Lambda Functions', subject: 'Python', weightage: 'Medium (10 Marks)' },
    { id: 4, topic: 'Formal Letter & Report Writing Formats', subject: 'English Communication', weightage: 'High (15 Marks)' },
  ];

  const historyData = [
    { id: 1, title: 'Introduction to Functions & Scope', subject: 'Python', time: 'Yesterday, 10:00 AM', room: 'Room 204', faculty: 'Dr. Aman Sharma' },
    { id: 2, title: 'Matrix Inverses & Cramer\'s Rule', subject: 'Mathematics', time: '08 Oct, 11:00 AM', room: 'Room 108', faculty: 'Dr. Neha Verma' },
    { id: 3, title: 'Von Neumann Architecture Details', subject: 'Computer Fundamentals', time: '07 Oct, 12:00 PM', room: 'Room 108', faculty: 'Prof. Rajiv Kapoor' },
    { id: 4, title: 'Phonetics & Pronunciation Workshop', subject: 'English Communication', time: '06 Oct, 9:00 AM', room: 'Room 101', faculty: 'Mrs. Simran Kaur' },
  ];



  // Specific student classes mirroring the user's reference screenshot:
  // Ongoing: English Communication (9:00 to 9:55) Room 101, B.Sc AI/ML – 1st Year, 32 min left
  // Upcoming: Python (10:00 to 10:55, Room 204), Mathematics (11:00 to 11:55, Room 108),
  // Computer Fundamentals (12:00 to 12:55, Room 108), Lab (2:00 to 4:00, Lab 2)
  const studentOngoingClass = ongoingClass || {
    subject: 'English Communication',
    grade: 'B.Sc AI/ML – 1st Year',
    room: 'Room 101',
    startTime: '9:00',
    endTime: '9:55',
    progress: 42,
    remainingLabel: '32 min left',
  };

  const studentUpcomingClasses = (upcomingClasses && upcomingClasses.length > 0) ? upcomingClasses : [
    { id: 'sub-1', startTime: '10:00', endTime: '10:55', subject: 'Python', grade: 'B.Sc AI/ML – 1st Year', room: 'Room 204' },
    { id: 'sub-2', startTime: '11:00', endTime: '11:55', subject: 'Mathematics', grade: 'B.Sc AI/ML – 1st Year', room: 'Room 108' },
    { id: 'sub-3', startTime: '12:00', endTime: '12:55', subject: 'Computer Fundamentals', grade: 'B.Sc AI/ML – 1st Year', room: 'Room 108' },
    { id: 'sub-4', startTime: '2:00', endTime: '4:00', subject: 'Lab', grade: 'B.Sc AI/ML – 1st Year', room: 'Lab 2' },
  ];

  return (
    <div className="relative h-full flex flex-col bg-[#FDFDFE] select-none overflow-hidden font-sans">
      {/* Scrollable Container */}
      <div
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-5 sm:px-6 pt-3 pb-24 no-scrollbar space-y-4"
      >
        {/* ======================================================== */}
        {/* TOP BAR: ClassHere Brand Logo + User Avatar Pill (PM) */}
        {/* ======================================================== */}
        <header className="flex items-center justify-between pt-1">
          <div className="flex items-center">
            <span className="text-[25px] font-black tracking-tight text-[#0F172A]">
              Class
            </span>
            <span className="text-[25px] font-black tracking-tight text-[#0075FF]">
              Here
            </span>
          </div>

          {/* User Profile Avatar Pill (PM) */}
          <button
            type="button"
            onClick={() => setActiveModal('profile')}
            className="w-10 h-10 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] font-bold text-[13.5px] hover:bg-slate-200/70 active:scale-95 transition-all cursor-pointer shadow-xs"
            aria-label="Student Profile"
          >
            PM
          </button>
        </header>

        {/* ======================================================== */}
        {/* GREETING & DATE ROW */}
        {/* ======================================================== */}
        <div className="flex items-end justify-between pt-0.5">
          <div>
            <p className="text-[13px] font-medium text-[#64748B] leading-none mb-1">
              {istTime.greeting || 'Good morning,'}
            </p>
            <h1 className="text-[23px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
              {studentName}
            </h1>
          </div>

          {/* Date Selector Pill */}
          <div
            onClick={() => navigate('/timetable')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0F6FE] border border-[#E2EDFD] rounded-[11px] cursor-pointer hover:bg-blue-100/60 transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0075FF]" />
            <span className="text-[12px] font-bold text-[#334155]">
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
                onClick={() => setActiveModal(action.id)}
                className="flex flex-col items-center justify-center py-3 px-1 bg-[#F1F6FE] border border-[#E2EDFD] rounded-[16px] active:scale-95 hover:bg-[#E7F0FD] transition-all cursor-pointer shadow-xs group"
              >
                <div className="text-[#0075FF] mb-1.5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5.5 h-5.5 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-[#0F172A] text-center leading-tight whitespace-normal break-words h-7 flex items-center justify-center w-full px-0.5">
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
          <h2 className="text-[19px] font-extrabold text-[#0F172A] tracking-tight">
            Today’s Classes
          </h2>
          <button
            type="button"
            onClick={() => navigate('/timetable')}
            className="flex items-center gap-0.5 px-3 py-1 bg-[#EFF6FF] rounded-full text-[#0075FF] text-[12px] font-bold hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <span>View Timetable</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* ONGOING CLASS CARD (English Communication) */}
        {/* ======================================================== */}
        <div className="bg-[#EEFAF2] border border-[#CEEFDB] rounded-[18px] p-4 shadow-sm transition-all duration-300 relative overflow-hidden">
          {/* Status Row */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
              <span className="text-[13px] font-bold text-[#15803D]">Ongoing</span>
              <span className="text-[12.5px] font-medium text-[#64748B]">
                · {studentOngoingClass.startTime} to {studentOngoingClass.endTime}
              </span>
            </div>
            <span className="bg-[#DCFCE7] text-[#166534] text-[11px] font-bold px-2.5 py-0.5 rounded-[7px]">
              {studentOngoingClass.room}
            </span>
          </div>

          {/* Subject & Grade */}
          <div className="mb-3">
            <h3 className="text-[17px] font-extrabold text-[#0F172A] tracking-tight leading-snug">
              {studentOngoingClass.subject}
            </h3>
            <p className="text-[12.5px] font-medium text-[#64748B] mt-0.5">
              {studentOngoingClass.grade}
            </p>
          </div>

          {/* Progress Bar & Time Left */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-[#D3EEDC] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#16A34A] rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${studentOngoingClass.progress || 42}%` }}
              />
            </div>
            <span className="text-[12px] font-bold text-[#16A34A] shrink-0 text-right tabular-nums">
              {studentOngoingClass.remainingLabel || '32 min left'}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* UPCOMING CLASSES LIST */}
        {/* ======================================================== */}
        <div className="space-y-2.5 pt-0.5">
          {studentUpcomingClasses.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#EEF2F6] rounded-[16px] p-3.5 flex items-center justify-between shadow-card hover:shadow-card-hover transition-all"
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
                  {item.grade}
                </p>
              </div>

              {/* Right: Room & Upcoming Badge */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="bg-[#F1F5F9] text-[#475569] text-[10.5px] font-semibold px-2 py-0.5 rounded-[6px]">
                  {item.room}
                </span>
                <div className="flex items-center gap-1 bg-[#F8FAFC] px-1.5 py-0.5 rounded-[6px]">
                  <Clock className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[10px] font-medium text-[#64748B]">
                    Upcoming
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM NAVIGATION: Unified standard 4-tab bar (Home, Classes, Subjects, Profile) */}
      {/* ======================================================== */}
      <BottomNav
        activeTab="home"
        isVisible={isNavVisible}
      />

      {/* ======================================================== */}
      {/* MODAL 1: Notes Modal */}
      {/* ======================================================== */}
      {activeModal === 'notes' && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fadeIn">
          <div className="bg-white w-full rounded-t-[28px] sm:rounded-[24px] p-5 max-h-[82vh] overflow-y-auto animate-slideUp border border-slate-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[10px] bg-[#EAF3FF] text-[#0075FF] flex items-center justify-center">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-[18px] font-bold text-[#0F172A]">Class Notes</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {notesData.map((note) => (
                <div
                  key={note.id}
                  className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px] flex items-center justify-between hover:bg-blue-50/50 transition-colors"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <h4 className="text-[14px] font-bold text-[#0F172A] leading-snug truncate">
                      {note.title}
                    </h4>
                    <p className="text-[12px] font-medium text-[#0075FF] mt-0.5">
                      {note.subject}
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      {note.date} • {note.pages} • {note.size}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="p-2 bg-[#EAF3FF] hover:bg-[#DBEAFE] text-[#0075FF] rounded-[10px] cursor-pointer transition-colors shrink-0"
                    title="Download Note"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: Syllabus Modal */}
      {/* ======================================================== */}
      {activeModal === 'syllabus' && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fadeIn">
          <div className="bg-white w-full rounded-t-[28px] sm:rounded-[24px] p-5 max-h-[82vh] overflow-y-auto animate-slideUp border border-slate-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[10px] bg-[#EAF3FF] text-[#0075FF] flex items-center justify-center">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-[18px] font-bold text-[#0F172A]">Course Syllabus</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {syllabusData.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px]"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[14px] font-bold text-[#0F172A]">
                      {item.subject}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-[6px] bg-slate-200/60 text-slate-700">
                      {item.code}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11.5px] text-[#64748B] mb-2">
                    <span>{item.units} Units Total</span>
                    <span className="font-bold text-[#0075FF]">{item.completed}% Completed</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
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
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fadeIn">
          <div className="bg-white w-full rounded-t-[28px] sm:rounded-[24px] p-5 max-h-[82vh] overflow-y-auto animate-slideUp border border-slate-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[10px] bg-[#FFFBEB] text-[#D97706] flex items-center justify-center">
                  <Star className="w-4.5 h-4.5 fill-current" />
                </div>
                <h3 className="text-[18px] font-bold text-[#0F172A]">Important Topics</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {importantTopicsData.map((top) => (
                <div
                  key={top.id}
                  className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-[13.5px] font-bold text-[#0F172A] leading-snug">
                      {top.topic}
                    </h4>
                    <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-[6px] bg-[#FEF3C7] text-[#B45309] shrink-0">
                      {top.weightage}
                    </span>
                  </div>
                  <p className="text-[12px] font-medium text-[#0075FF] mt-1">
                    {top.subject}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: Lecture History Modal */}
      {/* ======================================================== */}
      {activeModal === 'history' && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fadeIn">
          <div className="bg-white w-full rounded-t-[28px] sm:rounded-[24px] p-5 max-h-[82vh] overflow-y-auto animate-slideUp border border-slate-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[10px] bg-[#EAF3FF] text-[#0075FF] flex items-center justify-center">
                  <History className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-[18px] font-bold text-[#0F172A]">Lecture History</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {historyData.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[14px] font-bold text-[#0F172A] leading-snug">
                      {item.title}
                    </h4>
                    <span className="text-[11px] font-semibold text-[#64748B]">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[12px] font-medium text-[#0075FF]">
                    {item.subject} • {item.faculty}
                  </p>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Conducted in {item.room}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}



      {/* ======================================================== */}
      {/* MODAL 6: Student Profile Modal */}
      {/* ======================================================== */}
      {activeModal === 'profile' && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fadeIn">
          <div className="bg-white w-full rounded-t-[28px] sm:rounded-[24px] p-5 max-h-[82vh] overflow-y-auto animate-slideUp border border-slate-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-[18px] font-bold text-[#0F172A]">Student Profile</h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center py-2 mb-4">
              <div className="w-16 h-16 rounded-full bg-[#EBF3FE] border-2 border-[#0075FF] text-[#0075FF] font-black text-[22px] flex items-center justify-center mb-2 shadow-sm">
                PM
              </div>
              <h4 className="text-[18px] font-bold text-[#0F172A]">{studentName}</h4>
              <p className="text-[13px] text-[#64748B] mt-0.5">Roll No: 22BCA015</p>
              <span className="text-[11px] font-bold bg-[#EAF3FF] text-[#0075FF] px-2.5 py-1 rounded-full mt-2">
                B.Sc AI/ML – 1st Year
              </span>
            </div>

            <div className="space-y-2 mb-5">
              <div className="p-3 bg-[#F8FAFC] rounded-[12px] flex justify-between text-[13px]">
                <span className="text-[#64748B]">Department</span>
                <span className="font-bold text-[#0F172A]">Computer Science</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-[12px] flex justify-between text-[13px]">
                <span className="text-[#64748B]">College</span>
                <span className="font-bold text-[#0F172A]">DAV College, Amritsar</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-[12px] flex justify-between text-[13px]">
                <span className="text-[#64748B]">Attendance Rate</span>
                <span className="font-bold text-[#16A34A]">91.5%</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                navigate('/');
              }}
              className="w-full py-3 bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] font-bold rounded-[14px] text-[14px] transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
