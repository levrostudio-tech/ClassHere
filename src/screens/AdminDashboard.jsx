import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  TrendingUp,
  LogOut,
  Shield,
  Search,
  Bell,
  CheckCircle2,
  Clock,
  BookOpen,
  Building2,
  FileSpreadsheet,
  Moon,
  Sun,
} from 'lucide-react';
import { adminLogout, getAdminUser } from '../lib/adminAuth';
import { useTheme } from '../context/ThemeContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isDark, toggleDarkMode } = useTheme();
  const adminUser = getAdminUser();

  const [activeTab, setActiveTab] = useState('classes');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login', { replace: true });
  };

  // Mock Academic Data for Admin Overview
  const stats = [
    {
      title: 'Total Students',
      value: '1,480',
      change: '+12% this semester',
      icon: GraduationCap,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
    },
    {
      title: 'Active Faculty',
      value: '64',
      change: '100% verified',
      icon: Users,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      title: 'Today’s Lectures',
      value: '28',
      change: '18 completed, 10 pending',
      icon: CalendarCheck,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-950/40',
    },
    {
      title: 'Attendance Average',
      value: '94.2%',
      change: '+3.1% vs last week',
      icon: TrendingUp,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
    },
  ];

  const todayClasses = [
    {
      code: 'CS-401',
      subject: 'Distributed Systems & Cloud Computing',
      faculty: 'Dr. Aris Thorne',
      room: 'Hall B-204',
      time: '09:00 AM - 10:30 AM',
      attendance: '96%',
      status: 'Completed',
    },
    {
      code: 'EE-205',
      subject: 'Signals, Logic & Linear Systems',
      faculty: 'Prof. Maya Lin',
      room: 'Lab E-102',
      time: '11:00 AM - 12:30 PM',
      attendance: '92%',
      status: 'Completed',
    },
    {
      code: 'ME-312',
      subject: 'Thermodynamics & Fluid Dynamics',
      faculty: 'Dr. Vikram Sen',
      room: 'Hall A-101',
      time: '02:00 PM - 03:30 PM',
      attendance: '89%',
      status: 'In Progress',
    },
    {
      code: 'AI-502',
      subject: 'Deep Neural Networks & Transformers',
      faculty: 'Dr. Elena Rostova',
      room: 'Virtual Auditorium 1',
      time: '04:00 PM - 05:30 PM',
      attendance: '--',
      status: 'Upcoming',
    },
    {
      code: 'MA-101',
      subject: 'Discrete Mathematics & Proofs',
      faculty: 'Prof. Sarah Jenkins',
      room: 'Hall C-301',
      time: '05:45 PM - 07:00 PM',
      attendance: '--',
      status: 'Upcoming',
    },
  ];

  const facultyRoster = [
    { name: 'Dr. Aris Thorne', department: 'Computer Science', courses: 3, status: 'Active' },
    { name: 'Prof. Maya Lin', department: 'Electrical Engineering', courses: 2, status: 'Active' },
    { name: 'Dr. Vikram Sen', department: 'Mechanical Engineering', courses: 4, status: 'Active' },
    { name: 'Dr. Elena Rostova', department: 'Artificial Intelligence', courses: 2, status: 'Active' },
    { name: 'Prof. Sarah Jenkins', department: 'Mathematics', courses: 3, status: 'Active' },
  ];

  const filteredClasses = todayClasses.filter(
    (c) =>
      c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] flex flex-col font-sans transition-colors duration-200">
      {/* Desktop Navigation Top Bar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#131B2E]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#1E293B] px-6 lg:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Brand Logo Text */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
            <div className="font-black text-[22px] tracking-tight">
              <span className="text-[#0075FF]">Class</span>
              <span className="text-[#0F172A] dark:text-[#F8FAFC]">Here</span>
            </div>
            <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#0075FF] uppercase">
              Admin Console
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[13px] text-[#64748B] dark:text-[#94A3B8] border-l border-slate-200 dark:border-slate-800 pl-6">
            <Building2 className="w-4 h-4 text-[#0075FF]" />
            <span>Main University Campus</span>
            <span className="mx-1">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Fall 2026 Session Live
            </span>
          </div>
        </div>

        {/* Action Controls & Admin Profile */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-xl border border-slate-200 dark:border-[#223354] flex items-center justify-center text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#1A2640] transition-colors"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Admin Tag */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1A2640] border border-slate-200 dark:border-[#26354D]">
            <Shield className="w-3.5 h-3.5 text-[#0075FF]" />
            <span className="text-[12.5px] font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              {adminUser?.username || 'Administrator'}
            </span>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-3.5 py-1.5 h-9 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 text-[13px] font-semibold border border-red-200 dark:border-red-900/60 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-10 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[26px] sm:text-[30px] font-black tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
              Institutional Overview
            </h1>
            <p className="text-[14px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
              Real-time attendance telemetry, department scheduling, and faculty controls.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => alert('Attendance report export initiated.')}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#223354] bg-white dark:bg-[#131B2E] text-[13.5px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] hover:bg-slate-50 dark:hover:bg-[#1A2640] transition-colors flex items-center gap-2 shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#0075FF]" />
              Export Records
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-[20px] bg-white dark:bg-[#131B2E] border border-[#E2E8F0] dark:border-[#1E293B] shadow-[0_4px_16px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all hover:border-[#0075FF]/40"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                    {s.title}
                  </span>
                  <div className={`w-10 h-10 rounded-[12px] ${s.bg} ${s.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </div>
                <div className="text-[28px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                  {s.value}
                </div>
                <div className="text-[12px] font-medium text-[#64748B] dark:text-[#94A3B8] mt-1 flex items-center gap-1.5">
                  <span className="text-emerald-500 font-semibold">•</span>
                  {s.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Card: Schedule & Faculty Roster */}
        <div className="bg-white dark:bg-[#131B2E] rounded-[24px] border border-[#E2E8F0] dark:border-[#1E293B] shadow-[0_6px_24px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Card Tabs & Search Controls */}
          <div className="p-5 border-b border-[#E2E8F0] dark:border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('classes')}
                className={`px-4 py-2 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                  activeTab === 'classes'
                    ? 'bg-[#0075FF] text-white shadow-md shadow-blue-500/25'
                    : 'text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#1A2640]'
                }`}
              >
                Today’s Live Timetable
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('faculty')}
                className={`px-4 py-2 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                  activeTab === 'faculty'
                    ? 'bg-[#0075FF] text-white shadow-md shadow-blue-500/25'
                    : 'text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#1A2640]'
                }`}
              >
                Faculty Directory
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search subject, course, teacher..."
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-[#223354] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[13px] text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#0075FF]"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {activeTab === 'classes' ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-[#1E293B] bg-slate-50/60 dark:bg-[#0E1524]/60 text-[12px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider">
                    <th className="py-3.5 px-6">Course Code</th>
                    <th className="py-3.5 px-6">Subject Title</th>
                    <th className="py-3.5 px-6">Faculty Member</th>
                    <th className="py-3.5 px-6">Room / Slot</th>
                    <th className="py-3.5 px-6">Attendance</th>
                    <th className="py-3.5 px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B] text-[13.5px]">
                  {filteredClasses.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-[#94A3B8]">
                        No matching scheduled classes found.
                      </td>
                    </tr>
                  ) : (
                    filteredClasses.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50/80 dark:hover:bg-[#1A2640]/50 transition-colors">
                        <td className="py-4 px-6 font-bold text-[#0075FF] dark:text-[#3894FF]">
                          {item.code}
                        </td>
                        <td className="py-4 px-6 font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                          {item.subject}
                        </td>
                        <td className="py-4 px-6 text-[#64748B] dark:text-[#94A3B8]">
                          {item.faculty}
                        </td>
                        <td className="py-4 px-6 text-[#64748B] dark:text-[#94A3B8]">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">{item.room}</span>
                            <span className="text-[12px] text-[#94A3B8]">{item.time}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                          {item.attendance}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11.5px] font-bold ${
                              item.status === 'Completed'
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                                : item.status === 'In Progress'
                                ? 'bg-blue-100 dark:bg-blue-950/60 text-[#0075FF] dark:text-[#3894FF]'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-[#1E293B] bg-slate-50/60 dark:bg-[#0E1524]/60 text-[12px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider">
                    <th className="py-3.5 px-6">Faculty Name</th>
                    <th className="py-3.5 px-6">Department</th>
                    <th className="py-3.5 px-6">Assigned Courses</th>
                    <th className="py-3.5 px-6 text-right">Institutional Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B] text-[13.5px]">
                  {facultyRoster.map((f, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-[#1A2640]/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                        {f.name}
                      </td>
                      <td className="py-4 px-6 text-[#64748B] dark:text-[#94A3B8]">
                        {f.department}
                      </td>
                      <td className="py-4 px-6 font-semibold text-[#0075FF]">
                        {f.courses} Courses
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {f.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
