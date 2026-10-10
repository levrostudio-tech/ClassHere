import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBackButton from '../components/AppBackButton';
import BrandLogo from '../components/BrandLogo';
import CampusFooter from '../components/CampusFooter';
import PrimaryButton from '../components/PrimaryButton';
import TopDecorCircles from '../components/TopDecorCircles';

export default function T2VerifyOtp({ onNavigate, phone: propPhone }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(59);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state || {};
  const isStudent = state.role === 'student' || !!state.rollNumber;
  const rollNumber = state.rollNumber;
  const phone = propPhone || state.phone || '9876544823';
  const lastFour = phone.length >= 4 ? phone.slice(-4) : '4823';

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
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
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
  };

  const handleVerify = (e) => {
    if (e) e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the full 6-digit code');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (onNavigate) {
        onNavigate('t3');
      } else {
        navigate('/consent', {
          state: {
            ...state,
            role: isStudent ? 'student' : 'teacher',
            rollNumber,
          },
        });
      }
    }, 300);
  };

  return (
    <div className="relative min-h-full flex-1 flex flex-col bg-white overflow-hidden justify-between select-none">
      {/* Background concentric circles */}
      <TopDecorCircles />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-start px-6 pt-4 sm:pt-5 pb-2">
        {/* Top Header with Back Button */}
        <div className="flex items-center mb-3">
          <AppBackButton
            onClick={() => {
              if (onNavigate) {
                onNavigate(isStudent ? 'student' : 't1');
              } else if (isStudent) {
                navigate('/student-login');
              } else {
                navigate('/login');
              }
            }}
          />
        </div>

        {/* Logo & Branding */}
        <div className="mt-1 mb-6">
          <BrandLogo showIcon={true} iconSize={80} fontSize="text-[30px]" />
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mb-6">
          <h1 className="text-[26px] font-extrabold text-[#0F172A] tracking-tight mb-1.5">
            {isStudent ? 'Verify Student OTP' : 'Verify Your Number'}
          </h1>
          <p className="text-[14.5px] font-medium text-[#64748B] leading-snug">
            {isStudent ? (
              <>
                We sent a 6-digit OTP to the mobile registered for{' '}
                <span className="font-bold text-[#0075FF]">{rollNumber}</span> ending with{' '}
                <span className="font-bold text-[#0F172A]">{lastFour}</span>.
              </>
            ) : (
              <>
                We have sent a 6-digit OTP to your<br />
                WhatsApp number ending with{' '}
                <span className="font-bold text-[#0F172A]">{lastFour}</span>.
              </>
            )}
          </p>
        </div>

        {/* 6 OTP Input Boxes */}
        <div className="mb-5">
          <div className="flex justify-between items-center max-w-[360px] mx-auto gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className={`w-12 h-14 sm:w-13 sm:h-15 text-center text-2xl font-bold rounded-[14px] border transition-all duration-150 focus:outline-none ${
                  digit
                    ? 'border-[#0075FF] bg-white text-[#0F172A]'
                    : 'border-[#D8E2EC] bg-white text-[#0F172A] focus:border-[#0075FF] focus:shadow-[0_0_0_3px_rgba(0,117,255,0.12)]'
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-center text-red-500 text-xs font-semibold mt-2 animate-fadeIn">
              {error}
            </p>
          )}
        </div>

        {/* Continue Button */}
        <div className="mb-4">
          <PrimaryButton
            onClick={handleVerify}
            loading={loading}
          >
            Continue
          </PrimaryButton>
        </div>

        {/* Resend OTP */}
        <div className="text-center text-[14px] text-[#64748B] font-medium">
          Resend OTP in{' '}
          {secondsRemaining > 0 ? (
            <span className="font-bold text-[#0075FF]">
              00:{secondsRemaining.toString().padStart(2, '0')}
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setSecondsRemaining(59)}
              className="font-bold text-[#0075FF] underline focus:outline-none"
            >
              Resend Now
            </button>
          )}
        </div>
      </div>

      {/* Bottom Campus Illustration - Edge-to-edge seamless bleed */}
      <div className="relative z-10 w-full mt-auto">
        <CampusFooter />
      </div>
    </div>
  );
}
