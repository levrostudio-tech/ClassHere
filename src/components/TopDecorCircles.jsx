import React from 'react';

export default function TopDecorCircles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top-left concentric soft rings */}
      <div 
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full border-[36px] border-[#EAF2FD]/60"
      />
      <div 
        className="absolute -top-16 -left-16 w-56 h-56 rounded-full border-[28px] border-[#E2EEFD]/70"
      />
      <div 
        className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-[#D6E6FB]/50"
      />

      {/* Top-right soft accent bubble */}
      <div 
        className="absolute top-16 -right-12 w-36 h-36 rounded-full bg-[#EBF3FE]/70 blur-[1px]"
      />
    </div>
  );
}
