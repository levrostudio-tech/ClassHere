import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, Moon, Sun } from 'lucide-react';
import AppBackButton from '../components/AppBackButton';
import BrandLogo from '../components/BrandLogo';
import CampusFooter from '../components/CampusFooter';
import TopDecorCircles from '../components/TopDecorCircles';
import { useTheme } from '../context/ThemeContext';

export default function RoleSelect() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleRoleClick = (role) => {
    if (role === 'teacher') {
      localStorage.setItem('classhere_role', 'teacher');
      navigate('/login', { state: { role: 'teacher' } });
    } else if (role === 'student') {
      localStorage.setItem('classhere_role', 'student');
      navigate('/student-login', { state: { role: 'student' } });
    }
  };

  return (
    <div className="relative min-h-full flex-1 flex flex-col bg-white dark:bg-[#0B0F19] overflow-hidden justify-between select-none transition-colors duration-200">
      {/* Background Soft Accent Circles */}
      <TopDecorCircles />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-start px-6 pt-4 sm:pt-5 pb-2">
        {/* Top Header with Back Button and Quick Dark Mode Toggle */}
        <div className="flex items-center justify-between mb-2">
          <AppBackButton
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              }
            }}
          />

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-10 h-10 rounded-[14px] bg-[#F1F5F9] dark:bg-[#162036] border border-[#E2E8F0] dark:border-[#26354D] flex items-center justify-center text-[#475569] dark:text-[#94A3B8] hover:text-[#0075FF] dark:hover:text-[#3894FF] active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400 stroke-[2.2]" /> : <Moon className="w-5 h-5 text-[#475569] stroke-[2.2]" />}
          </button>
        </div>

        {/* Logo & App Icon */}
        <div className="mt-1 mb-5">
          <BrandLogo showIcon={true} iconSize={84} fontSize="text-[34px]" />
        </div>

        {/* Headings */}
        <div className="text-center mb-6">
          <h1 className="text-[26px] sm:text-[27px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mb-1">
            Welcome to ClassHere
          </h1>
          <p className="text-[15px] font-medium text-[#64748B] dark:text-[#94A3B8] leading-snug">
            Choose how you want to continue
          </p>
        </div>

        {/* 2 Role Selection Cards: Teacher Login & Student Login */}
        <div className="space-y-3.5">
          {/* 1. Teacher Login */}
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
              <span className="text-[18.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight group-hover:text-[#0075FF] dark:group-hover:text-[#3894FF] transition-colors">
                Teacher Login
              </span>
            </div>
            <ArrowRight className="w-5.5 h-5.5 text-[#0075FF] dark:text-[#3894FF] stroke-[2.4] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 2. Student Login */}
          <button
            type="button"
            onClick={() => handleRoleClick('student')}
            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-white dark:bg-[#131B2E] border border-[#DCE8FC] dark:border-[#223354] hover:border-[#0075FF]/60 dark:hover:border-[#3894FF]/60 rounded-[22px] shadow-[0_2px_10px_rgba(0,117,255,0.03)] hover:shadow-[0_8px_20px_rgba(0,117,255,0.08)] transition-all duration-150 active:scale-[0.98] cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-[18px] bg-[#EAF3FF] dark:bg-[#1A2640] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-7 h-7 text-[#0075FF] dark:text-[#3894FF] stroke-[2.2]" />
              </div>
              <span className="text-[18.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight group-hover:text-[#0075FF] dark:group-hover:text-[#3894FF] transition-colors">
                Student Login
              </span>
            </div>
            <ArrowRight className="w-5.5 h-5.5 text-[#0075FF] dark:text-[#3894FF] stroke-[2.4] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Campus Illustration - Edge-to-edge seamless bleed with "A Product by Levro Studio" */}
      <div className="relative z-10 w-full mt-auto">
        <CampusFooter />
      </div>
    </div>
  );
}
