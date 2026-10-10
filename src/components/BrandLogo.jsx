import React from 'react';

export default function BrandLogo({ showIcon = true, iconSize = 82, fontSize = 'text-3xl' }) {
  return (
    <div className="flex flex-col items-center select-none">
      {showIcon && (
        <div className="mb-3.5 relative">
          <div 
            className="rounded-[22px] overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,117,255,0.25)] transition-transform duration-200"
            style={{ width: iconSize, height: iconSize }}
          >
            <img 
              src="/assets/logo_icon.png" 
              alt="ClassHere Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback Icon */}
            <div className="w-full h-full bg-[#0075FF] hidden items-center justify-center rounded-[22px]">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      <div className={`font-extrabold tracking-tight ${fontSize} leading-tight`}>
        <span className="text-[#0F172A]">Class</span>
        <span className="text-[#0075FF]">Here</span>
      </div>
    </div>
  );
}
