import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PrimaryButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  showArrow = true,
  className = '',
  type = 'button',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full h-14 rounded-[16px] bg-[#0075FF] hover:bg-[#0066E0] apple-btn text-white font-bold text-[16.5px] tracking-[-0.01em] flex items-center justify-center gap-2 shadow-brand-btn disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${className}`}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          <span>{children}</span>
          {showArrow && <ArrowRight className="w-5 h-5 stroke-[2.5]" />}
        </>
      )}
    </button>
  );
}
