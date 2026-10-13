import React, { useState, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Calendar,
  Clock,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useRealtimeTimetable } from '../hooks/useRealtimeTimetable';
import { getISTNow } from '../lib/timetableService';

export default function Timetable() {
  const navigate = useNavigate();
  const location = useLocation();
  const isStudent =
    location.state?.role === 'student' ||
    localStorage.getItem('classhere_role') === 'student';

  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollTopRef = useRef(0);

  // Current IST time info
  const initialIST = useMemo(() => getISTNow(), []);
  // Default selected day tab to today's weekday in IST (e.g. 'thu', 'fri')
  const defaultTab = initialIST.weekday.slice(0, 3).toLowerCase();
  const [selectedDay, setSelectedDay] = useState(defaultTab === 'sun' ? 'mon' : defaultTab);

  // Hook for the selected day's schedule with real-time status & progress
  const {
    istTime,
    ongoingClass,
    allClasses,
    isLoading,
  } = useRealtimeTimetable(selectedDay);

  const isSelectedToday =
    selectedDay.toLowerCase() === istTime.weekday.slice(0, 3).toLowerCase();

  // Compute dynamic Mon–Sat dates for the current week in IST
  const days = useMemo(() => {
    const d = new Date(istTime.rawDate);
    const dayOfWeek = d.getDay(); // 0 = Sun, 1 = Mon
    const distanceToMonday = (dayOfWeek + 6) % 7;
    const monday = new Date(d);
    monday.setDate(d.getDate() - distanceToMonday);

    const dayMeta = [
      { id: 'mon', day: 'Mon', offset: 0 },
      { id: 'tue', day: 'Tue', offset: 1 },
      { id: 'wed', day: 'Wed', offset: 2 },
      { id: 'thu', day: 'Thu', offset: 3 },
      { id: 'fri', day: 'Fri', offset: 4 },
      { id: 'sat', day: 'Sat', offset: 5 },
    ];

    return dayMeta.map((item) => {
      const target = new Date(monday);
      target.setDate(monday.getDate() + item.offset);
      const dateFormatted = target.toLocaleDateString('en-US', {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        month: 'short',
      });
      return {
        ...item,
        date: dateFormatted,
      };
    });
  }, [istTime.rawDate]);

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

  // Other classes excluding the ongoing class when selected day is today
  const nonOngoingClasses = allClasses.filter(
    (slot) => !isSelectedToday || !ongoingClass || slot.id !== ongoingClass.id
  );

  return (
    <div className="relative h-full flex flex-col bg-[#FBFBFD] dark:bg-[#0B0F19] transition-colors duration-200 select-none overflow-hidden">
      {/* Scrollable Container */}
      <div
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar px-5 sm:px-6 pt-4 pb-24 space-y-4"
      >
        {/* Header: Timetable Title & Subtitle */}
        <div className="pt-0.5">
          <h1 className="text-[25px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-none">
            Timetable
          </h1>
          <p className="text-[13.5px] font-medium text-[#64748B] dark:text-[#94A3B8] mt-1">
            Your class schedule for the week
          </p>
        </div>

        {/* Weekly Day Selector Tabs - Mon to Sat */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-5 px-5 sm:-mx-6 sm:px-6">
          {days.map((item) => {
            const isSelected = selectedDay === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedDay(item.id)}
                className={`flex flex-col items-center justify-center min-w-[56px] py-2.5 px-2 rounded-[13px] apple-tab cursor-pointer ${
                  isSelected
                    ? 'bg-[#0075FF] text-white shadow-md shadow-blue-500/25 font-bold'
                    : 'bg-[#F1F5F9] dark:bg-[#162036] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-slate-200/70 dark:hover:bg-[#1C2C47] font-semibold'
                }`}
              >
                <span
                  className={`text-[13px] leading-tight ${
                    isSelected ? 'text-white font-bold' : 'text-[#0F172A] dark:text-[#F8FAFC]'
                  }`}
                >
                  {item.day}
                </span>
                <span
                  className={`text-[10.5px] mt-0.5 leading-tight ${
                    isSelected ? 'text-white/90 font-medium' : 'text-[#64748B] dark:text-[#94A3B8]'
                  }`}
                >
                  {item.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Schedule List */}
        <div className="space-y-2.5 pt-1">
          {/* Ongoing Class Card (if selected day is today and a class is active) */}
          {isSelectedToday && ongoingClass && (
            <div className="relative bg-[#EEFAF2] dark:bg-[#0A2619] border border-[#CEEFDB] dark:border-[#165335] rounded-[16px] p-4 shadow-sm overflow-hidden apple-card">
              {/* Vibrant green left vertical accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10B981] rounded-l-[16px]" />

              {/* Status Header: Ongoing dot & Room badge */}
              <div className="flex items-center justify-between mb-2.5 pl-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] apple-live-pulse" />
                  <span className="text-[12.5px] font-bold text-[#15803D] dark:text-[#4ADE80]">
                    Ongoing
                  </span>
                  <span className="text-[12.5px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                    · {ongoingClass.startTime} to {ongoingClass.endTime}
                  </span>
                </div>
                <span className="bg-[#DCFCE7] dark:bg-[#14532D] text-[#166534] dark:text-[#86EFAC] text-[11px] font-semibold px-2.5 py-0.5 rounded-[6px]">
                  {ongoingClass.room}
                </span>
              </div>

              {/* Subject & Grade */}
              <div className="flex items-center justify-between gap-3 mb-3 pl-1">
                <div className="min-w-0 flex-1">
                  <h4 className="text-[16px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] truncate tracking-tight">
                    {ongoingClass.subject}
                  </h4>
                  <p className="text-[12px] font-medium text-[#64748B] dark:text-[#94A3B8] truncate mt-0.5">
                    {ongoingClass.grade}
                  </p>
                </div>

                {!isStudent && (
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
                )}
              </div>

              {/* Progress Bar & Time Left */}
              <div className="flex items-center gap-3 pl-1">
                <div className="flex-1 h-1.5 bg-[#D3EEDC] dark:bg-[#133E27] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#16A34A] dark:bg-[#22C55E] rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${ongoingClass.progress}%` }}
                  />
                </div>
                <span className="text-[12px] font-bold text-[#16A34A] dark:text-[#4ADE80] shrink-0 min-w-[70px] text-right tabular-nums">
                  {ongoingClass.remainingLabel}
                </span>
              </div>
            </div>
          )}

          {/* Classes List */}
          {nonOngoingClasses.length > 0 ? (
            nonOngoingClasses.map((item) => {
              const isFinished = isSelectedToday && item.status === 'finished';

              return (
                <div
                  key={item.id}
                  className={`bg-white dark:bg-[#131B2E] border rounded-[15px] p-3.5 flex items-center gap-3 shadow-card hover:shadow-card-hover apple-card ${
                    isFinished ? 'border-[#F1F5F9] dark:border-[#1A2234] opacity-80 dark:opacity-75' : 'border-[#EEF2F6] dark:border-[#1E293B]'
                  }`}
                >
                  {/* Time Column */}
                  <div className="w-[52px] shrink-0 text-center">
                    <p className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-tight">
                      {item.startTime}
                    </p>
                    <p className="text-[11px] font-medium text-[#64748B] dark:text-[#94A3B8] leading-tight">
                      to {item.endTime}
                    </p>
                  </div>

                  {/* Vertical divider */}
                  <div className="w-[1px] h-8 bg-[#E2E8F0] dark:bg-[#1E293B] shrink-0" />

                  {/* Subject & Grade */}
                  <div className="flex-1 min-w-0 pr-1">
                    <h5 className="text-[14.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                      {item.subject}
                    </h5>
                    <p className="text-[12px] font-normal text-[#64748B] dark:text-[#94A3B8] truncate mt-0.5">
                      {item.grade}
                    </p>
                  </div>

                  {/* Room & Status badges */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="bg-[#F1F5F9] dark:bg-[#162036] text-[#475569] dark:text-[#94A3B8] text-[10.5px] font-semibold px-2 py-0.5 rounded-[6px]">
                      {item.room}
                    </span>

                    {isFinished ? (
                      <div className="flex items-center gap-1 bg-[#F1F5F9] dark:bg-[#162036] px-1.5 py-0.5 rounded-[6px]">
                        <CheckCircle2 className="w-3 h-3 text-[#16A34A] dark:text-[#4ADE80]" />
                        <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                          Finished
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 bg-[#F8FAFC] dark:bg-[#162036] px-1.5 py-0.5 rounded-[6px]">
                        <Clock className="w-3 h-3 text-[#94A3B8] dark:text-[#64748B]" />
                        <span className="text-[10px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                          Upcoming
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white dark:bg-[#131B2E] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[16px] p-6 text-center text-[#64748B] dark:text-[#94A3B8]">
              <Calendar className="w-8 h-8 text-[#94A3B8] dark:text-[#64748B] mx-auto mb-2" />
              <p className="text-[14px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">No classes scheduled</p>
              <p className="text-[12px] mt-0.5">There are no classes scheduled for this day.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav activeTab="classes" isVisible={isNavVisible} />
    </div>
  );
}
