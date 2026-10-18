export const SUPABASE_SCHEMA_SQL = `-- ========================================================
-- ClassHere - Supabase PostgreSQL Database Schema
-- Run this entire script in your Supabase SQL Editor:
-- https://app.supabase.com/project/_/sql/new
-- ========================================================

-- Enable UUID extension if needed
create extension if not exists "uuid-ossp";

-- 1. DEPARTMENTS TABLE
create table if not exists public.departments (
  id text primary key,
  name text not null,
  code text not null unique,
  degree text not null,
  hod text,
  hod_initials text,
  hod_avatar_bg text,
  students_count integer default 0,
  faculty_count integer default 0,
  subjects_count integer default 0,
  status text default 'Active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. STUDENTS TABLE
create table if not exists public.students (
  id text primary key,
  name text not null,
  initials text,
  avatar_bg text,
  roll_number text not null unique,
  course text not null,
  semester text not null,
  status text default 'Active',
  joined_on text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. TEACHERS / FACULTY TABLE
create table if not exists public.teachers (
  id text primary key,
  name text not null,
  initials text,
  avatar_bg text,
  emp_id text not null unique,
  department text not null,
  designation text not null,
  subjects text,
  email text,
  status text default 'Active',
  joined_on text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. EXAMS TABLE
create table if not exists public.exams (
  id text primary key,
  subject text not null,
  department text not null,
  date text not null,
  time text not null,
  room text not null,
  status text default 'Scheduled',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. SYLLABUS TABLE
create table if not exists public.syllabus (
  id bigint primary key,
  subject text not null,
  department text not null,
  semester text not null,
  units integer default 4,
  progress integer default 0,
  last_updated text,
  status text default 'Published',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. ANNOUNCEMENTS / NOTICES TABLE
create table if not exists public.announcements (
  id text primary key,
  title text not null,
  category text not null,
  badge_color text,
  audience text not null,
  date text not null,
  author text not null,
  pinned boolean default false,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. TIMETABLE SLOTS TABLE
create table if not exists public.timetable_slots (
  id text primary key,
  day_of_week text not null, -- 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  start_time text not null,
  end_time text not null,
  subject text not null,
  room_number text not null,
  class_type text default 'Theory', -- 'Theory', 'Lab', 'Tutorial'
  batch_grade text not null,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. INSTITUTION SETTINGS TABLE
create table if not exists public.institution_settings (
  id text primary key default 'primary',
  institution_name text not null,
  short_code text not null,
  academic_year text not null,
  current_semester text not null,
  admin_email text not null,
  allow_self_registration boolean default true,
  notify_on_registration boolean default true,
  notify_on_timetable boolean default true,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================
alter table public.departments enable row level security;
alter table public.students enable row level security;
alter table public.teachers enable row level security;
alter table public.exams enable row level security;
alter table public.syllabus enable row level security;
alter table public.announcements enable row level security;
alter table public.timetable_slots enable row level security;
alter table public.institution_settings enable row level security;

-- Open Access Policies for Public / Anon Access (Frontend Direct Read & Write)
drop policy if exists "Allow anon read departments" on public.departments;
create policy "Allow anon read departments" on public.departments for select using (true);
drop policy if exists "Allow anon write departments" on public.departments;
create policy "Allow anon write departments" on public.departments for all using (true) with check (true);

drop policy if exists "Allow anon read students" on public.students;
create policy "Allow anon read students" on public.students for select using (true);
drop policy if exists "Allow anon write students" on public.students;
create policy "Allow anon write students" on public.students for all using (true) with check (true);

drop policy if exists "Allow anon read teachers" on public.teachers;
create policy "Allow anon read teachers" on public.teachers for select using (true);
drop policy if exists "Allow anon write teachers" on public.teachers;
create policy "Allow anon write teachers" on public.teachers for all using (true) with check (true);

drop policy if exists "Allow anon read exams" on public.exams;
create policy "Allow anon read exams" on public.exams for select using (true);
drop policy if exists "Allow anon write exams" on public.exams;
create policy "Allow anon write exams" on public.exams for all using (true) with check (true);

drop policy if exists "Allow anon read syllabus" on public.syllabus;
create policy "Allow anon read syllabus" on public.syllabus for select using (true);
drop policy if exists "Allow anon write syllabus" on public.syllabus;
create policy "Allow anon write syllabus" on public.syllabus for all using (true) with check (true);

drop policy if exists "Allow anon read announcements" on public.announcements;
create policy "Allow anon read announcements" on public.announcements for select using (true);
drop policy if exists "Allow anon write announcements" on public.announcements;
create policy "Allow anon write announcements" on public.announcements for all using (true) with check (true);

drop policy if exists "Allow anon read timetable" on public.timetable_slots;
create policy "Allow anon read timetable" on public.timetable_slots for select using (true);
drop policy if exists "Allow anon write timetable" on public.timetable_slots;
create policy "Allow anon write timetable" on public.timetable_slots for all using (true) with check (true);

drop policy if exists "Allow anon read settings" on public.institution_settings;
create policy "Allow anon read settings" on public.institution_settings for select using (true);
drop policy if exists "Allow anon write settings" on public.institution_settings;
create policy "Allow anon write settings" on public.institution_settings for all using (true) with check (true);
`;
