import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Calendar,
  BookOpen,
  User,
} from 'lucide-react';

export default function BottomNav({ activeTab = 'home', isVisible = true }) {
  const navigate = useNavigate();

  // 4 Main Tabs: Home, Classes, Subjects, Profile (Notes removed per instruction)
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/dashboard' },
    { id: 'classes', label: 'Classes', icon: Calendar, path: '/timetable' },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, path: '/subjects' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#EDF2F7] py-1.5 px-3 shadow-[0_-3px_15px_rgba(0,0,0,0.04)] z-30 transition-all duration-300 ease-in-out ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* 4-Tab Navigation Grid */}
      <div className="grid grid-cols-4 gap-1 items-center justify-items-center max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.path) {
                  navigate(item.path);
                }
              }}
              className={`w-full max-w-[76px] h-[46px] flex flex-col items-center justify-center transition-all duration-150 cursor-pointer rounded-[12px] ${
                isActive
                  ? 'bg-[#EAF3FF] text-[#0075FF]'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              {/* Crisp vector icon */}
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive
                    ? 'stroke-[2.4] text-[#0075FF] scale-105'
                    : 'stroke-[1.9] text-[#64748B]'
                }`}
              />
              <span
                className={`text-[10.5px] mt-0.5 leading-tight ${
                  isActive
                    ? 'font-bold text-[#0075FF]'
                    : 'font-medium text-[#64748B]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
