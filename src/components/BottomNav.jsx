import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Calendar,
  BookOpen,
  User,
} from 'lucide-react';

/**
 * Apple-style Slide-to-Shift Navigation Tab Bar.
 *
 * Supports:
 * 1. Single tap navigation with fluid spring capsule animation.
 * 2. Press-and-hold anywhere on the bar, then slide across tabs to dynamically
 *    switch tabs with real-time sliding indicator and haptic feedback.
 * 3. Responsive 3-tab (student) and 4-tab (faculty) layouts.
 */
export default function BottomNav({ activeTab = 'home', isVisible = true }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isStudent =
    location.pathname.includes('student') ||
    localStorage.getItem('classhere_role') === 'student';

  // Navigation Items
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

  // Resolve current active index from activeTab
  const initialIndex = Math.max(
    0,
    navItems.findIndex((item) => item.id === activeTab)
  );

  const [activeVisualIndex, setActiveVisualIndex] = useState(initialIndex);
  const [isHolding, setIsHolding] = useState(false);
  const [pillRect, setPillRect] = useState({ left: 0, top: 4, width: 0, height: 48 });

  const containerRef = useRef(null);
  const tabRefs = useRef([]);
  const lastHapticIndexRef = useRef(initialIndex);

  // Sync active visual index when activeTab prop changes
  useEffect(() => {
    const idx = navItems.findIndex((item) => item.id === activeTab);
    if (idx >= 0 && !isHolding) {
      setActiveVisualIndex(idx);
      lastHapticIndexRef.current = idx;
    }
  }, [activeTab, isHolding, navItems]);

  // Measure and align the sliding capsule indicator
  const updatePillPosition = useCallback(
    (index) => {
      const container = containerRef.current;
      const tabEl = tabRefs.current[index];

      if (container && tabEl) {
        const cRect = container.getBoundingClientRect();
        const tRect = tabEl.getBoundingClientRect();

        setPillRect({
          left: tRect.left - cRect.left,
          top: tRect.top - cRect.top,
          width: tRect.width,
          height: tRect.height,
        });
      }
    },
    []
  );

  // Re-calculate capsule geometry on mount, tab index change, or viewport resize
  useLayoutEffect(() => {
    updatePillPosition(activeVisualIndex);

    const handleResize = () => {
      updatePillPosition(activeVisualIndex);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeVisualIndex, updatePillPosition, navItems.length]);

  // Determine which tab index is under the given clientX
  const getIndexFromClientX = useCallback(
    (clientX) => {
      const container = containerRef.current;
      if (!container) return activeVisualIndex;

      const rect = container.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const clampedX = Math.max(0, Math.min(relativeX, rect.width - 1));
      const calculatedIndex = Math.floor((clampedX / rect.width) * navItems.length);

      return Math.max(0, Math.min(navItems.length - 1, calculatedIndex));
    },
    [activeVisualIndex, navItems.length]
  );

  // Trigger Apple-style subtle haptic feedback on tab change
  const triggerHaptic = (index) => {
    if (lastHapticIndexRef.current !== index) {
      lastHapticIndexRef.current = index;
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(8);
        } catch (_) {}
      }
    }
  };

  // Pointer / Touch Handlers for Hold-and-Slide Gestures
  const handlePointerDown = (e) => {
    // Only respond to primary touch/click
    if (e.button !== undefined && e.button !== 0) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}

    setIsHolding(true);
    const targetIdx = getIndexFromClientX(e.clientX);
    setActiveVisualIndex(targetIdx);
    triggerHaptic(targetIdx);
    updatePillPosition(targetIdx);
  };

  const handlePointerMove = (e) => {
    if (!isHolding) return;

    const targetIdx = getIndexFromClientX(e.clientX);
    if (targetIdx !== activeVisualIndex) {
      setActiveVisualIndex(targetIdx);
      triggerHaptic(targetIdx);
      updatePillPosition(targetIdx);
    }
  };

  const handlePointerUp = (e) => {
    if (!isHolding) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    setIsHolding(false);

    const finalIdx = getIndexFromClientX(e.clientX);
    setActiveVisualIndex(finalIdx);
    updatePillPosition(finalIdx);

    // Commit navigation to the chosen tab
    if (navItems[finalIdx] && navItems[finalIdx].path) {
      navigate(navItems[finalIdx].path);
    }
  };

  const handlePointerCancel = (e) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    setIsHolding(false);
    const resetIdx = navItems.findIndex((item) => item.id === activeTab);
    const validIdx = resetIdx >= 0 ? resetIdx : 0;
    setActiveVisualIndex(validIdx);
    updatePillPosition(validIdx);
  };

  return (
    <nav
      aria-label="Bottom Navigation"
      className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#EDF2F7] pt-2 pb-1.5 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-30 transition-all duration-300 ease-in-out select-none ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Sliding Tab Track Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{ touchAction: 'none' }}
        className={`relative grid ${
          isStudent ? 'grid-cols-3 max-w-[320px]' : 'grid-cols-4 max-w-sm'
        } items-center justify-items-center mx-auto cursor-grab active:cursor-grabbing p-1 rounded-[18px] bg-[#F8FAFC]/90 border border-slate-200/50`}
      >
        {/* Apple Spring Sliding Capsule Pill */}
        {pillRect.width > 0 && (
          <div
            className={`absolute rounded-[14px] bg-[#EAF3FF] border border-[#0075FF]/20 pointer-events-none transition-all ${
              isHolding
                ? 'duration-100 ease-out scale-[0.98] shadow-[0_2px_12px_rgba(0,117,255,0.22)]'
                : 'duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-xs'
            }`}
            style={{
              transform: `translate3d(${pillRect.left}px, ${pillRect.top}px, 0)`,
              width: `${pillRect.width}px`,
              height: `${pillRect.height}px`,
            }}
          />
        )}

        {/* Tab Items */}
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isSelected = activeVisualIndex === index;

          return (
            <button
              key={item.id}
              ref={(el) => (tabRefs.current[index] = el)}
              type="button"
              className={`relative z-10 w-full ${
                isStudent ? 'max-w-[96px]' : 'max-w-[78px]'
              } h-[48px] flex flex-col items-center justify-center rounded-[14px] transition-transform duration-200 ${
                isHolding && isSelected ? 'scale-105' : 'scale-100'
              }`}
            >
              {/* Crisp vector icon with Apple spring scale */}
              <Icon
                className={`w-5 h-5 transition-all duration-200 ease-out ${
                  isSelected
                    ? 'stroke-[2.5] text-[#0075FF] scale-110'
                    : 'stroke-[1.9] text-[#64748B] scale-100'
                }`}
              />
              <span
                className={`text-[11px] mt-0.5 leading-tight transition-all duration-200 ${
                  isSelected
                    ? 'font-bold text-[#0075FF] scale-105'
                    : 'font-medium text-[#64748B] scale-100'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Apple iOS Home Indicator Pill Bar */}
      <div className="pt-1.5 pb-0.5 flex justify-center items-center pointer-events-none">
        <div
          className={`h-1 rounded-full transition-all duration-300 ${
            isHolding
              ? 'w-36 bg-[#0075FF]/60 shadow-[0_0_8px_rgba(0,117,255,0.4)]'
              : 'w-32 bg-slate-300/80'
          }`}
        />
      </div>
    </nav>
  );
}
