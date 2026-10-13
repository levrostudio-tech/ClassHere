import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  GraduationCap,
  FileText,
  BookOpen,
  Bell,
  Settings,
  Calendar,
  LogOut,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Search,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  UserPlus,
  Clock,
  CheckCircle2,
  X,
  Upload,
} from 'lucide-react';
import { adminLogout, getAdminUser } from '../lib/adminAuth';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const adminUser = getAdminUser();

  // Navigation State
  const [activeNav, setActiveNav] = useState('dashboard');
  const [activeTableTab, setActiveTableTab] = useState('syllabus');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [selectedSemesterFilter, setSelectedSemesterFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedBatch, setSelectedBatch] = useState('B.Sc. AI & ML');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals State
  const [modalType, setModalType] = useState(null); // 'add-syllabus' | 'add-student' | 'add-teacher' | 'add-department' | 'upload-timetable' | null

  // Interactive Form States
  const [newSubject, setNewSubject] = useState({
    subject: '',
    department: 'B.Sc. AI & ML',
    semester: '1',
    units: 4,
    status: 'Published',
  });

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login', { replace: true });
  };

  // Initial Syllabus Data matching screenshot
  const [syllabusList, setSyllabusList] = useState([
    {
      id: 1,
      subject: 'Python',
      department: 'B.Sc. AI & ML',
      semester: '1',
      units: 5,
      progress: 100,
      lastUpdated: '12 Oct 2026',
      status: 'Published',
    },
    {
      id: 2,
      subject: 'Mathematics',
      department: 'B.Sc. AI & ML',
      semester: '1',
      units: 4,
      progress: 60,
      lastUpdated: '10 Oct 2026',
      status: 'Draft',
    },
    {
      id: 3,
      subject: 'Computer Fundamentals',
      department: 'B.Sc. AI & ML',
      semester: '1',
      units: 6,
      progress: 80,
      lastUpdated: '08 Oct 2026',
      status: 'Published',
    },
    {
      id: 4,
      subject: 'English Communication',
      department: 'B.Sc. AI & ML',
      semester: '1',
      units: 4,
      progress: 40,
      lastUpdated: '08 Oct 2026',
      status: 'Draft',
    },
    {
      id: 5,
      subject: 'Punjabi',
      department: 'B.Sc. AI & ML',
      semester: '1',
      units: 3,
      progress: 100,
      lastUpdated: '07 Oct 2026',
      status: 'Published',
    },
  ]);

  // Exam Data for Exam Tab
  const examList = [
    {
      id: 1,
      subject: 'Python Mid-Term',
      department: 'B.Sc. AI & ML',
      date: '24 Oct 2026',
      time: '10:00 AM - 01:00 PM',
      room: 'Hall A-1',
      status: 'Scheduled',
    },
    {
      id: 2,
      subject: 'Discrete Mathematics',
      department: 'B.Sc. AI & ML',
      date: '28 Oct 2026',
      time: '10:00 AM - 01:00 PM',
      room: 'Hall B-2',
      status: 'Scheduled',
    },
    {
      id: 3,
      subject: 'Computer Fundamentals',
      department: 'B.Sc. AI & ML',
      date: '02 Nov 2026',
      time: '02:00 PM - 05:00 PM',
      room: 'Lab 3',
      status: 'Draft',
    },
  ];

  // Filtered Syllabus Rows
  const filteredSyllabus = useMemo(() => {
    return syllabusList.filter((item) => {
      const matchesSearch =
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept =
        selectedDeptFilter === 'All' || item.department === selectedDeptFilter;
      const matchesSem =
        selectedSemesterFilter === 'All' || item.semester === selectedSemesterFilter;
      const matchesStatus =
        selectedStatusFilter === 'All' || item.status === selectedStatusFilter;
      return matchesSearch && matchesDept && matchesSem && matchesStatus;
    });
  }, [syllabusList, searchQuery, selectedDeptFilter, selectedSemesterFilter, selectedStatusFilter]);

  const handleAddSyllabusSubmit = (e) => {
    e.preventDefault();
    if (!newSubject.subject.trim()) return;

    const newEntry = {
      id: Date.now(),
      subject: newSubject.subject.trim(),
      department: newSubject.department,
      semester: newSubject.semester,
      units: Number(newSubject.units) || 4,
      progress: newSubject.status === 'Published' ? 100 : 30,
      lastUpdated: 'Just now',
      status: newSubject.status,
    };

    setSyllabusList([newEntry, ...syllabusList]);
    setNewSubject({
      subject: '',
      department: 'B.Sc. AI & ML',
      semester: '1',
      units: 4,
      status: 'Published',
    });
    setModalType(null);
  };

  const navMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap },
    { id: 'exam', label: 'Exam', icon: FileText },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FC] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] flex font-sans selection:bg-blue-500 selection:text-white transition-colors duration-200">
      {/* ======================================================== */}
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      {/* ======================================================== */}
      <aside className="w-[230px] shrink-0 bg-white dark:bg-[#131B2E] border-r border-[#E8EFF7] dark:border-[#1E293B] flex flex-col justify-between py-6 px-4 select-none min-h-screen sticky top-0 h-screen transition-colors duration-200">
        <div>
          {/* Brand Logo: "Class" (blue) "Here" (black/slate) */}
          <div className="flex items-center gap-1.5 px-3 mb-7 cursor-pointer" onClick={() => setActiveNav('dashboard')}>
            <span className="text-[25px] font-black tracking-tight text-[#0075FF]">Class</span>
            <span className="text-[25px] font-black tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">Here</span>
          </div>

          {/* Navigation Links List */}
          <nav className="space-y-1">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveNav(item.id);
                    if (item.id === 'syllabus') setActiveTableTab('syllabus');
                    if (item.id === 'exam') setActiveTableTab('exam');
                  }}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-[14px] text-[14px] font-semibold transition-all duration-150 apple-tab cursor-pointer ${
                    isActive
                      ? 'bg-[#EAF3FF] dark:bg-[#1B2945] text-[#0075FF] dark:text-[#3894FF] font-bold shadow-xs'
                      : 'text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#182338] hover:text-[#0F172A] dark:hover:text-white'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      isActive
                        ? 'text-[#0075FF] dark:text-[#3894FF] stroke-[2.3]'
                        : 'text-[#64748B] dark:text-[#94A3B8] stroke-[1.9]'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Academic Year Card & Log Out Button */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Academic Year Info Card */}
          <div className="bg-[#F8FAFC] dark:bg-[#0B0F19] border border-[#E8EFF7] dark:border-[#223354] rounded-[16px] p-3 flex items-center justify-between cursor-pointer hover:border-[#0075FF]/30 transition-all apple-card">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[10px] bg-white dark:bg-[#162238] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#64748B] dark:text-[#94A3B8]">
                <Calendar className="w-4 h-4 text-[#0075FF]" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-[#94A3B8] dark:text-[#64748B] uppercase tracking-wider leading-none">
                  Academic Year
                </p>
                <p className="text-[12.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5 leading-tight">
                  2026 – 27
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>

          {/* Log Out Action */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full h-10 rounded-[12px] flex items-center justify-center gap-2 text-[13px] font-bold text-[#64748B] hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 bg-white transition-all apple-btn cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN ADMIN CONTENT WORKSPACE */}
      {/* ======================================================== */}
      <main className="flex-1 overflow-y-auto px-8 lg:px-10 py-7 space-y-6 max-w-[1400px]">
        {/* Top Header Row: Good morning, Admin 👋 & Department Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight flex items-center gap-2">
              <span>Good morning, {adminUser?.username ? adminUser.username.charAt(0).toUpperCase() + adminUser.username.slice(1) : 'Admin'}</span>
              <span>👋</span>
            </h1>
            <p className="text-[13.5px] font-medium text-[#64748B] dark:text-[#94A3B8] mt-0.5">
              B.Sc. AI & ML &nbsp;•&nbsp; Academic Year 2026 – 27
            </p>
          </div>

          {/* Department Selection Pill Dropdown */}
          <div className="relative">
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="appearance-none bg-white dark:bg-[#131B2E] border border-[#E2E8F0] dark:border-[#223354] rounded-[14px] px-4 py-2.5 pr-9 text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] shadow-xs cursor-pointer focus:outline-none focus:border-[#0075FF]"
            >
              <option value="B.Sc. AI & ML">B.Sc. AI & ML</option>
              <option value="B.Tech Computer Science">B.Tech Computer Science</option>
              <option value="B.Sc. Data Science">B.Sc. Data Science</option>
              <option value="M.Sc. AI & Robotics">M.Sc. AI & Robotics</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. TOP ROW: 4 STAT METRICS CARDS */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1: Students */}
          <div className="bg-white dark:bg-[#131B2E] rounded-[20px] p-5 border border-[#EDF2F9] dark:border-[#1E293B] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4 apple-card">
            <div className="w-[54px] h-[54px] rounded-[18px] bg-[#EAF3FF] dark:bg-[#182844] flex items-center justify-center text-[#0075FF] shrink-0">
              <Users className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-[#64748B] dark:text-[#94A3B8]">Students</p>
              <div className="flex items-baseline gap-2">
                <span className="text-[26px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">248</span>
                <span className="text-[11px] font-bold text-[#16A34A] flex items-center">
                  ↑ +12%
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] dark:text-[#64748B]">from last semester</p>
            </div>
          </div>

          {/* Metric 2: Teachers */}
          <div className="bg-white dark:bg-[#131B2E] rounded-[20px] p-5 border border-[#EDF2F9] dark:border-[#1E293B] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4 apple-card">
            <div className="w-[54px] h-[54px] rounded-[18px] bg-[#F5ECFE] dark:bg-[#251B3B] flex items-center justify-center text-[#9333EA] shrink-0">
              <GraduationCap className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-[#64748B] dark:text-[#94A3B8]">Teachers</p>
              <div className="flex items-baseline gap-2">
                <span className="text-[26px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">18</span>
                <span className="text-[11px] font-bold text-[#16A34A] flex items-center">
                  ↑ +6%
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] dark:text-[#64748B]">from last semester</p>
            </div>
          </div>

          {/* Metric 3: Departments */}
          <div className="bg-white dark:bg-[#131B2E] rounded-[20px] p-5 border border-[#EDF2F9] dark:border-[#1E293B] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4 apple-card">
            <div className="w-[54px] h-[54px] rounded-[18px] bg-[#E8FBF0] dark:bg-[#0F2D20] flex items-center justify-center text-[#10B981] shrink-0">
              <BookOpen className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-[#64748B] dark:text-[#94A3B8]">Departments</p>
              <div className="flex items-baseline gap-2">
                <span className="text-[26px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">5</span>
                <span className="text-[11px] font-bold text-[#16A34A] flex items-center">
                  ↑ +25%
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] dark:text-[#64748B]">from last semester</p>
            </div>
          </div>

          {/* Metric 4: Active Classes */}
          <div className="bg-white dark:bg-[#131B2E] rounded-[20px] p-5 border border-[#EDF2F9] dark:border-[#1E293B] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4 apple-card">
            <div className="w-[54px] h-[54px] rounded-[18px] bg-[#FFF3E6] dark:bg-[#341F11] flex items-center justify-center text-[#F97316] shrink-0">
              <Calendar className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-[#64748B] dark:text-[#94A3B8]">Active Classes</p>
              <div className="flex items-baseline gap-2">
                <span className="text-[26px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">6</span>
                <span className="text-[11px] font-bold text-[#16A34A] flex items-center">
                  ↑ 2 today
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] dark:text-[#64748B]">live on campus</p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. ATTENTION NEEDED SECTION (3 Soft Warning Cards) */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-500">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-[16px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight flex items-center gap-1.5">
                <span>Attention Needed</span>
                <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-400 text-[11px] font-bold flex items-center justify-center">
                  3
                </span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => alert('Viewing all 3 pending attention alerts.')}
              className="text-[#0075FF] hover:underline text-[13px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Attention Card 1: 2 Subjects without teachers */}
            <div
              onClick={() => setModalType('add-teacher')}
              className="bg-[#FFF5F5] dark:bg-[#251418] border border-[#FED7D7] dark:border-[#4B1E28] rounded-[18px] p-4 flex items-center justify-between cursor-pointer hover:border-red-400 transition-all apple-card"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-[14px] bg-[#FEE2E2] dark:bg-[#3D1A22] flex items-center justify-center text-[#EF4444] shrink-0">
                  <FileText className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                    2 Subjects without teachers
                  </h4>
                  <p className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                    Assign teachers to avoid delays.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-[#EF4444] shrink-0" />
            </div>

            {/* Attention Card 2: Timetable not uploaded */}
            <div
              onClick={() => setModalType('upload-timetable')}
              className="bg-[#FFFBEB] dark:bg-[#281D0D] border border-[#FDE68A] dark:border-[#523A12] rounded-[18px] p-4 flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all apple-card"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-[14px] bg-[#FEF3C7] dark:bg-[#422C0A] flex items-center justify-center text-[#D97706] shrink-0">
                  <Calendar className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                    Timetable not uploaded
                  </h4>
                  <p className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                    Upload timetable for Semester 1.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-[#D97706] shrink-0" />
            </div>

            {/* Attention Card 3: 12 New student registrations */}
            <div
              onClick={() => setModalType('add-student')}
              className="bg-[#EFF6FF] dark:bg-[#11223E] border border-[#BFDBFE] dark:border-[#1E3A6D] rounded-[18px] p-4 flex items-center justify-between cursor-pointer hover:border-blue-400 transition-all apple-card"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-[14px] bg-[#DBEAFE] dark:bg-[#19325C] flex items-center justify-center text-[#2563EB] shrink-0">
                  <Users className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                    12 New student registrations
                  </h4>
                  <p className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                    Review and approve pending students.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-[#2563EB] shrink-0" />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. QUICK ACCESS SECTION (4 Action Buttons) */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <h3 className="text-[16px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
            Quick Access
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Quick Access 1: Add Student */}
            <button
              type="button"
              onClick={() => setModalType('add-student')}
              className="w-full h-[54px] rounded-[16px] bg-[#EAF3FF] dark:bg-[#14233C] border border-[#D5E6FC] dark:border-[#1D355C] px-4.5 flex items-center justify-between text-[#0075FF] dark:text-[#3894FF] font-bold text-[13.5px] apple-card cursor-pointer hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <UserPlus className="w-5 h-5 stroke-[2.3]" />
                <span>Add Student</span>
              </div>
              <ChevronRight className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>

            {/* Quick Access 2: Add Teacher */}
            <button
              type="button"
              onClick={() => setModalType('add-teacher')}
              className="w-full h-[54px] rounded-[16px] bg-[#F5ECFE] dark:bg-[#251B3B] border border-[#E9D5FF] dark:border-[#3D2866] px-4.5 flex items-center justify-between text-[#9333EA] dark:text-[#C084FC] font-bold text-[13.5px] apple-card cursor-pointer hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 stroke-[2.3]" />
                <span>Add Teacher</span>
              </div>
              <ChevronRight className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>

            {/* Quick Access 3: Add Department */}
            <button
              type="button"
              onClick={() => setModalType('add-department')}
              className="w-full h-[54px] rounded-[16px] bg-[#ECFDF5] dark:bg-[#0F2D20] border border-[#A7F3D0] dark:border-[#174D36] px-4.5 flex items-center justify-between text-[#10B981] dark:text-[#34D399] font-bold text-[13.5px] apple-card cursor-pointer hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 stroke-[2.3]" />
                <span>Add Department</span>
              </div>
              <ChevronRight className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>

            {/* Quick Access 4: Upload Timetable */}
            <button
              type="button"
              onClick={() => setModalType('upload-timetable')}
              className="w-full h-[54px] rounded-[16px] bg-[#FFF7ED] dark:bg-[#341F11] border border-[#FED7AA] dark:border-[#5C3217] px-4.5 flex items-center justify-between text-[#EA580C] dark:text-[#FB923C] font-bold text-[13.5px] apple-card cursor-pointer hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 stroke-[2.3]" />
                <span>Upload Timetable</span>
              </div>
              <ChevronRight className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. MAIN TABLE CONTAINER: SYLLABUS & EXAM TABS */}
        {/* ======================================================== */}
        <div className="space-y-0">
          {/* Top Sub-tabs */}
          <div className="flex items-center gap-6 border-b border-transparent pl-1">
            <button
              type="button"
              onClick={() => setActiveTableTab('syllabus')}
              className={`pb-2 text-[14.5px] font-bold relative transition-colors cursor-pointer ${
                activeTableTab === 'syllabus'
                  ? 'text-[#0075FF] dark:text-[#3894FF]'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
              }`}
            >
              <span>Syllabus</span>
              {activeTableTab === 'syllabus' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0075FF] dark:bg-[#3894FF] rounded-full animate-fadeIn" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTableTab('exam')}
              className={`pb-2 text-[14.5px] font-bold relative transition-colors cursor-pointer ${
                activeTableTab === 'exam'
                  ? 'text-[#0075FF] dark:text-[#3894FF]'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
              }`}
            >
              <span>Exam</span>
              {activeTableTab === 'exam' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0075FF] dark:bg-[#3894FF] rounded-full animate-fadeIn" />
              )}
            </button>
          </div>

          {/* White Table Box */}
          <div className="bg-white dark:bg-[#131B2E] rounded-[22px] border border-[#E8EFF7] dark:border-[#1E293B] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
            {/* Table Control Bar: Search & Dropdowns */}
            <div className="p-5 border-b border-[#EDF2F9] dark:border-[#1E293B] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                {activeTableTab === 'syllabus' ? 'Syllabus' : 'Exam Schedule'}
              </h3>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search Input */}
                <div className="relative min-w-[200px]">
                  <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={activeTableTab === 'syllabus' ? 'Search syllabus...' : 'Search exams...'}
                    className="w-full h-10 pl-9 pr-3 rounded-[12px] border border-[#E2E8F0] dark:border-[#223354] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[13px] text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#0075FF]"
                  />
                </div>

                {activeTableTab === 'syllabus' && (
                  <>
                    {/* Filter: Department */}
                    <div className="relative">
                      <select
                        value={selectedDeptFilter}
                        onChange={(e) => setSelectedDeptFilter(e.target.value)}
                        className="appearance-none h-10 pl-3 pr-8 rounded-[12px] border border-[#E2E8F0] dark:border-[#223354] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[12.5px] font-semibold text-[#475569] dark:text-[#CBD5E1] cursor-pointer focus:outline-none focus:border-[#0075FF]"
                      >
                        <option value="All">Department</option>
                        <option value="B.Sc. AI & ML">B.Sc. AI & ML</option>
                        <option value="B.Tech Computer Science">B.Tech CS</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Filter: Semester */}
                    <div className="relative">
                      <select
                        value={selectedSemesterFilter}
                        onChange={(e) => setSelectedSemesterFilter(e.target.value)}
                        className="appearance-none h-10 pl-3 pr-8 rounded-[12px] border border-[#E2E8F0] dark:border-[#223354] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[12.5px] font-semibold text-[#475569] dark:text-[#CBD5E1] cursor-pointer focus:outline-none focus:border-[#0075FF]"
                      >
                        <option value="All">Semester</option>
                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                        <option value="3">Semester 3</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Filter: Status */}
                    <div className="relative">
                      <select
                        value={selectedStatusFilter}
                        onChange={(e) => setSelectedStatusFilter(e.target.value)}
                        className="appearance-none h-10 pl-3 pr-8 rounded-[12px] border border-[#E2E8F0] dark:border-[#223354] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[12.5px] font-semibold text-[#475569] dark:text-[#CBD5E1] cursor-pointer focus:outline-none focus:border-[#0075FF]"
                      >
                        <option value="All">Status</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </>
                )}

                {/* Add Syllabus / Add Exam Button */}
                <button
                  type="button"
                  onClick={() => setModalType(activeTableTab === 'syllabus' ? 'add-syllabus' : 'upload-timetable')}
                  className="h-10 px-4 rounded-[12px] bg-[#0075FF] hover:bg-[#0066E0] text-white text-[13px] font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>{activeTableTab === 'syllabus' ? 'Add Syllabus' : 'Schedule Exam'}</span>
                </button>
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              {activeTableTab === 'syllabus' ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#EDF2F9] dark:border-[#1E293B] text-[12px] font-bold text-[#64748B] dark:text-[#94A3B8] bg-slate-50/50 dark:bg-[#0E1524]/40">
                      <th className="py-3.5 px-5 w-12">#</th>
                      <th className="py-3.5 px-5">Subject</th>
                      <th className="py-3.5 px-5">Department</th>
                      <th className="py-3.5 px-5">Semester</th>
                      <th className="py-3.5 px-5">Units</th>
                      <th className="py-3.5 px-5 min-w-[160px]">Progress</th>
                      <th className="py-3.5 px-5">Last Updated</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-right w-16">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDF2F9] dark:divide-[#1E293B] text-[13.5px]">
                    {filteredSyllabus.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="py-10 text-center text-[#94A3B8]">
                          No matching syllabus records found.
                        </td>
                      </tr>
                    ) : (
                      filteredSyllabus.map((item, index) => {
                        const isPublished = item.status === 'Published';
                        const isFull = item.progress === 100;

                        return (
                          <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-[#1A2640]/50 transition-colors">
                            <td className="py-4 px-5 text-[#64748B] dark:text-[#94A3B8] font-medium">
                              {index + 1}
                            </td>
                            <td className="py-4 px-5 font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                              {item.subject}
                            </td>
                            <td className="py-4 px-5 text-[#475569] dark:text-[#CBD5E1]">
                              {item.department}
                            </td>
                            <td className="py-4 px-5 text-[#475569] dark:text-[#CBD5E1] font-semibold">
                              {item.semester}
                            </td>
                            <td className="py-4 px-5 text-[#475569] dark:text-[#CBD5E1] font-semibold">
                              {item.units}
                            </td>
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-2.5">
                                <div className="flex-1 h-2 bg-[#E2E8F0] dark:bg-[#1E293B] rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                      isFull ? 'bg-[#10B981]' : item.progress >= 70 ? 'bg-[#10B981]' : 'bg-[#F59E0B]'
                                    }`}
                                    style={{ width: `${item.progress}%` }}
                                  />
                                </div>
                                <span className="text-[12px] font-bold text-[#475569] dark:text-[#CBD5E1] w-9 tabular-nums">
                                  {item.progress}%
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-5 text-[#64748B] dark:text-[#94A3B8] text-[12.5px]">
                              {item.lastUpdated}
                            </td>
                            <td className="py-4 px-5">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-bold border ${
                                  isPublished
                                    ? 'bg-[#EBFBF3] dark:bg-[#0D291C] border-[#B7F1D0] dark:border-[#1E5037] text-[#10B981]'
                                    : 'bg-[#F0F7FF] dark:bg-[#12233C] border-[#BAE0FD] dark:border-[#1D3A63] text-[#0075FF]'
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-right">
                              <button
                                type="button"
                                onClick={() => alert(`Options for ${item.subject}`)}
                                className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <MoreHorizontal className="w-4.5 h-4.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#EDF2F9] dark:border-[#1E293B] text-[12px] font-bold text-[#64748B] dark:text-[#94A3B8] bg-slate-50/50 dark:bg-[#0E1524]/40">
                      <th className="py-3.5 px-5">#</th>
                      <th className="py-3.5 px-5">Exam Title</th>
                      <th className="py-3.5 px-5">Department</th>
                      <th className="py-3.5 px-5">Date</th>
                      <th className="py-3.5 px-5">Time Slot</th>
                      <th className="py-3.5 px-5">Room / Hall</th>
                      <th className="py-3.5 px-5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDF2F9] dark:divide-[#1E293B] text-[13.5px]">
                    {examList.map((exam, i) => (
                      <tr key={exam.id} className="hover:bg-slate-50/80 dark:hover:bg-[#1A2640]/50 transition-colors">
                        <td className="py-4 px-5 text-[#64748B] font-medium">{i + 1}</td>
                        <td className="py-4 px-5 font-bold text-[#0F172A] dark:text-[#F8FAFC]">{exam.subject}</td>
                        <td className="py-4 px-5 text-[#475569] dark:text-[#CBD5E1]">{exam.department}</td>
                        <td className="py-4 px-5 text-[#0075FF] font-semibold">{exam.date}</td>
                        <td className="py-4 px-5 text-[#64748B] dark:text-[#94A3B8]">{exam.time}</td>
                        <td className="py-4 px-5 font-medium">{exam.room}</td>
                        <td className="py-4 px-5 text-right">
                          <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11.5px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-200 dark:border-emerald-900">
                            {exam.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Table Footer: Pagination matching screenshot */}
            <div className="p-4 border-t border-[#EDF2F9] dark:border-[#1E293B] flex items-center justify-between text-[12.5px]">
              <span className="text-[#64748B] dark:text-[#94A3B8]">
                Showing 1–{filteredSyllabus.length} of 24 syllabus
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-[8px] border border-[#E2E8F0] dark:border-[#26354D] flex items-center justify-center text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-50 dark:hover:bg-[#1A2640] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {[1, 2, 3, 4, 5].map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-[8px] font-bold text-[12.5px] transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#0075FF] text-white shadow-xs'
                        : 'border border-[#E2E8F0] dark:border-[#26354D] text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-50 dark:hover:bg-[#1A2640]'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                  className="w-8 h-8 rounded-[8px] border border-[#E2E8F0] dark:border-[#26354D] flex items-center justify-center text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-50 dark:hover:bg-[#1A2640] cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ======================================================== */}
      {/* 7. MODALS FOR ADMIN ACTIONS */}
      {/* ======================================================== */}
      {modalType === 'add-syllabus' && (
        <div className="fixed inset-0 bg-slate-900/50 apple-backdrop z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131B2E] w-full max-w-[480px] rounded-[24px] p-6 shadow-2xl border border-slate-100 dark:border-[#1E293B] apple-dialog">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B] mb-4">
              <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Add New Syllabus
              </h3>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSyllabusSubmit} className="space-y-4">
              <div>
                <label className="text-[12.5px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                  Subject Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artificial Intelligence & Heuristics"
                  value={newSubject.subject}
                  onChange={(e) => setNewSubject({ ...newSubject, subject: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-[12px] border border-[#CBD5E1] dark:border-[#26354D] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[14px] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0075FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                    Department
                  </label>
                  <select
                    value={newSubject.department}
                    onChange={(e) => setNewSubject({ ...newSubject, department: e.target.value })}
                    className="w-full h-11 px-3 rounded-[12px] border border-[#CBD5E1] dark:border-[#26354D] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[13px] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="B.Sc. AI & ML">B.Sc. AI & ML</option>
                    <option value="B.Tech Computer Science">B.Tech CS</option>
                  </select>
                </div>

                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                    Semester
                  </label>
                  <select
                    value={newSubject.semester}
                    onChange={(e) => setNewSubject({ ...newSubject, semester: e.target.value })}
                    className="w-full h-11 px-3 rounded-[12px] border border-[#CBD5E1] dark:border-[#26354D] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[13px] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                    Units Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newSubject.units}
                    onChange={(e) => setNewSubject({ ...newSubject, units: e.target.value })}
                    className="w-full h-11 px-3 rounded-[12px] border border-[#CBD5E1] dark:border-[#26354D] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[13px] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0075FF]"
                  />
                </div>

                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                    Status
                  </label>
                  <select
                    value={newSubject.status}
                    onChange={(e) => setNewSubject({ ...newSubject, status: e.target.value })}
                    className="w-full h-11 px-3 rounded-[12px] border border-[#CBD5E1] dark:border-[#26354D] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[13px] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="flex-1 h-11 rounded-[12px] border border-slate-200 dark:border-slate-800 text-[13.5px] font-bold text-[#64748B] hover:bg-slate-50 dark:hover:bg-[#1E293B] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-[12px] bg-[#0075FF] hover:bg-[#0066E0] text-white text-[13.5px] font-bold shadow-md shadow-blue-500/25 cursor-pointer"
                >
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generic Modal for Quick Access Actions */}
      {modalType && modalType !== 'add-syllabus' && (
        <div className="fixed inset-0 bg-slate-900/50 apple-backdrop z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131B2E] w-full max-w-[420px] rounded-[24px] p-6 shadow-2xl border border-slate-100 dark:border-[#1E293B] apple-dialog text-center">
            <div className="w-12 h-12 rounded-[16px] bg-[#EAF3FF] dark:bg-[#182844] flex items-center justify-center text-[#0075FF] mx-auto mb-3.5">
              {modalType === 'upload-timetable' ? (
                <Upload className="w-6 h-6 stroke-[2.2]" />
              ) : (
                <UserPlus className="w-6 h-6 stroke-[2.2]" />
              )}
            </div>

            <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC] capitalize mb-1.5">
              {modalType.replace('-', ' ')}
            </h3>
            <p className="text-[13px] text-[#64748B] dark:text-[#94A3B8] mb-5 leading-relaxed">
              {modalType === 'upload-timetable'
                ? 'Upload an Excel or CSV schedule matrix for Semester 1 classes.'
                : `Enter institutional credentials and enroll the new ${modalType.split('-')[1]} into the portal database.`}
            </p>

            <div className="space-y-3 mb-5">
              <input
                type="text"
                placeholder={modalType === 'upload-timetable' ? 'Select File (.xlsx, .csv)' : 'Full Name'}
                className="w-full h-11 px-3.5 rounded-[12px] border border-slate-200 dark:border-[#223354] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[13.5px] focus:outline-none focus:border-[#0075FF]"
              />
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="flex-1 h-11 rounded-[12px] border border-slate-200 dark:border-slate-800 text-[13px] font-bold text-[#64748B] hover:bg-slate-50 dark:hover:bg-[#1A2640] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Action submitted successfully.');
                  setModalType(null);
                }}
                className="flex-1 h-11 rounded-[12px] bg-[#0075FF] hover:bg-[#0066E0] text-white text-[13px] font-bold shadow-md shadow-blue-500/25 cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
