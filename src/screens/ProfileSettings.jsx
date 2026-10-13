import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Bell,
  User,
  GraduationCap,
  Building2,
  Palette,
  Info,
  LogOut,
  ChevronRight,
  X,
  Check,
  Mail,
  Phone,
  Briefcase,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useTheme } from '../context/ThemeContext';

export default function ProfileSettings() {
  const navigate = useNavigate();
  const { theme, setTheme, isDark, toggleTheme } = useTheme();

  // Scroll visibility for bottom nav
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollTopRef = useRef(0);

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

  // Profile data state
  const [profile, setProfile] = useState({
    name: 'Dr. Aman Sharma',
    designation: 'Assistant Professor',
    department: 'Computer Science',
    college: 'DAV College, Amritsar',
    email: 'aman.sharma@davcollegeasr.ac.in',
    phone: '+91 98765 43210',
    employeeId: 'EMP-CS-2021-042',
    cabin: 'Cabin 304, Block-B',
    joiningYear: '2021',
  });

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'edit' | 'personal' | 'notifications' | 'appearance' | 'about' | 'logout' | null

  // Notification toggles
  const [notifications, setNotifications] = useState({
    classReminders: true,
    timetableChanges: true,
    attendanceAlerts: true,
    whatsappUpdates: false,
  });

  // Edit form state
  const [editForm, setEditForm] = useState({ ...profile });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...editForm });
    setActiveModal(null);
  };

  const handleLogOut = () => {
    navigate('/login');
  };

  return (
    <div className="relative h-full flex flex-col bg-[#FDFDFE] dark:bg-[#0B0F19] transition-colors duration-200 select-none overflow-hidden font-sans">
      {/* Scrollable Container */}
      <div
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-5 sm:px-6 pt-4 pb-28 no-scrollbar"
      >
        {/* Top Header: Brand Logo & Right Utility Actions */}
        <header className="flex items-center justify-between mb-4">
          {/* ClassHere Branding */}
          <div className="flex items-center">
            <span className="text-[25px] font-black tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
              Class
            </span>
            <span className="text-[25px] font-black tracking-tight text-[#0075FF] dark:text-[#3894FF]">
              Here
            </span>
          </div>

          {/* Right Header Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Dark Mode Sun/Moon Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="w-10 h-10 rounded-[14px] bg-[#F1F5F9] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#26354D] flex items-center justify-center text-[#475569] dark:text-[#94A3B8] hover:text-[#0075FF] dark:hover:text-[#3894FF] active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400 stroke-[2.2]" />
              ) : (
                <Moon className="w-5 h-5 text-[#475569] stroke-[2.2]" />
              )}
            </button>

            {/* Notification Bell with Active Indicator Dot */}
            <button
              type="button"
              onClick={() => setActiveModal('notifications')}
              className="relative p-2 text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#0075FF] dark:hover:text-[#3894FF] transition-colors focus:outline-none cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-[23px] h-[23px] stroke-[2]" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#0075FF] rounded-full ring-2 ring-white dark:ring-[#0B0F19]" />
            </button>

            {/* Profile Avatar Pill */}
            <div className="w-10 h-10 rounded-full bg-[#EBF3FE] dark:bg-[#162238] flex items-center justify-center text-[#0075FF] dark:text-[#3894FF] border border-[#D0E2FB] dark:border-[#223354]">
              <User className="w-5 h-5 fill-current" />
            </div>
          </div>
        </header>

        {/* Page Title & Subtitle */}
        <div className="mb-4">
          <h1 className="text-[25px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-[-0.02em] leading-tight">
            Profile
          </h1>
          <p className="text-[13.5px] font-medium text-[#64748B] dark:text-[#94A3B8] mt-0.5">
            Manage your account and preferences.
          </p>
        </div>

        {/* Card 1: Faculty Profile Card */}
        <div className="bg-[#F8FAFC]/90 dark:bg-[#131B2E] rounded-[20px] border border-[#E2E8F0] dark:border-[#1E293B] p-4 flex items-center justify-between shadow-xs mb-3.5 transition-colors">
          {/* Left Avatar & Info */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-[54px] h-[54px] rounded-full bg-[#DBEAFE] dark:bg-[#1E2E4A] flex items-center justify-center text-[#0075FF] dark:text-[#3894FF] shrink-0 shadow-inner">
              <User className="w-6.5 h-6.5 fill-current" />
            </div>
            <div className="min-w-0 pr-2">
              <h2 className="text-[17px] font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight truncate leading-tight">
                {profile.name}
              </h2>
              <p className="text-[12.5px] font-medium text-[#64748B] dark:text-[#94A3B8] mt-1 leading-tight truncate">
                {profile.designation} • {profile.department}
              </p>
            </div>
          </div>

          {/* Right Edit Button */}
          <button
            type="button"
            onClick={() => {
              setEditForm({ ...profile });
              setActiveModal('edit');
            }}
            className="px-3.5 py-1.5 rounded-[10px] bg-[#EBF3FE] dark:bg-[#162238] hover:bg-[#DBEAFE] dark:hover:bg-[#1E2E4A] text-[#0075FF] dark:text-[#3894FF] font-bold text-[13px] active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            Edit
          </button>
        </div>

        {/* Card 2: Department & College Info Card - Full width layout to eliminate truncation */}
        <div className="bg-white dark:bg-[#131B2E] rounded-[18px] border border-[#E2E8F0] dark:border-[#1E293B] p-3.5 shadow-xs mb-3.5 space-y-2.5 transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-[11px] bg-[#E8F8EE] dark:bg-[#064E3B]/40 flex items-center justify-center text-[#10B981] dark:text-[#34D399] shrink-0">
              <GraduationCap className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10.5px] font-semibold text-[#64748B] dark:text-[#94A3B8] block leading-tight">
                Department
              </span>
              <span className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] block leading-snug">
                {profile.department}
              </span>
            </div>
          </div>

          <div className="h-[1px] bg-[#F1F5F9] dark:bg-[#1E293B] w-full" />

          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-[11px] bg-[#EBF3FE] dark:bg-[#162238] flex items-center justify-center text-[#0075FF] dark:text-[#3894FF] shrink-0">
              <Building2 className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10.5px] font-semibold text-[#64748B] dark:text-[#94A3B8] block leading-tight">
                College
              </span>
              <span className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] block leading-snug">
                {profile.college}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Menu List Group */}
        <div className="bg-white dark:bg-[#131B2E] rounded-[18px] border border-[#E2E8F0] dark:border-[#1E293B] overflow-hidden shadow-xs mb-3.5 divide-y divide-[#F1F5F9] dark:divide-[#1E293B] transition-colors">
          {/* 1. Personal Information */}
          <button
            type="button"
            onClick={() => setActiveModal('personal')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-[#162036] active:bg-slate-100/70 dark:active:bg-[#1A2540] transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-[12px] bg-[#EFF6FF] dark:bg-[#162238] flex items-center justify-center text-[#0075FF] dark:text-[#3894FF] shrink-0 group-hover:scale-105 transition-transform">
                <User className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[14.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight">
                  Personal Information
                </h3>
                <p className="text-[12px] font-medium text-[#64748B] dark:text-[#94A3B8] mt-0.5 leading-tight truncate">
                  Name, department, contact details
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#94A3B8] dark:text-[#64748B] stroke-[2.2] shrink-0 ml-2" />
          </button>

          {/* 2. Notifications */}
          <button
            type="button"
            onClick={() => setActiveModal('notifications')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-[#162036] active:bg-slate-100/70 dark:active:bg-[#1A2540] transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-[12px] bg-[#EFF6FF] dark:bg-[#162238] flex items-center justify-center text-[#0075FF] dark:text-[#3894FF] shrink-0 group-hover:scale-105 transition-transform">
                <Bell className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[14.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight">
                  Notifications
                </h3>
                <p className="text-[12px] font-medium text-[#64748B] dark:text-[#94A3B8] mt-0.5 leading-tight truncate">
                  Manage what you want to be notified about
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#94A3B8] dark:text-[#64748B] stroke-[2.2] shrink-0 ml-2" />
          </button>

          {/* 3. Appearance */}
          <button
            type="button"
            onClick={() => setActiveModal('appearance')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-[#162036] active:bg-slate-100/70 dark:active:bg-[#1A2540] transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-[12px] bg-[#EFF6FF] dark:bg-[#162238] flex items-center justify-center text-[#0075FF] dark:text-[#3894FF] shrink-0 group-hover:scale-105 transition-transform">
                <Palette className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[14.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight">
                  Appearance
                </h3>
                <p className="text-[12px] font-medium text-[#64748B] dark:text-[#94A3B8] mt-0.5 leading-tight capitalize truncate">
                  {theme} mode
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#94A3B8] dark:text-[#64748B] stroke-[2.2] shrink-0 ml-2" />
          </button>

          {/* 4. About ClassHere */}
          <button
            type="button"
            onClick={() => setActiveModal('about')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-[#162036] active:bg-slate-100/70 dark:active:bg-[#1A2540] transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-[12px] bg-[#EFF6FF] dark:bg-[#162238] flex items-center justify-center text-[#0075FF] dark:text-[#3894FF] shrink-0 group-hover:scale-105 transition-transform">
                <Info className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[14.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight">
                  About ClassHere
                </h3>
                <p className="text-[12px] font-medium text-[#64748B] dark:text-[#94A3B8] mt-0.5 leading-tight truncate">
                  App version, faculty information and more
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#94A3B8] dark:text-[#64748B] stroke-[2.2] shrink-0 ml-2" />
          </button>
        </div>

        {/* Card 4: Log Out Button */}
        <button
          type="button"
          onClick={() => setActiveModal('logout')}
          className="w-full h-[50px] rounded-[15px] bg-[#FEF2F2] dark:bg-[#451010]/30 hover:bg-[#FEE2E2] dark:hover:bg-[#451010]/50 active:scale-[0.99] border border-[#FEE2E2]/80 dark:border-[#7F1D1D]/40 flex items-center justify-center gap-2 text-[#EF4444] dark:text-[#F87171] font-bold text-[14.5px] transition-all cursor-pointer shadow-xs"
        >
          <LogOut className="w-5 h-5 stroke-[2.2]" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Unified 5-Tab Bottom Navigation Bar */}
      <BottomNav activeTab="profile" isVisible={isNavVisible} />

      {/* ======================================================== */}
      {/* MODAL 1: Edit Profile Modal */}
      {/* ======================================================== */}
      {activeModal === 'edit' && (
        <div className="absolute inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white dark:bg-[#131B2E] w-full rounded-t-[28px] sm:rounded-[28px] p-6 max-h-[85vh] overflow-y-auto apple-sheet border border-slate-100 dark:border-[#1E293B] shadow-2xl transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B] mb-4">
              <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">Edit Profile</h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="text-[12px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full h-12 px-3.5 rounded-[14px] border border-[#CBD5E1] dark:border-[#26354D] bg-white dark:bg-[#0B0F19] font-semibold text-[#0F172A] dark:text-[#F8FAFC] focus:border-[#0075FF] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block mb-1">
                  Designation / Title
                </label>
                <input
                  type="text"
                  value={editForm.designation}
                  onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                  className="w-full h-12 px-3.5 rounded-[14px] border border-[#CBD5E1] dark:border-[#26354D] bg-white dark:bg-[#0B0F19] font-semibold text-[#0F172A] dark:text-[#F8FAFC] focus:border-[#0075FF] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  className="w-full h-12 px-3.5 rounded-[14px] border border-[#CBD5E1] dark:border-[#26354D] bg-white dark:bg-[#0B0F19] font-semibold text-[#0F172A] dark:text-[#F8FAFC] focus:border-[#0075FF] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block mb-1">
                  Office / Cabin Location
                </label>
                <input
                  type="text"
                  value={editForm.cabin}
                  onChange={(e) => setEditForm({ ...editForm, cabin: e.target.value })}
                  className="w-full h-12 px-3.5 rounded-[14px] border border-[#CBD5E1] dark:border-[#26354D] bg-white dark:bg-[#0B0F19] font-semibold text-[#0F172A] dark:text-[#F8FAFC] focus:border-[#0075FF] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 h-12 rounded-[14px] bg-slate-100 dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8] font-bold text-[14.5px] hover:bg-slate-200 dark:hover:bg-[#253248]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-12 rounded-[14px] bg-[#0075FF] text-white font-bold text-[14.5px] shadow-md shadow-blue-500/25 hover:bg-[#0066E0]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: Personal Information Detail Sheet */}
      {/* ======================================================== */}
      {activeModal === 'personal' && (
        <div className="absolute inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white dark:bg-[#131B2E] w-full rounded-t-[28px] sm:rounded-[28px] p-6 max-h-[85vh] overflow-y-auto apple-sheet border border-slate-100 dark:border-[#1E293B] shadow-2xl transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B] mb-4">
              <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">Personal Information</h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="p-3.5 rounded-[16px] bg-[#F8FAFC] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354]">
                <span className="text-[11.5px] font-semibold text-[#94A3B8] dark:text-[#64748B] block">Employee ID</span>
                <span className="text-[14.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] block mt-0.5">{profile.employeeId}</span>
              </div>

              <div className="p-3.5 rounded-[16px] bg-[#F8FAFC] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354]">
                <span className="text-[11.5px] font-semibold text-[#94A3B8] dark:text-[#64748B] block">Registered Email</span>
                <span className="text-[14.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] block mt-0.5">{profile.email}</span>
              </div>

              <div className="p-3.5 rounded-[16px] bg-[#F8FAFC] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354]">
                <span className="text-[11.5px] font-semibold text-[#94A3B8] dark:text-[#64748B] block">WhatsApp / Mobile</span>
                <span className="text-[14.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] block mt-0.5">{profile.phone}</span>
              </div>

              <div className="p-3.5 rounded-[16px] bg-[#F8FAFC] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354]">
                <span className="text-[11.5px] font-semibold text-[#94A3B8] dark:text-[#64748B] block">Cabin Location</span>
                <span className="text-[14.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] block mt-0.5">{profile.cabin}</span>
              </div>

              <div className="p-3.5 rounded-[16px] bg-[#F8FAFC] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354]">
                <span className="text-[11.5px] font-semibold text-[#94A3B8] dark:text-[#64748B] block">Assigned Batches</span>
                <span className="text-[14.5px] font-bold text-[#0075FF] dark:text-[#3894FF] block mt-0.5">CSE-4A, CSE-6B</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full mt-5 h-12 rounded-[14px] bg-[#0075FF] text-white font-bold text-[14.5px]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: Notifications Preferences */}
      {/* ======================================================== */}
      {activeModal === 'notifications' && (
        <div className="absolute inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white dark:bg-[#131B2E] w-full rounded-t-[28px] sm:rounded-[28px] p-6 max-h-[85vh] overflow-y-auto apple-sheet border border-slate-100 dark:border-[#1E293B] shadow-2xl transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B] mb-4">
              <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">Notification Settings</h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: 'classReminders',
                  title: 'Class Reminders',
                  desc: 'Get notified 15 minutes before your scheduled lecture starts',
                },
                {
                  key: 'timetableChanges',
                  title: 'Timetable Updates',
                  desc: 'Immediate notification when the Admin adjusts room or slots',
                },
                {
                  key: 'attendanceAlerts',
                  title: 'Attendance Submission Confirmation',
                  desc: 'Receive confirmation receipt after recording class attendance',
                },
                {
                  key: 'whatsappUpdates',
                  title: 'WhatsApp Broadcasts',
                  desc: 'Receive critical institutional notices directly on WhatsApp',
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-3.5 rounded-[16px] bg-[#F8FAFC] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354]"
                >
                  <div className="pr-3">
                    <h4 className="text-[14px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">{item.title}</h4>
                    <p className="text-[12px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                    }
                    className={`w-12 h-7 rounded-full p-1 transition-colors ${
                      notifications[item.key] ? 'bg-[#0075FF]' : 'bg-slate-300 dark:bg-[#26354D]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                        notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full mt-5 h-12 rounded-[14px] bg-[#0075FF] text-white font-bold text-[14.5px]"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: Appearance Settings */}
      {/* ======================================================== */}
      {activeModal === 'appearance' && (
        <div className="absolute inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white dark:bg-[#131B2E] w-full rounded-t-[28px] sm:rounded-[28px] p-6 max-h-[85vh] overflow-y-auto apple-sheet border border-slate-100 dark:border-[#1E293B] shadow-2xl transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B] mb-4">
              <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">Appearance</h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'light',
                  label: 'Light Mode',
                  sub: 'Standard crisp high-contrast theme',
                  icon: Sun,
                  iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40',
                },
                {
                  id: 'dark',
                  label: 'Dark Mode',
                  sub: 'Deep charcoal & obsidian aesthetic for low-light comfort',
                  icon: Moon,
                  iconColor: 'text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40',
                },
                {
                  id: 'system',
                  label: 'System Default',
                  sub: 'Match your operating system preferences',
                  icon: Laptop,
                  iconColor: 'text-[#0075FF] dark:text-[#3894FF] bg-[#EBF5FF] dark:bg-[#162238]',
                },
              ].map((opt) => {
                const IconComponent = opt.icon;
                const isSelected = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTheme(opt.id)}
                    className={`w-full p-3.5 sm:p-4 rounded-[18px] border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0075FF] bg-[#F0F6FE] dark:bg-[#162238] dark:border-[#3894FF] shadow-xs'
                        : 'border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#131B2E] hover:bg-slate-50 dark:hover:bg-[#162036]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 ${opt.iconColor}`}>
                        <IconComponent className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[15px] font-bold text-[#0F172A] dark:text-[#F8FAFC] block">
                          {opt.label}
                        </span>
                        <p className="text-[12px] text-[#64748B] dark:text-[#94A3B8] mt-0.5 leading-snug">
                          {opt.sub}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#0075FF] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full mt-5 h-12 rounded-[14px] bg-[#0075FF] hover:bg-[#0066E0] text-white font-bold text-[14.5px] cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: About ClassHere */}
      {/* ======================================================== */}
      {activeModal === 'about' && (
        <div className="absolute inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white dark:bg-[#131B2E] w-full rounded-t-[28px] sm:rounded-[28px] p-6 max-h-[85vh] overflow-y-auto apple-sheet border border-slate-100 dark:border-[#1E293B] shadow-2xl transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B] mb-4">
              <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">About ClassHere</h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center py-2 mb-4">
              <div className="text-[26px] font-black tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
                Class<span className="text-[#0075FF] dark:text-[#3894FF]">Here</span>
              </div>
              <p className="text-[12.5px] font-bold text-[#64748B] dark:text-[#94A3B8] mt-0.5">Faculty Academic Suite</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#EFF6FF] dark:bg-[#162238] text-[#0075FF] dark:text-[#3894FF] text-[12px] font-bold">
                Version 1.0.4 (Build 2026.10)
              </span>
            </div>

            <div className="space-y-2.5">
              <Link
                to="/founder-story"
                onClick={() => setActiveModal(null)}
                className="flex items-center justify-between p-3.5 rounded-[16px] bg-[#F8FAFC] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354] hover:bg-[#F1F5F9] dark:hover:bg-[#1E2E4A] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#0075FF] dark:text-[#3894FF]" />
                  <span className="text-[14px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">Founder Story</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#94A3B8] dark:text-[#64748B]" />
              </Link>

              <Link
                to="/privacy-policy"
                onClick={() => setActiveModal(null)}
                className="flex items-center justify-between p-3.5 rounded-[16px] bg-[#F8FAFC] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354] hover:bg-[#F1F5F9] dark:hover:bg-[#1E2E4A] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#0075FF] dark:text-[#3894FF]" />
                  <span className="text-[14px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">Privacy Policy</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#94A3B8] dark:text-[#64748B]" />
              </Link>

              <Link
                to="/terms-of-use"
                onClick={() => setActiveModal(null)}
                className="flex items-center justify-between p-3.5 rounded-[16px] bg-[#F8FAFC] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#223354] hover:bg-[#F1F5F9] dark:hover:bg-[#1E2E4A] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#0075FF] dark:text-[#3894FF]" />
                  <span className="text-[14px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">Terms of Use</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#94A3B8] dark:text-[#64748B]" />
              </Link>
            </div>

            <div className="mt-5 text-center">
              <p className="text-[12.5px] text-[#64748B] dark:text-[#94A3B8] font-medium">
                A Product by <strong className="text-[#0F172A] dark:text-[#F8FAFC]">Levro Studio</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full mt-4 h-12 rounded-[14px] bg-[#0075FF] hover:bg-[#0066E0] text-white font-bold text-[14.5px] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 6: Log Out Confirmation Dialog */}
      {/* ======================================================== */}
      {activeModal === 'logout' && (
        <div className="absolute inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131B2E] w-full max-w-sm rounded-[26px] p-6 text-center apple-dialog border border-slate-100 dark:border-[#1E293B] shadow-2xl transition-colors">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/40 text-red-500 mx-auto flex items-center justify-center mb-3">
              <LogOut className="w-7 h-7 stroke-[2.2]" />
            </div>

            <h3 className="text-[19px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">Log Out</h3>
            <p className="text-[14px] text-[#64748B] dark:text-[#94A3B8] mt-1.5 leading-relaxed">
              Are you sure you want to log out of your ClassHere teacher account?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="flex-1 h-12 rounded-[14px] bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-[#253248] text-[#64748B] dark:text-[#94A3B8] font-bold text-[14.5px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogOut}
                className="flex-1 h-12 rounded-[14px] bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-[14.5px] shadow-lg shadow-red-500/20 cursor-pointer"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
