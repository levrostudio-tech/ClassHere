import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  FileText,
  ClipboardList,
  Users,
  BarChart3,
  BookOpen,
  Clock,
  CheckCircle2,
  User,
} from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useRealtimeTimetable } from '../hooks/useRealtimeTimetable';

export default function T4Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isStudent = location.state?.role === 'student' || !!location.state?.rollNumber;
  const displayName = isStudent ? (location.state?.rollNumber || 'Student') : 'Prof. Mehta';

  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollTopRef = useRef(0);

  // Hook connecting to real-time IST schedule & Supabase data
  const {
    istTime,
    ongoingClass,
    upcomingClasses,
    finishedClasses,
    allClasses,
    isLoading,
  } = useRealtimeTimetable();

  const handleScroll = (e) => {
    const currentScrollTop = e.target.scrollTop;
    const diff = currentScrollTop - lastScrollTopRef.current;

    // Ignore tiny scroll jitter
    if (Math.abs(diff) < 5) return;

    if (diff > 0 && currentScrollTop > 30) {
      // Scrolling DOWN: hide bottom navigation bar
      setIsNavVisible(false);
    } else if (diff < 0) {
      // Scrolling UP: reveal bottom navigation bar
      setIsNavVisible(true);
    }

    lastScrollTopRef.current = currentScrollTop;
  };

  // Other classes for today (excluding the currently ongoing class if featured above)
  const nonOngoingClasses = allClasses.filter(
    (slot) => !ongoingClass || slot.id !== ongoingClass.id
  );

  return (
    <div className="relative h-full flex flex-col bg-[#FBFBFD] select-none overflow-hidden">
      {/* Main scrollable body */}
      <div
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar px-5 sm:px-6 pt-3 pb-24 space-y-4"
      >
        {/* Top Header & Profile */}
        <div className="flex items-center justify-between pt-1 pb-1">
          <div className="font-extrabold text-[25px] tracking-tight">
            <span className="text-[#0F172A]">Class</span>
            <span className="text-[#0075FF]">Here</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-[#EBF3FE] border border-[#D0E2FB] flex items-center justify-center text-[#0075FF] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="View Profile"
          >
            <User className="w-5 h-5 fill-current" />
          </button>
        </div>

        {/* Greeting & Date selector */}
        <div className="flex items-end justify-between pt-1">
          <div>
            <p className="text-[13px] font-medium text-[#64748B]">{istTime.greeting}</p>
            <h2 className="text-[23px] font-extrabold text-[#0F172A] tracking-tight">
              {displayName}
            </h2>
          </div>

          <div
            onClick={() => navigate('/timetable')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded-[10px] cursor-pointer hover:bg-slate-200/60 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
            <span className="text-[12px] font-semibold text-[#475569]">
              {istTime.formattedDate}
            </span>
            <ChevronDown className="w-4 h-4 text-[#64748B]" />
          </div>
        </div>

        {/* 4 Quick Action Cards */}
        <div className="grid grid-cols-4 gap-2.5">
          {[
            { title: 'Add Notes', icon: FileText },
            { title: 'Add Test', icon: ClipboardList },
            { title: 'View Students', icon: Users },
            { title: 'My Subjects', icon: BarChart3, path: '/subjects' },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (action.path) navigate(action.path);
                }}
                className="flex flex-col items-center justify-center py-2.5 px-1 bg-[#F1F6FE] border border-[#E2EDFD] rounded-[14px] active:scale-95 hover:bg-[#E7F0FD] transition-all cursor-pointer"
              >
                <div className="text-[#0075FF] mb-1.5">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="text-[11px] font-bold text-[#0F172A] text-center leading-tight truncate w-full">
                  {action.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Today's Classes Header */}
        <div className="flex items-center justify-between pt-1">
          <h3 className="text-[18.5px] font-extrabold text-[#0F172A] tracking-tight">
            Today’s Classes
          </h3>
          <button
            type="button"
            onClick={() => navigate('/timetable')}
            className="flex items-center gap-0.5 px-2.5 py-1 bg-[#EFF6FF] rounded-full text-[#0075FF] text-[12px] font-bold hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <span>View Timetable</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* 1. ONGOING CLASS CARD (Rendered if currently in session) */}
        {ongoingClass ? (
          <div className="bg-[#EEFAF2] border border-[#CEEFDB] rounded-[16px] p-4 shadow-sm transition-all duration-300">
            {/* Top Status */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
                <span className="text-[12.5px] font-bold text-[#15803D]">Ongoing</span>
                <span className="text-[12.5px] font-medium text-[#64748B]">
                  · {ongoingClass.startTime} to {ongoingClass.endTime}
                </span>
              </div>
              <span className="bg-[#DCFCE7] text-[#166534] text-[11px] font-semibold px-2 py-0.5 rounded-[6px]">
                {ongoingClass.room}
              </span>
            </div>

            {/* Subject & Record Button */}
            <div className="flex items-center justify-between gap-3 mb-3.5">
              <div className="min-w-0 flex-1">
                <h4 className="text-[17px] font-extrabold text-[#0F172A] tracking-tight truncate">
                  {ongoingClass.subject}
                </h4>
                <p className="text-[12.5px] font-medium text-[#64748B] mt-0.5 truncate">
                  {ongoingClass.grade}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate('/record-class', {
                    state: {
                      subject: ongoingClass.subject,
                      grade: ongoingClass.grade,
                      room: ongoingClass.room,
                      time: `${ongoingClass.startTime} to ${ongoingClass.endTime}`,
                    },
                  })
                }
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-white text-[12px] font-bold shadow-record-btn active:scale-95 transition-all bg-[#EA3829] hover:bg-[#D93022] cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Record Class</span>
              </button>
            </div>

            {/* Automatic Real-Time Progress Bar & Time Left */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-[#D3EEDC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#16A34A] rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${ongoingClass.progress}%` }}
                />
              </div>

              {/* Time Left Text */}
              <span className="text-[12px] font-bold text-[#16A34A] shrink-0 min-w-[70px] text-right tabular-nums">
                {ongoingClass.remainingLabel}
              </span>
            </div>
          </div>
        ) : (
          /* Interval Notice when No Class is Currently in Session */
          upcomingClasses.length > 0 ? (
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] p-3.5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0075FF] shrink-0">
                  <Clock className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#0F172A] leading-tight truncate">
                    No class ongoing right now
                  </p>
                  <p className="text-[11.5px] font-medium text-[#64748B] mt-0.5 truncate">
                    Next: {upcomingClasses[0].subject} at {upcomingClasses[0].startTime}
                  </p>
                </div>
              </div>
              <span className="shrink-0 ml-2 text-[11px] font-bold text-[#0075FF] bg-[#EFF6FF] px-2.5 py-1 rounded-[8px]">
                Starts in {upcomingClasses[0].minutesLeft}m
              </span>
            </div>
          ) : (
            /* All Classes Finished for Today */
            <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-[16px] p-4 text-center shadow-xs">
              <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto mb-1.5">
                <CheckCircle2 className="w-4.5 h-4.5 stroke-[2.4]" />
              </div>
              <p className="text-[13.5px] font-extrabold text-[#0F172A]">
                All classes finished for today
              </p>
              <p className="text-[12px] font-medium text-[#64748B] mt-0.5">
                Today’s teaching schedule is complete.
              </p>
            </div>
          )
        )}

        {/* 2. Today's Classes List (Upcoming and Finished) */}
        <div className="space-y-2.5">
          {nonOngoingClasses.map((item) => {
            const isFinished = item.status === 'finished';

            return (
              <div
                key={item.id}
                className={`bg-white border rounded-[16px] p-3.5 flex items-center gap-3 shadow-card hover:shadow-card-hover transition-all ${
                  isFinished ? 'border-[#F1F5F9] opacity-80' : 'border-[#EEF2F6]'
                }`}
              >
                {/* Time Column */}
                <div className="w-14 shrink-0">
                  <p className="text-[13.5px] font-bold text-[#0F172A] leading-tight">
                    {item.startTime}
                  </p>
                  <p className="text-[11px] font-medium text-[#64748B] leading-tight">
                    to {item.endTime}
                  </p>
                </div>

                {/* Vertical divider */}
                <div className="w-[1px] h-9 bg-[#E2E8F0] shrink-0" />

                {/* Subject & Grade */}
                <div className="flex-1 min-w-0">
                  <h5 className="text-[15px] font-bold text-[#0F172A] truncate">
                    {item.subject}
                  </h5>
                  <p className="text-[12px] font-normal text-[#64748B] truncate mt-0.5">
                    {item.grade}
                  </p>
                </div>

                {/* Room & Status Badge */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="bg-[#F1F5F9] text-[#475569] text-[10.5px] font-semibold px-2 py-0.5 rounded-[6px]">
                    {item.room}
                  </span>

                  {isFinished ? (
                    <div className="flex items-center gap-1 bg-[#F1F5F9] px-1.5 py-0.5 rounded-[6px]">
                      <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                      <span className="text-[10.5px] font-semibold text-[#64748B]">
                        Finished
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-[#F8FAFC] px-1.5 py-0.5 rounded-[6px]">
                      <Clock className="w-3 h-3 text-[#94A3B8]" />
                      <span className="text-[10.5px] font-medium text-[#64748B]">
                        Upcoming
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav activeTab="home" isVisible={isNavVisible} />
    </div>
  );
}
