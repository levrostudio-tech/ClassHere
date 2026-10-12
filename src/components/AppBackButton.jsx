import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function AppBackButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go back"
      className="w-11 h-11 flex items-center justify-center bg-white dark:bg-[#162036] rounded-[14px] border border-[#E2E8F0] dark:border-[#26354D] shadow-sm text-[#0F172A] dark:text-[#F8FAFC] active:scale-95 hover:bg-slate-50 dark:hover:bg-[#1E2D4A] transition-all focus:outline-none cursor-pointer"
    >
      <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
}
