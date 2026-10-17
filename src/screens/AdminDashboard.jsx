import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Printer,
  Trash2,
} from 'lucide-react';
import { adminLogout, getAdminUser } from '../lib/adminAuth';

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

  const handleOpenImportModal = () => {
    setImportPreviewList(DEMO_IMPORT_STUDENTS);
    setImportFileName('demo_student_batch.csv');
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

  const handleCSVFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
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
          const rollIdx = headerCols.findIndex((h) => h.includes('roll'));
          const courseIdx = headerCols.findIndex((h) => h.includes('course'));
          const semIdx = headerCols.findIndex((h) => h.includes('sem'));
          const statusIdx = headerCols.findIndex((h) => h.includes('status'));

          const parsed = [];
          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i]
              .split(',')
              .map((c) => c.replace(/^["']|["']$/g, '').trim());
            if (cols.length === 0 || !cols[0]) continue;

            const name = nameIdx !== -1 ? cols[nameIdx] : cols[0];
            const rollNumber =
              rollIdx !== -1
                ? cols[rollIdx]
                : cols[1] || `23IMP${String(i).padStart(3, '0')}`;
            const course = courseIdx !== -1 ? cols[courseIdx] : cols[2] || 'BCA';
            const semester =
              semIdx !== -1 ? cols[semIdx] : cols[3] || '1st Semester';
            const status =
              statusIdx !== -1 ? cols[statusIdx] : cols[4] || 'Active';

            if (name) {
              parsed.push({
                name,
                rollNumber,
                course,
                semester,
                status,
                joinedOn: '17 Oct 2026',
              });
            }
          }

          if (parsed.length > 0) {
            setImportPreviewList(parsed);
          }
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
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
                    <div className="absolute right-0 top-12 w-48 bg-white border border-slate-100 rounded-xl shadow-lg p-1.5 z-20">
                      <button
                        type="button"
                        onClick={handleExportCSV}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        <FileDown className="w-3.5 h-3.5 text-slate-500" />
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
          <div className="bg-white dark:bg-[#131B2E] rounded-[20px] p-5 border border-[#EDF2F9] dark:border-[#1E293B] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4 apple-card">
            <div className="w-[54px] h-[54px] rounded-[18px] bg-[#F5ECFE] dark:bg-[#251B3B] flex items-center justify-center text-[#9333EA] shrink-0">
              <GraduationCap className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-[#64748B] dark:text-[#94A3B8]">Teachers</p>
              <div className="flex items-baseline gap-2">
                <span className="text-[26px] font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">18</span>
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
                  3
                </span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => alert('Viewing all 3 pending attention alerts.')}
              className="text-[#0075FF] hover:underline text-[13px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Attention Card 1: 2 Subjects without teachers */}
            <div
              onClick={() => setModalType('add-teacher')}
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

            {/* Attention Card 2: Timetable not uploaded */}
            <div
              onClick={() => setModalType('upload-timetable')}
              className="bg-[#FFFBEB] dark:bg-[#281D0D] border border-[#FDE68A] dark:border-[#523A12] rounded-[18px] p-4 flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all apple-card"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-[14px] bg-[#FEF3C7] dark:bg-[#422C0A] flex items-center justify-center text-[#D97706] shrink-0">
                  <Calendar className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                    Timetable not uploaded
                  </h4>
                  <p className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                    Upload timetable for Semester 1.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-[#D97706] shrink-0" />
            </div>

            {/* Attention Card 3: 12 New student registrations */}
            <div
              onClick={() => setModalType('add-student')}
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
              onClick={() => setModalType('add-student')}
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
              onClick={() => setModalType('add-teacher')}
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
              onClick={() => setModalType('upload-timetable')}
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
                  onClick={() => setModalType(activeTableTab === 'syllabus' ? 'add-syllabus' : 'upload-timetable')}
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

      {/* Generic Modal for Quick Access Actions */}
      {modalType && modalType !== 'add-syllabus' && (
        <div className="fixed inset-0 bg-slate-900/50 apple-backdrop z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131B2E] w-full max-w-[420px] rounded-[24px] p-6 shadow-2xl border border-slate-100 dark:border-[#1E293B] apple-dialog text-center">
            <div className="w-12 h-12 rounded-[16px] bg-[#EAF3FF] dark:bg-[#182844] flex items-center justify-center text-[#0075FF] mx-auto mb-3.5">
              {modalType === 'upload-timetable' ? (
                <Upload className="w-6 h-6 stroke-[2.2]" />
              ) : (
                <UserPlus className="w-6 h-6 stroke-[2.2]" />
              )}
            </div>

            <h3 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC] capitalize mb-1.5">
              {modalType.replace('-', ' ')}
            </h3>
            <p className="text-[13px] text-[#64748B] dark:text-[#94A3B8] mb-5 leading-relaxed">
              {modalType === 'upload-timetable'
                ? 'Upload an Excel or CSV schedule matrix for Semester 1 classes.'
                : `Enter institutional credentials and enroll the new ${modalType.split('-')[1]} into the portal database.`}
            </p>

            <div className="space-y-3 mb-5">
              <input
                type="text"
                placeholder={modalType === 'upload-timetable' ? 'Select File (.xlsx, .csv)' : 'Full Name'}
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
          <div className="bg-white w-full max-w-[560px] rounded-[24px] p-6 shadow-2xl border border-slate-100 apple-dialog max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#0075FF] flex items-center justify-center">
                  <Upload className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#0F172A]">
                    Import Students
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload a CSV file or load demo records to bulk enroll students.
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
              {/* File Upload Zone */}
              <div className="border-2 border-dashed border-slate-200 hover:border-[#0075FF] rounded-2xl p-5 text-center transition-colors bg-[#F8FAFC]">
                <Upload className="w-8 h-8 text-[#0075FF] mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">
                  {importFileName || 'Select or Drag & Drop CSV File'}
                </p>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  Format: Name, Roll Number, Course, Semester, Status
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <label className="h-9 px-4 rounded-xl bg-[#0075FF] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Browse CSV</span>
                    <input
                      type="file"
                      accept=".csv,text/csv"
                      onChange={handleCSVFileUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleDownloadSampleCSV}
                    className="h-9 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download CSV Template</span>
                  </button>
                </div>
              </div>

              {/* Quick Test Demo Option */}
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-blue-900">
                    Quick 1-Click Test Demo
                  </p>
                  <p className="text-[11px] text-blue-700 mt-0.5">
                    Load 10 sample verified students ready to import immediately.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setImportPreviewList(DEMO_IMPORT_STUDENTS);
                    setImportFileName('demo_student_batch.csv');
                  }}
                  className="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 cursor-pointer shadow-2xs"
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
                      onClick={() => setImportPreviewList([])}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {importPreviewList.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs border border-slate-100 rounded-xl bg-slate-50">
                    No records loaded yet. Choose a CSV or click &quot;Load 10 Demo&quot; above.
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
                              <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F9EE] text-[#16A34A]">
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
                className="flex-1 h-11 rounded-xl bg-[#0075FF] hover:bg-[#0066E0] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md shadow-blue-500/25 cursor-pointer"
              >
                Confirm Import ({importPreviewList.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
