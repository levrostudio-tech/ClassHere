import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  User,
  FileText,
  List,
  CheckSquare,
  Paperclip,
  Edit3,
} from 'lucide-react';

export default function RecordClassSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve state passed from RecordClass screen or use realistic defaults
  const state = location.state || {};

  const summary = {
    subject: state.subject || 'Python Programming',
    grade: state.grade || 'B.Sc (AI & ML) • Semester 1',
    unit: state.unit || 'Unit 1 - Introduction to Python',
    selectedTopicsCount: state.selectedTopicsCount ?? 3,
    selectedTopicLabels: state.selectedTopicLabels || '1.1, 1.2, 1.4',
    status: state.status || 'Completed',
    filesCount: state.filesCount ?? 1,
  };

  const handleEdit = () => {
    // Navigate back to RecordClass with the existing state preserved
    navigate('/record-class', { state });
  };

  const handleGoDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="relative h-full flex flex-col bg-[#FBFBFD] dark:bg-[#0B0F19] transition-colors duration-200 select-none overflow-hidden">
      {/* Top App Header with Back button and centered ClassHere Logo */}
      <div className="shrink-0 px-5 sm:px-6 pt-3 pb-2 flex items-center justify-between border-b border-slate-100 dark:border-[#1E293B] bg-[#FBFBFD] dark:bg-[#0B0F19] z-30 transition-colors">
        <button
          type="button"
          onClick={handleGoDashboard}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#0F172A] dark:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-[#162036] active:scale-95 transition-all cursor-pointer"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.4]" />
        </button>

        <div className="font-extrabold text-[22px] tracking-tight">
          <span className="text-[#0F172A] dark:text-[#F8FAFC]">Class</span>
          <span className="text-[#0075FF] dark:text-[#3894FF]">Here</span>
        </div>

        {/* Spacer to keep logo centered */}
        <div className="w-9 h-9" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 sm:px-6 py-4 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Confetti & Success Checkmark Hero */}
          <div className="relative pt-4 pb-2 flex flex-col items-center">
            {/* Confetti Particles floating around */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Confetti element 1: Green diamond top-left */}
              <span className="absolute top-1 left-2 w-2.5 h-2.5 bg-[#10B981] rotate-45 rounded-[2px] animate-pulse" />
              {/* Confetti element 2: Yellow diamond top-right */}
              <span className="absolute top-3 right-3 w-3 h-3 bg-[#F59E0B] rotate-12 rounded-[2px]" />
              {/* Confetti element 3: Blue square left */}
              <span className="absolute top-12 -left-1 w-3 h-3 bg-[#0075FF] rotate-45 rounded-[2px]" />
              {/* Confetti element 4: Orange diamond right */}
              <span className="absolute top-11 -right-1 w-2.5 h-2.5 bg-[#F97316] rotate-12 rounded-[2px]" />
              {/* Confetti element 5: Purple polygon bottom-right */}
              <span className="absolute bottom-2 right-4 w-3.5 h-3.5 bg-[#A855F7] rotate-45 rounded-[3px]" />
              {/* Confetti element 6: Cyan dot top */}
              <span className="absolute top-0 right-10 w-2 h-2 bg-[#06B6D4] rounded-full" />
              {/* Confetti element 7: Blue dot bottom-left */}
              <span className="absolute bottom-3 left-4 w-2 h-2 bg-[#3B82F6] rounded-full" />
              {/* Confetti element 8: Emerald dot bottom */}
              <span className="absolute -bottom-1 left-12 w-2 h-2 bg-[#10B981] rounded-full" />

              {/* Main Green Checkmark Circle */}
              <div className="w-20 h-20 rounded-full bg-[#16A34A] flex items-center justify-center shadow-lg shadow-emerald-500/25 z-10 transition-transform hover:scale-105">
                <Check className="w-10 h-10 text-white stroke-[3.5]" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-[24px] sm:text-[25px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] text-center tracking-tight leading-tight mt-3">
              Class Recorded<br />Successfully!
            </h1>

            {/* Subtitle */}
            <p className="text-[13px] font-medium text-[#64748B] dark:text-[#94A3B8] text-center max-w-[270px] mt-1.5 leading-relaxed">
              Today’s class has been recorded and shared with students.
            </p>
          </div>

          {/* Class Summary Card */}
          <div className="bg-white dark:bg-[#131B2E] border border-[#EEF2F6] dark:border-[#1E293B] rounded-[20px] p-4.5 shadow-card space-y-4 transition-colors">
            {/* Header row with Edit Action */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-100/80 dark:border-[#1E293B]">
              <h2 className="text-[15px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                Class Summary
              </h2>
              <button
                type="button"
                onClick={handleEdit}
                className="flex items-center gap-1 text-[#0075FF] dark:text-[#3894FF] hover:text-blue-700 dark:hover:text-blue-400 text-[13px] font-bold cursor-pointer transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 stroke-[2.4]" />
                <span>Edit</span>
              </button>
            </div>

            {/* Detail Rows */}
            <div className="space-y-3.5">
              {/* Row 1: Subject */}
              <div className="flex items-center justify-between gap-3 text-[13px]">
                <div className="flex items-center gap-2.5 text-[#475569] dark:text-[#94A3B8] font-medium shrink-0">
                  <User className="w-4 h-4 text-[#475569] dark:text-[#94A3B8] stroke-[2.2]" />
                  <span>Subject</span>
                </div>
                <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-right truncate">
                  {summary.subject}
                </span>
              </div>

              {/* Row 2: Unit */}
              <div className="flex items-center justify-between gap-3 text-[13px]">
                <div className="flex items-center gap-2.5 text-[#475569] dark:text-[#94A3B8] font-medium shrink-0">
                  <FileText className="w-4 h-4 text-[#475569] dark:text-[#94A3B8] stroke-[2.2]" />
                  <span>Unit</span>
                </div>
                <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-right truncate">
                  {summary.unit}
                </span>
              </div>

              {/* Row 3: Topics */}
              <div className="flex items-center justify-between gap-3 text-[13px]">
                <div className="flex items-center gap-2.5 text-[#475569] dark:text-[#94A3B8] font-medium shrink-0">
                  <List className="w-4 h-4 text-[#475569] dark:text-[#94A3B8] stroke-[2.2]" />
                  <span>Topics ({summary.selectedTopicsCount})</span>
                </div>
                <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-right truncate">
                  {summary.selectedTopicLabels || 'None'}
                </span>
              </div>

              {/* Row 4: Status */}
              <div className="flex items-center justify-between gap-3 text-[13px]">
                <div className="flex items-center gap-2.5 text-[#475569] dark:text-[#94A3B8] font-medium shrink-0">
                  <CheckSquare className="w-4 h-4 text-[#475569] dark:text-[#94A3B8] stroke-[2.2]" />
                  <span>Status</span>
                </div>
                <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-right">
                  {summary.status}
                </span>
              </div>

              {/* Row 5: Files */}
              <div className="flex items-center justify-between gap-3 text-[13px]">
                <div className="flex items-center gap-2.5 text-[#475569] dark:text-[#94A3B8] font-medium shrink-0">
                  <Paperclip className="w-4 h-4 text-[#475569] dark:text-[#94A3B8] stroke-[2.2]" />
                  <span>Files</span>
                </div>
                <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-right">
                  {summary.filesCount === 1
                    ? '1 file uploaded'
                    : summary.filesCount > 1
                    ? `${summary.filesCount} files uploaded`
                    : 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Button: Go to Dashboard only */}
        <div className="pt-4 pb-4">
          <button
            type="button"
            onClick={handleGoDashboard}
            className="w-full py-3.5 bg-[#0075FF] hover:bg-blue-600 active:scale-[0.99] text-white font-bold text-[15px] rounded-[14px] shadow-sm transition-all cursor-pointer"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
