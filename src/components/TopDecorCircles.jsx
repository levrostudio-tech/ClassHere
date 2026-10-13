import React from 'react';

export default function TopDecorCircles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top-left concentric soft rings */}
      <div 
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full border-[36px] border-[#EAF2FD]/60 dark:border-[#1E293B]/30"
      />
      <div 
        className="absolute -top-16 -left-16 w-56 h-56 rounded-full border-[28px] border-[#E2EEFD]/70 dark:border-[#1A253A]/40"
      />
      <div 
        className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-[#D6E6FB]/50 dark:bg-[#182338]/30"
      />

      {/* Top-right soft accent bubble */}
      <div 
        className="absolute top-16 -right-12 w-36 h-36 rounded-full bg-[#EBF3FE]/70 dark:bg-[#182338]/40 blur-[1px] apple-live-pulse"
      />
    </div>
  );
}
