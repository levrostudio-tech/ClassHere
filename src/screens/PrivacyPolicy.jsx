import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  User,
  Phone,
  FileText,
  Settings,
  Shield,
  Users,
  Trash2,
  Mail,
} from 'lucide-react';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-full flex flex-col bg-white select-none overflow-y-auto no-scrollbar">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-5 py-3.5 flex items-center border-b border-slate-100">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="w-9 h-9 flex items-center justify-center rounded-[12px] bg-slate-50 border border-slate-200 text-[#0F172A] active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <h1 className="flex-1 text-center font-bold text-[18px] text-[#0F172A] pr-9">
          Privacy Policy
        </h1>
      </div>

      {/* Hero / Header Section */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between gap-2">
          {/* Left Intro */}
          <div className="flex-1 pr-2">
            <div className="font-extrabold text-[26px] tracking-tight leading-none mb-2">
              <span className="text-[#0F172A]">Class</span>
              <span className="text-[#0075FF]">Here</span>
            </div>
            <p className="text-[13.5px] font-normal text-[#475569] leading-snug mb-2.5">
              Your privacy matters. Here’s how we collect, use and protect your information.
            </p>
            <span className="inline-block bg-[#EFF4FB] text-[#64748B] text-[11.5px] font-medium px-3 py-1 rounded-full">
              A product by Levro Studio
            </span>
          </div>

          {/* Right Illustration */}
          <div className="w-36 h-32 shrink-0 flex items-center justify-center">
            <img
              src="/assets/privacy_illustration.png"
              alt="Privacy Illustration"
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,117,255,0.12)]"
            />
          </div>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="px-5 py-4 space-y-6 flex-1">
        {/* 1. Information We Collect */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#EBF5FF] flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-[#0075FF] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              1. Information We Collect
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed mb-2.5">
              We collect only the information needed to provide ClassHere services, such as:
            </p>
            {/* Inner Details Box */}
            <div className="bg-[#F0F6FE] rounded-[16px] p-3 space-y-2 border border-[#E2EDFD]/80">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0075FF] shrink-0" />
                <span className="text-[12.5px] font-medium text-[#334155]">
                  Mobile number (for login via OTP)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-[#0075FF] shrink-0" />
                <span className="text-[12.5px] font-medium text-[#334155]">
                  Name, roll number, course and college details
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-[#0075FF] shrink-0 mt-0.5" />
                <span className="text-[12.5px] font-medium text-[#334155] leading-snug">
                  Academic data like timetable, notes and attendance (shared by your college/teachers)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. How We Use Your Information */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#E8F9EE] flex items-center justify-center shrink-0">
            <Settings className="w-5 h-5 text-[#16A34A] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              2. How We Use Your Information
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              We use your information to:
            </p>
            <ul className="text-[13px] text-[#475569] leading-relaxed list-disc list-inside mt-1 space-y-0.5">
              <li>Provide and improve ClassHere features</li>
              <li>Show your classes, notes, timetable and attendance</li>
              <li>Communicate important updates from your college</li>
              <li>Keep your account secure</li>
            </ul>
          </div>
        </div>

        {/* 3. Data Protection */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#F5F3FF] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-[#7C3AED] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              3. Data Protection
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              We take reasonable security measures to protect your information from unauthorized access, loss or misuse. Your data is stored securely and accessed only by authorized personnel.
            </p>
          </div>
        </div>

        {/* 4. Data Sharing */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#FEF3C7] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-[#D97706] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              4. Data Sharing
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              We do not sell your personal information. We only share data with your college/teachers as required to provide core features (like attendance, timetable and academic resources).
            </p>
          </div>
        </div>

        {/* 5. Your Rights */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#FEE2E2] flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5 text-[#EF4444] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              5. Your Rights
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              You can request access, correction or deletion of your personal data by contacting us at{' '}
              <a
                href="mailto:support@levro.studio"
                className="text-[#0075FF] font-medium hover:underline"
              >
                support@levro.studio
              </a>
              .
            </p>
          </div>
        </div>

        {/* 6. Changes to This Policy */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#EFF6FF] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#2563EB] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              6. Changes to This Policy
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you about any major changes through the app.
            </p>
          </div>
        </div>

        {/* 7. Contact Us */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#E8F9EE] flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-[#16A34A] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              7. Contact Us
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              If you have any questions about this Privacy Policy, contact us at{' '}
              <a
                href="mailto:support@levro.studio"
                className="text-[#0075FF] font-medium hover:underline"
              >
                support@levro.studio
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer timestamp */}
        <div className="pt-2 pb-6 text-left">
          <p className="text-[12px] text-[#94A3B8]">
            Last updated: 26 Sep 2026
          </p>
        </div>
      </div>
    </div>
  );
}
