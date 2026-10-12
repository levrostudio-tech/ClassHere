import React, { useState } from 'react';
import { Phone } from 'lucide-react';

export default function PhoneInputField({ value, onChange, onSubmit }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '').slice(0, 10);
    onChange(rawValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div
      className={`w-full h-[68px] px-4 py-2 bg-white dark:bg-[#162036] rounded-[16px] border transition-all duration-200 flex items-center gap-3.5 ${
        isFocused
          ? 'border-[#0075FF] dark:border-[#3894FF] shadow-[0_0_0_3px_rgba(0,117,255,0.15)]'
          : 'border-[#D8E2EC] dark:border-[#26354D] shadow-sm'
      }`}
    >
      {/* Phone Icon */}
      <div className="text-[#0F172A] dark:text-[#F8FAFC] shrink-0 pl-1">
        <Phone className="w-5 h-5 stroke-[2]" />
      </div>

      {/* Label + Input */}
      <div className="flex-1 flex flex-col justify-center">
        <label
          htmlFor="phone-input"
          className="text-[11.5px] font-medium text-[#64748B] dark:text-[#94A3B8] leading-none mb-1 select-none"
        >
          Mobile number
        </label>
        <input
          id="phone-input"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="e.g. 9876543210"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-[#0F172A] dark:text-[#F8FAFC] text-[16px] font-semibold tracking-wide placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] placeholder:font-normal focus:outline-none p-0 leading-tight"
        />
      </div>
    </div>
  );
}
