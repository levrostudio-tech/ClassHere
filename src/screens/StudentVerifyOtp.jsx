import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AppBackButton from '../components/AppBackButton';
import BrandLogo from '../components/BrandLogo';
import CampusFooter from '../components/CampusFooter';
import TopDecorCircles from '../components/TopDecorCircles';

export default function StudentVerifyOtp() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(28); // Matches 0:28 in screenshot
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state || {};
  const rollNumber = state.rollNumber || '22BCA015';
  const phone = state.phone || '9876543210';
  const lastFour = phone.length >= 4 ? phone.slice(-4) : '3210';

  // Timer countdown
  useEffect(() => {
    if (secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (error) setError('');

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
    setActiveIndex(nextIndex);
  };

  const handleResend = () => {
    if (secondsRemaining > 0) return;
    setSecondsRemaining(30);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    setActiveIndex(0);
  };

  const handleContinue = (e) => {
    if (e) e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/consent', {
        state: {
          role: 'student',
          rollNumber,
          phone,
        },
      });
    }, 350);
  };

  const formattedTimer = `00:${secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}`;

  return (
    <div className="relative min-h-full flex-1 flex flex-col bg-white dark:bg-[#0B0F19] overflow-hidden justify-between select-none transition-colors duration-200">
      {/* Background soft concentric circles */}
      <TopDecorCircles />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-start px-6 pt-4 sm:pt-5 pb-2">
        {/* Top Header with Back Button */}
        <div className="flex items-center mb-3">
          <AppBackButton onClick={() => navigate('/student-login')} />
        </div>

        {/* Logo & Branding */}
        <div className="mt-1 mb-5">
          <BrandLogo showIcon={true} iconSize={78} fontSize="text-[30px]" />
        </div>

        {/* Title & Subtitle matching reference image */}
        <div className="text-center mb-6">
          <h1 className="text-[26px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mb-1.5">
            Enter OTP
          </h1>
          <p className="text-[14px] font-medium text-[#64748B] dark:text-[#94A3B8] leading-snug">
            We have sent a 6-digit OTP to your<br />
            WhatsApp on <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">+91 ******{lastFour}.</span>
          </p>
        </div>

        {/* 6 OTP Input Boxes */}
        <form onSubmit={handleContinue}>
          <div className="mb-3.5">
            <div className="flex justify-between items-center max-w-[340px] mx-auto gap-2">
              {otp.map((digit, idx) => {
                const isCurrent = activeIndex === idx;
                return (
                  <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onFocus={() => setActiveIndex(idx)}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={handlePaste}
                    className={`w-11 h-13.5 sm:w-12 sm:h-14 text-center text-2xl font-bold rounded-[16px] transition-all duration-150 focus:outline-none ${
                      isCurrent
                        ? 'border-2 border-[#0075FF] dark:border-[#3894FF] bg-white dark:bg-[#162036] text-[#0F172A] dark:text-[#F8FAFC] shadow-[0_0_0_3px_rgba(0,117,255,0.18)]'
                        : digit
                        ? 'border border-[#93C5FD] dark:border-[#3894FF]/60 bg-white dark:bg-[#162036] text-[#0F172A] dark:text-[#F8FAFC]'
                        : 'border border-[#BFDBFE] dark:border-[#26354D] bg-white dark:bg-[#162036] text-[#0F172A] dark:text-[#F8FAFC]'
                    }`}
                  />
                );
              })}
            </div>

            {error && (
              <p className="text-red-500 text-xs font-semibold text-center mt-2 animate-fadeIn">
                {error}
              </p>
            )}
          </div>

          {/* Resend Section matching reference image */}
          <div className="text-center mb-5">
            <p className="text-[13px] font-medium text-[#64748B] mb-0.5">
              Didn't receive the OTP?
            </p>
            {secondsRemaining > 0 ? (
              <p className="text-[14px] font-bold text-[#0075FF]">
                Resend OTP in {formattedTimer}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-[14px] font-bold text-[#0075FF] hover:underline cursor-pointer"
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* Continue CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] sm:h-[54px] rounded-[18px] sm:rounded-[20px] bg-[#0075FF] hover:bg-blue-600 active:scale-[0.98] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-75"
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
