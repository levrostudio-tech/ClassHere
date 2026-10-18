import { supabase, isSupabaseConfigured, getSupabaseConfig } from './supabase.js';

/**
 * Checks if Supabase client is currently active
 */
export function isConnected() {
  const cfg = getSupabaseConfig();
  return Boolean(cfg.url && cfg.key && isSupabaseConfigured);
}

// ========================================================
// 1. STUDENTS
// ========================================================

export async function fetchStudentsFromDb() {
  if (!isConnected()) return null;
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch students error:', error);
      return null;
    }

    return (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      initials: row.initials || 'ST',
      avatarBg: row.avatar_bg || 'bg-blue-100 text-blue-600',
      rollNumber: row.roll_number,
      course: row.course,
      semester: row.semester,
      status: row.status,
      joinedOn: row.joined_on || '17 Oct 2026',
    }));
  } catch (err) {
    console.warn('Failed to fetch students from Supabase:', err);
    return null;
  }
}

export async function insertStudentToDb(student) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('students').upsert({
      id: student.id,
      name: student.name,
      initials: student.initials,
      avatar_bg: student.avatarBg,
      roll_number: student.rollNumber,
      course: student.course,
      semester: student.semester,
      status: student.status,
      joined_on: student.joinedOn,
    });
    return !error;
  } catch (err) {
    console.error('Failed to insert student into Supabase:', err);
    return false;
  }
}

export async function updateStudentStatusInDb(id, status) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase
      .from('students')
      .update({ status })
      .eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to update student status in Supabase:', err);
    return false;
  }
}

export async function deleteStudentFromDb(id) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('students').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to delete student from Supabase:', err);
    return false;
  }
}

export async function batchImportStudentsToDb(students) {
  if (!isConnected() || !Array.isArray(students) || students.length === 0) return 0;
  try {
    const rows = students.map((s) => ({
      id: s.id,
      name: s.name,
      initials: s.initials,
      avatar_bg: s.avatarBg,
      roll_number: s.rollNumber,
      course: s.course,
      semester: s.semester,
      status: s.status,
      joined_on: s.joinedOn,
    }));

    const { error } = await supabase.from('students').upsert(rows, { onConflict: 'roll_number' });
    if (error) throw error;
    return rows.length;
  } catch (err) {
    console.error('Failed to batch import students into Supabase:', err);
    return 0;
  }
}

// ========================================================
// 2. TEACHERS / FACULTY
// ========================================================

export async function fetchTeachersFromDb() {
  if (!isConnected()) return null;
  try {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch teachers error:', error);
      return null;
    }

    return (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      initials: row.initials || 'FC',
      avatarBg: row.avatar_bg || 'bg-purple-100 text-purple-600',
      empId: row.emp_id,
      department: row.department,
      designation: row.designation,
      subjects: row.subjects || 'Core Subject',
      email: row.email,
      status: row.status,
      joinedOn: row.joined_on || '17 Oct 2026',
    }));
  } catch (err) {
    console.warn('Failed to fetch teachers from Supabase:', err);
    return null;
  }
}

export async function insertTeacherToDb(teacher) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('teachers').upsert({
      id: teacher.id,
      name: teacher.name,
      initials: teacher.initials,
      avatar_bg: teacher.avatarBg,
      emp_id: teacher.empId,
      department: teacher.department,
      designation: teacher.designation,
      subjects: teacher.subjects,
      email: teacher.email,
      status: teacher.status,
      joined_on: teacher.joinedOn,
    });
    return !error;
  } catch (err) {
    console.error('Failed to insert teacher into Supabase:', err);
    return false;
  }
}

export async function updateTeacherStatusInDb(id, status) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase
      .from('teachers')
      .update({ status })
      .eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to update teacher status in Supabase:', err);
    return false;
  }
}

export async function deleteTeacherFromDb(id) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('teachers').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to delete teacher from Supabase:', err);
    return false;
  }
}

export async function batchImportTeachersToDb(teachers) {
  if (!isConnected() || !Array.isArray(teachers) || teachers.length === 0) return 0;
  try {
    const rows = teachers.map((t) => ({
      id: t.id,
      name: t.name,
      initials: t.initials,
      avatar_bg: t.avatarBg,
      emp_id: t.empId,
      department: t.department,
      designation: t.designation,
      subjects: t.subjects,
      email: t.email,
      status: t.status,
      joined_on: t.joinedOn,
    }));

    const { error } = await supabase.from('teachers').upsert(rows, { onConflict: 'emp_id' });
    if (error) throw error;
    return rows.length;
  } catch (err) {
    console.error('Failed to batch import teachers into Supabase:', err);
    return 0;
  }
}

// ========================================================
// 3. DEPARTMENTS
// ========================================================

export async function fetchDepartmentsFromDb() {
  if (!isConnected()) return null;
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch departments error:', error);
      return null;
    }

    return (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      code: row.code,
      degree: row.degree,
      hod: row.hod,
      hodInitials: row.hod_initials || 'HD',
      hodAvatarBg: row.hod_avatar_bg || 'bg-blue-100 text-blue-600',
      studentsCount: row.students_count || 0,
      facultyCount: row.faculty_count || 0,
      subjectsCount: row.subjects_count || 0,
      status: row.status || 'Active',
    }));
  } catch (err) {
    console.warn('Failed to fetch departments from Supabase:', err);
    return null;
  }
}

export async function insertDepartmentToDb(dept) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('departments').upsert({
      id: dept.id,
      name: dept.name,
      code: dept.code,
      degree: dept.degree,
      hod: dept.hod,
      hod_initials: dept.hodInitials,
      hod_avatar_bg: dept.hodAvatarBg,
      students_count: dept.studentsCount,
      faculty_count: dept.facultyCount,
      subjects_count: dept.subjectsCount,
      status: dept.status,
    });
    return !error;
  } catch (err) {
    console.error('Failed to insert department into Supabase:', err);
    return false;
  }
}

export async function deleteDepartmentFromDb(id) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('departments').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to delete department from Supabase:', err);
    return false;
  }
}

// ========================================================
// 4. EXAMS
// ========================================================

export async function fetchExamsFromDb() {
  if (!isConnected()) return null;
  try {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch exams error:', error);
      return null;
    }

    return data || [];
  } catch (err) {
    console.warn('Failed to fetch exams from Supabase:', err);
    return null;
  }
}

export async function insertExamToDb(exam) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('exams').upsert({
      id: exam.id,
      subject: exam.subject,
      department: exam.department,
      date: exam.date,
      time: exam.time,
      room: exam.room,
      status: exam.status,
    });
    return !error;
  } catch (err) {
    console.error('Failed to insert exam into Supabase:', err);
    return false;
  }
}

export async function updateExamStatusInDb(id, status) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('exams').update({ status }).eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to update exam status in Supabase:', err);
    return false;
  }
}

export async function deleteExamFromDb(id) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('exams').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to delete exam from Supabase:', err);
    return false;
  }
}

// ========================================================
// 5. SYLLABUS
// ========================================================

export async function fetchSyllabusFromDb() {
  if (!isConnected()) return null;
  try {
    const { data, error } = await supabase
      .from('syllabus')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.warn('Supabase fetch syllabus error:', error);
      return null;
    }

    return (data || []).map((row) => ({
      id: row.id,
      subject: row.subject,
      department: row.department,
      semester: String(row.semester),
      units: row.units,
      progress: row.progress,
      lastUpdated: row.last_updated,
      status: row.status,
    }));
  } catch (err) {
    console.warn('Failed to fetch syllabus from Supabase:', err);
    return null;
  }
}

export async function insertSyllabusToDb(item) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('syllabus').upsert({
      id: item.id,
      subject: item.subject,
      department: item.department,
      semester: item.semester,
      units: item.units,
      progress: item.progress,
      last_updated: item.lastUpdated,
      status: item.status,
    });
    return !error;
  } catch (err) {
    console.error('Failed to insert syllabus into Supabase:', err);
    return false;
  }
}

export async function updateSyllabusStatusInDb(id, status) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('syllabus').update({ status }).eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to update syllabus status in Supabase:', err);
    return false;
  }
}

export async function deleteSyllabusFromDb(id) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('syllabus').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to delete syllabus from Supabase:', err);
    return false;
  }
}

// ========================================================
// 6. ANNOUNCEMENTS
// ========================================================

export async function fetchAnnouncementsFromDb() {
  if (!isConnected()) return null;
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch announcements error:', error);
      return null;
    }

    return (data || []).map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      badgeColor: row.badge_color,
      audience: row.audience,
      date: row.date,
      author: row.author,
      pinned: row.pinned,
      content: row.content,
    }));
  } catch (err) {
    console.warn('Failed to fetch announcements from Supabase:', err);
    return null;
  }
}

export async function insertAnnouncementToDb(ann) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('announcements').upsert({
      id: ann.id,
      title: ann.title,
      category: ann.category,
      badge_color: ann.badgeColor,
      audience: ann.audience,
      date: ann.date,
      author: ann.author,
      pinned: ann.pinned,
      content: ann.content,
    });
    return !error;
  } catch (err) {
    console.error('Failed to insert announcement into Supabase:', err);
    return false;
  }
}

export async function updateAnnouncementPinInDb(id, pinned) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase
      .from('announcements')
      .update({ pinned })
      .eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to update announcement pin in Supabase:', err);
    return false;
  }
}

export async function deleteAnnouncementFromDb(id) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to delete announcement from Supabase:', err);
    return false;
  }
}

// ========================================================
// 7. TIMETABLE SLOTS SYNC
// ========================================================

export async function syncWeeklyTimetableToDb(scheduleByDay, batchGrade = 'B.Sc. AI & ML') {
  if (!isConnected() || !scheduleByDay) return 0;
  try {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const rows = [];

    days.forEach((dayKey) => {
      const slots = scheduleByDay[dayKey] || [];
      slots.forEach((slot, idx) => {
        rows.push({
          id: slot.id || `slot-${dayKey.toLowerCase()}-${idx}-${Date.now()}`,
          day_of_week: dayKey,
          start_time: slot.startTime,
          end_time: slot.endTime,
          subject: slot.subject,
          room_number: slot.room || 'Room 101',
          class_type: slot.classType || 'Theory',
          batch_grade: slot.grade || batchGrade,
          is_published: true,
        });
      });
    });

    if (rows.length === 0) return 0;

    // First delete old batch slots if needed or upsert
    const { error } = await supabase.from('timetable_slots').upsert(rows);
    if (error) throw error;
    return rows.length;
  } catch (err) {
    console.error('Failed to sync timetable to Supabase:', err);
    return 0;
  }
}

// ========================================================
// 8. INSTITUTION SETTINGS
// ========================================================

export async function fetchInstitutionSettingsFromDb() {
  if (!isConnected()) return null;
  try {
    const { data, error } = await supabase
      .from('institution_settings')
      .select('*')
      .eq('id', 'primary')
      .single();

    if (error || !data) return null;

    return {
      institutionName: data.institution_name,
      shortCode: data.short_code,
      academicYear: data.academic_year,
      currentSemester: data.current_semester,
      adminEmail: data.admin_email,
      allowStudentSelfRegistration: data.allow_self_registration,
      notifyOnRegistration: data.notify_on_registration,
      notifyOnTimetablePublish: data.notify_on_timetable,
    };
  } catch (err) {
    console.warn('Failed to fetch settings from Supabase:', err);
    return null;
  }
}

export async function saveInstitutionSettingsToDb(settings) {
  if (!isConnected()) return false;
  try {
    const { error } = await supabase.from('institution_settings').upsert({
      id: 'primary',
      institution_name: settings.institutionName,
      short_code: settings.shortCode,
      academic_year: settings.academicYear,
      current_semester: settings.currentSemester,
      admin_email: settings.adminEmail,
      allow_self_registration: settings.allowStudentSelfRegistration,
      notify_on_registration: settings.notifyOnRegistration,
      notify_on_timetable: settings.notifyOnTimetablePublish,
      updated_at: new Date().toISOString(),
    });
    return !error;
  } catch (err) {
    console.error('Failed to save settings to Supabase:', err);
    return false;
  }
}

// ========================================================
// 9. ONE-CLICK SYNC ALL LOCAL DATA TO SUPABASE
// ========================================================

export async function syncAllLocalToSupabase({
  students = [],
  teachers = [],
  departments = [],
  exams = [],
  syllabus = [],
  announcements = [],
  timetable = null,
  settings = null,
}) {
  if (!isConnected()) {
    return {
      success: false,
      message: 'Supabase is not connected. Enter your credentials first.',
    };
  }

  const results = {
    studentsCount: 0,
    teachersCount: 0,
    departmentsCount: 0,
    examsCount: 0,
    syllabusCount: 0,
    announcementsCount: 0,
    timetableCount: 0,
    errors: [],
  };

  try {
    // 1. Departments
    if (departments.length > 0) {
      for (const d of departments) {
        await insertDepartmentToDb(d);
      }
      results.departmentsCount = departments.length;
    }

    // 2. Students
    if (students.length > 0) {
      results.studentsCount = await batchImportStudentsToDb(students);
    }

    // 3. Teachers
    if (teachers.length > 0) {
      results.teachersCount = await batchImportTeachersToDb(teachers);
    }

    // 4. Exams
    if (exams.length > 0) {
      for (const e of exams) {
        await insertExamToDb(e);
      }
      results.examsCount = exams.length;
    }

    // 5. Syllabus
    if (syllabus.length > 0) {
      for (const s of syllabus) {
        await insertSyllabusToDb(s);
      }
      results.syllabusCount = syllabus.length;
    }

    // 6. Announcements
    if (announcements.length > 0) {
      for (const a of announcements) {
        await insertAnnouncementToDb(a);
      }
      results.announcementsCount = announcements.length;
    }

    // 7. Timetable
    if (timetable && timetable.schedule) {
      results.timetableCount = await syncWeeklyTimetableToDb(timetable.schedule);
    }

    // 8. Settings
    if (settings) {
      await saveInstitutionSettingsToDb(settings);
    }

    return {
      success: true,
      message: `Successfully synchronized ${results.studentsCount} students, ${results.teachersCount} faculty, ${results.departmentsCount} departments, ${results.examsCount} exams, and ${results.announcementsCount} notices to Supabase!`,
      details: results,
    };
  } catch (err) {
    return {
      success: false,
      message: `Sync partially failed: ${err.message}`,
      details: results,
    };
  }
}
