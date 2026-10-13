import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Sun,
  Moon,
  X,
  Star,
  Download,
  BookOpen,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function StudentImportantTopics() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  // Selected subject for detail sheet
  const [selectedSubject, setSelectedSubject] = useState(null);

  // 6 Subjects matching the reference mockup
  const importantSubjects = [
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
      topics: [
        { id: 1, title: 'Object Oriented Programming & Classes', weightage: '15 Marks', unit: 'Unit 4' },
        { id: 2, title: 'List Comprehensions & Lambda Functions', weightage: '10 Marks', unit: 'Unit 2' },
        { id: 3, title: 'Exception Handling & Custom Errors', weightage: '10 Marks', unit: 'Unit 3' },
        { id: 4, title: 'File Handling & Data Serialization', weightage: '8 Marks', unit: 'Unit 3' },
      ],
      files: [
        { name: 'Python_OOP_Important_Questions.pdf', size: '1.8 MB' },
        { name: 'Python_Syntax_CheatSheet.pdf', size: '920 KB' },
        { name: 'Exception_Handling_Solved_Papers.pdf', size: '2.1 MB' },
      ],
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
      topics: [
        { id: 1, title: 'Eigenvalues & Diagonalization', weightage: '20 Marks', unit: 'Unit 1' },
        { id: 2, title: 'Rank of Matrices & Linear Systems', weightage: '15 Marks', unit: 'Unit 1' },
        { id: 3, title: 'Recurrence Relations & Graph Theory', weightage: '15 Marks', unit: 'Unit 3' },
      ],
      files: [
        { name: 'Eigenvalues_StepByStep_Solutions.pdf', size: '2.4 MB' },
        { name: 'Matrix_Rank_Formula_Sheet.pdf', size: '1.1 MB' },
      ],
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
      topics: [
        { id: 1, title: 'Von Neumann Architecture & CPU Hierarchy', weightage: '15 Marks', unit: 'Unit 1' },
        { id: 2, title: 'Cache Memory Mapping & Virtual Memory', weightage: '12 Marks', unit: 'Unit 2' },
      ],
      files: [
        { name: 'Von_Neumann_Diagram_Explained.pdf', size: '1.5 MB' },
        { name: 'Memory_Hierarchy_Notes.pdf', size: '1.9 MB' },
      ],
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
      topics: [
        { id: 1, title: 'Formal Letter & Business Report Writing', weightage: '15 Marks', unit: 'Unit 2' },
        { id: 2, title: 'Phonetic Transcription & Intonation', weightage: '10 Marks', unit: 'Unit 1' },
        { id: 3, title: 'Reading Comprehension & Précis Writing', weightage: '10 Marks', unit: 'Unit 3' },
      ],
      files: [
        { name: 'Report_Writing_Sample_Templates.pdf', size: '1.3 MB' },
        { name: 'Phonetics_Symbols_Guide.pdf', size: '850 KB' },
      ],
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
      topics: [
        { id: 1, title: 'TCP/IP Architecture vs OSI Model', weightage: '15 Marks', unit: 'Unit 1' },
        { id: 2, title: 'DNS Resolution & Web Security Protocols', weightage: '12 Marks', unit: 'Unit 2' },
      ],
      files: [
        { name: 'OSI_vs_TCPIP_Comparison.pdf', size: '1.6 MB' },
        { name: 'Web_Security_Fundamentals.pdf', size: '1.2 MB' },
      ],
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
      topics: [
        { id: 1, title: 'End-Semester Lab Viva & Practical Experiments', weightage: '25 Marks', unit: 'Lab Exam' },
      ],
      files: [
        { name: 'Lab_Manual_Core_Programs.pdf', size: '3.1 MB' },
        { name: 'Viva_Voce_Important_Questions.pdf', size: '940 KB' },
      ],
    },
  ];

  return (
    <div className="relative h-full flex flex-col bg-[#FDFDFE] dark:bg-[#0B0F19] transition-colors duration-200 select-none overflow-hidden font-sans">
      {/* Top Bar with Navigation & Actions */}
      <header className="px-5 pt-3.5 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back to dashboard"
          className="w-9 h-9 rounded-[12px] bg-slate-100 dark:bg-[#162036] border border-slate-200 dark:border-[#223354] flex items-center justify-center text-[#0F172A] dark:text-[#F8FAFC] active:scale-95 transition-transform cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="w-9 h-9 rounded-[12px] bg-slate-100 dark:bg-[#162036] border border-slate-200 dark:border-[#223354] flex items-center justify-center text-[#475569] dark:text-[#94A3B8] active:scale-95 transition-transform cursor-pointer"
        >
          {isDark ? (
            <Sun className="w-4.5 h-4.5 text-amber-400 stroke-[2.2]" />
          ) : (
            <Moon className="w-4.5 h-4.5 text-[#475569] stroke-[2.2]" />
          )}
        </button>
      </header>

      {/* Screen Title & Subtitle */}
      <div className="px-5 pt-1 pb-3">
        <h1 className="text-[26px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight">
          Important Topics
        </h1>
        <p className="text-[13px] font-medium text-[#64748B] dark:text-[#94A3B8] mt-0.5">
          Semester 1 · B.Sc. (AI & ML)
        </p>
      </div>

      {/* Scrollable Subject Cards List */}
      <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-3.5 no-scrollbar">
        {importantSubjects.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedSubject(item)}
            className="p-4 bg-white dark:bg-[#131B2E] border border-[#E2E8F0]/80 dark:border-[#1E293B] rounded-[22px] shadow-xs hover:border-[#CBD5E1] dark:hover:border-[#2B3B59] apple-card cursor-pointer"
          >
            <div className="flex items-start gap-3.5">
              {/* Avatar Chip */}
              <div
                className={`w-12 h-12 rounded-[14px] flex items-center justify-center font-bold text-[15px] shrink-0 ${item.badgeBg} ${item.badgeText}`}
              >
                {item.code}
              </div>

              {/* Subject Info & Progress */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 pr-1">
                    <h3 className="text-[15px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                      {item.subject}
                    </h3>
                    <p className="text-[12.5px] font-normal text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                      {item.markedText}
                    </p>
                  </div>

                  {/* Circular Chevron Right Button */}
                  <div className="w-8 h-8 rounded-full bg-[#F8FAFC] dark:bg-[#1A2640] border border-[#E2E8F0] dark:border-[#26354D] flex items-center justify-center text-[#64748B] dark:text-[#94A3B8] shrink-0">
                    <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                  </div>
                </div>

                {/* Progress Bar Row */}
                <div className="flex items-center gap-3 mt-2.5">
                  <div className="flex-1 h-2 bg-[#EBF1FA] dark:bg-[#1E293B] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.progressColor}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className={`text-[12.5px] font-bold shrink-0 tabular-nums ${item.textColor}`}>
                    {item.progress}%
                  </span>
                </div>

                {/* Files Count Row */}
                <div className="flex items-center gap-1.5 mt-2 text-[#64748B] dark:text-[#94A3B8]">
                  <FileText className="w-3.5 h-3.5 stroke-[2]" />
                  <span className="text-[12px] font-medium">{item.filesCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ======================================================== */}
      {/* DETAIL MODAL: Selected Subject Marked Topics Sheet */}
      {/* ======================================================== */}
      {selectedSubject && (
        <div className="absolute inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white dark:bg-[#131B2E] w-full rounded-t-[28px] sm:rounded-[24px] p-5 max-h-[85vh] overflow-y-auto apple-sheet border border-slate-100 dark:border-[#1E293B] shadow-2xl transition-colors">
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B] mb-4">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div
                  className={`w-9 h-9 rounded-[12px] flex items-center justify-center font-bold text-[14px] shrink-0 ${selectedSubject.badgeBg} ${selectedSubject.badgeText}`}
                >
                  {selectedSubject.code}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[16px] font-bold text-[#0F172A] dark:text-[#F8FAFC] truncate">
                    {selectedSubject.subject}
                  </h3>
                  <p className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8]">
                    {selectedSubject.markedText}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubject(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Marked Topics List */}
            <div className="space-y-2.5 mb-4">
              <h4 className="text-[12.5px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                Marked Topics ({selectedSubject.topics.length})
              </h4>
              {selectedSubject.topics.map((top) => (
                <div
                  key={top.id}
                  className="p-3 bg-[#F8FAFC] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354] rounded-[14px] flex items-start justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-[#0075FF] dark:text-[#3894FF] block">
                      {top.unit}
                    </span>
                    <h5 className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5 leading-snug">
                      {top.title}
                    </h5>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-[6px] bg-[#FEF3C7] dark:bg-amber-950/60 text-[#B45309] dark:text-amber-300 shrink-0">
                    {top.weightage}
                  </span>
                </div>
              ))}
            </div>

            {/* Study Files & Notes Attachments */}
            <div className="space-y-2 mb-4">
              <h4 className="text-[12.5px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                Important Material & Question Papers
              </h4>
              {selectedSubject.files.map((file, i) => (
                <div
                  key={i}
                  className="p-3 bg-white dark:bg-[#162036] border border-slate-200 dark:border-[#223354] rounded-[14px] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                    <FileText className="w-4 h-4 text-[#0075FF] dark:text-[#3894FF] shrink-0" />
                    <span className="text-[12.5px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] truncate">
                      {file.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] shrink-0 mr-2">
                    {file.size}
                  </span>
                  <button
                    type="button"
                    onClick={() => alert(`Downloading ${file.name}...`)}
                    className="p-1.5 rounded-[8px] bg-[#EFF6FF] dark:bg-[#1A2640] text-[#0075FF] dark:text-[#3894FF] hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSelectedSubject(null)}
              className="w-full h-11 rounded-[14px] bg-[#0075FF] hover:bg-[#0066E0] text-white font-bold text-[14px] cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
