import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronDown,
  Code2,
  Check,
  Star,
  CheckCircle2,
  Clock,
  UploadCloud,
  X,
  FileText,
} from 'lucide-react';

export default function RecordClass() {
  const navigate = useNavigate();
  const location = useLocation();

  // Load any previously saved state or class data
  const passedData = location.state || {};

  // Subject header data
  const classInfo = {
    subject: passedData.subject || 'Python Programming',
    grade: passedData.grade || 'B.Sc (AI & ML) • Semester 1',
    room: passedData.room || 'Room 101',
  };

  // Units list
  const units = [
    'Unit 1 - Introduction to Python',
    'Unit 2 - Data Structures & Strings',
    'Unit 3 - Functions & Modular Programming',
    'Unit 4 - Object Oriented Programming',
    'Unit 5 - File Handling & Exceptions',
  ];

  const [selectedUnit, setSelectedUnit] = useState(
    passedData.unit || units[0]
  );
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);

  // Topics for Unit 1 (matches reference mockup exactly)
  const [topics, setTopics] = useState(
    passedData.topics || [
      {
        id: '1.1',
        title: '1.1 What is Python?',
        checked: true,
        important: true,
      },
      {
        id: '1.2',
        title: '1.2 Features of Python',
        checked: true,
        important: true,
      },
      {
        id: '1.3',
        title: '1.3 Python Installation',
        checked: false,
        important: false,
      },
      {
        id: '1.4',
        title: '1.4 Hello World Program',
        checked: true,
        important: true,
      },
      {
        id: '1.5',
        title: '1.5 IDE and Environment Setup',
        checked: false,
        important: false,
      },
    ]
  );

  // Completion Status: 'Completed' | 'In Progress'
  const [completionStatus, setCompletionStatus] = useState(
    passedData.status || 'Completed'
  );

  // Notes state
  const [notes, setNotes] = useState(passedData.notes || '');

  // Files state (pre-populate with 1 sample file to match the reference mockup's "1 file uploaded")
  const [files, setFiles] = useState(
    passedData.files || [
      { name: 'Python_Unit1_Lecture_Notes.pdf', size: '2.4 MB' },
    ]
  );

  // Toggle individual topic selection
  const toggleTopicCheck = (id) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  // Toggle topic importance (gold star)
  const toggleTopicImportant = (id, e) => {
    e.stopPropagation();
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, important: !t.important } : t))
    );
  };

  // Toggle Select All topics
  const allChecked = topics.every((t) => t.checked);
  const handleSelectAllToggle = () => {
    setTopics((prev) =>
      prev.map((t) => ({ ...t, checked: !allChecked }))
    );
  };

  // Handle file upload simulation
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files || []);
    if (uploadedFiles.length > 0) {
      const newItems = uploadedFiles.map((file) => ({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      }));
      setFiles((prev) => [...prev, ...newItems]);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Done button: saves class data and navigates to Success screen
  const handleDone = () => {
    const selectedTopicsList = topics.filter((t) => t.checked);
    const summaryData = {
      subject: classInfo.subject,
      grade: classInfo.grade,
      unit: selectedUnit,
      topics: topics,
      selectedTopicsCount: selectedTopicsList.length,
      selectedTopicLabels: selectedTopicsList.map((t) => t.id).join(', '),
      status: completionStatus,
      filesCount: files.length,
      files: files,
      notes: notes,
    };

    navigate('/record-class-success', { state: summaryData });
  };

  return (
    <div className="relative h-full flex flex-col bg-[#FBFBFD] dark:bg-[#0B0F19] transition-colors duration-200 select-none overflow-hidden">
      {/* Top App Header with Back button and centered ClassHere Logo */}
      <div className="shrink-0 px-5 sm:px-6 pt-3 pb-2 flex items-center justify-between border-b border-slate-100 dark:border-[#1E293B] bg-[#FBFBFD] dark:bg-[#0B0F19] z-30 transition-colors">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#0F172A] dark:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-[#162036] active:scale-95 transition-all cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.4]" />
        </button>

        <div className="font-extrabold text-[22px] tracking-tight">
          <span className="text-[#0F172A] dark:text-[#F8FAFC]">Class</span>
          <span className="text-[#0075FF] dark:text-[#3894FF]">Here</span>
        </div>

        {/* Placeholder to keep logo perfectly centered */}
        <div className="w-9 h-9" />
      </div>

      {/* Main Scrollable Form */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 sm:px-6 py-4 space-y-4.5">
        {/* Subject Header Card */}
        <div className="bg-[#F1F6FE] dark:bg-[#162238] border border-[#E2EDFD] dark:border-[#223354] rounded-[18px] p-3.5 sm:p-4 flex items-center gap-3.5 shadow-xs transition-colors">
          <div className="w-11 h-11 rounded-[13px] bg-[#E0EBFD] dark:bg-[#1E2E4A] border border-[#CFE1FC] dark:border-[#283E63] flex items-center justify-center text-[#0075FF] dark:text-[#3894FF] shrink-0">
            <Code2 className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[16px] font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight truncate leading-tight">
              {classInfo.subject}
            </h2>
            <p className="text-[12.5px] font-medium text-[#64748B] dark:text-[#94A3B8] truncate mt-0.5">
              {classInfo.grade}
            </p>
          </div>
        </div>

        {/* Unit Dropdown Section */}
        <div>
          <label className="block text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-1.5">
            Unit
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUnitDropdownOpen(!isUnitDropdownOpen)}
              className="w-full bg-white dark:bg-[#131B2E] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px] px-3.5 py-3 flex items-center justify-between text-left hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer shadow-xs"
            >
              <span className="text-[13.5px] font-medium text-[#0F172A] dark:text-[#F8FAFC] truncate">
                {selectedUnit}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#0F172A] dark:text-[#F8FAFC] stroke-[2.5] transition-transform duration-200 shrink-0 ml-2 ${
                  isUnitDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isUnitDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-[#1E293B] rounded-[14px] shadow-lg py-1 z-40 max-h-56 overflow-y-auto">
                {units.map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => {
                      setSelectedUnit(unit);
                      setIsUnitDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-[13px] transition-colors flex items-center justify-between ${
                      selectedUnit === unit
                        ? 'font-bold text-[#0075FF] dark:text-[#3894FF] bg-blue-50/70 dark:bg-[#162238]'
                        : 'font-medium text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-50 dark:hover:bg-[#162036]'
                    }`}
                  >
                    <span className="truncate">{unit}</span>
                    {selectedUnit === unit && (
                      <Check className="w-4 h-4 text-[#0075FF] dark:text-[#3894FF] shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Topics Covered Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-[14px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-tight">
                Topics Covered
              </h3>
              <p className="text-[12px] font-medium text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                Select all topics you covered today
              </p>
            </div>
            <button
              type="button"
              onClick={handleSelectAllToggle}
              className="px-2.5 py-1 bg-[#EAF3FF] dark:bg-[#162238] hover:bg-[#DCEBFD] dark:hover:bg-[#1E2E4A] text-[#0075FF] dark:text-[#3894FF] text-[12px] font-bold rounded-[8px] transition-colors cursor-pointer"
            >
              {allChecked ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          {/* Topics List */}
          <div className="space-y-2">
            {topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => toggleTopicCheck(topic.id)}
                className={`border rounded-[12px] px-3.5 py-3 flex items-center justify-between shadow-xs transition-all cursor-pointer ${
                  topic.checked
                    ? 'border-[#D0E2FB] dark:border-[#3894FF]/40 bg-blue-50/20 dark:bg-[#162238]'
                    : 'bg-white dark:bg-[#131B2E] border-[#EEF2F6] dark:border-[#1E293B] hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Checkbox and Topic Title */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-5 h-5 rounded-[6px] flex items-center justify-center transition-all shrink-0 ${
                      topic.checked
                        ? 'bg-[#0075FF] border border-[#0075FF] text-white shadow-xs'
                        : 'border-2 border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#0B0F19]'
                    }`}
                  >
                    {topic.checked && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                  <span
                    className={`text-[13.5px] truncate select-none ${
                      topic.checked
                        ? 'font-semibold text-[#0F172A] dark:text-[#F8FAFC]'
                        : 'font-medium text-[#334155] dark:text-[#CBD5E1]'
                    }`}
                  >
                    {topic.title}
                  </span>
                </div>

                {/* Important Star Button */}
                <button
                  type="button"
                  onClick={(e) => toggleTopicImportant(topic.id, e)}
                  title={
                    topic.important ? 'Marked Important' : 'Mark as Important'
                  }
                  className="p-1 -mr-1 rounded-full hover:bg-slate-100 dark:hover:bg-[#1E2E4A] transition-colors cursor-pointer shrink-0 ml-2"
                >
                  <Star
                    className={`w-4.5 h-4.5 transition-all ${
                      topic.important
                        ? 'text-[#F59E0B] fill-[#F59E0B] scale-105'
                        : 'text-[#CBD5E1] dark:text-[#475569] hover:text-[#94A3B8]'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Status Section */}
        <div>
          <label className="block text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-1.5">
            Completion Status
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {/* Completed Button */}
            <button
              type="button"
              onClick={() => setCompletionStatus('Completed')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-[12px] font-bold text-[13px] transition-all cursor-pointer ${
                completionStatus === 'Completed'
                  ? 'bg-white dark:bg-[#162238] border-2 border-[#0075FF] dark:border-[#3894FF] text-[#0075FF] dark:text-[#3894FF] shadow-xs'
                  : 'bg-[#F8FAFC] dark:bg-[#131B2E] border border-[#E2E8F0] dark:border-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-100/70 dark:hover:bg-[#162036]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  completionStatus === 'Completed'
                    ? 'bg-[#16A34A] text-white'
                    : 'bg-slate-200 dark:bg-[#223354] text-slate-400 dark:text-slate-500'
                }`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>Completed</span>
            </button>

            {/* In Progress Button */}
            <button
              type="button"
              onClick={() => setCompletionStatus('In Progress')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-[12px] font-bold text-[13px] transition-all cursor-pointer ${
                completionStatus === 'In Progress'
                  ? 'bg-white dark:bg-[#162238] border-2 border-[#0075FF] dark:border-[#3894FF] text-[#0075FF] dark:text-[#3894FF] shadow-xs'
                  : 'bg-[#F8FAFC] dark:bg-[#131B2E] border border-[#E2E8F0] dark:border-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-100/70 dark:hover:bg-[#162036]'
              }`}
            >
              <Clock
                className={`w-4.5 h-4.5 ${
                  completionStatus === 'In Progress'
                    ? 'text-[#0075FF] dark:text-[#3894FF]'
                    : 'text-[#94A3B8] dark:text-[#64748B]'
                }`}
              />
              <span>In Progress</span>
            </button>
          </div>
        </div>

        {/* Notes (Optional) Section */}
        <div>
          <label className="block text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-1.5">
            Notes (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={notes}
              maxLength={500}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any important notes, instructions or details for this class..."
              className="w-full bg-[#F8FAFC] dark:bg-[#131B2E] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[14px] p-3 text-[13px] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] focus:bg-white dark:focus:bg-[#162036] focus:border-[#0075FF] dark:focus:border-[#3894FF] focus:outline-none focus:ring-1 focus:ring-[#0075FF] transition-all resize-none"
            />
            <div className="text-[11px] font-medium text-[#94A3B8] dark:text-[#64748B] text-right mt-0.5">
              {notes.length}/500
            </div>
          </div>
        </div>

        {/* Add Files (Optional) Section */}
        <div>
          <label className="block text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-1.5">
            Add Files (Optional)
          </label>

          <label className="border-2 border-dashed border-[#CFE1FC] dark:border-[#223354] bg-[#F8FAFC] dark:bg-[#131B2E] hover:bg-[#F1F6FE] dark:hover:bg-[#162238] rounded-[14px] p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors block">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <UploadCloud className="w-7 h-7 text-[#0075FF] dark:text-[#3894FF] stroke-[2]" />
            <p className="text-[13px] font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1.5 leading-tight">
              Tap to upload files
            </p>
            <p className="text-[11px] font-medium text-[#64748B] dark:text-[#94A3B8] mt-0.5 leading-tight">
              PDF, PPT, DOC, Images (Max 10MB)
            </p>
          </label>

          {/* Uploaded Files Preview List */}
          {files.length > 0 && (
            <div className="mt-2 space-y-1.5">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3 py-2 bg-white dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354] rounded-[10px] text-xs shadow-xs"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <FileText className="w-4 h-4 text-[#0075FF] dark:text-[#3894FF] shrink-0" />
                    <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC] truncate">
                      {file.name}
                    </span>
                    <span className="text-[#64748B] dark:text-[#94A3B8] shrink-0 text-[11px]">
                      ({file.size})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="p-1 text-slate-400 dark:text-slate-500 hover:text-red-500 rounded-full transition-colors ml-2 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Done Action Button */}
        <div className="pt-2 pb-6">
          <button
            type="button"
            onClick={handleDone}
            className="w-full py-3.5 bg-[#0075FF] hover:bg-blue-600 active:scale-[0.99] text-white font-bold text-[15px] rounded-[14px] shadow-sm transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
