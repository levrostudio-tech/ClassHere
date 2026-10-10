import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getISTNow,
  fetchDayTimetable,
  enrichScheduleWithRealtime,
} from '../lib/timetableService';

/**
 * Custom React hook providing real-time timetable status and automatic class progress
 * in Asia/Kolkata timezone.
 *
 * Automatically:
 * - Updates every 30 seconds
 * - Recalculates immediately on tab visibility change (visibilitychange)
 * - Recalculates on window focus
 * - Detects date change across midnight in IST
 */
export function useRealtimeTimetable(targetDay = null) {
  const [istTime, setIstTime] = useState(() => getISTNow());
  const [rawSlots, setRawSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track current IST date string to detect day rollover
  const lastDateRef = useRef(`${istTime.year}-${istTime.month}-${istTime.day}`);

  // Determine which day of the week to fetch
  const effectiveDay = targetDay || istTime.weekday; // e.g. 'Thu'
  const isToday = !targetDay || targetDay.toLowerCase() === istTime.weekday.toLowerCase();

  // Fetch timetable slots for the effective day
  const loadSchedule = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchDayTimetable(effectiveDay);
      setRawSlots(data);
    } catch (err) {
      console.error('Failed to load timetable:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [effectiveDay]);

  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

  // Recalculate IST time and detect date transitions
  const updateTick = useCallback(() => {
    const current = getISTNow();
    setIstTime(current);

    const currentDateKey = `${current.year}-${current.month}-${current.day}`;
    if (currentDateKey !== lastDateRef.current) {
      lastDateRef.current = currentDateKey;
      // Day changed in IST, reload schedule
      loadSchedule();
    }
  }, [loadSchedule]);

  // Timer: Tick every 30 seconds
  useEffect(() => {
    const interval = setInterval(updateTick, 30000);
    return () => clearInterval(interval);
  }, [updateTick]);

  // Immediate recalculation on tab visibility change & window focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateTick();
      }
    };

    const handleFocus = () => {
      updateTick();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [updateTick]);

  // Compute real-time status and progress
  const realtimeData = enrichScheduleWithRealtime(rawSlots, istTime, isToday);

  return {
    istTime,
    ongoingClass: realtimeData.ongoingClass,
    upcomingClasses: realtimeData.upcomingClasses,
    finishedClasses: realtimeData.finishedClasses,
    allClasses: realtimeData.allClasses,
    isLoading,
    error,
    refresh: loadSchedule,
  };
}
