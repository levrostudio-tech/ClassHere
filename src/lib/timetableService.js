import { supabase, isSupabaseConfigured } from './supabase.js';

/**
 * Returns current Indian Standard Time (Asia/Kolkata) with high precision
 */
export function getISTNow() {
  const now = new Date();

  // Extract components in Asia/Kolkata timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'short',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const getPart = (type) => parts.find((p) => p.type === type)?.value;

  const year = parseInt(getPart('year') || '2026', 10);
  const month = parseInt(getPart('month') || '10', 10);
  const day = parseInt(getPart('day') || '1', 10);
  let hour = parseInt(getPart('hour') || '0', 10);
  if (hour === 24) hour = 0;
  const minute = parseInt(getPart('minute') || '0', 10);
  const second = parseInt(getPart('second') || '0', 10);
  const weekday = getPart('weekday') || 'Mon'; // 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'

  const totalMinutes = hour * 60 + minute + second / 60;
  const totalSeconds = hour * 3600 + minute * 60 + second;

  // 12-hour display hour (1 to 12)
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  // Formatted date string, e.g. "Thursday, 9 Oct"
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
  const formattedDate = dateFormatter.format(now);

  // Dynamic greeting based on real IST hour
  const greeting =
    hour < 12
      ? 'Good morning,'
      : hour < 17
      ? 'Good afternoon,'
      : 'Good evening,';

  return {
    rawDate: now,
    year,
    month,
    day,
    hour,
    minute,
    second,
    hour12,
    weekday,
    totalMinutes,
    totalSeconds,
    formattedDate,
    greeting,
  };
}

/**
 * Robustly parses a time string into minutes since midnight (0 to 1439).
 * Supports:
 * - "09:00:00", "09:55:00" (PostgreSQL time format)
 * - "09:00", "14:00" (24-hour format)
 * - "9:00 AM", "2:00 PM" (12-hour with AM/PM)
 * - "9:00", "10:55", "2:00", "4:00" (College schedule shorthand)
 */
export function parseTimeToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return 0;

  const trimmed = timeStr.trim().toUpperCase();
  const hasPM = trimmed.includes('PM');
  const hasAM = trimmed.includes('AM');
  const cleanTime = trimmed.replace(/[AP]M/, '').trim();
  const [hStr, mStr] = cleanTime.split(':');

  let hours = parseInt(hStr, 10) || 0;
  const minutes = parseInt(mStr, 10) || 0;

  if (hasPM && hours < 12) {
    hours += 12;
  } else if (hasAM && hours === 12) {
    hours = 0;
  } else if (!hasAM && !hasPM) {
    // In typical Indian college timetables, hours 1 to 6 without AM/PM refer to afternoon periods (13:00 to 18:00)
    if (hours >= 1 && hours <= 6) {
      hours += 12;
    }
  }

  return hours * 60 + minutes;
}

/**
 * Formats a time string into standard display (e.g. "9:00", "10:55", "2:00")
 */
export function formatTimeDisplay(timeStr) {
  if (!timeStr) return '';
  const mins = parseTimeToMinutes(timeStr);
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const mm = m < 10 ? `0${m}` : `${m}`;
  return `${h12}:${mm}`;
}

/**
 * Calculates the real-time status and progress for a single class slot.
 * Returns:
 * - status: 'upcoming' | 'ongoing' | 'finished'
 * - progress: 0 to 100 (clamped)
 * - minutesLeft: number
 * - remainingLabel: string (e.g. "25 min left", "Finished", "Upcoming")
 */
export function calculateSlotRealtime(slot, currentIST) {
  const startMinutes = parseTimeToMinutes(slot.startTime || slot.start_time);
  const endMinutes = parseTimeToMinutes(slot.endTime || slot.end_time);

  // Validate range (handle corrupted or inverted schedules)
  const duration = Math.max(1, endMinutes - startMinutes);
  const currentMinutes = currentIST.totalMinutes;

  if (currentMinutes < startMinutes) {
    // Upcoming
    const minsUntilStart = Math.ceil(startMinutes - currentMinutes);
    const label =
      minsUntilStart > 60
        ? `In ${Math.floor(minsUntilStart / 60)}h ${minsUntilStart % 60}m`
        : `In ${minsUntilStart}m`;
    return {
      status: 'upcoming',
      progress: 0,
      minutesLeft: minsUntilStart,
      remainingLabel: label,
    };
  } else if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
    // Ongoing
    const elapsed = currentMinutes - startMinutes;
    const rawProgress = (elapsed / duration) * 100;
    const progress = Math.min(100, Math.max(0, rawProgress));
    const minsLeft = Math.max(1, Math.ceil(endMinutes - currentMinutes));

    return {
      status: 'ongoing',
      progress: parseFloat(progress.toFixed(1)),
      minutesLeft: minsLeft,
      remainingLabel: `${minsLeft} min left`,
    };
  } else {
    // Finished (currentMinutes >= endMinutes)
    return {
      status: 'finished',
      progress: 100,
      minutesLeft: 0,
      remainingLabel: 'Finished',
    };
  }
}

/**
 * Fallback dataset representing official college timetable when Supabase is not yet connected
 */
export const FALLBACK_SCHEDULE = {
  Thu: [
    {
      id: 'slot-thu-1',
      startTime: '9:00',
      endTime: '9:55',
      subject: 'Python Programming',
      grade: 'B.Sc (AI & ML) • Semester 1',
      room: 'Room 101',
      classType: 'Theory',
    },
    {
      id: 'slot-thu-2',
      startTime: '10:00',
      endTime: '10:55',
      subject: 'English Communication',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 204',
      classType: 'Theory',
    },
    {
      id: 'slot-thu-3',
      startTime: '11:00',
      endTime: '11:55',
      subject: 'Mathematics',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 108',
      classType: 'Theory',
    },
    {
      id: 'slot-thu-4',
      startTime: '12:00',
      endTime: '12:55',
      subject: 'Computer Fundamentals',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 108',
      classType: 'Theory',
    },
    {
      id: 'slot-thu-5',
      startTime: '1:00',
      endTime: '1:55',
      subject: 'AI Principles & Ethics',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 102',
      classType: 'Theory',
    },
    {
      id: 'slot-thu-6',
      startTime: '2:00',
      endTime: '3:30',
      subject: 'Lab',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Lab 2',
      classType: 'Lab',
    },
    {
      id: 'slot-thu-7',
      startTime: '3:45',
      endTime: '4:45',
      subject: 'Punjabi',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 101',
      classType: 'Theory',
    },
    {
      id: 'slot-thu-8',
      startTime: '4:45',
      endTime: '5:45',
      subject: 'Environmental Science',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 105',
      classType: 'Theory',
    },
    {
      id: 'slot-thu-9',
      startTime: '5:45',
      endTime: '6:30',
      subject: 'Doubt Clearing / Extra Class',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 108',
      classType: 'Theory',
    },
  ],
  Mon: [
    {
      id: 'slot-mon-1',
      startTime: '9:00',
      endTime: '9:55',
      subject: 'Data Structures',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 102',
      classType: 'Theory',
    },
    {
      id: 'slot-mon-2',
      startTime: '10:00',
      endTime: '10:55',
      subject: 'Computer Networks',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 205',
      classType: 'Theory',
    },
    {
      id: 'slot-mon-3',
      startTime: '11:00',
      endTime: '11:55',
      subject: 'Mathematics',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 108',
      classType: 'Theory',
    },
    {
      id: 'slot-mon-4',
      startTime: '12:00',
      endTime: '12:55',
      subject: 'English Communication',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 101',
      classType: 'Theory',
    },
    {
      id: 'slot-mon-5',
      startTime: '1:45',
      endTime: '2:40',
      subject: 'AI Principles',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 104',
      classType: 'Theory',
    },
    {
      id: 'slot-mon-6',
      startTime: '2:45',
      endTime: '3:45',
      subject: 'Environmental Science',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 105',
      classType: 'Theory',
    },
    {
      id: 'slot-mon-7',
      startTime: '3:45',
      endTime: '5:00',
      subject: 'Data Structures Lab',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Lab 1',
      classType: 'Lab',
    },
    {
      id: 'slot-mon-8',
      startTime: '5:00',
      endTime: '6:00',
      subject: 'Tutorial Session',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 102',
      classType: 'Theory',
    },
  ],
  Tue: [
    {
      id: 'slot-tue-1',
      startTime: '9:30',
      endTime: '10:45',
      subject: 'Linear Algebra',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 108',
      classType: 'Theory',
    },
    {
      id: 'slot-tue-2',
      startTime: '11:00',
      endTime: '12:15',
      subject: 'Machine Learning Basics',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 201',
      classType: 'Theory',
    },
    {
      id: 'slot-tue-3',
      startTime: '12:30',
      endTime: '1:30',
      subject: 'Computer Fundamentals',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 108',
      classType: 'Theory',
    },
    {
      id: 'slot-tue-4',
      startTime: '2:00',
      endTime: '3:30',
      subject: 'Python Programming Lab',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Lab 1',
      classType: 'Lab',
    },
    {
      id: 'slot-tue-5',
      startTime: '3:45',
      endTime: '4:45',
      subject: 'Punjabi',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 102',
      classType: 'Theory',
    },
    {
      id: 'slot-tue-6',
      startTime: '4:45',
      endTime: '5:45',
      subject: 'English Communication',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 204',
      classType: 'Theory',
    },
    {
      id: 'slot-tue-7',
      startTime: '5:45',
      endTime: '6:30',
      subject: 'Seminar / Doubt Session',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 201',
      classType: 'Theory',
    },
  ],
  Wed: [
    {
      id: 'slot-wed-1',
      startTime: '9:00',
      endTime: '10:15',
      subject: 'Database Systems',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 106',
      classType: 'Theory',
    },
    {
      id: 'slot-wed-2',
      startTime: '10:30',
      endTime: '11:45',
      subject: 'Statistics & Probability',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 108',
      classType: 'Theory',
    },
    {
      id: 'slot-wed-3',
      startTime: '12:00',
      endTime: '1:15',
      subject: 'Python Programming',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 101',
      classType: 'Theory',
    },
    {
      id: 'slot-wed-4',
      startTime: '2:00',
      endTime: '3:15',
      subject: 'Computer Fundamentals',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 108',
      classType: 'Theory',
    },
    {
      id: 'slot-wed-5',
      startTime: '3:30',
      endTime: '4:45',
      subject: 'Practical: DBMS Lab',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Lab 3',
      classType: 'Lab',
    },
    {
      id: 'slot-wed-6',
      startTime: '4:45',
      endTime: '5:45',
      subject: 'English Communication',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 101',
      classType: 'Theory',
    },
    {
      id: 'slot-wed-7',
      startTime: '5:45',
      endTime: '6:30',
      subject: 'Extra Tutorial & Doubt Session',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 105',
      classType: 'Theory',
    },
  ],
  Fri: [
    {
      id: 'slot-fri-1',
      startTime: '9:00',
      endTime: '10:15',
      subject: 'Ethics in AI',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 101',
      classType: 'Theory',
    },
    {
      id: 'slot-fri-2',
      startTime: '10:30',
      endTime: '11:45',
      subject: 'Python Programming',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 204',
      classType: 'Theory',
    },
    {
      id: 'slot-fri-3',
      startTime: '12:00',
      endTime: '1:15',
      subject: 'Mathematics',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 108',
      classType: 'Theory',
    },
    {
      id: 'slot-fri-4',
      startTime: '2:00',
      endTime: '3:30',
      subject: 'Seminar / Project Review',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Auditorium',
      classType: 'Theory',
    },
    {
      id: 'slot-fri-5',
      startTime: '3:45',
      endTime: '5:00',
      subject: 'Practical: Lab Assessment',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Lab 2',
      classType: 'Lab',
    },
    {
      id: 'slot-fri-6',
      startTime: '5:00',
      endTime: '6:00',
      subject: 'Weekly Review & Doubts',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 101',
      classType: 'Theory',
    },
  ],
  Sat: [
    {
      id: 'slot-sat-1',
      startTime: '9:30',
      endTime: '11:00',
      subject: 'Extra Tutorial / Doubt Session',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Room 105',
      classType: 'Theory',
    },
    {
      id: 'slot-sat-2',
      startTime: '11:15',
      endTime: '1:00',
      subject: 'Project Guidance & Mentorship',
      grade: 'B.Sc AI/ML – 1st Year',
      room: 'Lab 1',
      classType: 'Lab',
    },
  ],
  Sun: [],
};

/**
 * Fetches timetable slots for a specific day from Supabase (or fallback if offline/unconfigured)
 */
export async function fetchDayTimetable(dayOfWeek) {
  // Normalize day format, e.g. "Thu" or "thu" -> "Thu"
  const normalizedDay =
    dayOfWeek && typeof dayOfWeek === 'string'
      ? dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1, 3).toLowerCase()
      : 'Thu';

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('timetable_slots')
        .select(`
          id,
          day_of_week,
          start_time,
          end_time,
          room_number,
          class_type,
          is_published,
          teacher_assignments (
            subjects (
              id,
              name,
              code,
              color_theme
            ),
            batches (
              code,
              semester
            )
          )
        `)
        .eq('is_published', true)
        .eq('day_of_week', normalizedDay)
        .order('start_time', { ascending: true });

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map((item) => {
          const subject =
            item.teacher_assignments?.subjects?.name || 'Academic Class';
          const grade =
            item.teacher_assignments?.batches?.code || 'B.Sc AI/ML – 1st Year';
          return {
            id: item.id,
            startTime: formatTimeDisplay(item.start_time),
            endTime: formatTimeDisplay(item.end_time),
            subject,
            grade,
            room: item.room_number || 'Room 101',
            classType: item.class_type || 'Theory',
          };
        });
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local timetable:', err);
    }
  }

  // Check local custom timetable in localStorage first
  const custom = getCustomTimetable();
  if (custom && custom.schedule && Array.isArray(custom.schedule[normalizedDay])) {
    return custom.schedule[normalizedDay];
  }

  // Fallback to local schedule
  const fallbackList = FALLBACK_SCHEDULE[normalizedDay] || FALLBACK_SCHEDULE.Thu;
  return fallbackList;
}

/**
 * Saves uploaded timetable schedule to localStorage and dispatches a change event
 */
export function saveCustomTimetable(scheduleByDay, batchMeta = {}) {
  try {
    const payload = {
      schedule: scheduleByDay,
      batchMeta,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem('classhere_timetable', JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent('classhere_timetable_updated', { detail: payload }));
    return true;
  } catch (err) {
    console.error('Failed to save custom timetable:', err);
    return false;
  }
}

/**
 * Gets custom timetable schedule from localStorage
 */
export function getCustomTimetable() {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('classhere_timetable') : null;
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to get custom timetable:', err);
    return null;
  }
}

/**
 * Clears custom timetable from localStorage and reverts to defaults
 */
export function resetCustomTimetable() {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('classhere_timetable');
      window.dispatchEvent(new CustomEvent('classhere_timetable_updated', { detail: null }));
    }
    return true;
  } catch (err) {
    console.error('Failed to reset custom timetable:', err);
    return false;
  }
}

/**
 * Enriches a day's schedule with real-time status and progress:
 * - Identifies single Ongoing class (if within start & end time on that day)
 * - Marks earlier classes as Finished
 * - Marks later classes as Upcoming
 * - If current time falls between classes or all finished, ongoingClass is null
 */
export function enrichScheduleWithRealtime(slots, currentIST, isToday = true) {
  if (!Array.isArray(slots) || slots.length === 0) {
    return {
      ongoingClass: null,
      upcomingClasses: [],
      finishedClasses: [],
      allClasses: [],
    };
  }

  // Sort slots by start time
  const sorted = [...slots].sort((a, b) => {
    return parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime);
  });

  const enriched = sorted.map((slot) => {
    if (!isToday) {
      // For future or past days viewed in timetable tabs
      return {
        ...slot,
        status: 'upcoming',
        progress: 0,
        minutesLeft: 0,
        remainingLabel: 'Upcoming',
      };
    }

    const realtime = calculateSlotRealtime(slot, currentIST);
    return {
      ...slot,
      ...realtime,
    };
  });

  if (!isToday) {
    return {
      ongoingClass: null,
      upcomingClasses: enriched,
      finishedClasses: [],
      allClasses: enriched,
    };
  }

  // Find ongoing class
  const ongoing = enriched.find((s) => s.status === 'ongoing') || null;
  const upcoming = enriched.filter((s) => s.status === 'upcoming');
  const finished = enriched.filter((s) => s.status === 'finished');

  return {
    ongoingClass: ongoing,
    upcomingClasses: upcoming,
    finishedClasses: finished,
    allClasses: enriched,
  };
}
