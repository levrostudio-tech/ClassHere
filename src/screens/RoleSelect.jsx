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
          <BrandLogo showIcon={true} iconSize={84} fontSize="text-[34px]" />
        </div>

        {/* Headings */}
        <div className="text-center mb-6">
          <h1 className="text-[26px] sm:text-[27px] font-extrabold text-[#0F172A] tracking-tight mb-1">
            Welcome to ClassHere
          </h1>
          <p className="text-[15px] font-medium text-[#64748B] leading-snug">
            Choose how you want to continue
          </p>
        </div>

        {/* 2 Role Selection Cards: Teacher Login & Student Login */}
        <div className="space-y-3.5">
          {/* 1. Teacher Login */}
          <button
            type="button"
            onClick={() => handleRoleClick('teacher')}
            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-white border border-[#DCE8FC] hover:border-[#0075FF]/60 rounded-[22px] shadow-[0_2px_10px_rgba(0,117,255,0.03)] hover:shadow-[0_8px_20px_rgba(0,117,255,0.08)] transition-all duration-150 active:scale-[0.98] cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-[18px] bg-[#EAF3FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <svg
                  className="w-7 h-7 text-[#0075FF]"
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
              <span className="text-[18.5px] font-bold text-[#0F172A] tracking-tight group-hover:text-[#0075FF] transition-colors">
                Teacher Login
              </span>
            </div>
            <ArrowRight className="w-5.5 h-5.5 text-[#0075FF] stroke-[2.4] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 2. Student Login */}
          <button
            type="button"
            onClick={() => handleRoleClick('student')}
            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-white border border-[#DCE8FC] hover:border-[#0075FF]/60 rounded-[22px] shadow-[0_2px_10px_rgba(0,117,255,0.03)] hover:shadow-[0_8px_20px_rgba(0,117,255,0.08)] transition-all duration-150 active:scale-[0.98] cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-[18px] bg-[#EAF3FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-7 h-7 text-[#0075FF] stroke-[2.2]" />
              </div>
              <span className="text-[18.5px] font-bold text-[#0F172A] tracking-tight group-hover:text-[#0075FF] transition-colors">
                Student Login
              </span>
            </div>
            <ArrowRight className="w-5.5 h-5.5 text-[#0075FF] stroke-[2.4] group-hover:translate-x-1 transition-transform" />
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
