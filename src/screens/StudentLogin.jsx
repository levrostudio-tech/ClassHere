import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';
import AppBackButton from '../components/AppBackButton';
import BrandLogo from '../components/BrandLogo';
import CampusFooter from '../components/CampusFooter';
import TopDecorCircles from '../components/TopDecorCircles';

export default function StudentLogin() {
  const [rollNumber, setRollNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = (e) => {
    if (e) e.preventDefault();
    const trimmed = rollNumber.trim();
    if (!trimmed) {
      setError('Please enter your 6-digit roll number to continue');
      return;
    }
    if (trimmed.length !== 6) {
      setError('Roll number must be exactly 6 digits');
      return;
    }

    if (trimmed !== '279825') {
      setError('Access restricted: Roll number not found in college registry. Only authorized sample roll number (279825) can log in.');
      return;
    }

    setError('');
    setLoading(true);
    localStorage.setItem('classhere_role', 'student');
    localStorage.setItem('classhere_roll_number', '279825');

    setTimeout(() => {
      setLoading(false);
      navigate('/student-verify-otp', {
        state: {
          role: 'student',
          rollNumber: '279825',
          studentName: 'Sample Student',
          phone: '9876527982',
        },
      });
    }, 350);
  };

  return (
    <div className="relative min-h-full flex-1 flex flex-col bg-white dark:bg-[#0B0F19] overflow-hidden justify-between select-none transition-colors duration-200">
      {/* Background soft concentric circles */}
      <TopDecorCircles />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-start px-6 pt-4 sm:pt-5 pb-2">
        {/* Top Header with Back Button */}
        <div className="flex items-center mb-3">
          <AppBackButton onClick={() => navigate('/')} />
        </div>

        {/* Logo & Branding */}
        <div className="mt-1 mb-6">
          <BrandLogo showIcon={true} iconSize={80} fontSize="text-[30px]" />
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mb-6">
          <h1 className="text-[26px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mb-1.5">
            Student Login
          </h1>
          <p className="text-[14.5px] font-medium text-[#64748B] dark:text-[#94A3B8] leading-snug">
            Enter your 6-digit roll number to continue.<br />
            <span className="inline-block mt-1 text-xs font-bold text-[#0075FF] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Sample Roll No: 279825
            </span>
          </p>
        </div>

        {/* Input & Action Form */}
        <form onSubmit={handleContinue} className="space-y-4">
          {/* Roll Number Input Card */}
          <div>
            <div
              className={`relative flex items-center gap-3.5 px-4 py-3 bg-white dark:bg-[#162036] border ${
                error
                  ? 'border-red-400 ring-2 ring-red-100'
                  : 'border-[#BFDBFE]/90 dark:border-[#26354D] focus-within:border-[#0075FF] focus-within:ring-2 focus-within:ring-[#0075FF]/20'
              } rounded-[20px] transition-all duration-150 shadow-[0_2px_8px_rgba(0,117,255,0.04)]`}
            >
              {/* Left graduation cap icon */}
              <div className="shrink-0 text-[#0F172A] dark:text-[#F8FAFC] pl-0.5">
                <GraduationCap className="w-6 h-6 stroke-[2]" />
              </div>

              {/* Label + Input */}
              <div className="flex-1 flex flex-col justify-center">
                <label className="text-[11.5px] font-semibold text-[#64748B] dark:text-[#94A3B8] leading-none mb-1">
                  Roll Number
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={rollNumber}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setRollNumber(digitsOnly);
                    if (error) setError('');
                  }}
                  placeholder="e.g. 279825"
                  className="w-full bg-transparent text-[16px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#93C5FD] dark:placeholder:text-[#475569] focus:outline-none tracking-wider"
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-semibold mt-1.5 ml-2 animate-fadeIn">
                {error}
              </p>
            )}
          </div>

          {/* Continue CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] sm:h-[54px] rounded-[18px] sm:rounded-[20px] bg-[#0075FF] hover:bg-blue-600 apple-btn text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 cursor-pointer disabled:opacity-75 disabled:transform-none"
          >
            <span>{loading ? 'Verifying...' : 'Continue'}</span>
            {!loading && <ArrowRight className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </form>
      </div>

      {/* Bottom Campus Illustration - Edge-to-edge seamless bleed */}
      <div className="relative z-10 w-full mt-auto">
        <CampusFooter />
      </div>
    </div>
  );
}
