import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DeviceFrame from './components/DeviceFrame';
import RoleSelect from './screens/RoleSelect';
import StudentLogin from './screens/StudentLogin';
import StudentVerifyOtp from './screens/StudentVerifyOtp';
import T1TeacherLogin from './screens/T1TeacherLogin';
import T2VerifyOtp from './screens/T2VerifyOtp';
import T3Consent from './screens/T3Consent';
import T4Dashboard from './screens/T4Dashboard';
import PrivacyPolicy from './screens/PrivacyPolicy';
import TermsOfUse from './screens/TermsOfUse';
import Timetable from './screens/Timetable';
import Subjects from './screens/Subjects';
import ProfileSettings from './screens/ProfileSettings';
import FounderStory from './screens/FounderStory';

import RecordClass from './screens/RecordClass';
import RecordClassSuccess from './screens/RecordClassSuccess';
import StudentDashboard from './screens/StudentDashboard';
import StudentImportantTopics from './screens/StudentImportantTopics';
import StudentNotes from './screens/StudentNotes';
import AdminLogin from './screens/AdminLogin';
import AdminDashboard from './screens/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="w-full h-full flex-1 flex flex-col animate-page-enter">
      <Routes location={location}>
        {/* Landing Screen: Choose Role */}
        <Route path="/" element={<RoleSelect />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/welcome" element={<RoleSelect />} />

        {/* Student Login Flow */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/student-verify-otp" element={<StudentVerifyOtp />} />
        <Route path="/student-otp" element={<StudentVerifyOtp />} />

        {/* Teacher Login Flow */}
        <Route path="/login" element={<T1TeacherLogin />} />
        <Route path="/teacher-login" element={<T1TeacherLogin />} />
        <Route path="/verify-otp" element={<T2VerifyOtp />} />
        <Route path="/consent" element={<T3Consent />} />

        {/* Core Academic Screens */}
        <Route path="/dashboard" element={<T4Dashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/settings" element={<ProfileSettings />} />
        <Route path="/founder-story" element={<FounderStory />} />
        <Route path="/about" element={<FounderStory />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        {/* Academic Screens */}
        <Route path="/notes" element={<StudentNotes />} />
        <Route path="/student/notes" element={<StudentNotes />} />
        <Route path="/student-notes" element={<StudentNotes />} />
        <Route path="/important-topics" element={<StudentImportantTopics />} />
        <Route path="/student/important-topics" element={<StudentImportantTopics />} />
        <Route path="/record-class" element={<RecordClass />} />
        <Route path="/record-class-success" element={<RecordClassSuccess />} />

        {/* Admin Flow - Desktop optimized & authorization guarded */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <DeviceFrame>
          <AnimatedRoutes />
        </DeviceFrame>
      </BrowserRouter>
    </ThemeProvider>
  );
}
