import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';
import PrimaryButton from '../components/PrimaryButton';
import { Check } from 'lucide-react';

export default function T3Consent() {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAccept = () => {
    if (!agreed) return;
    setLoading(true);
    const isStudent = location.state?.role === 'student';
    if (isStudent) {
      localStorage.setItem('classhere_role', 'student');
    } else {
      localStorage.setItem('classhere_role', 'teacher');
    }
    setTimeout(() => {
      setLoading(false);
      if (isStudent) {
        navigate('/student-dashboard', { state: location.state });
      } else {
        navigate('/dashboard', { state: location.state });
      }
    }, 300);
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-white dark:bg-[#0B0F19] transition-colors duration-200 px-6 pt-7 pb-6 select-none overflow-y-auto no-scrollbar">
      <div>
        {/* Top Brand Logo without icon badge */}
        <div className="flex justify-center mb-6">
          <BrandLogo showIcon={false} fontSize="text-[28px]" />
        </div>

        {/* Security Shield & Document Graphic */}
        <div className="flex justify-center items-center my-4 h-44 relative">
          <div className="w-52 h-44 flex items-center justify-center">
            <img
              src="/assets/consent_shield.png"
              alt="Security & Consent"
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,117,255,0.14)]"
            />
          </div>
        </div>

        {/* Heading: Before you continue */}
        <div className="text-center mt-5 mb-4">
          <h1 className="text-[29px] font-extrabold tracking-tight">
            <span className="text-[#0F172A] dark:text-[#F8FAFC]">Before you </span>
            <span className="text-[#0075FF] dark:text-[#3894FF]">continue</span>
          </h1>
        </div>

        {/* Information Paragraphs */}
        <div className="space-y-3.5 text-center px-1 mb-8">
          <p className="text-[14.5px] font-normal text-[#64748B] dark:text-[#94A3B8] leading-[1.5]">
            ClassHere uses your information to provide academic features such as
            your classes, timetable, attendance, notes, and course resources.
          </p>
          <p className="text-[14.5px] font-normal text-[#64748B] dark:text-[#94A3B8] leading-[1.5]">
            Your information is used only to operate and improve your ClassHere
            experience. We don’t sell your personal information.
          </p>
        </div>
      </div>

      {/* Bottom Agreement & Action Section */}
      <div className="space-y-4 pt-2">
        {/* Consent Card - Card is NOT clickable as a whole */}
        <div className="w-full bg-[#F0F6FE] dark:bg-[#162036] border border-[#E2EDFD] dark:border-[#26354D] rounded-[18px] p-4 flex items-center gap-3.5 select-none transition-colors">
          {/* Checkbox itself is clickable */}
          <button
            type="button"
            role="checkbox"
            aria-checked={agreed}
            onClick={() => setAgreed(!agreed)}
            className={`w-[26px] h-[26px] rounded-[8px] flex items-center justify-center shrink-0 border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#0075FF]/30 active:scale-90 ${
              agreed
                ? 'bg-[#0075FF] border-[#0075FF]'
                : 'bg-white dark:bg-[#131B2E] border-[#D8E2EC] dark:border-[#334155]'
            }`}
          >
            {agreed && <Check className="w-4 h-4 text-white stroke-[3]" />}
          </button>

          {/* Text with real clickable links */}
          <div className="text-[13.5px] text-[#0F172A] dark:text-[#F8FAFC] font-medium leading-[1.35]">
            <span
              onClick={() => setAgreed(!agreed)}
              className="cursor-pointer"
            >
              I agree to ClassHere’s{' '}
            </span>
            <Link
              to="/privacy-policy"
              className="text-[#0075FF] dark:text-[#3894FF] font-semibold underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span
              onClick={() => setAgreed(!agreed)}
              className="cursor-pointer"
            >
              {' '}and{' '}
            </span>
            <Link
              to="/terms-of-use"
              className="text-[#0075FF] dark:text-[#3894FF] font-semibold underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              Terms of Use
            </Link>
            <span
              onClick={() => setAgreed(!agreed)}
              className="cursor-pointer"
            >
              .
            </span>
          </div>
        </div>

        {/* Accept & Continue Button */}
        <PrimaryButton
          onClick={handleAccept}
          disabled={!agreed}
          loading={loading}
          showArrow={false}
        >
          Accept & Continue
        </PrimaryButton>

        {/* Disclaimer footer text with links */}
        <p className="text-center text-[12px] text-[#94A3B8] dark:text-[#64748B] font-normal leading-tight px-4">
          By continuing, you confirm that you have read and agree to the{' '}
          <Link
            to="/privacy-policy"
            className="text-[#64748B] dark:text-[#94A3B8] underline hover:text-[#0075FF] dark:hover:text-[#3894FF]"
          >
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link
            to="/terms-of-use"
            className="text-[#64748B] dark:text-[#94A3B8] underline hover:text-[#0075FF] dark:hover:text-[#3894FF]"
          >
            Terms of Use
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
