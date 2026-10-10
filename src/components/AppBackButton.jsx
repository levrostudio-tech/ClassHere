import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function AppBackButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go back"
      className="w-11 h-11 flex items-center justify-center bg-white rounded-[14px] border border-[#E2E8F0] shadow-sm text-[#0F172A] active:scale-95 hover:bg-slate-50 transition-all focus:outline-none"
    >
      <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
}
