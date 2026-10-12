import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  GraduationCap,
  MoreVertical,
  ShieldCheck,
  X,
  Lock,
  Sparkles,
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import CampusFooter from '../components/CampusFooter';
import TopDecorCircles from '../components/TopDecorCircles';

export default function RoleSelect() {
  const navigate = useNavigate();

  // State for Three-Dot Dropdown & Admin Access Modal
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleRoleClick = (role) => {
    if (role === 'teacher') {
      localStorage.setItem('classhere_role', 'teacher');
      navigate('/login', { state: { role: 'teacher' } });
    } else if (role === 'student') {
      localStorage.setItem('classhere_role', 'student');
      navigate('/student-login', { state: { role: 'student' } });
    }
  };

  const handleAdminSubmit = (e) => {
    e?.preventDefault();
    // Allow demo passcode '1234', 'ADMIN', or direct entry
    if (adminPasscode.trim() === '1234' || adminPasscode.trim().toUpperCase() === 'ADMIN' || adminPasscode.trim() === '') {
      localStorage.setItem('classhere_role', 'admin');
      setShowAdminModal(false);
      navigate('/dashboard', { state: { role: 'admin', isAdmin: true } });
    } else {
      setAdminError('Invalid Passcode. Use 1234 for demo.');
    }
  };

  return (
    <div className="relative min-h-full flex-1 flex flex-col bg-white dark:bg-[#0B0F19] overflow-hidden justify-between select-none transition-colors duration-200">
      {/* Background Soft Accent Circles */}
      <TopDecorCircles />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-start px-6 pt-3.5 pb-2">
        {/* Top Header Row with Three-Dot Menu (Top Right) */}
        <div className="relative flex items-center justify-end h-9">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="More options"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#475569] dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#162036] active:scale-95 transition-all cursor-pointer"
          >
            <MoreVertical className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Three-Dot Dropdown Menu (Anchored below Three Dots) */}
          {isMenuOpen && (
            <>
              {/* Invisible Backdrop overlay to dismiss dropdown on outside tap */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsMenuOpen(false)}
              />

              <div className="absolute top-9 right-0 z-50 bg-white dark:bg-[#131B2E] rounded-[18px] shadow-[0_12px_32px_rgba(0,0,0,0.14)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.6)] border border-[#E2E8F0] dark:border-[#223354] p-1.5 min-w-[195px] animate-fadeIn">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowAdminModal(true);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-[14px] hover:bg-[#F8FAFC] dark:hover:bg-[#1A2640] active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[10px] bg-[#EAF3FF] dark:bg-[#162238] flex items-center justify-center text-[#0075FF] dark:text-[#3894FF] shrink-0">
                      <ShieldCheck className="w-4.5 h-4.5 stroke-[2.2]" />
                    </div>
                    <span className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                      Admin Access
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0075FF] dark:text-[#3894FF] stroke-[2.2] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Logo & App Icon */}
        <div className="mt-1 mb-4">
          <BrandLogo showIcon={true} iconSize={84} fontSize="text-[34px]" />
        </div>

        {/* Headings - Matching "Welcome / Choose how you want to continue" */}
        <div className="text-center mb-6">
          <h1 className="text-[30px] sm:text-[32px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mb-1">
            Welcome
          </h1>
          <p className="text-[15px] font-normal text-[#64748B] dark:text-[#94A3B8] leading-snug">
            Choose how you want to continue
          </p>
        </div>

        {/* 2 Role Selection Cards: Teacher Login & Student Login */}
        <div className="space-y-3.5">
          {/* 1. Teacher Login (White Card) */}
          <button
            type="button"
            onClick={() => handleRoleClick('teacher')}
            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-white dark:bg-[#131B2E] border border-[#DCE8FC] dark:border-[#223354] hover:border-[#0075FF]/60 dark:hover:border-[#3894FF]/60 rounded-[22px] shadow-[0_2px_10px_rgba(0,117,255,0.03)] hover:shadow-[0_8px_20px_rgba(0,117,255,0.08)] transition-all duration-150 active:scale-[0.98] cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-[18px] bg-[#EAF3FF] dark:bg-[#1A2640] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <svg
                  className="w-7 h-7 text-[#0075FF] dark:text-[#3894FF]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="7" cy="8" r="3.2" />
                  <path d="M2 19v-1.5a4.5 4.5 0 0 1 9 0V19" />
                  <rect x="13" y="5" width="9" height="8" rx="1.5" />
                  <path d="M16 8h3M16 10.5h2" strokeWidth="1.8" />
                </svg>
              </div>
              <span className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight group-hover:text-[#0075FF] dark:group-hover:text-[#3894FF] transition-colors">
                Teacher Login
              </span>
            </div>
            <ArrowRight className="w-5.5 h-5.5 text-[#0075FF] dark:text-[#3894FF] stroke-[2.4] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 2. Student Login (Solid Electric Blue Card) */}
          <button
            type="button"
            onClick={() => handleRoleClick('student')}
            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-[#0075FF] dark:bg-[#0066FF] hover:bg-[#0066E0] rounded-[22px] shadow-[0_10px_25px_rgba(0,117,255,0.35)] hover:shadow-[0_14px_30px_rgba(0,117,255,0.45)] transition-all duration-150 active:scale-[0.98] cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-[18px] bg-white/20 dark:bg-white/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-white">
                <GraduationCap className="w-7 h-7 text-white stroke-[2.2]" />
              </div>
              <span className="text-[18px] font-bold text-white tracking-tight">
                Student Login
              </span>
            </div>
            <ArrowRight className="w-5.5 h-5.5 text-white stroke-[2.4] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Admin Access Modal */}
      {showAdminModal && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fadeIn">
          <div className="bg-white dark:bg-[#131B2E] w-full rounded-t-[28px] sm:rounded-[24px] p-5 max-h-[85vh] overflow-y-auto animate-slideUp border border-slate-100 dark:border-[#1E293B] shadow-2xl transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B] mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[12px] bg-[#EAF3FF] dark:bg-[#162238] flex items-center justify-center text-[#0075FF] dark:text-[#3894FF]">
                  <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                    Admin Portal Access
                  </h3>
                  <p className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8]">
                    Institutional & Department Console
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAdminModal(false);
                  setAdminError('');
                }}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Passcode Form */}
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="text-[12.5px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1.5">
                  Admin Passcode
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="password"
                    value={adminPasscode}
                    onChange={(e) => {
                      setAdminPasscode(e.target.value);
                      setAdminError('');
                    }}
                    placeholder="Enter PIN (Demo: 1234)"
                    className="w-full h-12 pl-10 pr-4 rounded-[14px] border border-[#CBD5E1] dark:border-[#26354D] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] font-semibold text-[15px] focus:outline-none focus:border-[#0075FF] dark:focus:border-[#3894FF]"
                    autoFocus
                  />
                </div>
                {adminError ? (
                  <p className="text-[12px] font-medium text-red-500 mt-1.5">{adminError}</p>
                ) : (
                  <p className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8] mt-1.5">
                    Demo Passcode: <span className="font-bold text-[#0075FF] dark:text-[#3894FF]">1234</span>
                  </p>
                )}
              </div>

              <div className="pt-1 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setAdminPasscode('1234');
                    setAdminError('');
                  }}
                  className="px-3.5 h-11 rounded-[13px] bg-slate-100 dark:bg-[#162036] text-[#475569] dark:text-[#94A3B8] text-[12.5px] font-bold hover:bg-slate-200 dark:hover:bg-[#1E2E4A] cursor-pointer shrink-0"
                >
                  Fill Demo (1234)
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-[13px] bg-[#0075FF] hover:bg-[#0066E0] text-white text-[13.5px] font-bold shadow-md shadow-blue-500/25 active:scale-95 transition-all cursor-pointer"
                >
                  Enter Admin Console
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Campus Illustration - Edge-to-edge seamless bleed with "A Product by Levro Studio" */}
      <div className="relative z-10 w-full mt-auto">
        <CampusFooter />
      </div>
    </div>
  );
}
