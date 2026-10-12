import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBackButton from '../components/AppBackButton';
import BrandLogo from '../components/BrandLogo';
import CampusFooter from '../components/CampusFooter';
import PhoneInputField from '../components/PhoneInputField';
import PrimaryButton from '../components/PrimaryButton';
import TopDecorCircles from '../components/TopDecorCircles';

export default function T1TeacherLogin({ onNavigate, initialPhone = '' }) {
  const [phone, setPhone] = useState(initialPhone);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = (e) => {
    if (e) e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (onNavigate) {
        onNavigate('t2', { phone });
      } else {
        navigate('/verify-otp', { state: { phone } });
      }
    }, 300);
  };

  return (
    <div className="relative min-h-full flex-1 flex flex-col bg-white dark:bg-[#0B0F19] overflow-hidden justify-between select-none transition-colors duration-200">
      {/* Background soft circles */}
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
            Teacher Login
          </h1>
          <p className="text-[14.5px] font-medium text-[#64748B] dark:text-[#94A3B8] leading-snug">
            Enter your registered mobile number<br />
            to receive an OTP on WhatsApp.
          </p>
        </div>

        {/* Input & Action Form */}
        <form onSubmit={handleContinue} className="space-y-4">
          <div>
            <PhoneInputField
              value={phone}
              onChange={(val) => {
                setPhone(val);
                if (error) setError('');
              }}
              onSubmit={handleContinue}
            />
            {error && (
              <p className="text-red-500 text-xs font-semibold mt-1.5 ml-2 animate-fadeIn">
                {error}
              </p>
            )}
          </div>

          <PrimaryButton
            type="submit"
            loading={loading}
            onClick={handleContinue}
          >
            Continue
          </PrimaryButton>
        </form>
      </div>

      {/* Bottom Campus Illustration - Edge-to-edge seamless bleed */}
      <div className="relative z-10 w-full mt-auto">
        <CampusFooter />
      </div>
    </div>
  );
}
