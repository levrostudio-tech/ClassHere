import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap } from 'lucide-react';
import AppBackButton from '../components/AppBackButton';
import BrandLogo from '../components/BrandLogo';
import CampusFooter from '../components/CampusFooter';
import TopDecorCircles from '../components/TopDecorCircles';

export default function RoleSelect() {
  const navigate = useNavigate();

  const handleRoleClick = (role) => {
    if (role === 'teacher') {
      navigate('/login', { state: { role: 'teacher' } });
    } else if (role === 'admin') {
      navigate('/login', { state: { role: 'admin' } });
    } else if (role === 'student') {
      navigate('/student-login');
    }
  };

  return (
    <div className="relative min-h-full flex-1 flex flex-col bg-white overflow-hidden justify-between select-none">
      {/* Background Soft Accent Circles */}
      <TopDecorCircles />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-start px-6 pt-4 sm:pt-5 pb-2">
        {/* Top Header with Back Button */}
        <div className="flex items-center mb-2">
          <AppBackButton
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              }
            }}
          />
        </div>

        {/* Logo & App Icon */}
        <div className="mt-1 mb-5">
          <BrandLogo showIcon={true} iconSize={80} fontSize="text-[30px]" />
        </div>

        {/* Headings */}
        <div className="text-center mb-5">
          <h1 className="text-[25px] sm:text-[27px] font-extrabold text-[#0F172A] tracking-tight mb-1">
            Welcome to ClassHere
          </h1>
          <p className="text-[14.5px] font-medium text-[#64748B] leading-snug">
            Choose how you want to continue
          </p>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="space-y-3">
          {/* 1. Admin Login */}
          <button
            type="button"
            onClick={() => handleRoleClick('admin')}
            className="w-full flex items-center justify-between p-3.5 sm:p-4 bg-white border border-[#E2E8F0] hover:border-[#0075FF]/60 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_16px_rgba(0,117,255,0.08)] transition-all duration-150 active:scale-[0.98] cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-[16px] bg-[#EAF3FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <svg
                  className="w-6 h-6 text-[#0075FF]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <circle cx="12" cy="11.5" r="2.2" />
                  <path
                    d="M12 8.3v1M12 13.7v1M8.8 11.5h1M14.2 11.5h1M9.7 9.2l.7.7M13.6 13.1l.7.7M9.7 13.8l.7-.7M13.6 9.9l.7-.7"
                    strokeWidth="1.6"
                  />
                </svg>
              </div>
              <span className="text-[17px] font-bold text-[#0F172A] tracking-tight group-hover:text-[#0075FF] transition-colors">
                Admin Login
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-[#0075FF] stroke-[2.4] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 2. Teacher Login */}
          <button
            type="button"
            onClick={() => handleRoleClick('teacher')}
            className="w-full flex items-center justify-between p-3.5 sm:p-4 bg-white border border-[#E2E8F0] hover:border-[#0075FF]/60 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_16px_rgba(0,117,255,0.08)] transition-all duration-150 active:scale-[0.98] cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-[16px] bg-[#EAF3FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <svg
                  className="w-6 h-6 text-[#0075FF]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-2A3.5 3.5 0 0 0 2 17.5V19" />
                  <circle cx="6.5" cy="8.5" r="3" />
                  <rect x="13" y="6" width="9" height="7" rx="1.5" />
                  <path d="M15.5 8.8h4M15.5 10.8h2.5" strokeWidth="1.6" />
                </svg>
              </div>
              <span className="text-[17px] font-bold text-[#0F172A] tracking-tight group-hover:text-[#0075FF] transition-colors">
                Teacher Login
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-[#0075FF] stroke-[2.4] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 3. Student Login */}
          <button
            type="button"
            onClick={() => handleRoleClick('student')}
            className="w-full flex items-center justify-between p-3.5 sm:p-4 bg-white border border-[#E2E8F0] hover:border-[#0075FF]/60 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_16px_rgba(0,117,255,0.08)] transition-all duration-150 active:scale-[0.98] cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-[16px] bg-[#EAF3FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6 text-[#0075FF] stroke-[2.2]" />
              </div>
              <span className="text-[17px] font-bold text-[#0F172A] tracking-tight group-hover:text-[#0075FF] transition-colors">
                Student Login
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-[#0075FF] stroke-[2.4] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Campus Illustration - Edge-to-edge seamless bleed */}
      <div className="relative z-10 w-full mt-auto">
        <CampusFooter />
      </div>
    </div>
  );
}
