import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Calendar,
  BookOpen,
  User,
} from 'lucide-react';

export default function BottomNav({ activeTab = 'home', isVisible = true }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isStudent =
    location.pathname.includes('student') ||
    location.state?.role === 'student' ||
    localStorage.getItem('classhere_role') === 'student' ||
    localStorage.getItem('classhere_role') !== 'teacher';

  // Student Navigation: Home, Classes, Subjects (No Profile section)
  // Faculty Navigation: Home, Classes, Subjects, Profile
  const navItems = isStudent
    ? [
        {
          id: 'home',
          label: 'Home',
          icon: Home,
          path: '/student-dashboard',
        },
        { id: 'classes', label: 'Classes', icon: Calendar, path: '/timetable' },
        { id: 'subjects', label: 'Subjects', icon: BookOpen, path: '/subjects' },
      ]
    : [
        {
          id: 'home',
          label: 'Home',
          icon: Home,
          path: '/dashboard',
        },
        { id: 'classes', label: 'Classes', icon: Calendar, path: '/timetable' },
        { id: 'subjects', label: 'Subjects', icon: BookOpen, path: '/subjects' },
        { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
      ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#EDF2F7] py-2 px-3 shadow-[0_-3px_15px_rgba(0,0,0,0.04)] z-30 transition-all duration-300 ease-in-out ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Dynamic Navigation Grid: 3-Tabs for Student, 4-Tabs for Faculty */}
      <div
        className={`grid ${
          isStudent ? 'grid-cols-3 max-w-[320px]' : 'grid-cols-4 max-w-sm'
        } gap-2 items-center justify-items-center mx-auto`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.path) {
                  navigate(item.path, { state: { role: isStudent ? 'student' : 'teacher' } });
                }
              }}
              className={`w-full ${
                isStudent ? 'max-w-[96px]' : 'max-w-[78px]'
              } h-[48px] flex flex-col items-center justify-center apple-tab cursor-pointer rounded-[14px] ${
                isActive
                  ? 'bg-[#EAF3FF] text-[#0075FF] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              {/* Crisp vector icon */}
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ease-out ${
                  isActive
                    ? 'stroke-[2.4] text-[#0075FF] scale-110'
                    : 'stroke-[1.9] text-[#64748B]'
                }`}
              />
              <span
                className={`text-[11px] mt-0.5 leading-tight ${
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
