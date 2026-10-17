import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import {
  LayoutDashboard,
  Building2,
  Users,
  GraduationCap,
  FileText,
  BookOpen,
  Bell,
  Settings,
  Calendar,
  LogOut,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Search,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  UserPlus,
  Clock,
  CheckCircle2,
  X,
  Upload,
  Download,
  MoreVertical,
  FileDown,
  FileSpreadsheet,
  Printer,
  Trash2,
} from 'lucide-react';
import { adminLogout, getAdminUser } from '../lib/adminAuth';
import {
  saveCustomTimetable,
  getCustomTimetable,
  resetCustomTimetable,
  FALLBACK_SCHEDULE,
} from '../lib/timetableService';

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-600',
  'bg-purple-100 text-purple-600',
  'bg-emerald-100 text-emerald-600',
  'bg-pink-100 text-pink-600',
  'bg-amber-100 text-amber-700',
  'bg-sky-100 text-sky-600',
  'bg-indigo-100 text-indigo-600',
  'bg-teal-100 text-teal-600',
  'bg-rose-100 text-rose-600',
  'bg-yellow-100 text-yellow-700',
];

const getInitials = (name) => {
  if (!name) return 'ST';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const INITIAL_STUDENTS = [
  // Page 1 (Matching screenshot exactly)
  {
    id: 'std-1',
    name: 'Aman Kumar',
    initials: 'AK',
    avatarBg: 'bg-blue-100 text-blue-600',
    rollNumber: '23BCA001',
    course: 'BCA',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '12 Aug 2026',
  },
  {
    id: 'std-2',
    name: 'Simran Preet',
    initials: 'SP',
    avatarBg: 'bg-purple-100 text-purple-600',
    rollNumber: '23BCA002',
    course: 'BCA',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '12 Aug 2026',
  },
  {
    id: 'std-3',
    name: 'Rohit Sharma',
    initials: 'RS',
    avatarBg: 'bg-emerald-100 text-emerald-600',
    rollNumber: '23IT015',
    course: 'B.Sc IT',
    semester: '5th Semester',
    status: 'Active',
    joinedOn: '10 Aug 2026',
  },
  {
    id: 'std-4',
    name: 'Muskan Kaur',
    initials: 'MK',
    avatarBg: 'bg-pink-100 text-pink-600',
    rollNumber: '23IT018',
    course: 'B.Sc IT',
    semester: '5th Semester',
    status: 'Active',
    joinedOn: '10 Aug 2026',
  },
  {
    id: 'std-5',
    name: 'Arjun Rana',
    initials: 'AR',
    avatarBg: 'bg-amber-100 text-amber-700',
    rollNumber: '23BVOC007',
    course: 'B.Voc (Web Dev)',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '08 Aug 2026',
  },
  {
    id: 'std-6',
    name: 'Priya Garg',
    initials: 'PG',
    avatarBg: 'bg-sky-100 text-sky-600',
    rollNumber: '23BVOC011',
    course: 'B.Voc (Web Dev)',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '08 Aug 2026',
  },
  {
    id: 'std-7',
    name: 'Nikhil Handa',
    initials: 'NH',
    avatarBg: 'bg-indigo-100 text-indigo-600',
    rollNumber: '23CS006',
    course: 'B.Sc Computer Science',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '05 Aug 2026',
  },
  {
    id: 'std-8',
    name: 'Jasleen Tiwari',
    initials: 'JT',
    avatarBg: 'bg-teal-100 text-teal-600',
    rollNumber: '23CS010',
    course: 'B.Sc Computer Science',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '05 Aug 2026',
  },
  {
    id: 'std-9',
    name: 'Vansh K.',
    initials: 'VK',
    avatarBg: 'bg-rose-100 text-rose-600',
    rollNumber: '23AIML004',
    course: 'B.Sc AI & ML',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '03 Aug 2026',
  },
  {
    id: 'std-10',
    name: 'Divansh Singh',
    initials: 'DS',
    avatarBg: 'bg-yellow-100 text-yellow-700',
    rollNumber: '23AIML012',
    course: 'B.Sc AI & ML',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '03 Aug 2026',
  },
  // Page 2
  {
    id: 'std-11',
    name: 'Ananya Verma',
    initials: 'AV',
    avatarBg: 'bg-blue-100 text-blue-600',
    rollNumber: '23BCA014',
    course: 'BCA',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '01 Aug 2026',
  },
  {
    id: 'std-12',
    name: 'Harpreet Singh',
    initials: 'HS',
    avatarBg: 'bg-purple-100 text-purple-600',
    rollNumber: '23BCA022',
    course: 'BCA',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '29 Jul 2026',
  },
  {
    id: 'std-13',
    name: 'Riya Sen',
    initials: 'RS',
    avatarBg: 'bg-emerald-100 text-emerald-600',
    rollNumber: '23IT025',
    course: 'B.Sc IT',
    semester: '5th Semester',
    status: 'Active',
    joinedOn: '27 Jul 2026',
  },
  {
    id: 'std-14',
    name: 'Karan Deep',
    initials: 'KD',
    avatarBg: 'bg-pink-100 text-pink-600',
    rollNumber: '23IT030',
    course: 'B.Sc IT',
    semester: '5th Semester',
    status: 'Active',
    joinedOn: '25 Jul 2026',
  },
  {
    id: 'std-15',
    name: 'Sahil Mehra',
    initials: 'SM',
    avatarBg: 'bg-amber-100 text-amber-700',
    rollNumber: '23BVOC019',
    course: 'B.Voc (Web Dev)',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '24 Jul 2026',
  },
  {
    id: 'std-16',
    name: 'Tanvi Sharma',
    initials: 'TS',
    avatarBg: 'bg-sky-100 text-sky-600',
    rollNumber: '23BVOC024',
    course: 'B.Voc (Web Dev)',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '22 Jul 2026',
  },
  {
    id: 'std-17',
    name: 'Gurjot Singh',
    initials: 'GS',
    avatarBg: 'bg-indigo-100 text-indigo-600',
    rollNumber: '23CS015',
    course: 'B.Sc Computer Science',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '20 Jul 2026',
  },
  {
    id: 'std-18',
    name: 'Mehak Arora',
    initials: 'MA',
    avatarBg: 'bg-teal-100 text-teal-600',
    rollNumber: '23CS021',
    course: 'B.Sc Computer Science',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '18 Jul 2026',
  },
  {
    id: 'std-19',
    name: 'Aditya Joshi',
    initials: 'AJ',
    avatarBg: 'bg-rose-100 text-rose-600',
    rollNumber: '23AIML018',
    course: 'B.Sc AI & ML',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '15 Jul 2026',
  },
  {
    id: 'std-20',
    name: 'Sneha Kapoor',
    initials: 'SK',
    avatarBg: 'bg-yellow-100 text-yellow-700',
    rollNumber: '23AIML025',
    course: 'B.Sc AI & ML',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '14 Jul 2026',
  },
  // Page 3
  {
    id: 'std-21',
    name: 'Manav Malhotra',
    initials: 'MM',
    avatarBg: 'bg-blue-100 text-blue-600',
    rollNumber: '23BCA033',
    course: 'BCA',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '12 Jul 2026',
  },
  {
    id: 'std-22',
    name: 'Navneet Kaur',
    initials: 'NK',
    avatarBg: 'bg-purple-100 text-purple-600',
    rollNumber: '23BCA041',
    course: 'BCA',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '10 Jul 2026',
  },
  {
    id: 'std-23',
    name: 'Deepak Rawat',
    initials: 'DR',
    avatarBg: 'bg-emerald-100 text-emerald-600',
    rollNumber: '23IT038',
    course: 'B.Sc IT',
    semester: '5th Semester',
    status: 'Active',
    joinedOn: '08 Jul 2026',
  },
  {
    id: 'std-24',
    name: 'Ishita Roy',
    initials: 'IR',
    avatarBg: 'bg-pink-100 text-pink-600',
    rollNumber: '23IT044',
    course: 'B.Sc IT',
    semester: '5th Semester',
    status: 'Active',
    joinedOn: '05 Jul 2026',
  },
  {
    id: 'std-25',
    name: 'Rahul Gill',
    initials: 'RG',
    avatarBg: 'bg-amber-100 text-amber-700',
    rollNumber: '23BVOC032',
    course: 'B.Voc (Web Dev)',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '03 Jul 2026',
  },
  {
    id: 'std-26',
    name: 'Pooja Batra',
    initials: 'PB',
    avatarBg: 'bg-sky-100 text-sky-600',
    rollNumber: '23BVOC039',
    course: 'B.Voc (Web Dev)',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '01 Jul 2026',
  },
  {
    id: 'std-27',
    name: 'Abhishek Paul',
    initials: 'AP',
    avatarBg: 'bg-indigo-100 text-indigo-600',
    rollNumber: '23CS029',
    course: 'B.Sc Computer Science',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '28 Jun 2026',
  },
  {
    id: 'std-28',
    name: 'Simranjeet K.',
    initials: 'SK',
    avatarBg: 'bg-teal-100 text-teal-600',
    rollNumber: '23CS035',
    course: 'B.Sc Computer Science',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '25 Jun 2026',
  },
  {
    id: 'std-29',
    name: 'Yash Goel',
    initials: 'YG',
    avatarBg: 'bg-rose-100 text-rose-600',
    rollNumber: '23AIML031',
    course: 'B.Sc AI & ML',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '22 Jun 2026',
  },
  {
    id: 'std-30',
    name: 'Khushi Jain',
    initials: 'KJ',
    avatarBg: 'bg-yellow-100 text-yellow-700',
    rollNumber: '23AIML039',
    course: 'B.Sc AI & ML',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '20 Jun 2026',
  },
  // Page 4
  {
    id: 'std-31',
    name: 'Tarun Chawla',
    initials: 'TC',
    avatarBg: 'bg-blue-100 text-blue-600',
    rollNumber: '23BCA050',
    course: 'BCA',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '18 Jun 2026',
  },
  {
    id: 'std-32',
    name: 'Bhavna Soni',
    initials: 'BS',
    avatarBg: 'bg-purple-100 text-purple-600',
    rollNumber: '23BCA055',
    course: 'BCA',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '15 Jun 2026',
  },
  {
    id: 'std-33',
    name: 'Mohit Juneja',
    initials: 'MJ',
    avatarBg: 'bg-emerald-100 text-emerald-600',
    rollNumber: '23IT051',
    course: 'B.Sc IT',
    semester: '5th Semester',
    status: 'Active',
    joinedOn: '12 Jun 2026',
  },
  {
    id: 'std-34',
    name: 'Chetna Vyas',
    initials: 'CV',
    avatarBg: 'bg-pink-100 text-pink-600',
    rollNumber: '23IT059',
    course: 'B.Sc IT',
    semester: '5th Semester',
    status: 'Active',
    joinedOn: '10 Jun 2026',
  },
  {
    id: 'std-35',
    name: 'Aryan Dogra',
    initials: 'AD',
    avatarBg: 'bg-amber-100 text-amber-700',
    rollNumber: '23BVOC045',
    course: 'B.Voc (Web Dev)',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '08 Jun 2026',
  },
  {
    id: 'std-36',
    name: 'Komal Yadav',
    initials: 'KY',
    avatarBg: 'bg-sky-100 text-sky-600',
    rollNumber: '23BVOC051',
    course: 'B.Voc (Web Dev)',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '05 Jun 2026',
  },
  {
    id: 'std-37',
    name: 'Gaurav Bedi',
    initials: 'GB',
    avatarBg: 'bg-indigo-100 text-indigo-600',
    rollNumber: '23CS042',
    course: 'B.Sc Computer Science',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '02 Jun 2026',
  },
  {
    id: 'std-38',
    name: 'Ritu Aggarwal',
    initials: 'RA',
    avatarBg: 'bg-teal-100 text-teal-600',
    rollNumber: '23CS048',
    course: 'B.Sc Computer Science',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '30 May 2026',
  },
  {
    id: 'std-39',
    name: 'Kabir Sood',
    initials: 'KS',
    avatarBg: 'bg-rose-100 text-rose-600',
    rollNumber: '23AIML046',
    course: 'B.Sc AI & ML',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '28 May 2026',
  },
  {
    id: 'std-40',
    name: 'Nandini Seth',
    initials: 'NS',
    avatarBg: 'bg-yellow-100 text-yellow-700',
    rollNumber: '23AIML052',
    course: 'B.Sc AI & ML',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '25 May 2026',
  },
  // Page 5
  {
    id: 'std-41',
    name: 'Sameer Bajaj',
    initials: 'SB',
    avatarBg: 'bg-blue-100 text-blue-600',
    rollNumber: '23BCA062',
    course: 'BCA',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '22 May 2026',
  },
  {
    id: 'std-42',
    name: 'Pallavi Sood',
    initials: 'PS',
    avatarBg: 'bg-purple-100 text-purple-600',
    rollNumber: '23BCA068',
    course: 'BCA',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '20 May 2026',
  },
  {
    id: 'std-43',
    name: 'Varun Grover',
    initials: 'VG',
    avatarBg: 'bg-emerald-100 text-emerald-600',
    rollNumber: '23IT067',
    course: 'B.Sc IT',
    semester: '5th Semester',
    status: 'Active',
    joinedOn: '18 May 2026',
  },
  {
    id: 'std-44',
    name: 'Tanya Bhatia',
    initials: 'TB',
    avatarBg: 'bg-pink-100 text-pink-600',
    rollNumber: '23IT073',
    course: 'B.Sc IT',
    semester: '5th Semester',
    status: 'Active',
    joinedOn: '15 May 2026',
  },
  {
    id: 'std-45',
    name: 'Raghav Duggal',
    initials: 'RD',
    avatarBg: 'bg-amber-100 text-amber-700',
    rollNumber: '23BVOC058',
    course: 'B.Voc (Web Dev)',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '12 May 2026',
  },
  {
    id: 'std-46',
    name: 'Neha Singla',
    initials: 'NS',
    avatarBg: 'bg-sky-100 text-sky-600',
    rollNumber: '23BVOC064',
    course: 'B.Voc (Web Dev)',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '10 May 2026',
  },
  {
    id: 'std-47',
    name: 'Jatin Sethi',
    initials: 'JS',
    avatarBg: 'bg-indigo-100 text-indigo-600',
    rollNumber: '23CS056',
    course: 'B.Sc Computer Science',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '08 May 2026',
  },
  {
    id: 'std-48',
    name: 'Preeti Dhiman',
    initials: 'PD',
    avatarBg: 'bg-teal-100 text-teal-600',
    rollNumber: '23CS063',
    course: 'B.Sc Computer Science',
    semester: '3rd Semester',
    status: 'Active',
    joinedOn: '05 May 2026',
  },
  {
    id: 'std-49',
    name: 'Armaan Malik',
    initials: 'AM',
    avatarBg: 'bg-rose-100 text-rose-600',
    rollNumber: '23AIML059',
    course: 'B.Sc AI & ML',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '02 May 2026',
  },
  {
    id: 'std-50',
    name: 'Diya Narang',
    initials: 'DN',
    avatarBg: 'bg-yellow-100 text-yellow-700',
    rollNumber: '23AIML066',
    course: 'B.Sc AI & ML',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '29 Apr 2026',
  },
];

const DEMO_IMPORT_STUDENTS = [
  { name: 'Kavita Chawla', rollNumber: '23BCA081', course: 'BCA', semester: '3rd Semester', status: 'Active', joinedOn: '17 Oct 2026' },
  { name: 'Rohan Deshmukh', rollNumber: '23IT088', course: 'B.Sc IT', semester: '5th Semester', status: 'Active', joinedOn: '17 Oct 2026' },
  { name: 'Meera Nambiar', rollNumber: '23BVOC072', course: 'B.Voc (Web Dev)', semester: '1st Semester', status: 'Active', joinedOn: '17 Oct 2026' },
  { name: 'Kartik Varma', rollNumber: '23CS079', course: 'B.Sc Computer Science', semester: '3rd Semester', status: 'Active', joinedOn: '17 Oct 2026' },
  { name: 'Shreya Bhat', rollNumber: '23AIML084', course: 'B.Sc AI & ML', semester: '1st Semester', status: 'Active', joinedOn: '17 Oct 2026' },
  { name: 'Gautam Pillai', rollNumber: '23BCA092', course: 'BCA', semester: '3rd Semester', status: 'Active', joinedOn: '17 Oct 2026' },
  { name: 'Ankita Sen', rollNumber: '23IT095', course: 'B.Sc IT', semester: '5th Semester', status: 'Active', joinedOn: '17 Oct 2026' },
  { name: 'Pranav Joshi', rollNumber: '23BVOC088', course: 'B.Voc (Web Dev)', semester: '1st Semester', status: 'Active', joinedOn: '17 Oct 2026' },
  { name: 'Lavanya Rao', rollNumber: '23CS091', course: 'B.Sc Computer Science', semester: '3rd Semester', status: 'Active', joinedOn: '17 Oct 2026' },
  { name: 'Devansh Kulkarni', rollNumber: '23AIML099', course: 'B.Sc AI & ML', semester: '1st Semester', status: 'Active', joinedOn: '17 Oct 2026' },
];

const INITIAL_TEACHERS = [
  {
    id: 'tch-1',
    name: 'Dr. Rajesh Sharma',
    initials: 'RS',
    avatarBg: 'bg-blue-100 text-blue-600',
    empId: 'FAC202101',
    department: 'B.Sc AI & ML',
    designation: 'Professor & HOD',
    subjects: 'Machine Learning, AI Principles',
    email: 'rajesh.sharma@college.edu',
    status: 'Active',
    joinedOn: '15 Jul 2021',
  },
  {
    id: 'tch-2',
    name: 'Prof. Meenakshi Sundaram',
    initials: 'MS',
    avatarBg: 'bg-purple-100 text-purple-600',
    empId: 'FAC202108',
    department: 'B.Sc Computer Science',
    designation: 'Associate Professor',
    subjects: 'Data Structures, Algorithms',
    email: 'm.sundaram@college.edu',
    status: 'Active',
    joinedOn: '01 Aug 2021',
  },
  {
    id: 'tch-3',
    name: 'Dr. Ananya Mukherjee',
    initials: 'AM',
    avatarBg: 'bg-emerald-100 text-emerald-600',
    empId: 'FAC202204',
    department: 'BCA',
    designation: 'Assistant Professor',
    subjects: 'Web Development, React.js',
    email: 'ananya.m@college.edu',
    status: 'Active',
    joinedOn: '10 Jan 2022',
  },
  {
    id: 'tch-4',
    name: 'Prof. Vikram Batra',
    initials: 'VB',
    avatarBg: 'bg-pink-100 text-pink-600',
    empId: 'FAC202212',
    department: 'B.Sc IT',
    designation: 'Assistant Professor',
    subjects: 'Computer Networks, Cloud Computing',
    email: 'vikram.batra@college.edu',
    status: 'Active',
    joinedOn: '15 Mar 2022',
  },
  {
    id: 'tch-5',
    name: 'Dr. Kavita Iyer',
    initials: 'KI',
    avatarBg: 'bg-amber-100 text-amber-700',
    empId: 'FAC202302',
    department: 'B.Sc AI & ML',
    designation: 'Associate Professor',
    subjects: 'Python Programming, Deep Learning',
    email: 'kavita.iyer@college.edu',
    status: 'Active',
    joinedOn: '20 Jul 2023',
  },
  {
    id: 'tch-6',
    name: 'Prof. Harish Chander',
    initials: 'HC',
    avatarBg: 'bg-sky-100 text-sky-600',
    empId: 'FAC202309',
    department: 'B.Voc (Web Dev)',
    designation: 'Assistant Professor',
    subjects: 'UI/UX Design, CSS Frameworks',
    email: 'harish.c@college.edu',
    status: 'Active',
    joinedOn: '05 Aug 2023',
  },
  {
    id: 'tch-7',
    name: 'Dr. Sunita Rao',
    initials: 'SR',
    avatarBg: 'bg-indigo-100 text-indigo-600',
    empId: 'FAC202401',
    department: 'B.Sc Computer Science',
    designation: 'Assistant Professor',
    subjects: 'Database Systems, SQL',
    email: 'sunita.rao@college.edu',
    status: 'Active',
    joinedOn: '12 Jan 2024',
  },
  {
    id: 'tch-8',
    name: 'Prof. Amanpreet Singh',
    initials: 'AS',
    avatarBg: 'bg-teal-100 text-teal-600',
    empId: 'FAC202406',
    department: 'BCA',
    designation: 'Assistant Professor',
    subjects: 'Operating Systems, C++',
    email: 'amanpreet.s@college.edu',
    status: 'Active',
    joinedOn: '18 Jul 2024',
  },
  {
    id: 'tch-9',
    name: 'Dr. Pooja Bhatnagar',
    initials: 'PB',
    avatarBg: 'bg-rose-100 text-rose-600',
    empId: 'FAC202411',
    department: 'B.Sc IT',
    designation: 'Associate Professor',
    subjects: 'Cyber Security, Cryptography',
    email: 'pooja.b@college.edu',
    status: 'Active',
    joinedOn: '01 Aug 2024',
  },
  {
    id: 'tch-10',
    name: 'Prof. Gurinder Dhillon',
    initials: 'GD',
    avatarBg: 'bg-yellow-100 text-yellow-700',
    empId: 'FAC202501',
    department: 'B.Sc AI & ML',
    designation: 'Assistant Professor',
    subjects: 'Probability & Statistics, Math',
    email: 'gurinder.d@college.edu',
    status: 'Active',
    joinedOn: '10 Jan 2025',
  },
  {
    id: 'tch-11',
    name: 'Dr. Nitin Kapoor',
    initials: 'NK',
    avatarBg: 'bg-blue-100 text-blue-600',
    empId: 'FAC202505',
    department: 'B.Voc (Web Dev)',
    designation: 'Assistant Professor',
    subjects: 'Backend Engineering, Node.js',
    email: 'nitin.k@college.edu',
    status: 'Active',
    joinedOn: '15 Jul 2025',
  },
  {
    id: 'tch-12',
    name: 'Prof. Shalini Varma',
    initials: 'SV',
    avatarBg: 'bg-purple-100 text-purple-600',
    empId: 'FAC202509',
    department: 'BCA',
    designation: 'Assistant Professor',
    subjects: 'Software Engineering, Agile',
    email: 'shalini.v@college.edu',
    status: 'Active',
    joinedOn: '01 Aug 2025',
  },
  {
    id: 'tch-13',
    name: 'Dr. Deepak Joshi',
    initials: 'DJ',
    avatarBg: 'bg-emerald-100 text-emerald-600',
    empId: 'FAC202601',
    department: 'B.Sc Computer Science',
    designation: 'Assistant Professor',
    subjects: 'Discrete Mathematics',
    email: 'deepak.j@college.edu',
    status: 'Active',
    joinedOn: '10 Jan 2026',
  },
  {
    id: 'tch-14',
    name: 'Prof. Reema Sachdeva',
    initials: 'RS',
    avatarBg: 'bg-pink-100 text-pink-600',
    empId: 'FAC202602',
    department: 'B.Sc IT',
    designation: 'Assistant Professor',
    subjects: 'Mobile App Development, Flutter',
    email: 'reema.s@college.edu',
    status: 'Active',
    joinedOn: '15 Jan 2026',
  },
  {
    id: 'tch-15',
    name: 'Dr. Arvind Nanda',
    initials: 'AN',
    avatarBg: 'bg-amber-100 text-amber-700',
    empId: 'FAC202603',
    department: 'B.Sc AI & ML',
    designation: 'Assistant Professor',
    subjects: 'Natural Language Processing',
    email: 'arvind.n@college.edu',
    status: 'Active',
    joinedOn: '01 Feb 2026',
  },
  {
    id: 'tch-16',
    name: 'Prof. Simran Walia',
    initials: 'SW',
    avatarBg: 'bg-sky-100 text-sky-600',
    empId: 'FAC202604',
    department: 'B.Voc (Web Dev)',
    designation: 'Assistant Professor',
    subjects: 'Fullstack Web Dev, MERN',
    email: 'simran.w@college.edu',
    status: 'Active',
    joinedOn: '15 Feb 2026',
  },
  {
    id: 'tch-17',
    name: 'Dr. Tarun Khurana',
    initials: 'TK',
    avatarBg: 'bg-indigo-100 text-indigo-600',
    empId: 'FAC202605',
    department: 'B.Sc Computer Science',
    designation: 'Assistant Professor',
    subjects: 'Compiler Design, Theory of Computation',
    email: 'tarun.k@college.edu',
    status: 'Active',
    joinedOn: '01 Mar 2026',
  },
  {
    id: 'tch-18',
    name: 'Prof. Monica Bedi',
    initials: 'MB',
    avatarBg: 'bg-teal-100 text-teal-600',
    empId: 'FAC202606',
    department: 'BCA',
    designation: 'Assistant Professor',
    subjects: 'Computer Graphics, Multimedia',
    email: 'monica.b@college.edu',
    status: 'Inactive',
    joinedOn: '15 Mar 2026',
  },
];

const DEMO_IMPORT_TEACHERS = [
  { name: 'Dr. Sandeep Aggarwal', empId: 'FAC202611', department: 'B.Sc AI & ML', designation: 'Associate Professor', subjects: 'Robotics & Computer Vision', email: 'sandeep.a@college.edu', status: 'Active' },
  { name: 'Prof. Divya Narula', empId: 'FAC202612', department: 'BCA', designation: 'Assistant Professor', subjects: 'Java Programming', email: 'divya.n@college.edu', status: 'Active' },
  { name: 'Dr. Manish Khera', empId: 'FAC202613', department: 'B.Sc IT', designation: 'Associate Professor', subjects: 'Data Warehousing & Mining', email: 'manish.k@college.edu', status: 'Active' },
  { name: 'Prof. Ritu Oberoi', empId: 'FAC202614', department: 'B.Voc (Web Dev)', designation: 'Assistant Professor', subjects: 'Digital Marketing & SEO', email: 'ritu.o@college.edu', status: 'Active' },
  { name: 'Dr. Alok Verma', empId: 'FAC202615', department: 'B.Sc Computer Science', designation: 'Professor', subjects: 'Parallel Computing', email: 'alok.v@college.edu', status: 'Active' },
  { name: 'Prof. Shilpa Tandon', empId: 'FAC202616', department: 'B.Sc AI & ML', designation: 'Assistant Professor', subjects: 'Reinforcement Learning', email: 'shilpa.t@college.edu', status: 'Active' },
  { name: 'Dr. Puneet Chawla', empId: 'FAC202617', department: 'BCA', designation: 'Assistant Professor', subjects: 'Cloud Security', email: 'puneet.c@college.edu', status: 'Active' },
  { name: 'Prof. Neha Juneja', empId: 'FAC202618', department: 'B.Sc IT', designation: 'Assistant Professor', subjects: 'Internet of Things (IoT)', email: 'neha.j@college.edu', status: 'Active' },
  { name: 'Dr. Amit Bansal', empId: 'FAC202619', department: 'B.Voc (Web Dev)', designation: 'Associate Professor', subjects: 'DevOps & CI/CD', email: 'amit.b@college.edu', status: 'Active' },
  { name: 'Prof. Jyoti Sharma', empId: 'FAC202620', department: 'B.Sc Computer Science', designation: 'Assistant Professor', subjects: 'Big Data Analytics', email: 'jyoti.s@college.edu', status: 'Active' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const adminUser = getAdminUser();

  // Navigation State
  const [activeNav, setActiveNav] = useState('dashboard');
  const [activeTableTab, setActiveTableTab] = useState('syllabus');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [selectedSemesterFilter, setSelectedSemesterFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedBatch, setSelectedBatch] = useState('B.Sc. AI & ML');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals State
  const [modalType, setModalType] = useState(null); // 'add-syllabus' | 'add-student' | 'add-teacher' | 'add-department' | 'upload-timetable' | null

  // Interactive Form States
  const [newSubject, setNewSubject] = useState({
    subject: '',
    department: 'B.Sc. AI & ML',
    semester: '1',
    units: 4,
    status: 'Published',
  });

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login', { replace: true });
  };

  // ========================================================
  // TIMETABLE UPLOAD STATE & FUNCTIONALITY
  // ========================================================
  const initialCustomTimetable = useMemo(() => getCustomTimetable(), []);
  const [isTimetableUploaded, setIsTimetableUploaded] = useState(() => !!initialCustomTimetable);
  const [uploadedTimetableMeta, setUploadedTimetableMeta] = useState(() => initialCustomTimetable || null);
  const [timetableBatch, setTimetableBatch] = useState('B.Sc. AI & ML');
  const [timetableSemester, setTimetableSemester] = useState('1st Semester');
  const [timetableAcademicYear, setTimetableAcademicYear] = useState('2026 – 27');
  const [timetablePreviewSlots, setTimetablePreviewSlots] = useState([]);
  const [timetableActiveDayFilter, setTimetableActiveDayFilter] = useState('All');
  const [timetableFileName, setTimetableFileName] = useState('');
  const [timetableError, setTimetableError] = useState(null);
  const [timetableSuccessNotification, setTimetableSuccessNotification] = useState(null);
  const [isTimetableDragOver, setIsTimetableDragOver] = useState(false);
  const [isAddSlotExpanded, setIsAddSlotExpanded] = useState(false);
  const [newSlotForm, setNewSlotForm] = useState({
    day: 'Mon',
    startTime: '09:00 AM',
    endTime: '09:55 AM',
    subject: '',
    room: 'Room 101',
    classType: 'Theory',
  });

  const flattenScheduleToSlots = (scheduleObj, batchGrade = 'B.Sc. AI & ML') => {
    if (!scheduleObj) return [];
    const result = [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach((dayKey) => {
      const daySlots = scheduleObj[dayKey] || [];
      daySlots.forEach((slot, idx) => {
        result.push({
          id: slot.id || `slot-${dayKey.toLowerCase()}-${Date.now()}-${idx}`,
          day: dayKey,
          startTime: slot.startTime,
          endTime: slot.endTime,
          subject: slot.subject,
          room: slot.room || 'Room 101',
          classType: slot.classType || 'Theory',
          grade: slot.grade || batchGrade,
        });
      });
    });
    return result;
  };

  const handleOpenUploadTimetableModal = () => {
    if (timetablePreviewSlots.length === 0) {
      const existing = getCustomTimetable();
      const slots = flattenScheduleToSlots(existing?.schedule || FALLBACK_SCHEDULE, timetableBatch);
      setTimetablePreviewSlots(slots);
      setTimetableFileName(existing ? 'active_college_timetable.xlsx' : 'demo_weekly_schedule.xlsx');
    }
    setTimetableError(null);
    setModalType('upload-timetable');
  };

  const handleDownloadTimetableExcelTemplate = () => {
    const templateData = [
      { Day: 'Mon', 'Start Time': '09:00 AM', 'End Time': '09:55 AM', Subject: 'Python Programming', Room: 'Room 101', Type: 'Theory' },
      { Day: 'Mon', 'Start Time': '10:00 AM', 'End Time': '10:55 AM', Subject: 'English Communication', Room: 'Room 204', Type: 'Theory' },
      { Day: 'Mon', 'Start Time': '11:00 AM', 'End Time': '11:55 AM', Subject: 'Mathematics', Room: 'Room 108', Type: 'Theory' },
      { Day: 'Mon', 'Start Time': '12:00 PM', 'End Time': '12:55 PM', Subject: 'Computer Fundamentals', Room: 'Room 108', Type: 'Theory' },
      { Day: 'Mon', 'Start Time': '02:00 PM', 'End Time': '03:30 PM', Subject: 'Python Programming Lab', Room: 'Lab 2', Type: 'Lab' },
      { Day: 'Tue', 'Start Time': '09:00 AM', 'End Time': '09:55 AM', Subject: 'AI Principles & Ethics', Room: 'Room 102', Type: 'Theory' },
      { Day: 'Tue', 'Start Time': '10:00 AM', 'End Time': '10:55 AM', Subject: 'Linear Algebra', Room: 'Room 108', Type: 'Theory' },
      { Day: 'Tue', 'Start Time': '11:00 AM', 'End Time': '11:55 AM', Subject: 'Data Structures', Room: 'Room 101', Type: 'Theory' },
      { Day: 'Wed', 'Start Time': '09:00 AM', 'End Time': '09:55 AM', Subject: 'Computer Networks', Room: 'Room 205', Type: 'Theory' },
      { Day: 'Wed', 'Start Time': '10:00 AM', 'End Time': '10:55 AM', Subject: 'Python Programming', Room: 'Room 101', Type: 'Theory' },
      { Day: 'Thu', 'Start Time': '09:00 AM', 'End Time': '09:55 AM', Subject: 'Mathematics', Room: 'Room 108', Type: 'Theory' },
      { Day: 'Fri', 'Start Time': '09:00 AM', 'End Time': '09:55 AM', Subject: 'Environmental Science', Room: 'Room 105', Type: 'Theory' },
      { Day: 'Sat', 'Start Time': '09:00 AM', 'End Time': '10:30 AM', Subject: 'Seminar & Workshop', Room: 'Auditorium', Type: 'Theory' },
    ];
    const worksheet = XLSX.utils.json_to_sheet(templateData);
    worksheet['!cols'] = [
      { wch: 10 },
      { wch: 16 },
      { wch: 16 },
      { wch: 28 },
      { wch: 16 },
      { wch: 14 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Timetable Template');
    XLSX.writeFile(workbook, 'classhere_timetable_template.xlsx');
  };

  const handleDownloadTimetableCSVTemplate = () => {
    const csvContent =
      'Day,Start Time,End Time,Subject,Room,Type\n' +
      'Mon,09:00 AM,09:55 AM,Python Programming,Room 101,Theory\n' +
      'Mon,10:00 AM,10:55 AM,English Communication,Room 204,Theory\n' +
      'Mon,11:00 AM,11:55 AM,Mathematics,Room 108,Theory\n' +
      'Mon,12:00 PM,12:55 PM,Computer Fundamentals,Room 108,Theory\n' +
      'Mon,02:00 PM,03:30 PM,Python Programming Lab,Lab 2,Lab\n' +
      'Tue,09:00 AM,09:55 AM,AI Principles & Ethics,Room 102,Theory\n' +
      'Tue,10:00 AM,10:55 AM,Linear Algebra,Room 108,Theory\n' +
      'Tue,11:00 AM,11:55 AM,Data Structures,Room 101,Theory\n' +
      'Wed,09:00 AM,09:55 AM,Computer Networks,Room 205,Theory\n' +
      'Wed,10:00 AM,10:55 AM,Python Programming,Room 101,Theory\n' +
      'Thu,09:00 AM,09:55 AM,Mathematics,Room 108,Theory\n' +
      'Fri,09:00 AM,09:55 AM,Environmental Science,Room 105,Theory\n' +
      'Sat,09:00 AM,10:30 AM,Seminar & Workshop,Auditorium,Theory\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'classhere_timetable_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const processTimetableFile = (file) => {
    if (!file) return;

    const fileName = file.name;
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    setTimetableFileName(fileName);
    setTimetableError(null);

    const parseRows = (rows) => {
      if (!rows || rows.length < 2) {
        setTimetableError('The timetable file appears to be empty or has no schedule rows.');
        return;
      }

      let headerIdx = 0;
      for (let r = 0; r < Math.min(5, rows.length); r++) {
        const rowStr = rows[r].map((c) => String(c || '').toLowerCase()).join(' ');
        if (rowStr.includes('day') || rowStr.includes('subject') || rowStr.includes('time')) {
          headerIdx = r;
          break;
        }
      }

      const headerRow = rows[headerIdx].map((h) => String(h || '').trim().toLowerCase());
      const dayIdx = headerRow.findIndex((h) => h.includes('day') || h.includes('weekday'));
      const startIdx = headerRow.findIndex((h) => h.includes('start') || h.includes('from') || h === 'time');
      const endIdx = headerRow.findIndex((h) => h.includes('end') || h.includes('to'));
      const subjectIdx = headerRow.findIndex((h) => h.includes('subject') || h.includes('course') || h.includes('title') || h.includes('class'));
      const roomIdx = headerRow.findIndex((h) => h.includes('room') || h.includes('hall') || h.includes('loc'));
      const typeIdx = headerRow.findIndex((h) => h.includes('type') || h.includes('mode'));

      const normalizeDay = (val) => {
        const s = String(val || '').trim().toLowerCase();
        if (s.startsWith('mon')) return 'Mon';
        if (s.startsWith('tue')) return 'Tue';
        if (s.startsWith('wed')) return 'Wed';
        if (s.startsWith('thu')) return 'Thu';
        if (s.startsWith('fri')) return 'Fri';
        if (s.startsWith('sat')) return 'Sat';
        return 'Mon';
      };

      const parsed = [];
      for (let i = headerIdx + 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0) continue;

        const subject = String(subjectIdx !== -1 ? row[subjectIdx] : row[3] || row[0] || '').trim();
        if (!subject) continue;

        const day = normalizeDay(dayIdx !== -1 ? row[dayIdx] : row[0]);
        const startTime = String(startIdx !== -1 ? row[startIdx] : row[1] || '09:00 AM').trim();
        const endTime = String(endIdx !== -1 ? row[endIdx] : row[2] || '09:55 AM').trim();
        const room = String(roomIdx !== -1 ? row[roomIdx] : row[4] || 'Room 101').trim();
        const rawType = String(typeIdx !== -1 ? row[typeIdx] : row[5] || 'Theory').trim();
        const classType = rawType.toLowerCase().includes('lab') ? 'Lab' : rawType.toLowerCase().includes('tut') ? 'Tutorial' : 'Theory';

        parsed.push({
          id: `slot-${day.toLowerCase()}-${Date.now()}-${i}`,
          day,
          startTime,
          endTime,
          subject,
          room: room || 'Room 101',
          classType,
          grade: `${timetableBatch} • ${timetableSemester}`,
        });
      }

      if (parsed.length > 0) {
        setTimetablePreviewSlots(parsed);
      } else {
        setTimetableError('Could not find valid timetable class slots in the file.');
      }
    };

    if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const buffer = event.target?.result;
          const workbook = XLSX.read(buffer, { type: 'array' });
          const firstSheet = workbook.SheetNames[0];
          if (!firstSheet) {
            setTimetableError('The Excel file has no worksheets.');
            return;
          }
          const worksheet = workbook.Sheets[firstSheet];
          const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
          parseRows(rawRows);
        } catch (err) {
          console.error('Error parsing timetable Excel:', err);
          setTimetableError('Failed to read Excel timetable. Please verify file format.');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = event.target?.result;
          if (typeof text === 'string') {
            const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
            const rawRows = lines.map((l) => l.split(',').map((c) => c.replace(/^["']|["']$/g, '').trim()));
            parseRows(rawRows);
          }
        } catch (err) {
          console.error('Error parsing timetable CSV:', err);
          setTimetableError('Failed to parse CSV timetable.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleTimetableFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) processTimetableFile(file);
    e.target.value = '';
  };

  const handleTimetableFileDrop = (e) => {
    e.preventDefault();
    setIsTimetableDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) processTimetableFile(file);
  };

  const handleLoadDemoSchedule = () => {
    const slots = flattenScheduleToSlots(FALLBACK_SCHEDULE, timetableBatch);
    setTimetablePreviewSlots(slots);
    setTimetableFileName('demo_weekly_schedule.xlsx');
    setTimetableError(null);
  };

  const handleDeleteTimetableSlot = (slotId) => {
    setTimetablePreviewSlots((prev) => prev.filter((s) => s.id !== slotId));
  };

  const handleAddManualSlot = (e) => {
    e.preventDefault();
    if (!newSlotForm.subject.trim()) return;

    const newSlot = {
      id: `slot-${newSlotForm.day.toLowerCase()}-${Date.now()}`,
      day: newSlotForm.day,
      startTime: newSlotForm.startTime,
      endTime: newSlotForm.endTime,
      subject: newSlotForm.subject.trim(),
      room: newSlotForm.room.trim() || 'Room 101',
      classType: newSlotForm.classType,
      grade: `${timetableBatch} • ${timetableSemester}`,
    };

    setTimetablePreviewSlots((prev) => [...prev, newSlot]);
    setNewSlotForm({
      day: newSlotForm.day,
      startTime: '09:00 AM',
      endTime: '09:55 AM',
      subject: '',
      room: 'Room 101',
      classType: 'Theory',
    });
    setIsAddSlotExpanded(false);
  };

  const handleConfirmTimetableUpload = () => {
    if (timetablePreviewSlots.length === 0) return;

    const totalCount = timetablePreviewSlots.length;
    const scheduleByDay = { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [] };
    timetablePreviewSlots.forEach((slot) => {
      const dayKey = slot.day || 'Mon';
      if (!scheduleByDay[dayKey]) scheduleByDay[dayKey] = [];
      scheduleByDay[dayKey].push(slot);
    });

    saveCustomTimetable(scheduleByDay, {
      batch: timetableBatch,
      semester: timetableSemester,
      academicYear: timetableAcademicYear,
      totalSlots: totalCount,
    });

    setIsTimetableUploaded(true);
    setUploadedTimetableMeta({
      batchMeta: { batch: timetableBatch, semester: timetableSemester },
      totalSlots: totalCount,
    });
    setModalType(null);
    setTimetableSuccessNotification(
      `Timetable for ${timetableBatch} (${timetableSemester}) published successfully! (${totalCount} classes active across Mon–Sat)`
    );
  };

  const handleResetTimetableToDefault = () => {
    resetCustomTimetable();
    setIsTimetableUploaded(false);
    setUploadedTimetableMeta(null);
    const defaultSlots = flattenScheduleToSlots(FALLBACK_SCHEDULE, timetableBatch);
    setTimetablePreviewSlots(defaultSlots);
    setTimetableFileName('');
    setTimetableSuccessNotification('Timetable reset to college default schedule.');
  };

  // ========================================================
  // STUDENTS TAB STATE & FUNCTIONALITY
  // ========================================================
  const [studentsList, setStudentsList] = useState(INITIAL_STUDENTS);
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [studentCourseFilter, setStudentCourseFilter] = useState('All');
  const [studentSemesterFilter, setStudentSemesterFilter] = useState('All');
  const [studentStatusFilter, setStudentStatusFilter] = useState('All');
  const [studentCurrentPage, setStudentCurrentPage] = useState(1);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [activeRowMenuId, setActiveRowMenuId] = useState(null);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importPreviewList, setImportPreviewList] = useState([]);
  const [importFileName, setImportFileName] = useState('');
  const [importSuccessNotification, setImportSuccessNotification] = useState(null);
  const [importError, setImportError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const importFileInputRef = useRef(null);

  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    rollNumber: '',
    course: 'BCA',
    semester: '1st Semester',
    status: 'Active',
    joinedOn: '17 Oct 2026',
  });

  // Close floating menus on outside click
  useEffect(() => {
    const handleDocClick = () => {
      setActiveRowMenuId(null);
      setIsMoreOptionsOpen(false);
      setActiveTeacherRowMenuId(null);
      setIsTeacherMoreOptionsOpen(false);
    };
    window.addEventListener('click', handleDocClick);
    return () => window.removeEventListener('click', handleDocClick);
  }, []);

  // Filtered Students list
  const filteredStudents = useMemo(() => {
    return studentsList.filter((s) => {
      const q = studentSearchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.rollNumber.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q) ||
        s.semester.toLowerCase().includes(q);

      const matchesCourse =
        studentCourseFilter === 'All' || s.course === studentCourseFilter;
      const matchesSem =
        studentSemesterFilter === 'All' || s.semester === studentSemesterFilter;
      const matchesStatus =
        studentStatusFilter === 'All' || s.status === studentStatusFilter;

      return matchesSearch && matchesCourse && matchesSem && matchesStatus;
    });
  }, [studentsList, studentSearchQuery, studentCourseFilter, studentSemesterFilter, studentStatusFilter]);

  const STUDENT_PAGE_SIZE = 10;
  const totalFilteredStudents = filteredStudents.length;
  const totalStudentPages = Math.max(1, Math.ceil(totalFilteredStudents / STUDENT_PAGE_SIZE));
  const paginatedStudents = useMemo(() => {
    const start = (studentCurrentPage - 1) * STUDENT_PAGE_SIZE;
    return filteredStudents.slice(start, start + STUDENT_PAGE_SIZE);
  }, [filteredStudents, studentCurrentPage]);

  // Dynamic counts for Students tab metrics
  const totalStudentsMetric = 487 + (studentsList.length - 50);
  const activeStudentsCount = studentsList.filter((s) => s.status === 'Active').length;
  const activeStudentsMetric = 452 + (activeStudentsCount - 50);

  // Row and bulk selection handlers
  const isAllPageSelected =
    paginatedStudents.length > 0 &&
    paginatedStudents.every((s) => selectedStudentIds.includes(s.id));

  const toggleSelectAllPage = () => {
    if (isAllPageSelected) {
      setSelectedStudentIds((prev) =>
        prev.filter((id) => !paginatedStudents.some((s) => s.id === id))
      );
    } else {
      setSelectedStudentIds((prev) => {
        const newIds = new Set(prev);
        paginatedStudents.forEach((s) => newIds.add(s.id));
        return Array.from(newIds);
      });
    }
  };

  const toggleSelectStudent = (id) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleStudentStatus = (id) => {
    setStudentsList((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' }
          : s
      )
    );
  };

  const deleteStudent = (id) => {
    setStudentsList((prev) => prev.filter((s) => s.id !== id));
    setSelectedStudentIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudentForm.name.trim() || !newStudentForm.rollNumber.trim()) return;

    const initials = getInitials(newStudentForm.name);
    const avatarBg = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

    const newStudent = {
      id: `std-${Date.now()}`,
      name: newStudentForm.name.trim(),
      initials,
      avatarBg,
      rollNumber: newStudentForm.rollNumber.trim().toUpperCase(),
      course: newStudentForm.course,
      semester: newStudentForm.semester,
      status: newStudentForm.status,
      joinedOn: newStudentForm.joinedOn || '17 Oct 2026',
    };

    setStudentsList((prev) => [newStudent, ...prev]);
    setIsAddStudentModalOpen(false);
    setStudentCurrentPage(1);
    setNewStudentForm({
      name: '',
      rollNumber: '',
      course: 'BCA',
      semester: '1st Semester',
      status: 'Active',
      joinedOn: '17 Oct 2026',
    });
  };

  const handleExportCSV = () => {
    const headers = ['Name,Roll Number,Course,Semester,Status,Joined On'];
    const rows = filteredStudents.map(
      (s) => `"${s.name}","${s.rollNumber}","${s.course}","${s.semester}","${s.status}","${s.joinedOn}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `students_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsMoreOptionsOpen(false);
  };

  const handleExportExcel = () => {
    const exportData = filteredStudents.map((s) => ({
      'Name': s.name,
      'Roll Number': s.rollNumber,
      'Course': s.course,
      'Semester': s.semester,
      'Status': s.status,
      'Joined On': s.joinedOn,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    worksheet['!cols'] = [
      { wch: 22 },
      { wch: 16 },
      { wch: 24 },
      { wch: 16 },
      { wch: 12 },
      { wch: 16 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    XLSX.writeFile(workbook, `students_export_${Date.now()}.xlsx`);
    setIsMoreOptionsOpen(false);
  };

  const handleOpenImportModal = () => {
    setImportPreviewList(DEMO_IMPORT_STUDENTS);
    setImportFileName('demo_student_batch.xlsx');
    setImportError(null);
    setIsImportModalOpen(true);
  };

  const handleDownloadSampleCSV = () => {
    const csvContent =
      'Name,Roll Number,Course,Semester,Status\n' +
      'Aman Kumar,23BCA001,BCA,3rd Semester,Active\n' +
      'Simran Preet,23BCA002,BCA,3rd Semester,Active\n' +
      'Rohit Sharma,23IT015,B.Sc IT,5th Semester,Active\n' +
      'Arjun Rana,23BVOC007,B.Voc (Web Dev),1st Semester,Active\n' +
      'Vansh K.,23AIML004,B.Sc AI & ML,1st Semester,Active\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'classhere_students_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSampleExcel = () => {
    const sampleData = [
      { 'Name': 'Aman Kumar', 'Roll Number': '23BCA001', 'Course': 'BCA', 'Semester': '3rd Semester', 'Status': 'Active' },
      { 'Name': 'Simran Preet', 'Roll Number': '23BCA002', 'Course': 'BCA', 'Semester': '3rd Semester', 'Status': 'Active' },
      { 'Name': 'Rohit Sharma', 'Roll Number': '23IT015', 'Course': 'B.Sc IT', 'Semester': '5th Semester', 'Status': 'Active' },
      { 'Name': 'Arjun Rana', 'Roll Number': '23BVOC007', 'Course': 'B.Voc (Web Dev)', 'Semester': '1st Semester', 'Status': 'Active' },
      { 'Name': 'Vansh K.', 'Roll Number': '23AIML004', 'Course': 'B.Sc AI & ML', 'Semester': '1st Semester', 'Status': 'Active' },
      { 'Name': 'Jasleen Tiwari', 'Roll Number': '23AIML018', 'Course': 'B.Sc AI & ML', 'Semester': '1st Semester', 'Status': 'Active' },
      { 'Name': 'Priya Garg', 'Roll Number': '23CS012', 'Course': 'B.Sc Computer Science', 'Semester': '3rd Semester', 'Status': 'Active' },
      { 'Name': 'Nikhil Handa', 'Roll Number': '23CS027', 'Course': 'B.Sc Computer Science', 'Semester': '3rd Semester', 'Status': 'Active' },
    ];
    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    worksheet['!cols'] = [
      { wch: 22 },
      { wch: 16 },
      { wch: 24 },
      { wch: 16 },
      { wch: 12 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students Template');
    XLSX.writeFile(workbook, 'classhere_students_template.xlsx');
  };

  const processStudentFile = (file) => {
    if (!file) return;

    const fileName = file.name;
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    setImportFileName(fileName);
    setImportError(null);

    // 1. Excel files (.xlsx, .xls)
    if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const buffer = event.target?.result;
          const workbook = XLSX.read(buffer, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          if (!firstSheetName) {
            setImportError('The Excel file does not contain any sheets.');
            return;
          }
          const worksheet = workbook.Sheets[firstSheetName];
          const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

          if (!rawRows || rawRows.length < 2) {
            setImportError('The Excel sheet has no data rows below the header.');
            return;
          }

          // Locate header row (first non-empty row)
          let headerIdx = 0;
          for (let r = 0; r < Math.min(5, rawRows.length); r++) {
            const rowStr = rawRows[r].map((c) => String(c || '').toLowerCase()).join(' ');
            if (rowStr.includes('name') || rowStr.includes('roll')) {
              headerIdx = r;
              break;
            }
          }

          const headerRow = rawRows[headerIdx].map((h) => String(h || '').trim().toLowerCase());
          const nameIdx = headerRow.findIndex((h) => h.includes('name'));
          const rollIdx = headerRow.findIndex((h) => h.includes('roll') || h.includes('id') || h.includes('reg'));
          const courseIdx = headerRow.findIndex((h) => h.includes('course') || h.includes('dept') || h.includes('branch') || h.includes('prog'));
          const semIdx = headerRow.findIndex((h) => h.includes('sem'));
          const statusIdx = headerRow.findIndex((h) => h.includes('status'));

          const parsed = [];
          for (let i = headerIdx + 1; i < rawRows.length; i++) {
            const row = rawRows[i];
            if (!row || row.length === 0) continue;

            const name = String(nameIdx !== -1 ? row[nameIdx] : row[0] || '').trim();
            if (!name) continue;

            const rollNumber = String(
              rollIdx !== -1 ? row[rollIdx] : row[1] || `23IMP${String(i).padStart(3, '0')}`
            ).trim();
            const course = String(courseIdx !== -1 ? row[courseIdx] : row[2] || 'BCA').trim();
            const semester = String(semIdx !== -1 ? row[semIdx] : row[3] || '1st Semester').trim();
            const rawStatus = String(statusIdx !== -1 ? row[statusIdx] : row[4] || 'Active').trim();
            const status = rawStatus.toLowerCase().includes('inact') ? 'Inactive' : 'Active';

            parsed.push({
              name,
              rollNumber,
              course: course || 'BCA',
              semester: semester || '1st Semester',
              status,
              joinedOn: '17 Oct 2026',
            });
          }

          if (parsed.length > 0) {
            setImportPreviewList(parsed);
          } else {
            setImportError('No valid student rows found in the Excel file.');
          }
        } catch (err) {
          console.error('Excel parse error:', err);
          setImportError('Failed to parse Excel file. Please ensure it is a valid .xlsx or .xls file.');
        }
      };
      reader.readAsArrayBuffer(file);
      return;
    }

    // 2. CSV / Plain Text files (.csv, .txt)
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text === 'string') {
          const lines = text
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter((l) => l.length > 0);

          if (lines.length > 1) {
            const headerCols = lines[0]
              .split(',')
              .map((h) => h.replace(/^["']|["']$/g, '').trim().toLowerCase());

            const nameIdx = headerCols.findIndex((h) => h.includes('name'));
            const rollIdx = headerCols.findIndex((h) => h.includes('roll') || h.includes('id') || h.includes('reg'));
            const courseIdx = headerCols.findIndex((h) => h.includes('course') || h.includes('dept') || h.includes('branch'));
            const semIdx = headerCols.findIndex((h) => h.includes('sem'));
            const statusIdx = headerCols.findIndex((h) => h.includes('status'));

            const parsed = [];
            for (let i = 1; i < lines.length; i++) {
              const cols = lines[i]
                .split(',')
                .map((c) => c.replace(/^["']|["']$/g, '').trim());
              if (cols.length === 0 || !cols[0]) continue;

              const name = nameIdx !== -1 ? cols[nameIdx] : cols[0];
              if (!name) continue;

              const rollNumber =
                rollIdx !== -1
                  ? cols[rollIdx]
                  : cols[1] || `23IMP${String(i).padStart(3, '0')}`;
              const course = courseIdx !== -1 ? cols[courseIdx] : cols[2] || 'BCA';
              const semester =
                semIdx !== -1 ? cols[semIdx] : cols[3] || '1st Semester';
              const rawStatus = statusIdx !== -1 ? cols[statusIdx] : cols[4] || 'Active';
              const status = rawStatus.toLowerCase().includes('inact') ? 'Inactive' : 'Active';

              parsed.push({
                name,
                rollNumber,
                course,
                semester,
                status,
                joinedOn: '17 Oct 2026',
              });
            }

            if (parsed.length > 0) {
              setImportPreviewList(parsed);
            } else {
              setImportError('No valid student rows found in the CSV file.');
            }
          } else {
            setImportError('The CSV file does not contain enough rows.');
          }
        }
      } catch (err) {
        console.error('CSV parse error:', err);
        setImportError('Failed to parse CSV file.');
      }
    };
    reader.readAsText(file);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processStudentFile(file);
    }
    e.target.value = '';
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      processStudentFile(file);
    }
  };

  const handleConfirmImport = () => {
    if (importPreviewList.length === 0) return;

    const newRecords = importPreviewList.map((item, idx) => {
      const initials = getInitials(item.name);
      const avatarBg =
        AVATAR_COLORS[(idx + studentsList.length) % AVATAR_COLORS.length];
      return {
        id: `std-imp-${Date.now()}-${idx}`,
        name: item.name,
        initials,
        avatarBg,
        rollNumber: item.rollNumber,
        course: item.course,
        semester: item.semester,
        status: item.status || 'Active',
        joinedOn: item.joinedOn || '17 Oct 2026',
      };
    });

    setStudentsList((prev) => [...newRecords, ...prev]);
    setIsImportModalOpen(false);
    setImportPreviewList([]);
    setStudentCurrentPage(1);
    setImportSuccessNotification(
      `Successfully imported ${newRecords.length} students into the directory!`
    );
    setTimeout(() => {
      setImportSuccessNotification(null);
    }, 5000);
  };

  // ========================================================
  // TEACHERS TAB STATE & FUNCTIONALITY
  // ========================================================
  const [teachersList, setTeachersList] = useState(INITIAL_TEACHERS);
  const [teacherSearchQuery, setTeacherSearchQuery] = useState('');
  const [teacherDeptFilter, setTeacherDeptFilter] = useState('All');
  const [teacherDesignationFilter, setTeacherDesignationFilter] = useState('All');
  const [teacherStatusFilter, setTeacherStatusFilter] = useState('All');
  const [teacherCurrentPage, setTeacherCurrentPage] = useState(1);
  const [selectedTeacherIds, setSelectedTeacherIds] = useState([]);
  const [activeTeacherRowMenuId, setActiveTeacherRowMenuId] = useState(null);
  const [isTeacherMoreOptionsOpen, setIsTeacherMoreOptionsOpen] = useState(false);
  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
  const [isImportTeacherModalOpen, setIsImportTeacherModalOpen] = useState(false);
  const [importTeacherPreviewList, setImportTeacherPreviewList] = useState([]);
  const [importTeacherFileName, setImportTeacherFileName] = useState('');
  const [importTeacherError, setImportTeacherError] = useState(null);
  const [isTeacherDragOver, setIsTeacherDragOver] = useState(false);
  const [teacherSuccessNotification, setTeacherSuccessNotification] = useState(null);

  const [newTeacherForm, setNewTeacherForm] = useState({
    name: '',
    empId: '',
    department: 'B.Sc AI & ML',
    designation: 'Assistant Professor',
    subjects: '',
    email: '',
    status: 'Active',
    joinedOn: '17 Oct 2026',
  });

  const filteredTeachers = useMemo(() => {
    return teachersList.filter((t) => {
      const q = teacherSearchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.empId.toLowerCase().includes(q) ||
        t.department.toLowerCase().includes(q) ||
        t.designation.toLowerCase().includes(q) ||
        (t.subjects && t.subjects.toLowerCase().includes(q)) ||
        (t.email && t.email.toLowerCase().includes(q));

      const matchesDept = teacherDeptFilter === 'All' || t.department === teacherDeptFilter;
      const matchesDesignation =
        teacherDesignationFilter === 'All' || t.designation.includes(teacherDesignationFilter);
      const matchesStatus = teacherStatusFilter === 'All' || t.status === teacherStatusFilter;

      return matchesSearch && matchesDept && matchesDesignation && matchesStatus;
    });
  }, [teachersList, teacherSearchQuery, teacherDeptFilter, teacherDesignationFilter, teacherStatusFilter]);

  const TEACHER_PAGE_SIZE = 10;
  const totalFilteredTeachers = filteredTeachers.length;
  const totalTeacherPages = Math.max(1, Math.ceil(totalFilteredTeachers / TEACHER_PAGE_SIZE));
  const paginatedTeachers = useMemo(() => {
    const start = (teacherCurrentPage - 1) * TEACHER_PAGE_SIZE;
    return filteredTeachers.slice(start, start + TEACHER_PAGE_SIZE);
  }, [filteredTeachers, teacherCurrentPage]);

  // Bulk and row selection for teachers
  const isAllTeacherPageSelected =
    paginatedTeachers.length > 0 &&
    paginatedTeachers.every((t) => selectedTeacherIds.includes(t.id));

  const toggleSelectAllTeachers = () => {
    if (isAllTeacherPageSelected) {
      setSelectedTeacherIds((prev) =>
        prev.filter((id) => !paginatedTeachers.some((t) => t.id === id))
      );
    } else {
      setSelectedTeacherIds((prev) => {
        const newIds = new Set(prev);
        paginatedTeachers.forEach((t) => newIds.add(t.id));
        return Array.from(newIds);
      });
    }
  };

  const toggleSelectTeacher = (id) => {
    setSelectedTeacherIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleTeacherStatus = (id) => {
    setTeachersList((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'Active' ? 'Inactive' : 'Active' }
          : t
      )
    );
  };

  const deleteTeacher = (id) => {
    setTeachersList((prev) => prev.filter((t) => t.id !== id));
    setSelectedTeacherIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleExportTeachersExcel = () => {
    const exportData = filteredTeachers.map((t) => ({
      'Name': t.name,
      'Employee ID': t.empId,
      'Department': t.department,
      'Designation': t.designation,
      'Subjects': t.subjects,
      'Email': t.email,
      'Status': t.status,
      'Joined On': t.joinedOn,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    worksheet['!cols'] = [
      { wch: 24 },
      { wch: 16 },
      { wch: 24 },
      { wch: 22 },
      { wch: 28 },
      { wch: 26 },
      { wch: 12 },
      { wch: 16 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Faculty');
    XLSX.writeFile(workbook, `faculty_export_${Date.now()}.xlsx`);
    setIsTeacherMoreOptionsOpen(false);
  };

  const handleExportTeachersCSV = () => {
    const headers = ['Name,Employee ID,Department,Designation,Subjects,Email,Status,Joined On'];
    const rows = filteredTeachers.map(
      (t) => `"${t.name}","${t.empId}","${t.department}","${t.designation}","${t.subjects}","${t.email}","${t.status}","${t.joinedOn}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `faculty_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsTeacherMoreOptionsOpen(false);
  };

  const handleDownloadTeacherExcelTemplate = () => {
    const templateData = [
      { 'Name': 'Dr. Rajesh Sharma', 'Employee ID': 'FAC202101', 'Department': 'B.Sc AI & ML', 'Designation': 'Professor & HOD', 'Subjects': 'Machine Learning, AI Principles', 'Email': 'rajesh.sharma@college.edu', 'Status': 'Active' },
      { 'Name': 'Prof. Meenakshi Sundaram', 'Employee ID': 'FAC202108', 'Department': 'B.Sc Computer Science', 'Designation': 'Associate Professor', 'Subjects': 'Data Structures, Algorithms', 'Email': 'm.sundaram@college.edu', 'Status': 'Active' },
      { 'Name': 'Dr. Ananya Mukherjee', 'Employee ID': 'FAC202204', 'Department': 'BCA', 'Designation': 'Assistant Professor', 'Subjects': 'Web Development, React.js', 'Email': 'ananya.m@college.edu', 'Status': 'Active' },
      { 'Name': 'Prof. Vikram Batra', 'Employee ID': 'FAC202212', 'Department': 'B.Sc IT', 'Designation': 'Assistant Professor', 'Subjects': 'Computer Networks', 'Email': 'vikram.batra@college.edu', 'Status': 'Active' },
    ];
    const worksheet = XLSX.utils.json_to_sheet(templateData);
    worksheet['!cols'] = [
      { wch: 24 },
      { wch: 16 },
      { wch: 24 },
      { wch: 22 },
      { wch: 28 },
      { wch: 26 },
      { wch: 12 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Teachers Template');
    XLSX.writeFile(workbook, 'classhere_teachers_template.xlsx');
  };

  const handleDownloadTeacherCSVTemplate = () => {
    const csvContent =
      'Name,Employee ID,Department,Designation,Subjects,Email,Status\n' +
      'Dr. Rajesh Sharma,FAC202101,B.Sc AI & ML,Professor & HOD,"Machine Learning, AI Principles",rajesh.sharma@college.edu,Active\n' +
      'Prof. Meenakshi Sundaram,FAC202108,B.Sc Computer Science,Associate Professor,"Data Structures, Algorithms",m.sundaram@college.edu,Active\n' +
      'Dr. Ananya Mukherjee,FAC202204,BCA,Assistant Professor,"Web Development, React.js",ananya.m@college.edu,Active\n' +
      'Prof. Vikram Batra,FAC202212,B.Sc IT,Assistant Professor,Computer Networks,vikram.batra@college.edu,Active\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'classhere_teachers_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const processTeacherFile = (file) => {
    if (!file) return;

    const fileName = file.name;
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    setImportTeacherFileName(fileName);
    setImportTeacherError(null);

    const parseRows = (rows) => {
      if (!rows || rows.length < 2) {
        setImportTeacherError('The faculty file has no data rows below the header.');
        return;
      }

      let headerIdx = 0;
      for (let r = 0; r < Math.min(5, rows.length); r++) {
        const rowStr = rows[r].map((c) => String(c || '').toLowerCase()).join(' ');
        if (rowStr.includes('name') || rowStr.includes('id') || rowStr.includes('emp') || rowStr.includes('dept')) {
          headerIdx = r;
          break;
        }
      }

      const headerRow = rows[headerIdx].map((h) => String(h || '').trim().toLowerCase());
      const nameIdx = headerRow.findIndex((h) => h.includes('name') || h.includes('faculty') || h.includes('teacher'));
      const idIdx = headerRow.findIndex((h) => h.includes('id') || h.includes('code') || h.includes('emp'));
      const deptIdx = headerRow.findIndex((h) => h.includes('dept') || h.includes('department') || h.includes('branch'));
      const desigIdx = headerRow.findIndex((h) => h.includes('desig') || h.includes('role') || h.includes('post'));
      const subjIdx = headerRow.findIndex((h) => h.includes('subj') || h.includes('course') || h.includes('spec'));
      const emailIdx = headerRow.findIndex((h) => h.includes('mail'));
      const statusIdx = headerRow.findIndex((h) => h.includes('status'));

      const parsed = [];
      for (let i = headerIdx + 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0) continue;

        const name = String(nameIdx !== -1 ? row[nameIdx] : row[0] || '').trim();
        if (!name) continue;

        const empId = String(
          idIdx !== -1 ? row[idIdx] : row[1] || `FAC2026${String(i).padStart(2, '0')}`
        ).trim();
        const department = String(deptIdx !== -1 ? row[deptIdx] : row[2] || 'B.Sc AI & ML').trim();
        const designation = String(desigIdx !== -1 ? row[desigIdx] : row[3] || 'Assistant Professor').trim();
        const subjects = String(subjIdx !== -1 ? row[subjIdx] : row[4] || 'Core Subject').trim();
        const email = String(
          emailIdx !== -1 ? row[emailIdx] : `${name.toLowerCase().replace(/[^a-z]/g, '')}@college.edu`
        ).trim();
        const rawStatus = String(statusIdx !== -1 ? row[statusIdx] : row[6] || 'Active').trim();
        const status = rawStatus.toLowerCase().includes('inact') ? 'Inactive' : 'Active';

        parsed.push({
          name,
          empId,
          department,
          designation,
          subjects,
          email,
          status,
          joinedOn: '17 Oct 2026',
        });
      }

      if (parsed.length > 0) {
        setImportTeacherPreviewList(parsed);
      } else {
        setImportTeacherError('No valid faculty records found in the file.');
      }
    };

    if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const buffer = event.target?.result;
          const workbook = XLSX.read(buffer, { type: 'array' });
          const firstSheet = workbook.SheetNames[0];
          if (!firstSheet) {
            setImportTeacherError('The Excel file has no worksheets.');
            return;
          }
          const worksheet = workbook.Sheets[firstSheet];
          const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
          parseRows(rawRows);
        } catch (err) {
          console.error('Error parsing teacher Excel:', err);
          setImportTeacherError('Failed to read Excel file. Please ensure it is a valid .xlsx or .xls file.');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = event.target?.result;
          if (typeof text === 'string') {
            const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
            const rawRows = lines.map((l) => l.split(',').map((c) => c.replace(/^["']|["']$/g, '').trim()));
            parseRows(rawRows);
          }
        } catch (err) {
          console.error('Error parsing teacher CSV:', err);
          setImportTeacherError('Failed to parse CSV file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleTeacherFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) processTeacherFile(file);
    e.target.value = '';
  };

  const handleTeacherFileDrop = (e) => {
    e.preventDefault();
    setIsTeacherDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) processTeacherFile(file);
  };

  const handleOpenImportTeachersModal = () => {
    setImportTeacherPreviewList(DEMO_IMPORT_TEACHERS);
    setImportTeacherFileName('demo_faculty_batch.xlsx');
    setImportTeacherError(null);
    setIsImportTeacherModalOpen(true);
  };

  const handleConfirmImportTeachers = () => {
    if (importTeacherPreviewList.length === 0) return;

    const newRecords = importTeacherPreviewList.map((item, idx) => {
      const initials = getInitials(item.name);
      const avatarBg = AVATAR_COLORS[(idx + teachersList.length) % AVATAR_COLORS.length];
      return {
        id: `tch-imp-${Date.now()}-${idx}`,
        name: item.name,
        initials,
        avatarBg,
        empId: item.empId || `FAC2026${String(idx + 1).padStart(2, '0')}`,
        department: item.department || 'B.Sc AI & ML',
        designation: item.designation || 'Assistant Professor',
        subjects: item.subjects || 'Core Subject',
        email: item.email || `${item.name.toLowerCase().replace(/[^a-z]/g, '')}@college.edu`,
        status: item.status || 'Active',
        joinedOn: item.joinedOn || '17 Oct 2026',
      };
    });

    setTeachersList((prev) => [...newRecords, ...prev]);
    setIsImportTeacherModalOpen(false);
    setImportTeacherPreviewList([]);
    setTeacherCurrentPage(1);
    setTeacherSuccessNotification(`Successfully imported ${newRecords.length} faculty members to the directory!`);
  };

  const handleAddTeacherSubmit = (e) => {
    e.preventDefault();
    if (!newTeacherForm.name.trim()) return;

    const initials = getInitials(newTeacherForm.name);
    const avatarBg = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    const empId = newTeacherForm.empId.trim() || `FAC2026${String(teachersList.length + 1).padStart(2, '0')}`;

    const newTeacher = {
      id: `tch-${Date.now()}`,
      name: newTeacherForm.name.trim(),
      initials,
      avatarBg,
      empId,
      department: newTeacherForm.department,
      designation: newTeacherForm.designation,
      subjects: newTeacherForm.subjects.trim() || 'Core Subject',
      email: newTeacherForm.email.trim() || `${newTeacherForm.name.toLowerCase().replace(/[^a-z]/g, '')}@college.edu`,
      status: newTeacherForm.status,
      joinedOn: newTeacherForm.joinedOn || '17 Oct 2026',
    };

    setTeachersList((prev) => [newTeacher, ...prev]);
    setIsAddTeacherModalOpen(false);
    setModalType(null);
    setTeacherCurrentPage(1);
    setNewTeacherForm({
      name: '',
      empId: '',
      department: 'B.Sc AI & ML',
      designation: 'Assistant Professor',
      subjects: '',
      email: '',
      status: 'Active',
      joinedOn: '17 Oct 2026',
    });
    setTeacherSuccessNotification(`Faculty member ${newTeacher.name} successfully registered!`);
  };

  // Initial Syllabus Data matching screenshot
  const [syllabusList, setSyllabusList] = useState([
    {
      id: 1,
      subject: 'Python',
      department: 'B.Sc. AI & ML',
      semester: '1',
      units: 5,
      progress: 100,
      lastUpdated: '12 Oct 2026',
      status: 'Published',
    },
    {
      id: 2,
      subject: 'Mathematics',
      department: 'B.Sc. AI & ML',
      semester: '1',
      units: 4,
      progress: 60,
      lastUpdated: '10 Oct 2026',
      status: 'Draft',
    },
    {
      id: 3,
      subject: 'Computer Fundamentals',
      department: 'B.Sc. AI & ML',
      semester: '1',
      units: 6,
      progress: 80,
      lastUpdated: '08 Oct 2026',
      status: 'Published',
    },
    {
      id: 4,
      subject: 'English Communication',
      department: 'B.Sc. AI & ML',
      semester: '1',
      units: 4,
      progress: 40,
      lastUpdated: '08 Oct 2026',
      status: 'Draft',
    },
    {
      id: 5,
      subject: 'Punjabi',
      department: 'B.Sc. AI & ML',
      semester: '1',
      units: 3,
      progress: 100,
      lastUpdated: '07 Oct 2026',
      status: 'Published',
    },
  ]);

  // Exam Data for Exam Tab
  const examList = [
    {
      id: 1,
      subject: 'Python Mid-Term',
      department: 'B.Sc. AI & ML',
      date: '24 Oct 2026',
      time: '10:00 AM - 01:00 PM',
      room: 'Hall A-1',
      status: 'Scheduled',
    },
    {
      id: 2,
      subject: 'Discrete Mathematics',
      department: 'B.Sc. AI & ML',
      date: '28 Oct 2026',
      time: '10:00 AM - 01:00 PM',
      room: 'Hall B-2',
      status: 'Scheduled',
    },
    {
      id: 3,
      subject: 'Computer Fundamentals',
      department: 'B.Sc. AI & ML',
      date: '02 Nov 2026',
      time: '02:00 PM - 05:00 PM',
      room: 'Lab 3',
      status: 'Draft',
    },
  ];

  // Filtered Syllabus Rows
  const filteredSyllabus = useMemo(() => {
    return syllabusList.filter((item) => {
      const matchesSearch =
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept =
        selectedDeptFilter === 'All' || item.department === selectedDeptFilter;
      const matchesSem =
        selectedSemesterFilter === 'All' || item.semester === selectedSemesterFilter;
      const matchesStatus =
        selectedStatusFilter === 'All' || item.status === selectedStatusFilter;
      return matchesSearch && matchesDept && matchesSem && matchesStatus;
    });
  }, [syllabusList, searchQuery, selectedDeptFilter, selectedSemesterFilter, selectedStatusFilter]);

  const handleAddSyllabusSubmit = (e) => {
    e.preventDefault();
    if (!newSubject.subject.trim()) return;

    const newEntry = {
      id: Date.now(),
      subject: newSubject.subject.trim(),
      department: newSubject.department,
      semester: newSubject.semester,
      units: Number(newSubject.units) || 4,
      progress: newSubject.status === 'Published' ? 100 : 30,
      lastUpdated: 'Just now',
      status: newSubject.status,
    };

    setSyllabusList([newEntry, ...syllabusList]);
    setNewSubject({
      subject: '',
      department: 'B.Sc. AI & ML',
      semester: '1',
      units: 4,
      status: 'Published',
    });
    setModalType(null);
  };

  const navMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap },
    { id: 'exam', label: 'Exam', icon: FileText },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FC] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] flex font-sans selection:bg-blue-500 selection:text-white transition-colors duration-200">
      {/* ======================================================== */}
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      {/* ======================================================== */}
      <aside className="w-[230px] shrink-0 bg-white dark:bg-[#131B2E] border-r border-[#E8EFF7] dark:border-[#1E293B] flex flex-col justify-between py-6 px-4 select-none min-h-screen sticky top-0 h-screen transition-colors duration-200">
        <div>
          {/* Brand Logo: "Class" (blue) "Here" (black/slate) */}
          <div className="flex items-center gap-1.5 px-3 mb-7 cursor-pointer" onClick={() => setActiveNav('dashboard')}>
            <span className="text-[25px] font-black tracking-tight text-[#0075FF]">Class</span>
            <span className="text-[25px] font-black tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">Here</span>
          </div>

          {/* Navigation Links List */}
          <nav className="space-y-1">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveNav(item.id);
                    if (item.id === 'syllabus') setActiveTableTab('syllabus');
                    if (item.id === 'exam') setActiveTableTab('exam');
                  }}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-[14px] text-[14px] font-semibold transition-all duration-150 apple-tab cursor-pointer ${
                    isActive
                      ? 'bg-[#EAF3FF] dark:bg-[#1B2945] text-[#0075FF] dark:text-[#3894FF] font-bold shadow-xs'
                      : 'text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#182338] hover:text-[#0F172A] dark:hover:text-white'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      isActive
                        ? 'text-[#0075FF] dark:text-[#3894FF] stroke-[2.3]'
                        : 'text-[#64748B] dark:text-[#94A3B8] stroke-[1.9]'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Academic Year Card & Log Out Button */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Academic Year Info Card */}
          <div className="bg-[#F8FAFC] dark:bg-[#0B0F19] border border-[#E8EFF7] dark:border-[#223354] rounded-[16px] p-3 flex items-center justify-between cursor-pointer hover:border-[#0075FF]/30 transition-all apple-card">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[10px] bg-white dark:bg-[#162238] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#64748B] dark:text-[#94A3B8]">
                <Calendar className="w-4 h-4 text-[#0075FF]" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-[#94A3B8] dark:text-[#64748B] uppercase tracking-wider leading-none">
                  Academic Year
                </p>
                <p className="text-[12.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5 leading-tight">
                  2026 – 27
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>

          {/* Log Out Action */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full h-10 rounded-[12px] flex items-center justify-center gap-2 text-[13px] font-bold text-[#64748B] hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 bg-white transition-all apple-btn cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN ADMIN CONTENT WORKSPACE */}
      {/* ======================================================== */}
      <main className="flex-1 overflow-y-auto px-8 lg:px-10 py-7 space-y-6 max-w-[1400px]">
        {activeNav === 'students' ? (
          <div className="space-y-6">
            {/* Top Bar: Search Input (left) & Bell + Admin Profile (right) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Search Input matching mockup */}
              <div className="relative w-full sm:w-[440px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={studentSearchQuery}
                  onChange={(e) => {
                    setStudentSearchQuery(e.target.value);
                    setStudentCurrentPage(1);
                  }}
                  placeholder="Search students by name, roll number, course or subject..."
                  className="w-full h-10 pl-10 pr-9 rounded-xl border border-slate-200/90 bg-[#F8FAFC] hover:bg-white focus:bg-white focus:border-[#0075FF] text-slate-900 placeholder:text-slate-400 text-[13.5px] shadow-2xs focus:outline-none transition-all"
                />
                {studentSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setStudentSearchQuery('');
                      setStudentCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Right: Notification Bell & Admin Profile Pill */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="relative w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer shadow-2xs transition-all">
                  <Bell className="w-4.5 h-4.5 text-slate-600" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#0075FF] ring-2 ring-white" />
                </div>

                <div className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-full bg-white border border-slate-200/90 hover:bg-slate-50 cursor-pointer shadow-2xs transition-all">
                  <div className="w-7 h-7 rounded-full bg-[#DBEAFE] text-[#0075FF] font-bold text-xs flex items-center justify-center">
                    A
                  </div>
                  <span className="text-xs font-bold text-slate-800">Admin</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Title & Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-[28px] font-black text-[#0F172A] tracking-tight">
                  Students
                </h1>
                <p className="text-[13.5px] font-medium text-slate-500 mt-0.5">
                  View and manage all registered students.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddStudentModalOpen(true)}
                className="h-10 px-4.5 rounded-xl bg-[#0075FF] hover:bg-blue-600 active:scale-95 text-white text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Student</span>
              </button>
            </div>

            {/* 4 Stat Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric 1: Total Students */}
              <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4">
                <div className="w-[52px] h-[52px] rounded-[16px] bg-[#EAF3FF] flex items-center justify-center text-[#0075FF] shrink-0">
                  <Users className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Total Students</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                    {totalStudentsMetric}
                  </p>
                </div>
              </div>

              {/* Metric 2: Active Students */}
              <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4">
                <div className="w-[52px] h-[52px] rounded-[16px] bg-[#E8FBF0] flex items-center justify-center text-[#10B981] shrink-0">
                  <GraduationCap className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Active Students</p>
                  <div className="flex items-baseline gap-2.5 mt-0.5">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">
                      {activeStudentsMetric}
                    </span>
                    <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                      <span>92.8%</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Metric 3: Recently Joined */}
              <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4">
                <div className="w-[52px] h-[52px] rounded-[16px] bg-[#F5EDFF] flex items-center justify-center text-[#9333EA] shrink-0">
                  <Clock className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Recently Joined</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                    35
                  </p>
                  <p className="text-[11px] font-medium text-slate-400 mt-0.5">Last 30 days</p>
                </div>
              </div>

              {/* Metric 4: Courses */}
              <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4">
                <div className="w-[52px] h-[52px] rounded-[16px] bg-[#EAF3FF] flex items-center justify-center text-[#0075FF] shrink-0">
                  <Users className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Courses</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                    6
                  </p>
                </div>
              </div>
            </div>

            {/* Import Success Notification Banner */}
            {importSuccessNotification && (
              <div className="bg-[#E8F9EE] border border-[#A7F3D0] text-[#16A34A] px-4 py-3 rounded-2xl flex items-center justify-between text-sm font-semibold shadow-xs animate-fadeIn">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  <span>{importSuccessNotification}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setImportSuccessNotification(null)}
                  className="text-[#16A34A] hover:text-[#15803D] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Filters Row (Above Table) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Left: 3 Dropdown Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* All Courses Filter */}
                <div className="relative">
                  <select
                    value={studentCourseFilter}
                    onChange={(e) => {
                      setStudentCourseFilter(e.target.value);
                      setStudentCurrentPage(1);
                    }}
                    className="appearance-none bg-white border border-slate-200/90 rounded-xl pl-3.5 pr-8 py-2 text-sm font-semibold text-slate-800 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#0075FF] cursor-pointer"
                  >
                    <option value="All">All Courses</option>
                    <option value="BCA">BCA</option>
                    <option value="B.Sc IT">B.Sc IT</option>
                    <option value="B.Voc (Web Dev)">B.Voc (Web Dev)</option>
                    <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                    <option value="B.Sc AI & ML">B.Sc AI & ML</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* All Semesters Filter */}
                <div className="relative">
                  <select
                    value={studentSemesterFilter}
                    onChange={(e) => {
                      setStudentSemesterFilter(e.target.value);
                      setStudentCurrentPage(1);
                    }}
                    className="appearance-none bg-white border border-slate-200/90 rounded-xl pl-3.5 pr-8 py-2 text-sm font-semibold text-slate-800 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#0075FF] cursor-pointer"
                  >
                    <option value="All">All Semesters</option>
                    <option value="1st Semester">1st Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="5th Semester">5th Semester</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* All Status Filter */}
                <div className="relative">
                  <select
                    value={studentStatusFilter}
                    onChange={(e) => {
                      setStudentStatusFilter(e.target.value);
                      setStudentCurrentPage(1);
                    }}
                    className="appearance-none bg-white border border-slate-200/90 rounded-xl pl-3.5 pr-8 py-2 text-sm font-semibold text-slate-800 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#0075FF] cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Right: Import Students & More Options */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={handleOpenImportModal}
                  className="h-10 px-4 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-800 text-sm font-semibold flex items-center gap-2 shadow-2xs transition-all cursor-pointer active:scale-95"
                >
                  <Upload className="w-4 h-4 stroke-[2.2]" />
                  <span>Import Students</span>
                </button>

                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-2xs transition-all cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {isMoreOptionsOpen && (
                    <div className="absolute right-0 top-12 w-52 bg-white border border-slate-100 rounded-xl shadow-lg p-1.5 z-20">
                      <button
                        type="button"
                        onClick={handleExportExcel}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Export as Excel (.xlsx)</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleExportCSV}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        <FileDown className="w-3.5 h-3.5 text-blue-600" />
                        <span>Export as CSV</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          window.print();
                          setIsMoreOptionsOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-500" />
                        <span>Print Student List</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Students Table Card */}
            <div className="bg-white rounded-[22px] border border-slate-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12.5px] font-semibold text-slate-500">
                      <th className="py-4 pl-5 pr-2 w-10">
                        <input
                          type="checkbox"
                          checked={isAllPageSelected}
                          onChange={toggleSelectAllPage}
                          className="w-4 h-4 rounded border-slate-300 text-[#0075FF] focus:ring-0 cursor-pointer"
                        />
                      </th>
                      <th className="py-4 px-4 font-semibold text-slate-600">Name</th>
                      <th className="py-4 px-4 font-semibold text-slate-600">Roll Number</th>
                      <th className="py-4 px-4 font-semibold text-slate-600">Course</th>
                      <th className="py-4 px-4 font-semibold text-slate-600">Semester</th>
                      <th className="py-4 px-4 font-semibold text-slate-600">Status</th>
                      <th className="py-4 px-4 font-semibold text-slate-600">Joined On</th>
                      <th className="py-4 pr-5 pl-4 text-right font-semibold text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/80 text-[13.5px]">
                    {paginatedStudents.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="py-12 text-center text-slate-400 font-medium">
                          No students found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedStudents.map((student) => {
                        const isSelected = selectedStudentIds.includes(student.id);

                        return (
                          <tr
                            key={student.id}
                            className={`transition-colors ${
                              isSelected ? 'bg-blue-50/40' : 'hover:bg-slate-50/60'
                            }`}
                          >
                            <td className="py-4 pl-5 pr-2">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelectStudent(student.id)}
                                className="w-4 h-4 rounded border-slate-300 text-[#0075FF] focus:ring-0 cursor-pointer"
                              />
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${student.avatarBg}`}
                                >
                                  {student.initials}
                                </div>
                                <span className="font-bold text-slate-900">
                                  {student.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4 font-medium text-slate-600">
                              {student.rollNumber}
                            </td>
                            <td className="py-4 px-4 font-medium text-slate-600">
                              {student.course}
                            </td>
                            <td className="py-4 px-4 font-medium text-slate-600">
                              {student.semester}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  student.status === 'Active'
                                    ? 'bg-[#E8F9EE] text-[#16A34A]'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {student.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-medium text-slate-600">
                              {student.joinedOn}
                            </td>
                            <td className="py-4 pr-5 pl-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveRowMenuId(
                                    activeRowMenuId === student.id ? null : student.id
                                  )
                                }
                                className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 inline-flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>

                              {activeRowMenuId === student.id && (
                                <div className="absolute right-5 top-11 w-40 bg-white border border-slate-100 rounded-xl shadow-xl p-1.5 z-30 text-left">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      toggleStudentStatus(student.id);
                                      setActiveRowMenuId(null);
                                    }}
                                    className="w-full px-2.5 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Mark {student.status === 'Active' ? 'Inactive' : 'Active'}</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      deleteStudent(student.id);
                                      setActiveRowMenuId(null);
                                    }}
                                    className="w-full px-2.5 py-1.5 text-left text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                    <span>Delete Student</span>
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer: Showing 1–10 of 487 students & Pagination */}
              <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                <span className="text-slate-500 font-medium">
                  Showing {totalFilteredStudents > 0 ? (studentCurrentPage - 1) * STUDENT_PAGE_SIZE + 1 : 0}–
                  {Math.min(studentCurrentPage * STUDENT_PAGE_SIZE, totalFilteredStudents)} of{' '}
                  {studentSearchQuery ||
                  studentCourseFilter !== 'All' ||
                  studentSemesterFilter !== 'All' ||
                  studentStatusFilter !== 'All'
                    ? totalFilteredStudents
                    : totalStudentsMetric}{' '}
                  students
                </span>

                <div className="flex items-center gap-1.5 self-center sm:self-auto">
                  <button
                    type="button"
                    disabled={studentCurrentPage === 1}
                    onClick={() => setStudentCurrentPage((p) => Math.max(1, p - 1))}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setStudentCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                        studentCurrentPage === page
                          ? 'bg-[#0075FF] text-white shadow-2xs'
                          : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={studentCurrentPage === 5 || studentCurrentPage >= totalStudentPages}
                    onClick={() => setStudentCurrentPage((p) => Math.min(5, p + 1))}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : activeNav === 'teachers' ? (
          <div className="space-y-6">
            {/* Top Bar: Search Input (left) & Bell + Admin Profile (right) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative w-full sm:w-[440px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={teacherSearchQuery}
                  onChange={(e) => {
                    setTeacherSearchQuery(e.target.value);
                    setTeacherCurrentPage(1);
                  }}
                  placeholder="Search faculty by name, employee ID, department, subjects..."
                  className="w-full h-10 pl-10 pr-9 rounded-xl border border-slate-200/90 bg-[#F8FAFC] hover:bg-white focus:bg-white focus:border-[#0075FF] text-slate-900 placeholder:text-slate-400 text-[13.5px] shadow-2xs focus:outline-none transition-all"
                />
                {teacherSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setTeacherSearchQuery('');
                      setTeacherCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Right: Notification Bell & Admin Profile Pill */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="relative w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer shadow-2xs transition-all">
                  <Bell className="w-4.5 h-4.5 text-slate-600" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#0075FF] ring-2 ring-white" />
                </div>

                <div className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-full bg-white border border-slate-200/90 hover:bg-slate-50 cursor-pointer shadow-2xs transition-all">
                  <div className="w-7 h-7 rounded-full bg-[#DBEAFE] text-[#0075FF] font-bold text-xs flex items-center justify-center">
                    A
                  </div>
                  <span className="text-xs font-bold text-slate-800">Admin</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Title & Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-[28px] font-black text-[#0F172A] tracking-tight">
                  Teachers
                </h1>
                <p className="text-[13.5px] font-medium text-slate-500 mt-0.5">
                  View, import, and manage institutional faculty and course assignments.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddTeacherModalOpen(true)}
                className="h-10 px-4.5 rounded-xl bg-[#0075FF] hover:bg-blue-600 active:scale-95 text-white text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Teacher</span>
              </button>
            </div>

            {/* 4 Stat Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric 1: Total Faculty */}
              <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4">
                <div className="w-[52px] h-[52px] rounded-[16px] bg-[#F5ECFE] flex items-center justify-center text-[#9333EA] shrink-0">
                  <GraduationCap className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Total Teachers</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                    {teachersList.length}
                  </p>
                </div>
              </div>

              {/* Metric 2: Active Faculty */}
              <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4">
                <div className="w-[52px] h-[52px] rounded-[16px] bg-[#E8F9EE] flex items-center justify-center text-[#16A34A] shrink-0">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Active Faculty</p>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">
                      {teachersList.filter((t) => t.status === 'Active').length}
                    </span>
                    <span className="text-[11px] font-bold text-[#16A34A]">
                      {Math.round(
                        (teachersList.filter((t) => t.status === 'Active').length /
                          Math.max(1, teachersList.length)) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* Metric 3: Departments */}
              <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4">
                <div className="w-[52px] h-[52px] rounded-[16px] bg-[#EAF3FF] flex items-center justify-center text-[#0075FF] shrink-0">
                  <Building2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Departments</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                    {new Set(teachersList.map((t) => t.department)).size}
                  </p>
                </div>
              </div>

              {/* Metric 4: Recently Joined */}
              <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4">
                <div className="w-[52px] h-[52px] rounded-[16px] bg-[#FFF7ED] flex items-center justify-center text-[#EA580C] shrink-0">
                  <Calendar className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Recently Joined</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                    {teachersList.filter((t) => t.joinedOn?.includes('2026')).length}
                  </p>
                </div>
              </div>
            </div>

            {/* Teacher Success Notification Banner */}
            {teacherSuccessNotification && (
              <div className="bg-[#E8F9EE] border border-[#A7F3D0] text-[#16A34A] px-4 py-3 rounded-2xl flex items-center justify-between text-sm font-semibold shadow-xs animate-fadeIn">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
                  <span>{teacherSuccessNotification}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setTeacherSuccessNotification(null)}
                  className="text-[#16A34A] hover:text-[#15803D] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Filters Row (Above Faculty Table) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Left: 3 Dropdown Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Department Filter */}
                <div className="relative">
                  <select
                    value={teacherDeptFilter}
                    onChange={(e) => {
                      setTeacherDeptFilter(e.target.value);
                      setTeacherCurrentPage(1);
                    }}
                    className="appearance-none bg-white border border-slate-200/90 rounded-xl pl-3.5 pr-8 py-2 text-sm font-semibold text-slate-800 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#0075FF] cursor-pointer"
                  >
                    <option value="All">All Departments</option>
                    <option value="B.Sc AI & ML">B.Sc AI & ML</option>
                    <option value="BCA">BCA</option>
                    <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                    <option value="B.Sc IT">B.Sc IT</option>
                    <option value="B.Voc (Web Dev)">B.Voc (Web Dev)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Designation Filter */}
                <div className="relative">
                  <select
                    value={teacherDesignationFilter}
                    onChange={(e) => {
                      setTeacherDesignationFilter(e.target.value);
                      setTeacherCurrentPage(1);
                    }}
                    className="appearance-none bg-white border border-slate-200/90 rounded-xl pl-3.5 pr-8 py-2 text-sm font-semibold text-slate-800 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#0075FF] cursor-pointer"
                  >
                    <option value="All">All Designations</option>
                    <option value="Professor">Professor / HOD</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    value={teacherStatusFilter}
                    onChange={(e) => {
                      setTeacherStatusFilter(e.target.value);
                      setTeacherCurrentPage(1);
                    }}
                    className="appearance-none bg-white border border-slate-200/90 rounded-xl pl-3.5 pr-8 py-2 text-sm font-semibold text-slate-800 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#0075FF] cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Right: Import Teachers & More Options */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={handleOpenImportTeachersModal}
                  className="h-10 px-4 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-800 text-sm font-semibold flex items-center gap-2 shadow-2xs transition-all cursor-pointer active:scale-95"
                >
                  <Upload className="w-4 h-4 stroke-[2.2]" />
                  <span>Import Teachers</span>
                </button>

                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => setIsTeacherMoreOptionsOpen(!isTeacherMoreOptionsOpen)}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-2xs transition-all cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {isTeacherMoreOptionsOpen && (
                    <div className="absolute right-0 top-12 w-52 bg-white border border-slate-100 rounded-xl shadow-lg p-1.5 z-20">
                      <button
                        type="button"
                        onClick={handleExportTeachersExcel}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Export as Excel (.xlsx)</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleExportTeachersCSV}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        <FileDown className="w-3.5 h-3.5 text-blue-600" />
                        <span>Export as CSV</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          window.print();
                          setIsTeacherMoreOptionsOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-500" />
                        <span>Print Faculty List</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Teachers Table Card */}
            <div className="bg-white rounded-[22px] border border-slate-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12.5px] font-semibold text-slate-500">
                      <th className="py-4 pl-5 pr-2 w-10">
                        <input
                          type="checkbox"
                          checked={isAllTeacherPageSelected}
                          onChange={toggleSelectAllTeachers}
                          className="w-4 h-4 rounded border-slate-300 text-[#0075FF] focus:ring-0 cursor-pointer"
                        />
                      </th>
                      <th className="py-4 px-4 font-semibold text-slate-600">Faculty Name</th>
                      <th className="py-4 px-4 font-semibold text-slate-600">Employee ID</th>
                      <th className="py-4 px-4 font-semibold text-slate-600">Department</th>
                      <th className="py-4 px-4 font-semibold text-slate-600">Designation</th>
                      <th className="py-4 px-4 font-semibold text-slate-600">Assigned Subjects</th>
                      <th className="py-4 px-4 font-semibold text-slate-600">Status</th>
                      <th className="py-4 pr-5 pl-4 text-right font-semibold text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/80 text-[13.5px]">
                    {paginatedTeachers.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="py-12 text-center text-slate-400 font-medium">
                          No faculty members found matching your search and filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedTeachers.map((teacher) => {
                        const isSelected = selectedTeacherIds.includes(teacher.id);

                        return (
                          <tr
                            key={teacher.id}
                            className={`transition-colors ${
                              isSelected ? 'bg-purple-50/40' : 'hover:bg-slate-50/60'
                            }`}
                          >
                            <td className="py-4 pl-5 pr-2">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelectTeacher(teacher.id)}
                                className="w-4 h-4 rounded border-slate-300 text-[#0075FF] focus:ring-0 cursor-pointer"
                              />
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${teacher.avatarBg}`}
                                >
                                  {teacher.initials}
                                </div>
                                <div>
                                  <span className="font-bold text-slate-900 block leading-tight">
                                    {teacher.name}
                                  </span>
                                  <span className="text-xs text-slate-400 block mt-0.5">
                                    {teacher.email}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 font-semibold text-slate-700">
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-bold">
                                {teacher.empId}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-medium text-slate-700">
                              {teacher.department}
                            </td>
                            <td className="py-4 px-4 text-slate-600 font-medium">
                              {teacher.designation}
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-xs font-semibold text-slate-600 bg-slate-100/80 px-2 py-1 rounded-lg">
                                {teacher.subjects}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                  teacher.status === 'Active'
                                    ? 'bg-[#E8F9EE] text-[#16A34A]'
                                    : 'bg-rose-50 text-rose-600'
                                }`}
                              >
                                {teacher.status}
                              </span>
                            </td>
                            <td className="py-4 pr-5 pl-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveTeacherRowMenuId(
                                    activeTeacherRowMenuId === teacher.id ? null : teacher.id
                                  )
                                }
                                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 inline-flex items-center justify-center cursor-pointer transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {activeTeacherRowMenuId === teacher.id && (
                                <div className="absolute right-5 top-12 w-44 bg-white border border-slate-100 rounded-xl shadow-lg p-1.5 z-20 text-left">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      toggleTeacherStatus(teacher.id);
                                      setActiveTeacherRowMenuId(null);
                                    }}
                                    className="w-full px-2.5 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Mark {teacher.status === 'Active' ? 'Inactive' : 'Active'}</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      deleteTeacher(teacher.id);
                                      setActiveTeacherRowMenuId(null);
                                    }}
                                    className="w-full px-2.5 py-1.5 text-left text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                    <span>Delete Faculty</span>
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer: Showing 1–10 of N faculty & Pagination */}
              <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                <span className="text-slate-500 font-medium">
                  Showing {totalFilteredTeachers > 0 ? (teacherCurrentPage - 1) * TEACHER_PAGE_SIZE + 1 : 0}–
                  {Math.min(teacherCurrentPage * TEACHER_PAGE_SIZE, totalFilteredTeachers)} of {totalFilteredTeachers} teachers
                </span>

                <div className="flex items-center gap-1.5 self-center sm:self-auto">
                  <button
                    type="button"
                    disabled={teacherCurrentPage === 1}
                    onClick={() => setTeacherCurrentPage((p) => Math.max(1, p - 1))}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalTeacherPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setTeacherCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                        teacherCurrentPage === page
                          ? 'bg-[#0075FF] text-white shadow-2xs'
                          : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={teacherCurrentPage >= totalTeacherPages}
                    onClick={() => setTeacherCurrentPage((p) => Math.min(totalTeacherPages, p + 1))}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Top Header Row: Good morning, Admin 👋 & Department Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-[28px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight flex items-center gap-2">
                  <span>Good morning, {adminUser?.username ? adminUser.username.charAt(0).toUpperCase() + adminUser.username.slice(1) : 'Admin'}</span>
                  <span>👋</span>
                </h1>
                <p className="text-[13.5px] font-medium text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  B.Sc. AI & ML &nbsp;•&nbsp; Academic Year 2026 – 27
                </p>
              </div>

              {/* Department Selection Pill Dropdown */}
              <div className="relative">
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="appearance-none bg-white dark:bg-[#131B2E] border border-[#E2E8F0] dark:border-[#223354] rounded-[14px] px-4 py-2.5 pr-9 text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] shadow-xs cursor-pointer focus:outline-none focus:border-[#0075FF]"
                >
                  <option value="B.Sc. AI & ML">B.Sc. AI & ML</option>
                  <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                  <option value="B.Sc. Data Science">B.Sc. Data Science</option>
                  <option value="M.Sc. AI & Robotics">M.Sc. AI & Robotics</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* ======================================================== */}
            {/* 3. TOP ROW: 4 STAT METRICS CARDS */}
            {/* ======================================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric 1: Students */}
              <div
                onClick={() => setActiveNav('students')}
                className="bg-white dark:bg-[#131B2E] rounded-[20px] p-5 border border-[#EDF2F9] dark:border-[#1E293B] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4 apple-card cursor-pointer hover:border-[#0075FF]/40 transition-all"
              >
            <div className="w-[54px] h-[54px] rounded-[18px] bg-[#EAF3FF] dark:bg-[#182844] flex items-center justify-center text-[#0075FF] shrink-0">
              <Users className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-[#64748B] dark:text-[#94A3B8]">Students</p>
              <div className="flex items-baseline gap-2">
                <span className="text-[26px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">248</span>
                <span className="text-[11px] font-bold text-[#16A34A] flex items-center">
                  ↑ +12%
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] dark:text-[#64748B]">from last semester</p>
            </div>
          </div>

          {/* Metric 2: Teachers */}
          <div
            onClick={() => setActiveNav('teachers')}
            className="bg-white dark:bg-[#131B2E] rounded-[20px] p-5 border border-[#EDF2F9] dark:border-[#1E293B] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4 apple-card cursor-pointer hover:border-purple-400/40 transition-all"
          >
            <div className="w-[54px] h-[54px] rounded-[18px] bg-[#F5ECFE] dark:bg-[#251B3B] flex items-center justify-center text-[#9333EA] shrink-0">
              <GraduationCap className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-[#64748B] dark:text-[#94A3B8]">Teachers</p>
              <div className="flex items-baseline gap-2">
                <span className="text-[26px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">{teachersList.length}</span>
                <span className="text-[11px] font-bold text-[#16A34A] flex items-center">
                  ↑ +6%
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] dark:text-[#64748B]">from last semester</p>
            </div>
          </div>

          {/* Metric 3: Departments */}
          <div className="bg-white dark:bg-[#131B2E] rounded-[20px] p-5 border border-[#EDF2F9] dark:border-[#1E293B] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4 apple-card">
            <div className="w-[54px] h-[54px] rounded-[18px] bg-[#E8FBF0] dark:bg-[#0F2D20] flex items-center justify-center text-[#10B981] shrink-0">
              <BookOpen className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-[#64748B] dark:text-[#94A3B8]">Departments</p>
              <div className="flex items-baseline gap-2">
                <span className="text-[26px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">5</span>
                <span className="text-[11px] font-bold text-[#16A34A] flex items-center">
                  ↑ +25%
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] dark:text-[#64748B]">from last semester</p>
            </div>
          </div>

          {/* Metric 4: Active Classes */}
          <div className="bg-white dark:bg-[#131B2E] rounded-[20px] p-5 border border-[#EDF2F9] dark:border-[#1E293B] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4 apple-card">
            <div className="w-[54px] h-[54px] rounded-[18px] bg-[#FFF3E6] dark:bg-[#341F11] flex items-center justify-center text-[#F97316] shrink-0">
              <Calendar className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-[#64748B] dark:text-[#94A3B8]">Active Classes</p>
              <div className="flex items-baseline gap-2">
                <span className="text-[26px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">6</span>
                <span className="text-[11px] font-bold text-[#16A34A] flex items-center">
                  ↑ 2 today
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] dark:text-[#64748B]">live on campus</p>
            </div>
          </div>
        </div>

        {/* Timetable Success Banner */}
        {timetableSuccessNotification && (
          <div className="bg-[#E8F9EE] border border-[#A7F3D0] text-[#16A34A] px-4 py-3 rounded-2xl flex items-center justify-between text-sm font-semibold shadow-xs animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
              <span>{timetableSuccessNotification}</span>
            </div>
            <button
              type="button"
              onClick={() => setTimetableSuccessNotification(null)}
              className="text-[#16A34A] hover:text-[#15803D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. ATTENTION NEEDED SECTION (3 Soft Warning Cards) */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-500">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-[16px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight flex items-center gap-1.5">
                <span>Attention Needed</span>
                <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-400 text-[11px] font-bold flex items-center justify-center">
                  {isTimetableUploaded ? '2' : '3'}
                </span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => alert(`Viewing all ${isTimetableUploaded ? '2' : '3'} pending attention alerts.`)}
              className="text-[#0075FF] hover:underline text-[13px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Attention Card 1: 2 Subjects without teachers */}
            <div
              onClick={() => setActiveNav('teachers')}
              className="bg-[#FFF5F5] dark:bg-[#251418] border border-[#FED7D7] dark:border-[#4B1E28] rounded-[18px] p-4 flex items-center justify-between cursor-pointer hover:border-red-400 transition-all apple-card"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-[14px] bg-[#FEE2E2] dark:bg-[#3D1A22] flex items-center justify-center text-[#EF4444] shrink-0">
                  <FileText className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                    2 Subjects without teachers
                  </h4>
                  <p className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                    Assign teachers to avoid delays.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-[#EF4444] shrink-0" />
            </div>

            {/* Attention Card 2: Timetable status */}
            <div
              onClick={handleOpenUploadTimetableModal}
              className={`border rounded-[18px] p-4 flex items-center justify-between cursor-pointer transition-all apple-card ${
                isTimetableUploaded
                  ? 'bg-[#F0FDF4] dark:bg-[#0E2A18] border-[#BBF7D0] dark:border-[#1E4D2B] hover:border-emerald-400'
                  : 'bg-[#FFFBEB] dark:bg-[#281D0D] border-[#FDE68A] dark:border-[#523A12] hover:border-amber-400'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 ${
                    isTimetableUploaded
                      ? 'bg-[#DCFCE7] dark:bg-[#163820] text-[#16A34A]'
                      : 'bg-[#FEF3C7] dark:bg-[#422C0A] text-[#D97706]'
                  }`}
                >
                  {isTimetableUploaded ? (
                    <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                  ) : (
                    <Calendar className="w-5 h-5 stroke-[2.2]" />
                  )}
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug flex items-center gap-1.5">
                    <span>{isTimetableUploaded ? 'Timetable Active' : 'Timetable not uploaded'}</span>
                    {isTimetableUploaded && (
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        Live
                      </span>
                    )}
                  </h4>
                  <p className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                    {isTimetableUploaded
                      ? `${uploadedTimetableMeta?.batchMeta?.batch || timetableBatch} • ${uploadedTimetableMeta?.totalSlots || timetablePreviewSlots.length || 45} classes active`
                      : 'Upload timetable for Semester 1.'}
                  </p>
                </div>
              </div>
              <ChevronRight
                className={`w-4.5 h-4.5 shrink-0 ${
                  isTimetableUploaded ? 'text-[#16A34A]' : 'text-[#D97706]'
                }`}
              />
            </div>

            {/* Attention Card 3: 12 New student registrations */}
            <div
              onClick={() => setIsAddStudentModalOpen(true)}
              className="bg-[#EFF6FF] dark:bg-[#11223E] border border-[#BFDBFE] dark:border-[#1E3A6D] rounded-[18px] p-4 flex items-center justify-between cursor-pointer hover:border-blue-400 transition-all apple-card"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-[14px] bg-[#DBEAFE] dark:bg-[#19325C] flex items-center justify-center text-[#2563EB] shrink-0">
                  <Users className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                    12 New student registrations
                  </h4>
                  <p className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                    Review and approve pending students.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-[#2563EB] shrink-0" />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. QUICK ACCESS SECTION (4 Action Buttons) */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <h3 className="text-[16px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
            Quick Access
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Quick Access 1: Add Student */}
            <button
              type="button"
              onClick={() => setIsAddStudentModalOpen(true)}
              className="w-full h-[54px] rounded-[16px] bg-[#EAF3FF] dark:bg-[#14233C] border border-[#D5E6FC] dark:border-[#1D355C] px-4.5 flex items-center justify-between text-[#0075FF] dark:text-[#3894FF] font-bold text-[13.5px] apple-card cursor-pointer hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <UserPlus className="w-5 h-5 stroke-[2.3]" />
                <span>Add Student</span>
              </div>
              <ChevronRight className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>

            {/* Quick Access 2: Add Teacher */}
            <button
              type="button"
              onClick={() => setIsAddTeacherModalOpen(true)}
              className="w-full h-[54px] rounded-[16px] bg-[#F5ECFE] dark:bg-[#251B3B] border border-[#E9D5FF] dark:border-[#3D2866] px-4.5 flex items-center justify-between text-[#9333EA] dark:text-[#C084FC] font-bold text-[13.5px] apple-card cursor-pointer hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 stroke-[2.3]" />
                <span>Add Teacher</span>
              </div>
              <ChevronRight className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>

            {/* Quick Access 3: Add Department */}
            <button
              type="button"
              onClick={() => setModalType('add-department')}
              className="w-full h-[54px] rounded-[16px] bg-[#ECFDF5] dark:bg-[#0F2D20] border border-[#A7F3D0] dark:border-[#174D36] px-4.5 flex items-center justify-between text-[#10B981] dark:text-[#34D399] font-bold text-[13.5px] apple-card cursor-pointer hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 stroke-[2.3]" />
                <span>Add Department</span>
              </div>
              <ChevronRight className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>

            {/* Quick Access 4: Upload Timetable */}
            <button
              type="button"
              onClick={handleOpenUploadTimetableModal}
              className="w-full h-[54px] rounded-[16px] bg-[#FFF7ED] dark:bg-[#341F11] border border-[#FED7AA] dark:border-[#5C3217] px-4.5 flex items-center justify-between text-[#EA580C] dark:text-[#FB923C] font-bold text-[13.5px] apple-card cursor-pointer hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 stroke-[2.3]" />
                <span>Upload Timetable</span>
              </div>
              <ChevronRight className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. MAIN TABLE CONTAINER: SYLLABUS & EXAM TABS */}
        {/* ======================================================== */}
        <div className="space-y-0">
          {/* Top Sub-tabs */}
          <div className="flex items-center gap-6 border-b border-transparent pl-1">
            <button
              type="button"
              onClick={() => setActiveTableTab('syllabus')}
              className={`pb-2 text-[14.5px] font-bold relative transition-colors cursor-pointer ${
                activeTableTab === 'syllabus'
                  ? 'text-[#0075FF] dark:text-[#3894FF]'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
              }`}
            >
              <span>Syllabus</span>
              {activeTableTab === 'syllabus' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0075FF] dark:bg-[#3894FF] rounded-full animate-fadeIn" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTableTab('exam')}
              className={`pb-2 text-[14.5px] font-bold relative transition-colors cursor-pointer ${
                activeTableTab === 'exam'
                  ? 'text-[#0075FF] dark:text-[#3894FF]'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
              }`}
            >
              <span>Exam</span>
              {activeTableTab === 'exam' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0075FF] dark:bg-[#3894FF] rounded-full animate-fadeIn" />
              )}
            </button>
          </div>

          {/* White Table Box */}
          <div className="bg-white dark:bg-[#131B2E] rounded-[22px] border border-[#E8EFF7] dark:border-[#1E293B] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
            {/* Table Control Bar: Search & Dropdowns */}
            <div className="p-5 border-b border-[#EDF2F9] dark:border-[#1E293B] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                {activeTableTab === 'syllabus' ? 'Syllabus' : 'Exam Schedule'}
              </h3>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search Input */}
                <div className="relative min-w-[200px]">
                  <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={activeTableTab === 'syllabus' ? 'Search syllabus...' : 'Search exams...'}
                    className="w-full h-10 pl-9 pr-3 rounded-[12px] border border-[#E2E8F0] dark:border-[#223354] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[13px] text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#0075FF]"
                  />
                </div>

                {activeTableTab === 'syllabus' && (
                  <>
                    {/* Filter: Department */}
                    <div className="relative">
                      <select
                        value={selectedDeptFilter}
                        onChange={(e) => setSelectedDeptFilter(e.target.value)}
                        className="appearance-none h-10 pl-3 pr-8 rounded-[12px] border border-[#E2E8F0] dark:border-[#223354] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[12.5px] font-semibold text-[#475569] dark:text-[#CBD5E1] cursor-pointer focus:outline-none focus:border-[#0075FF]"
                      >
                        <option value="All">Department</option>
                        <option value="B.Sc. AI & ML">B.Sc. AI & ML</option>
                        <option value="B.Tech Computer Science">B.Tech CS</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Filter: Semester */}
                    <div className="relative">
                      <select
                        value={selectedSemesterFilter}
                        onChange={(e) => setSelectedSemesterFilter(e.target.value)}
                        className="appearance-none h-10 pl-3 pr-8 rounded-[12px] border border-[#E2E8F0] dark:border-[#223354] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[12.5px] font-semibold text-[#475569] dark:text-[#CBD5E1] cursor-pointer focus:outline-none focus:border-[#0075FF]"
                      >
                        <option value="All">Semester</option>
                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                        <option value="3">Semester 3</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Filter: Status */}
                    <div className="relative">
                      <select
                        value={selectedStatusFilter}
                        onChange={(e) => setSelectedStatusFilter(e.target.value)}
                        className="appearance-none h-10 pl-3 pr-8 rounded-[12px] border border-[#E2E8F0] dark:border-[#223354] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[12.5px] font-semibold text-[#475569] dark:text-[#CBD5E1] cursor-pointer focus:outline-none focus:border-[#0075FF]"
                      >
                        <option value="All">Status</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </>
                )}

                {/* Add Syllabus / Add Exam Button */}
                <button
                  type="button"
                  onClick={() => setModalType(activeTableTab === 'syllabus' ? 'add-syllabus' : 'schedule-exam')}
                  className="h-10 px-4 rounded-[12px] bg-[#0075FF] hover:bg-[#0066E0] text-white text-[13px] font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>{activeTableTab === 'syllabus' ? 'Add Syllabus' : 'Schedule Exam'}</span>
                </button>
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              {activeTableTab === 'syllabus' ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#EDF2F9] dark:border-[#1E293B] text-[12px] font-bold text-[#64748B] dark:text-[#94A3B8] bg-slate-50/50 dark:bg-[#0E1524]/40">
                      <th className="py-3.5 px-5 w-12">#</th>
                      <th className="py-3.5 px-5">Subject</th>
                      <th className="py-3.5 px-5">Department</th>
                      <th className="py-3.5 px-5">Semester</th>
                      <th className="py-3.5 px-5">Units</th>
                      <th className="py-3.5 px-5 min-w-[160px]">Progress</th>
                      <th className="py-3.5 px-5">Last Updated</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-right w-16">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDF2F9] dark:divide-[#1E293B] text-[13.5px]">
                    {filteredSyllabus.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="py-10 text-center text-[#94A3B8]">
                          No matching syllabus records found.
                        </td>
                      </tr>
                    ) : (
                      filteredSyllabus.map((item, index) => {
                        const isPublished = item.status === 'Published';
                        const isFull = item.progress === 100;

                        return (
                          <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-[#1A2640]/50 transition-colors">
                            <td className="py-4 px-5 text-[#64748B] dark:text-[#94A3B8] font-medium">
                              {index + 1}
                            </td>
                            <td className="py-4 px-5 font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                              {item.subject}
                            </td>
                            <td className="py-4 px-5 text-[#475569] dark:text-[#CBD5E1]">
                              {item.department}
                            </td>
                            <td className="py-4 px-5 text-[#475569] dark:text-[#CBD5E1] font-semibold">
                              {item.semester}
                            </td>
                            <td className="py-4 px-5 text-[#475569] dark:text-[#CBD5E1] font-semibold">
                              {item.units}
                            </td>
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-2.5">
                                <div className="flex-1 h-2 bg-[#E2E8F0] dark:bg-[#1E293B] rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                      isFull ? 'bg-[#10B981]' : item.progress >= 70 ? 'bg-[#10B981]' : 'bg-[#F59E0B]'
                                    }`}
                                    style={{ width: `${item.progress}%` }}
                                  />
                                </div>
                                <span className="text-[12px] font-bold text-[#475569] dark:text-[#CBD5E1] w-9 tabular-nums">
                                  {item.progress}%
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-5 text-[#64748B] dark:text-[#94A3B8] text-[12.5px]">
                              {item.lastUpdated}
                            </td>
                            <td className="py-4 px-5">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-bold border ${
                                  isPublished
                                    ? 'bg-[#EBFBF3] dark:bg-[#0D291C] border-[#B7F1D0] dark:border-[#1E5037] text-[#10B981]'
                                    : 'bg-[#F0F7FF] dark:bg-[#12233C] border-[#BAE0FD] dark:border-[#1D3A63] text-[#0075FF]'
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-right">
                              <button
                                type="button"
                                onClick={() => alert(`Options for ${item.subject}`)}
                                className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <MoreHorizontal className="w-4.5 h-4.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#EDF2F9] dark:border-[#1E293B] text-[12px] font-bold text-[#64748B] dark:text-[#94A3B8] bg-slate-50/50 dark:bg-[#0E1524]/40">
                      <th className="py-3.5 px-5">#</th>
                      <th className="py-3.5 px-5">Exam Title</th>
                      <th className="py-3.5 px-5">Department</th>
                      <th className="py-3.5 px-5">Date</th>
                      <th className="py-3.5 px-5">Time Slot</th>
                      <th className="py-3.5 px-5">Room / Hall</th>
                      <th className="py-3.5 px-5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDF2F9] dark:divide-[#1E293B] text-[13.5px]">
                    {examList.map((exam, i) => (
                      <tr key={exam.id} className="hover:bg-slate-50/80 dark:hover:bg-[#1A2640]/50 transition-colors">
                        <td className="py-4 px-5 text-[#64748B] font-medium">{i + 1}</td>
                        <td className="py-4 px-5 font-bold text-[#0F172A] dark:text-[#F8FAFC]">{exam.subject}</td>
                        <td className="py-4 px-5 text-[#475569] dark:text-[#CBD5E1]">{exam.department}</td>
                        <td className="py-4 px-5 text-[#0075FF] font-semibold">{exam.date}</td>
                        <td className="py-4 px-5 text-[#64748B] dark:text-[#94A3B8]">{exam.time}</td>
                        <td className="py-4 px-5 font-medium">{exam.room}</td>
                        <td className="py-4 px-5 text-right">
                          <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11.5px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-200 dark:border-emerald-900">
                            {exam.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Table Footer: Pagination matching screenshot */}
            <div className="p-4 border-t border-[#EDF2F9] dark:border-[#1E293B] flex items-center justify-between text-[12.5px]">
              <span className="text-[#64748B] dark:text-[#94A3B8]">
                Showing 1–{filteredSyllabus.length} of 24 syllabus
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-[8px] border border-[#E2E8F0] dark:border-[#26354D] flex items-center justify-center text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-50 dark:hover:bg-[#1A2640] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {[1, 2, 3, 4, 5].map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-[8px] font-bold text-[12.5px] transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#0075FF] text-white shadow-xs'
                        : 'border border-[#E2E8F0] dark:border-[#26354D] text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-50 dark:hover:bg-[#1A2640]'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                  className="w-8 h-8 rounded-[8px] border border-[#E2E8F0] dark:border-[#26354D] flex items-center justify-center text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-50 dark:hover:bg-[#1A2640] cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </main>

      {/* ======================================================== */}
      {/* 7. MODALS FOR ADMIN ACTIONS */}
      {/* ======================================================== */}
      {modalType === 'add-syllabus' && (
        <div className="fixed inset-0 bg-slate-900/50 apple-backdrop z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131B2E] w-full max-w-[480px] rounded-[24px] p-6 shadow-2xl border border-slate-100 dark:border-[#1E293B] apple-dialog">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B] mb-4">
              <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Add New Syllabus
              </h3>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSyllabusSubmit} className="space-y-4">
              <div>
                <label className="text-[12.5px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                  Subject Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artificial Intelligence & Heuristics"
                  value={newSubject.subject}
                  onChange={(e) => setNewSubject({ ...newSubject, subject: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-[12px] border border-[#CBD5E1] dark:border-[#26354D] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[14px] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0075FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                    Department
                  </label>
                  <select
                    value={newSubject.department}
                    onChange={(e) => setNewSubject({ ...newSubject, department: e.target.value })}
                    className="w-full h-11 px-3 rounded-[12px] border border-[#CBD5E1] dark:border-[#26354D] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[13px] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="B.Sc. AI & ML">B.Sc. AI & ML</option>
                    <option value="B.Tech Computer Science">B.Tech CS</option>
                  </select>
                </div>

                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                    Semester
                  </label>
                  <select
                    value={newSubject.semester}
                    onChange={(e) => setNewSubject({ ...newSubject, semester: e.target.value })}
                    className="w-full h-11 px-3 rounded-[12px] border border-[#CBD5E1] dark:border-[#26354D] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[13px] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                    Units Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newSubject.units}
                    onChange={(e) => setNewSubject({ ...newSubject, units: e.target.value })}
                    className="w-full h-11 px-3 rounded-[12px] border border-[#CBD5E1] dark:border-[#26354D] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[13px] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0075FF]"
                  />
                </div>

                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                    Status
                  </label>
                  <select
                    value={newSubject.status}
                    onChange={(e) => setNewSubject({ ...newSubject, status: e.target.value })}
                    className="w-full h-11 px-3 rounded-[12px] border border-[#CBD5E1] dark:border-[#26354D] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[13px] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="flex-1 h-11 rounded-[12px] border border-slate-200 dark:border-slate-800 text-[13.5px] font-bold text-[#64748B] hover:bg-slate-50 dark:hover:bg-[#1E293B] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-[12px] bg-[#0075FF] hover:bg-[#0066E0] text-white text-[13.5px] font-bold shadow-md shadow-blue-500/25 cursor-pointer"
                >
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Timetable Modal */}
      {modalType === 'upload-timetable' && (
        <div className="fixed inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131B2E] w-full max-w-[760px] rounded-[24px] p-6 shadow-2xl border border-slate-100 dark:border-[#1E293B] apple-dialog max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                  <Calendar className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                    Upload Timetable
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Upload an Excel (.xlsx/.xls) or CSV schedule matrix to publish college classes.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 overflow-y-auto flex-1 pr-1">
              {/* Batch & Semester Selector Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#F8FAFC] dark:bg-[#0E1524] p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    Department / Course
                  </label>
                  <select
                    value={timetableBatch}
                    onChange={(e) => setTimetableBatch(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131B2E] text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="B.Sc. AI & ML">B.Sc. AI & ML</option>
                    <option value="BCA">BCA</option>
                    <option value="B.Sc IT">B.Sc IT</option>
                    <option value="B.Voc (Web Dev)">B.Voc (Web Dev)</option>
                    <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    Semester
                  </label>
                  <select
                    value={timetableSemester}
                    onChange={(e) => setTimetableSemester(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131B2E] text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    Academic Year
                  </label>
                  <div className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131B2E] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center">
                    {timetableAcademicYear}
                  </div>
                </div>
              </div>

              {/* Error Notice */}
              {timetableError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{timetableError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTimetableError(null)}
                    className="text-rose-400 hover:text-rose-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* File Upload / Drag & Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsTimetableDragOver(true);
                }}
                onDragLeave={() => setIsTimetableDragOver(false)}
                onDrop={handleTimetableFileDrop}
                className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
                  isTimetableDragOver
                    ? 'border-[#0075FF] bg-blue-50/60 ring-4 ring-blue-500/10'
                    : 'border-slate-200 hover:border-orange-500 bg-[#F8FAFC] dark:bg-[#0E1524]'
                }`}
              >
                {timetableFileName ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2 shadow-xs">
                      <FileSpreadsheet className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-orange-100 text-orange-700">
                        {timetableFileName.endsWith('.xlsx')
                          ? 'XLSX'
                          : timetableFileName.endsWith('.xls')
                          ? 'XLS'
                          : 'CSV'}
                      </span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all max-w-xs">
                        {timetableFileName}
                      </p>
                    </div>
                    <p className="text-xs text-emerald-600 font-semibold mt-1 mb-3">
                      ✓ {timetablePreviewSlots.length} schedule classes parsed across Mon–Sat
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-2">
                      <Calendar className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      Select or Drag & Drop Timetable Schedule
                    </p>
                    <p className="text-xs text-slate-500 mt-1 mb-3">
                      Supports <span className="font-semibold text-slate-700 dark:text-slate-300">.xlsx, .xls, .csv</span> • Columns: Day, Start Time, End Time, Subject, Room, Type
                    </p>
                  </>
                )}

                {/* Upload & Template Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <label className="h-9 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{timetableFileName ? 'Change File' : 'Browse Timetable'}</span>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                      onChange={handleTimetableFileUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleDownloadTimetableExcelTemplate}
                    className="h-9 px-3 rounded-xl bg-white dark:bg-[#1A2640] border border-slate-200 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Excel Template (.xlsx)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadTimetableCSVTemplate}
                    className="h-9 px-3 rounded-xl bg-white dark:bg-[#1A2640] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>CSV Template</span>
                  </button>
                </div>
              </div>

              {/* Quick 1-Click Demo Callout */}
              <div className="bg-[#FFF7ED] dark:bg-[#341F11] border border-[#FED7AA] dark:border-[#5C3217] rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <p className="text-xs font-bold text-orange-900 dark:text-orange-200">
                      Quick 1-Click Demo Schedule
                    </p>
                  </div>
                  <p className="text-[11px] text-orange-700 dark:text-orange-300 mt-0.5">
                    Instantly load official college schedule (45 classes scheduled Mon–Sat).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadDemoSchedule}
                  className="h-8 px-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shrink-0 cursor-pointer shadow-2xs active:scale-95 transition-all"
                >
                  Load Demo Schedule
                </button>
              </div>

              {/* Day Filter Pills */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Classes ({timetablePreviewSlots.length})
                </span>

                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                  {['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => {
                    const count = d === 'All'
                      ? timetablePreviewSlots.length
                      : timetablePreviewSlots.filter((s) => s.day === d).length;
                    const isActive = timetableActiveDayFilter === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setTimetableActiveDayFilter(d)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#0075FF] text-white shadow-2xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {d} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preview Table */}
              {timetablePreviewSlots.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs border border-slate-100 rounded-xl bg-slate-50 dark:bg-slate-900/40">
                  No timetable slots loaded yet. Upload an Excel/CSV file or click &quot;Load Demo Schedule&quot; above.
                </div>
              ) : (
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700 sticky top-0">
                      <tr>
                        <th className="py-2 px-3">Day</th>
                        <th className="py-2 px-3">Time</th>
                        <th className="py-2 px-3">Subject</th>
                        <th className="py-2 px-3">Room</th>
                        <th className="py-2 px-3">Type</th>
                        <th className="py-2 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {timetablePreviewSlots
                        .filter(
                          (s) =>
                            timetableActiveDayFilter === 'All' ||
                            s.day === timetableActiveDayFilter
                        )
                        .map((slot) => (
                          <tr key={slot.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="py-2 px-3">
                              <span className="font-bold text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                                {slot.day}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-slate-600 dark:text-slate-400 tabular-nums font-medium">
                              {slot.startTime} – {slot.endTime}
                            </td>
                            <td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">
                              {slot.subject}
                            </td>
                            <td className="py-2 px-3 text-slate-600 dark:text-slate-400 font-medium">
                              {slot.room}
                            </td>
                            <td className="py-2 px-3">
                              <span
                                className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  slot.classType === 'Lab'
                                    ? 'bg-purple-100 text-purple-700'
                                    : slot.classType === 'Tutorial'
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                {slot.classType || 'Theory'}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleDeleteTimetableSlot(slot.id)}
                                className="text-slate-400 hover:text-red-500 cursor-pointer transition-colors p-1"
                                title="Remove slot"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Add Single Slot Manually Toggle & Form */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddSlotExpanded(!isAddSlotExpanded)}
                  className="text-xs font-bold text-[#0075FF] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddSlotExpanded ? 'Hide manual entry' : '+ Add class slot manually'}</span>
                </button>

                {isAddSlotExpanded && (
                  <form onSubmit={handleAddManualSlot} className="mt-2.5 p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-1">Day</label>
                        <select
                          value={newSlotForm.day}
                          onChange={(e) => setNewSlotForm({ ...newSlotForm, day: e.target.value })}
                          className="w-full h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:border-[#0075FF]"
                        >
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-1">Start Time</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 09:00 AM"
                          value={newSlotForm.startTime}
                          onChange={(e) => setNewSlotForm({ ...newSlotForm, startTime: e.target.value })}
                          className="w-full h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:border-[#0075FF]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-1">End Time</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 09:55 AM"
                          value={newSlotForm.endTime}
                          onChange={(e) => setNewSlotForm({ ...newSlotForm, endTime: e.target.value })}
                          className="w-full h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:border-[#0075FF]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-semibold text-slate-500 block mb-1">Subject</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Python Programming"
                          value={newSlotForm.subject}
                          onChange={(e) => setNewSlotForm({ ...newSlotForm, subject: e.target.value })}
                          className="w-full h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:border-[#0075FF]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-1">Room</label>
                        <input
                          type="text"
                          placeholder="e.g. Room 101"
                          value={newSlotForm.room}
                          onChange={(e) => setNewSlotForm({ ...newSlotForm, room: e.target.value })}
                          className="w-full h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:border-[#0075FF]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsAddSlotExpanded(false)}
                        className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="h-8 px-3 rounded-lg bg-[#0075FF] hover:bg-blue-600 text-white text-xs font-bold cursor-pointer"
                      >
                        Add Slot
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
              {isTimetableUploaded && (
                <button
                  type="button"
                  onClick={handleResetTimetableToDefault}
                  className="h-11 px-3.5 rounded-xl border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                >
                  Reset Default
                </button>
              )}

              <div className="flex gap-2.5 flex-1 justify-end">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="h-11 px-5 rounded-xl border border-slate-200 text-sm font-bold text-[#64748B] hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={timetablePreviewSlots.length === 0}
                  onClick={handleConfirmTimetableUpload}
                  className="h-11 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md shadow-orange-500/20 cursor-pointer active:scale-95 transition-all"
                >
                  Publish Timetable ({timetablePreviewSlots.length} Classes)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generic Modal for Quick Access Actions */}
      {modalType && modalType !== 'add-syllabus' && modalType !== 'upload-timetable' && (
        <div className="fixed inset-0 bg-slate-900/50 apple-backdrop z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131B2E] w-full max-w-[420px] rounded-[24px] p-6 shadow-2xl border border-slate-100 dark:border-[#1E293B] apple-dialog text-center">
            <div className="w-12 h-12 rounded-[16px] bg-[#EAF3FF] dark:bg-[#182844] flex items-center justify-center text-[#0075FF] mx-auto mb-3.5">
              <UserPlus className="w-6 h-6 stroke-[2.2]" />
            </div>

            <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC] capitalize mb-1.5">
              {modalType.replace('-', ' ')}
            </h3>
            <p className="text-[13px] text-[#64748B] dark:text-[#94A3B8] mb-5 leading-relaxed">
              Enter institutional credentials and enroll the new {modalType.split('-')[1]} into the portal database.
            </p>

            <div className="space-y-3 mb-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-11 px-3.5 rounded-[12px] border border-slate-200 dark:border-[#223354] bg-[#F8FAFC] dark:bg-[#0B0F19] text-[13.5px] focus:outline-none focus:border-[#0075FF]"
              />
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="flex-1 h-11 rounded-[12px] border border-slate-200 dark:border-slate-800 text-[13px] font-bold text-[#64748B] hover:bg-slate-50 dark:hover:bg-[#1A2640] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Action submitted successfully.');
                  setModalType(null);
                }}
                className="flex-1 h-11 rounded-[12px] bg-[#0075FF] hover:bg-[#0066E0] text-white text-[13px] font-bold shadow-md shadow-blue-500/25 cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[480px] rounded-[24px] p-6 shadow-2xl border border-slate-100 apple-dialog">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-[18px] font-bold text-[#0F172A]">
                  Add New Student
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fill in the details to enroll a new student.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddStudentModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-4">
              <div>
                <label className="text-[12.5px] font-bold text-[#475569] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aman Kumar"
                  value={newStudentForm.name}
                  onChange={(e) =>
                    setNewStudentForm({ ...newStudentForm, name: e.target.value })
                  }
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none focus:border-[#0075FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] block mb-1">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 23BCA025"
                    value={newStudentForm.rollNumber}
                    onChange={(e) =>
                      setNewStudentForm({ ...newStudentForm, rollNumber: e.target.value })
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none focus:border-[#0075FF]"
                  />
                </div>

                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] block mb-1">
                    Status
                  </label>
                  <select
                    value={newStudentForm.status}
                    onChange={(e) =>
                      setNewStudentForm({ ...newStudentForm, status: e.target.value })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] block mb-1">
                    Course
                  </label>
                  <select
                    value={newStudentForm.course}
                    onChange={(e) =>
                      setNewStudentForm({ ...newStudentForm, course: e.target.value })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="BCA">BCA</option>
                    <option value="B.Sc IT">B.Sc IT</option>
                    <option value="B.Voc (Web Dev)">B.Voc (Web Dev)</option>
                    <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                    <option value="B.Sc AI & ML">B.Sc AI & ML</option>
                  </select>
                </div>

                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] block mb-1">
                    Semester
                  </label>
                  <select
                    value={newStudentForm.semester}
                    onChange={(e) =>
                      setNewStudentForm({ ...newStudentForm, semester: e.target.value })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddStudentModalOpen(false)}
                  className="flex-1 h-11 rounded-xl border border-slate-200 text-sm font-bold text-[#64748B] hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-[#0075FF] hover:bg-[#0066E0] text-white text-sm font-bold shadow-md shadow-blue-500/25 cursor-pointer"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Students Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[580px] rounded-[24px] p-6 shadow-2xl border border-slate-100 apple-dialog max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#0075FF] flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#0F172A]">
                    Import Students
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload an Excel (.xlsx, .xls) or CSV file to bulk enroll students.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 overflow-y-auto flex-1 pr-1">
              {/* Error Notice */}
              {importError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{importError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setImportError(null)}
                    className="text-rose-400 hover:text-rose-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* File Upload / Drag & Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleFileDrop}
                className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
                  isDragOver
                    ? 'border-[#0075FF] bg-blue-50/60 ring-4 ring-blue-500/10'
                    : 'border-slate-200 hover:border-[#0075FF] bg-[#F8FAFC]'
                }`}
              >
                {importFileName ? (
                  <div className="flex flex-col items-center">
                    {importFileName.endsWith('.xlsx') || importFileName.endsWith('.xls') ? (
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 shadow-xs">
                        <FileSpreadsheet className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2 shadow-xs">
                        <Upload className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md ${
                          importFileName.endsWith('.xlsx') || importFileName.endsWith('.xls')
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {importFileName.endsWith('.xlsx')
                          ? 'XLSX'
                          : importFileName.endsWith('.xls')
                          ? 'XLS'
                          : 'CSV'}
                      </span>
                      <p className="text-sm font-bold text-slate-800 break-all max-w-xs">
                        {importFileName}
                      </p>
                    </div>
                    <p className="text-xs text-emerald-600 font-semibold mt-1 mb-3">
                      ✓ {importPreviewList.length} student rows ready for preview
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0075FF] flex items-center justify-center mx-auto mb-2">
                      <FileSpreadsheet className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <p className="text-sm font-bold text-slate-800">
                      Select or Drag & Drop Excel or CSV File
                    </p>
                    <p className="text-xs text-slate-500 mt-1 mb-3">
                      Supports <span className="font-semibold text-slate-700">.xlsx, .xls, .csv</span> • Columns: Name, Roll No, Course, Semester, Status
                    </p>
                  </>
                )}

                {/* Upload & Template Actions */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <label className="h-9 px-4 rounded-xl bg-[#0075FF] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{importFileName ? 'Change File' : 'Browse Excel / CSV'}</span>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleDownloadSampleExcel}
                    className="h-9 px-3 rounded-xl bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-50/50 hover:border-emerald-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Excel Template (.xlsx)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadSampleCSV}
                    className="h-9 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>CSV Template</span>
                  </button>
                </div>
              </div>

              {/* Quick Test Demo Option */}
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0075FF]" />
                    <p className="text-xs font-bold text-blue-900">
                      Quick 1-Click Test Demo
                    </p>
                  </div>
                  <p className="text-[11px] text-blue-700 mt-0.5">
                    Load 10 pre-verified sample students ready to import immediately.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setImportPreviewList(DEMO_IMPORT_STUDENTS);
                    setImportFileName('demo_student_batch.xlsx');
                    setImportError(null);
                  }}
                  className="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 cursor-pointer shadow-2xs active:scale-95 transition-all"
                >
                  Load 10 Demo
                </button>
              </div>

              {/* Preview Table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Records to Import ({importPreviewList.length})
                  </span>
                  {importPreviewList.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setImportPreviewList([]);
                        setImportFileName('');
                      }}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {importPreviewList.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs border border-slate-100 rounded-xl bg-slate-50">
                    No records loaded yet. Upload an Excel (.xlsx/.xls), CSV, or click &quot;Load 10 Demo&quot; above.
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 sticky top-0">
                        <tr>
                          <th className="py-2 px-3">#</th>
                          <th className="py-2 px-3">Name</th>
                          <th className="py-2 px-3">Roll No</th>
                          <th className="py-2 px-3">Course</th>
                          <th className="py-2 px-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {importPreviewList.map((st, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="py-2 px-3 text-slate-400">{i + 1}</td>
                            <td className="py-2 px-3 font-bold text-slate-900">{st.name}</td>
                            <td className="py-2 px-3 text-slate-600">{st.rollNumber}</td>
                            <td className="py-2 px-3 text-slate-600">{st.course}</td>
                            <td className="py-2 px-3 text-right">
                              <span
                                className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  st.status === 'Inactive'
                                    ? 'bg-rose-50 text-rose-600'
                                    : 'bg-[#E8F9EE] text-[#16A34A]'
                                }`}
                              >
                                {st.status || 'Active'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 mt-2 border-t border-slate-100 flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="flex-1 h-11 rounded-xl border border-slate-200 text-sm font-bold text-[#64748B] hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={importPreviewList.length === 0}
                onClick={handleConfirmImport}
                className="flex-1 h-11 rounded-xl bg-[#0075FF] hover:bg-[#0066E0] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md shadow-blue-500/25 cursor-pointer active:scale-95 transition-all"
              >
                Confirm Import ({importPreviewList.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {isAddTeacherModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[500px] rounded-[24px] p-6 shadow-2xl border border-slate-100 apple-dialog max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#0F172A]">
                    Add Faculty Member
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Register institutional teacher and course assignment.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddTeacherModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTeacherSubmit} className="space-y-4 overflow-y-auto flex-1 pr-1">
              <div>
                <label className="text-[12.5px] font-bold text-[#475569] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={newTeacherForm.name}
                  onChange={(e) =>
                    setNewTeacherForm({ ...newTeacherForm, name: e.target.value })
                  }
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none focus:border-[#0075FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] block mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. FAC202615 (or auto)"
                    value={newTeacherForm.empId}
                    onChange={(e) =>
                      setNewTeacherForm({ ...newTeacherForm, empId: e.target.value })
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none focus:border-[#0075FF]"
                  />
                </div>

                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] block mb-1">
                    Status
                  </label>
                  <select
                    value={newTeacherForm.status}
                    onChange={(e) =>
                      setNewTeacherForm({ ...newTeacherForm, status: e.target.value })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] block mb-1">
                    Department
                  </label>
                  <select
                    value={newTeacherForm.department}
                    onChange={(e) =>
                      setNewTeacherForm({ ...newTeacherForm, department: e.target.value })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="B.Sc AI & ML">B.Sc AI & ML</option>
                    <option value="BCA">BCA</option>
                    <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                    <option value="B.Sc IT">B.Sc IT</option>
                    <option value="B.Voc (Web Dev)">B.Voc (Web Dev)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[12.5px] font-bold text-[#475569] block mb-1">
                    Designation
                  </label>
                  <select
                    value={newTeacherForm.designation}
                    onChange={(e) =>
                      setNewTeacherForm({ ...newTeacherForm, designation: e.target.value })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none focus:border-[#0075FF]"
                  >
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Professor & HOD">Professor & HOD</option>
                    <option value="Visiting Faculty">Visiting Faculty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[12.5px] font-bold text-[#475569] block mb-1">
                  Assigned Subjects
                </label>
                <input
                  type="text"
                  placeholder="e.g. Machine Learning, Python Programming"
                  value={newTeacherForm.subjects}
                  onChange={(e) =>
                    setNewTeacherForm({ ...newTeacherForm, subjects: e.target.value })
                  }
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none focus:border-[#0075FF]"
                />
              </div>

              <div>
                <label className="text-[12.5px] font-bold text-[#475569] block mb-1">
                  Institutional Email
                </label>
                <input
                  type="email"
                  placeholder="e.g. rajesh.sharma@college.edu"
                  value={newTeacherForm.email}
                  onChange={(e) =>
                    setNewTeacherForm({ ...newTeacherForm, email: e.target.value })
                  }
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none focus:border-[#0075FF]"
                />
              </div>

              {/* Bulk upload prompt */}
              <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-xl flex items-center justify-between">
                <span className="text-xs text-purple-900 font-medium">Have an Excel or CSV faculty roster?</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddTeacherModalOpen(false);
                    handleOpenImportTeachersModal();
                  }}
                  className="text-xs font-bold text-purple-700 hover:text-purple-900 underline cursor-pointer"
                >
                  Bulk Import
                </button>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddTeacherModalOpen(false)}
                  className="flex-1 h-11 rounded-xl border border-slate-200 text-sm font-bold text-[#64748B] hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-[#0075FF] hover:bg-[#0066E0] text-white text-sm font-bold shadow-md shadow-blue-500/25 cursor-pointer"
                >
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Teachers Modal */}
      {isImportTeacherModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 apple-backdrop z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[580px] rounded-[24px] p-6 shadow-2xl border border-slate-100 apple-dialog max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#0F172A]">
                    Import Faculty & Teachers
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload an Excel (.xlsx, .xls) or CSV file to bulk import faculty.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsImportTeacherModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 overflow-y-auto flex-1 pr-1">
              {/* Error Notice */}
              {importTeacherError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{importTeacherError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setImportTeacherError(null)}
                    className="text-rose-400 hover:text-rose-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* File Upload / Drag & Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsTeacherDragOver(true);
                }}
                onDragLeave={() => setIsTeacherDragOver(false)}
                onDrop={handleTeacherFileDrop}
                className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
                  isTeacherDragOver
                    ? 'border-purple-500 bg-purple-50/60 ring-4 ring-purple-500/10'
                    : 'border-slate-200 hover:border-purple-500 bg-[#F8FAFC]'
                }`}
              >
                {importTeacherFileName ? (
                  <div className="flex flex-col items-center">
                    {importTeacherFileName.endsWith('.xlsx') || importTeacherFileName.endsWith('.xls') ? (
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 shadow-xs">
                        <FileSpreadsheet className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2 shadow-xs">
                        <Upload className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md ${
                          importTeacherFileName.endsWith('.xlsx') || importTeacherFileName.endsWith('.xls')
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {importTeacherFileName.endsWith('.xlsx')
                          ? 'XLSX'
                          : importTeacherFileName.endsWith('.xls')
                          ? 'XLS'
                          : 'CSV'}
                      </span>
                      <p className="text-sm font-bold text-slate-800 break-all max-w-xs">
                        {importTeacherFileName}
                      </p>
                    </div>
                    <p className="text-xs text-emerald-600 font-semibold mt-1 mb-3">
                      ✓ {importTeacherPreviewList.length} faculty rows ready for preview
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-2">
                      <FileSpreadsheet className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <p className="text-sm font-bold text-slate-800">
                      Select or Drag & Drop Faculty Excel or CSV File
                    </p>
                    <p className="text-xs text-slate-500 mt-1 mb-3">
                      Supports <span className="font-semibold text-slate-700">.xlsx, .xls, .csv</span> • Columns: Name, Employee ID, Department, Designation, Subjects, Email
                    </p>
                  </>
                )}

                {/* Upload & Template Actions */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <label className="h-9 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{importTeacherFileName ? 'Change File' : 'Browse Excel / CSV'}</span>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                      onChange={handleTeacherFileUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleDownloadTeacherExcelTemplate}
                    className="h-9 px-3 rounded-xl bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-50/50 hover:border-emerald-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Excel Template (.xlsx)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadTeacherCSVTemplate}
                    className="h-9 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>CSV Template</span>
                  </button>
                </div>
              </div>

              {/* Quick Test Demo Option */}
              <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    <p className="text-xs font-bold text-purple-900">
                      Quick 1-Click Test Demo
                    </p>
                  </div>
                  <p className="text-[11px] text-purple-700 mt-0.5">
                    Load 10 verified faculty members across various departments.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setImportTeacherPreviewList(DEMO_IMPORT_TEACHERS);
                    setImportTeacherFileName('demo_faculty_batch.xlsx');
                    setImportTeacherError(null);
                  }}
                  className="h-8 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shrink-0 cursor-pointer shadow-2xs active:scale-95 transition-all"
                >
                  Load 10 Demo
                </button>
              </div>

              {/* Preview Table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Records to Import ({importTeacherPreviewList.length})
                  </span>
                  {importTeacherPreviewList.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setImportTeacherPreviewList([]);
                        setImportTeacherFileName('');
                      }}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {importTeacherPreviewList.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs border border-slate-100 rounded-xl bg-slate-50">
                    No faculty records loaded yet. Upload an Excel (.xlsx/.xls), CSV, or click &quot;Load 10 Demo&quot; above.
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 sticky top-0">
                        <tr>
                          <th className="py-2 px-3">#</th>
                          <th className="py-2 px-3">Name</th>
                          <th className="py-2 px-3">Emp ID</th>
                          <th className="py-2 px-3">Department</th>
                          <th className="py-2 px-3">Designation</th>
                          <th className="py-2 px-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {importTeacherPreviewList.map((tc, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="py-2 px-3 text-slate-400">{i + 1}</td>
                            <td className="py-2 px-3 font-bold text-slate-900">{tc.name}</td>
                            <td className="py-2 px-3 text-slate-600 font-mono">{tc.empId}</td>
                            <td className="py-2 px-3 text-slate-600">{tc.department}</td>
                            <td className="py-2 px-3 text-slate-600">{tc.designation}</td>
                            <td className="py-2 px-3 text-right">
                              <span
                                className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  tc.status === 'Inactive'
                                    ? 'bg-rose-50 text-rose-600'
                                    : 'bg-[#E8F9EE] text-[#16A34A]'
                                }`}
                              >
                                {tc.status || 'Active'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 mt-2 border-t border-slate-100 flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsImportTeacherModalOpen(false)}
                className="flex-1 h-11 rounded-xl border border-slate-200 text-sm font-bold text-[#64748B] hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={importTeacherPreviewList.length === 0}
                onClick={handleConfirmImportTeachers}
                className="flex-1 h-11 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md shadow-purple-500/25 cursor-pointer active:scale-95 transition-all"
              >
                Confirm Import ({importTeacherPreviewList.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
