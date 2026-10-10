import React from 'react';
import campusIllustrationClean from '../assets/campus_illustration_clean.png';

export default function CampusFooter() {
  return (
    <div className="relative w-full mt-auto pointer-events-none select-none overflow-hidden">
      {/* Seamless Edge-to-Edge Campus Graphic */}
      <img
        src={campusIllustrationClean}
        alt="Campus Illustration"
        className="w-full h-auto object-cover object-bottom block"
        loading="eager"
      />

      {/* Crisp Native Typography - Centered below curved hill */}
      <div className="absolute bottom-3 sm:bottom-3.5 left-0 right-0 text-center px-4">
        <p className="text-[13.5px] text-[#64748B] font-medium tracking-tight inline-flex items-center justify-center gap-1">
          <span>A Product by</span>
          <span className="font-bold text-[#0F172A]">Levro Studio</span>
        </p>
      </div>
    </div>
  );
}
