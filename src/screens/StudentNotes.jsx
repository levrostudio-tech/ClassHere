import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MoreVertical,
  ChevronRight,
  X,
  Download,
  FileText,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function StudentNotes() {
  const navigate = useNavigate();

  // Scroll visibility for bottom nav
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollTopRef = useRef(0);

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Three-dot options menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Selected subject for notes detail view
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

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

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // 5 Subject cards matching reference design exactly
  const subjectsData = [
    {
      id: 'python',
      code: 'PG',
      name: 'Python Programming',
      notesCount: 12,
      badgeBg: 'bg-[#EAF3FF]',
      badgeText: 'text-[#0075FF]',
      notes: [
        {
          id: 'py-1',
          title: 'Unit 1: Introduction to Python & Syntax Fundamentals',
          date: '10 Oct 2026',
          pages: '14 pages',
          size: '2.4 MB',
        },
        {
          id: 'py-2',
          title: 'Unit 2: Lists, Tuples, Dictionaries & Sets',
          date: '08 Oct 2026',
          pages: '18 pages',
          size: '3.1 MB',
        },
        {
          id: 'py-3',
          title: 'Unit 3: Functions, Lambda & Recursion in Depth',
          date: '04 Oct 2026',
          pages: '12 pages',
          size: '1.9 MB',
        },
        {
          id: 'py-4',
          title: 'Unit 4: Object-Oriented Programming (Classes & Inheritance)',
          date: '01 Oct 2026',
          pages: '22 pages',
          size: '4.2 MB',
        },
        {
          id: 'py-5',
          title: 'Unit 5: Exception Handling, Custom Errors & File I/O',
          date: '28 Sep 2026',
          pages: '15 pages',
          size: '2.8 MB',
        },
      ],
    },
    {
      id: 'maths',
      code: 'MS',
      name: 'Mathematics',
      notesCount: 8,
      badgeBg: 'bg-[#F3E8FF]',
      badgeText: 'text-[#9333EA]',
      notes: [
        {
          id: 'ms-1',
          title: 'Eigenvalues, Eigenvectors & Diagonalization Notes',
          date: '06 Oct 2026',
          pages: '11 pages',
          size: '2.1 MB',
        },
        {
          id: 'ms-2',
          title: 'Rank of Matrices & System of Linear Equations',
          date: '02 Oct 2026',
          pages: '16 pages',
          size: '2.8 MB',
        },
        {
          id: 'ms-3',
          title: 'Vector Spaces, Subspaces & Linear Independence',
          date: '29 Sep 2026',
          pages: '14 pages',
          size: '2.5 MB',
        },
        {
          id: 'ms-4',
          title: 'Graph Theory, Eulerian & Hamiltonian Circuits',
          date: '25 Sep 2026',
          pages: '13 pages',
          size: '2.2 MB',
        },
      ],
    },
    {
      id: 'computer',
      code: 'CS',
      name: 'Computer Fundamentals',
      notesCount: 10,
      badgeBg: 'bg-[#DCFCE7]',
      badgeText: 'text-[#16A34A]',
      notes: [
        {
          id: 'cs-1',
          title: 'CPU Architecture, Registers & Instruction Cycles',
          date: '04 Oct 2026',
          pages: '19 pages',
          size: '3.5 MB',
        },
        {
          id: 'cs-2',
          title: 'Memory Hierarchy: Cache, RAM & Virtual Memory',
          date: '30 Sep 2026',
          pages: '15 pages',
          size: '2.7 MB',
        },
        {
          id: 'cs-3',
          title: 'Input/Output Organization & DMA Controllers',
          date: '26 Sep 2026',
          pages: '12 pages',
          size: '2.0 MB',
        },
        {
          id: 'cs-4',
          title: 'Binary Logic, Boolean Algebra & Logic Gates',
          date: '22 Sep 2026',
          pages: '10 pages',
          size: '1.6 MB',
        },
      ],
    },
    {
      id: 'english',
      code: 'EN',
      name: 'English Communication',
      notesCount: 6,
      badgeBg: 'bg-[#FFE4E6]',
      badgeText: 'text-[#E11D48]',
      notes: [
        {
          id: 'en-1',
          title: 'Unit 2: Active & Passive Voice & Sentence Structure',
          date: 'Yesterday',
          pages: '8 pages',
          size: '1.4 MB',
        },
        {
          id: 'en-2',
          title: 'Technical Report Writing & Executive Summaries',
          date: '05 Oct 2026',
          pages: '10 pages',
          size: '1.8 MB',
        },
        {
          id: 'en-3',
          title: 'Formal Business Letters & Email Etiquette',
          date: '01 Oct 2026',
          pages: '7 pages',
          size: '1.2 MB',
        },
        {
          id: 'en-4',
          title: 'Phonetics, Word Stress & Intonation Guide',
          date: '27 Sep 2026',
          pages: '9 pages',
          size: '1.5 MB',
        },
      ],
    },
    {
      id: 'punjabi',
      code: 'PI',
      name: 'Punjabi',
      notesCount: 4,
      badgeBg: 'bg-[#FEF3C7]',
      badgeText: 'text-[#D97706]',
      notes: [
        {
          id: 'pi-1',
          title: 'Punjabi Grammar: Viyakaran & Shabhad Rachna',
          date: '07 Oct 2026',
          pages: '12 pages',
          size: '1.7 MB',
        },
        {
          id: 'pi-2',
          title: 'Sahitya Roop: Kavita ate Ikangi Adhyan',
          date: '03 Oct 2026',
          pages: '14 pages',
          size: '2.1 MB',
        },
        {
          id: 'pi-3',
          title: 'Nibandh Rachna & Anuvaad Technique',
          date: '28 Sep 2026',
          pages: '8 pages',
          size: '1.3 MB',
        },
        {
          id: 'pi-4',
          title: 'Gurumukhi Lipi & Boli da Vikas',
          date: '24 Sep 2026',
          pages: '10 pages',
          size: '1.5 MB',
        },
      ],
    },
  ];

  // Filter subjects and their notes based on search query
  const filteredSubjects = useMemo(() => {
    if (!searchQuery.trim()) return subjectsData;

    const q = searchQuery.toLowerCase().trim();
    return subjectsData.filter((item) => {
      const matchName = item.name.toLowerCase().includes(q);
      const matchCode = item.code.toLowerCase().includes(q);
      const matchNotes = item.notes.some((n) =>
        n.title.toLowerCase().includes(q)
      );
      return matchName || matchCode || matchNotes;
    });
  }, [searchQuery, subjectsData]);

  return (
    <div className="relative h-full flex flex-col bg-[#FDFDFE] select-none overflow-hidden font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white px-4 py-2.5 rounded-[14px] text-[13px] font-semibold flex items-center gap-2 shadow-lg animate-dropdown-pop">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Scrollable Canvas */}
      <div
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-5 sm:px-6 pt-5 pb-24 no-scrollbar"
      >
        {/* ======================================================== */}
        {/* TOP HEADER: Title & Three-Dot Menu Button */}
        {/* ======================================================== */}
        <header className="flex items-start justify-between mb-1.5">
          <div>
            <h1 className="text-[32px] sm:text-[34px] font-black text-[#0F172A] tracking-tight leading-tight">
              Notes
            </h1>
            <p className="text-[14px] sm:text-[14.5px] font-medium text-[#64748B] mt-1 leading-normal">
              All your class notes in one place
            </p>
          </div>

          {/* Three-Dot Menu */}
          <div className="relative pt-1">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 rounded-[14px] bg-[#F1F5F9] hover:bg-[#E2E8F0] active:scale-95 flex items-center justify-center text-[#475569] transition-all cursor-pointer shadow-xs"
              aria-label="Notes options"
            >
              <MoreVertical className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute right-0 top-12 w-48 bg-white border border-slate-100 rounded-[18px] shadow-xl py-1.5 z-50 apple-dropdown animate-dropdown-pop">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/student-dashboard');
                    }}
                    className="w-full px-4 py-2.5 text-left text-[13px] font-semibold text-[#0F172A] hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#64748B]" />
                    <span>Back to Dashboard</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      showToast('Downloading all semester notes...');
                    }}
                    className="w-full px-4 py-2.5 text-left text-[13px] font-semibold text-[#0F172A] hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#64748B]" />
                    <span>Download All Notes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      showToast('Notes link copied to clipboard');
                    }}
                    className="w-full px-4 py-2.5 text-left text-[13px] font-semibold text-[#0F172A] hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-[#64748B]" />
                    <span>Share Notes</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* ======================================================== */}
        {/* SEARCH BAR */}
        {/* ======================================================== */}
        <div className="relative mt-4 mb-5">
          <div className="flex items-center w-full px-4 py-3 bg-[#F1F5F9] rounded-[16px] border border-transparent focus-within:border-[#0075FF]/30 focus-within:bg-white focus-within:shadow-sm transition-all">
            <Search className="w-5 h-5 text-[#94A3B8] stroke-[2] shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, topics or keywords..."
              className="w-full bg-transparent text-[14.5px] font-medium text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="w-5 h-5 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center shrink-0 ml-2 hover:bg-slate-400 cursor-pointer"
              >
                <X className="w-3 h-3 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SUBJECT CARDS LIST */}
        {/* ======================================================== */}
        <div className="space-y-3.5">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className="bg-white rounded-[20px] p-4 border border-[#F1F5F9] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-slate-200 flex items-center justify-between apple-card cursor-pointer transition-all active:scale-[0.985]"
            >
              {/* Left: Code badge and subject details */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-14 h-14 rounded-[16px] ${subject.badgeBg} ${subject.badgeText} font-extrabold text-[18px] flex items-center justify-center shrink-0 shadow-xs`}
                >
                  {subject.code}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[16px] font-bold text-[#0F172A] tracking-tight leading-snug truncate">
                    {subject.name}
                  </h3>
                  <p className="text-[13px] font-medium text-[#64748B] mt-0.5">
                    {subject.notesCount} notes
                  </p>
                </div>
              </div>

              {/* Right: Chevron arrow */}
              <ChevronRight className="w-5 h-5 text-[#94A3B8] stroke-[2.2] shrink-0 ml-2" />
            </div>
          ))}

          {filteredSubjects.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-[15px] font-bold text-[#0F172A]">No notes found</p>
              <p className="text-[13px] text-[#64748B] mt-1">
                Try searching with a different subject or keyword
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SUBJECT NOTES DETAIL SHEET */}
      {/* ======================================================== */}
      {selectedSubject && (
        <div className="absolute inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full rounded-t-[28px] sm:rounded-[24px] p-5 sm:p-6 max-h-[85vh] overflow-y-auto apple-sheet border border-slate-100 shadow-2xl flex flex-col">
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-11 h-11 rounded-[14px] ${selectedSubject.badgeBg} ${selectedSubject.badgeText} font-bold text-[16px] flex items-center justify-center shrink-0`}
                >
                  {selectedSubject.code}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[17px] font-bold text-[#0F172A] truncate">
                    {selectedSubject.name}
                  </h3>
                  <p className="text-[12.5px] font-medium text-[#64748B]">
                    {selectedSubject.notesCount} study documents available
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubject(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* List of notes for this subject */}
            <div className="space-y-2.5 flex-1 overflow-y-auto pr-0.5">
              {selectedSubject.notes.map((note) => (
                <div
                  key={note.id}
                  className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] flex items-center justify-between hover:bg-blue-50/40 hover:border-blue-200 transition-all apple-card"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <h4 className="text-[13.5px] font-bold text-[#0F172A] leading-snug">
                      {note.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[11.5px] font-medium text-[#64748B]">
                      <span>{note.date}</span>
                      <span>•</span>
                      <span>{note.pages}</span>
                      <span>•</span>
                      <span>{note.size}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast(`Downloading ${note.title}...`);
                    }}
                    className="w-9 h-9 rounded-[12px] bg-[#EAF3FF] text-[#0075FF] hover:bg-[#0075FF] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
                    title="Download Note"
                  >
                    <Download className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>
              ))}
            </div>

            {/* Sheet Footer Button */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  showToast(`Downloading all ${selectedSubject.notesCount} notes for ${selectedSubject.name}...`);
                  setSelectedSubject(null);
                }}
                className="flex-1 py-3 bg-[#0075FF] hover:bg-[#0066E0] text-white font-bold rounded-[14px] text-[13.5px] transition-colors cursor-pointer shadow-xs"
              >
                Download All Notes ({selectedSubject.notesCount})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Navigation */}
      <BottomNav activeTab="home" isVisible={isNavVisible} />
    </div>
  );
}
