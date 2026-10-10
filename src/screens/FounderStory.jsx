import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Users,
  BarChart3,
  GraduationCap,
  ShieldCheck,
  FileCode,
  Calendar,
  ClipboardList,
} from 'lucide-react';
import founderAvatar from '../assets/founder_avatar.png';

export default function FounderStory() {
  const navigate = useNavigate();

  return (
    <div className="relative h-full flex flex-col bg-[#FDFDFE] select-none overflow-hidden font-sans">
      {/* Top Header Bar */}
      <header className="shrink-0 h-14 px-5 sm:px-6 flex items-center justify-between border-b border-[#F1F5F9] bg-white/95 backdrop-blur-md z-20">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-10 h-10 -ml-1 rounded-[14px] flex items-center justify-center text-[#0F172A] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        <h1 className="text-[17.5px] font-bold text-[#0F172A] tracking-tight">
          About this app
        </h1>

        <div className="w-10" />
      </header>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-6 pt-4 pb-12 space-y-4 no-scrollbar relative z-10">
        {/* 1. Hero Banner Card (100% Vector & Crisp Typography) */}
        <div className="relative w-full rounded-[24px] bg-gradient-to-br from-[#EEF6FF] via-[#E6F2FE] to-[#DAECFD] border border-[#CFE2FA] p-5 shadow-[0_4px_20px_rgba(0,117,255,0.06)] overflow-hidden">
          {/* Soft background radial glows */}
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#BEE0FD]/50 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/70 blur-xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between gap-3">
            {/* Left Column: Brand & Info */}
            <div className="min-w-0 max-w-[190px]">
              {/* Graduation Cap Badge */}
              <div className="w-12 h-12 rounded-[16px] bg-[#0075FF] text-white flex items-center justify-center shadow-lg shadow-blue-500/25 mb-3.5">
                <GraduationCap className="w-7 h-7 stroke-[2.2]" />
              </div>

              {/* Brand Title */}
              <div className="text-[25px] font-extrabold tracking-tight leading-none mb-1.5">
                <span className="text-[#0F172A]">Class</span>
                <span className="text-[#0075FF]">Here</span>
              </div>

              {/* Subtitle */}
              <p className="text-[12.5px] font-medium text-[#475569] leading-snug mb-3">
                All your academic information.<br />One place.
              </p>

              {/* Levro Studio Pill */}
              <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#D8EAFE] border border-[#C5DFFD] text-[11px] font-semibold text-[#334155]">
                A product by Levro Studio
              </div>
            </div>

            {/* Right Column: Floating 3D Academic Cards (Vector UI) */}
            <div className="relative w-[145px] h-[155px] shrink-0">
              {/* Card 1: Class Schedule (Top-Left) */}
              <div className="absolute top-0 left-0 bg-white border border-[#E2E8F0] rounded-[13px] px-2.5 py-2 shadow-md shadow-slate-200/50 flex items-center gap-1.5 -rotate-6 z-10">
                <div className="w-6 h-6 rounded-[7px] bg-[#EFF6FF] flex items-center justify-center text-[#0075FF] shrink-0">
                  <Calendar className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-extrabold text-[#0F172A] whitespace-nowrap">
                  Class Schedule
                </span>
              </div>

              {/* Card 2: Notes (Top-Right) */}
              <div className="absolute top-4 right-0 bg-[#E8FAF0] border border-[#CEF3DE] rounded-[13px] p-2 shadow-md shadow-emerald-500/10 flex flex-col items-center justify-center w-[58px] rotate-6 z-20">
                <div className="w-6 h-6 rounded-[7px] bg-[#10B981] text-white flex items-center justify-center shrink-0 mb-0.5">
                  <FileText className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-extrabold text-[#15803D]">
                  Notes
                </span>
              </div>

              {/* Card 3: Assignments (Bottom-Left) */}
              <div className="absolute bottom-2 left-1 bg-[#F5EEFE] border border-[#E4D4FC] rounded-[13px] p-2 shadow-md shadow-purple-500/10 flex flex-col items-center justify-center w-[68px] -rotate-3 z-30">
                <div className="w-6 h-6 rounded-[7px] bg-[#9333EA] text-white flex items-center justify-center shrink-0 mb-0.5">
                  <ClipboardList className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <span className="text-[9.5px] font-extrabold text-[#7E22CE]">
                  Assignments
                </span>
              </div>

              {/* Card 4: Attendance (Bottom-Right) */}
              <div className="absolute bottom-0 right-0 bg-[#FEF6E8] border border-[#FDEBC7] rounded-[13px] p-2 shadow-md shadow-amber-500/10 flex flex-col items-center justify-center w-[62px] rotate-8 z-30">
                <div className="w-6 h-6 rounded-[7px] bg-[#F59E0B] text-white flex items-center justify-center shrink-0 mb-0.5">
                  <BarChart3 className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <span className="text-[9.5px] font-extrabold text-[#B45309]">
                  Attendance
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. What is ClassHere? Card (100% Vector & Crisp Typography) */}
        <div className="relative w-full rounded-[24px] bg-white border border-[#E2E8F0] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Soft background blue glow on the right */}
          <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-gradient-to-l from-[#EFF6FF] via-[#F5F9FF] to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between gap-3">
            {/* Left Column: Text Content */}
            <div className="min-w-0 max-w-[205px]">
              <h2 className="text-[20px] font-extrabold text-[#0F172A] tracking-tight leading-snug mb-1.5">
                What is ClassHere?
              </h2>
              <p className="text-[12.5px] font-medium text-[#64748B] leading-relaxed">
                A simple platform for college students and teachers to access classes, timetables, notes, assignments, attendance and more.
              </p>
            </div>

            {/* Right Column: Sleek Vector Mobile Mockup */}
            <div className="relative w-[125px] h-[135px] shrink-0 overflow-hidden">
              <div className="absolute -right-3 -top-2 w-[130px] h-[155px] bg-white rounded-l-[24px] border-l-2 border-t-2 border-[#DCE8F8] shadow-[-8px_10px_24px_rgba(0,117,255,0.08)] p-2.5 flex flex-col">
                {/* Phone Speaker Pill */}
                <div className="w-9 h-1.5 bg-[#0075FF] rounded-full mx-auto mb-2.5 shrink-0" />

                {/* Screen Item 1: Blue Circle Avatar */}
                <div className="flex items-center gap-2 mb-2 px-1">
                  <div className="w-4 h-4 rounded-full bg-[#0075FF] shrink-0" />
                  <div className="w-12 h-2 bg-[#E2E8F0] rounded-full" />
                </div>

                {/* Screen Item 2: Cyan Pill + Arrow */}
                <div className="flex items-center justify-between bg-[#F8FAFC] rounded-[8px] p-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-2.5 rounded-[3px] bg-[#06B6D4] shrink-0" />
                    <div className="w-8 h-1.5 bg-[#CBD5E1] rounded-full" />
                  </div>
                  <ChevronRight className="w-3 h-3 text-[#0075FF] stroke-[2.5]" />
                </div>

                {/* Screen Item 3: Green Pill + Arrow */}
                <div className="flex items-center justify-between bg-[#F8FAFC] rounded-[8px] p-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-2.5 rounded-[3px] bg-[#10B981] shrink-0" />
                    <div className="w-9 h-1.5 bg-[#CBD5E1] rounded-full" />
                  </div>
                  <ChevronRight className="w-3 h-3 text-[#0075FF] stroke-[2.5]" />
                </div>

                {/* Screen Item 4: Purple Pill */}
                <div className="flex items-center justify-between bg-[#F8FAFC] rounded-[8px] p-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-2.5 rounded-[3px] bg-[#A855F7] shrink-0" />
                    <div className="w-7 h-1.5 bg-[#CBD5E1] rounded-full" />
                  </div>
                  <ChevronRight className="w-3 h-3 text-[#0075FF] stroke-[2.5]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Why ClassHere? Section */}
        <div className="pt-1">
          <h2 className="text-[21px] font-extrabold text-[#0F172A] tracking-tight mb-3">
            Why ClassHere?
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {/* Feature 1: Stay Organized */}
            <div className="bg-white rounded-[20px] p-3.5 border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="w-10 h-10 rounded-[12px] bg-[#EFF6FF] flex items-center justify-center text-[#0075FF] shrink-0 mb-2.5">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-[14.5px] font-bold text-[#0F172A] leading-tight">
                  Stay Organized
                </h3>
                <p className="text-[11.5px] font-medium text-[#64748B] mt-1 leading-snug">
                  Classes, notes, timetable and more.
                </p>
              </div>
            </div>

            {/* Feature 2: Better Communication */}
            <div className="bg-white rounded-[20px] p-3.5 border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="w-10 h-10 rounded-[12px] bg-[#F0FDF4] flex items-center justify-center text-[#16A34A] shrink-0 mb-2.5">
                <Users className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-[14.5px] font-bold text-[#0F172A] leading-tight">
                  Better Communication
                </h3>
                <p className="text-[11.5px] font-medium text-[#64748B] mt-1 leading-snug">
                  Get updates from your college.
                </p>
              </div>
            </div>

            {/* Feature 3: Track Progress */}
            <div className="bg-white rounded-[20px] p-3.5 border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="w-10 h-10 rounded-[12px] bg-[#FAF5FF] flex items-center justify-center text-[#9333EA] shrink-0 mb-2.5">
                <BarChart3 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-[14.5px] font-bold text-[#0F172A] leading-tight">
                  Track Progress
                </h3>
                <p className="text-[11.5px] font-medium text-[#64748B] mt-1 leading-snug">
                  Attendance, tests and assignments.
                </p>
              </div>
            </div>

            {/* Feature 4: Built for Colleges */}
            <div className="bg-white rounded-[20px] p-3.5 border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="w-10 h-10 rounded-[12px] bg-[#FFF7ED] flex items-center justify-center text-[#EA580C] shrink-0 mb-2.5">
                <GraduationCap className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-[14.5px] font-bold text-[#0F172A] leading-tight">
                  Built for Colleges
                </h3>
                <p className="text-[11.5px] font-medium text-[#64748B] mt-1 leading-snug">
                  Made for students and teachers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Founder Story Card */}
        <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-5 shadow-[0_3px_14px_rgba(0,0,0,0.02)]">
          <h2 className="text-[20px] font-extrabold text-[#0F172A] tracking-tight mb-3.5">
            Founder Story
          </h2>

          <div className="flex items-start">
            {/* Founder Avatar */}
            <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden shrink-0 border-2 border-[#EBF3FE] shadow-sm bg-[#EBF3FE]">
              <img
                src={founderAvatar}
                alt="Vansh - Founder of ClassHere"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Vertical Divider */}
            <div className="w-[1.5px] bg-[#E2E8F0] self-stretch mx-3 sm:mx-3.5 shrink-0 my-1" />

            {/* Quote and Attribution */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <p className="text-[12.5px] sm:text-[13px] text-[#475569] leading-relaxed font-medium">
                I built ClassHere because I had to join multiple WhatsApp groups for
                different subjects just to keep up with college. Important
                information was scattered everywhere, so I created ClassHere to
                bring it all together in one place.
              </p>

              <div className="mt-2.5">
                <span className="text-[14px] font-bold text-[#0F172A] block leading-tight">
                  — Vansh
                </span>
                <span className="text-[12px] font-medium text-[#64748B] block mt-0.5 leading-tight">
                  Founder, Levro Studio
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Policy Links */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <Link
            to="/privacy-policy"
            className="flex items-center justify-center gap-1.5 py-3 rounded-[16px] bg-white border border-[#E2E8F0] text-[#0075FF] font-bold text-[13px] hover:bg-[#F8FAFC] transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Policy</span>
          </Link>
          <Link
            to="/terms-of-use"
            className="flex items-center justify-center gap-1.5 py-3 rounded-[16px] bg-white border border-[#E2E8F0] text-[#0075FF] font-bold text-[13px] hover:bg-[#F8FAFC] transition-colors"
          >
            <FileCode className="w-4 h-4" />
            <span>Terms of Use</span>
          </Link>
        </div>

        {/* Levro Studio Footer Note */}
        <div className="text-center pt-2 pb-4">
          <p className="text-[12px] text-[#94A3B8] font-medium">
            ClassHere • A Product by <span className="font-bold text-[#64748B]">Levro Studio</span>
          </p>
        </div>
      </div>

      {/* Decorative Bottom Background Blobs */}
      <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-[#EBF3FE]/70 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#E0EEFD]/60 blur-3xl pointer-events-none" />
    </div>
  );
}
