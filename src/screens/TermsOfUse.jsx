import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  User,
  GraduationCap,
  Users,
  FileText,
  Ban,
  Shield,
  Settings,
  Mail,
} from 'lucide-react';

export default function TermsOfUse() {
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
          Terms of Use
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
              These terms explain how you can use ClassHere and what you can expect from us.
            </p>
            <span className="inline-block bg-[#EFF4FB] text-[#64748B] text-[11.5px] font-medium px-3 py-1 rounded-full">
              A product by Levro Studio
            </span>
          </div>

          {/* Right Illustration */}
          <div className="w-36 h-32 shrink-0 flex items-center justify-center">
            <img
              src="/assets/terms_illustration.png"
              alt="Terms of Use Illustration"
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,117,255,0.12)]"
            />
          </div>
        </div>
      </div>

      {/* Terms Sections */}
      <div className="px-5 py-4 space-y-6 flex-1">
        {/* 1. Acceptance of Terms */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#EBF5FF] flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-[#0075FF] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              1. Acceptance of Terms
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              By using ClassHere, you agree to these Terms of Use. If you do not agree, please do not use the app.
            </p>
          </div>
        </div>

        {/* 2. About ClassHere */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#E8F9EE] flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-[#16A34A] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              2. About ClassHere
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              ClassHere is an academic platform for college students and teachers to access timetables, notes, assignments, attendance and other educational information.
            </p>
          </div>
        </div>

        {/* 3. User Accounts */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#F3E8FF] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-[#9333EA] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              3. User Accounts
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              Students and teachers can create an account using a mobile number (OTP). You are responsible for keeping your account information secure and for all activity under your account.
            </p>
          </div>
        </div>

        {/* 4. Acceptable Use */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#FEF3C7] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#D97706] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              4. Acceptable Use
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              You agree to use ClassHere only for educational purposes. You must not misuse the app, share false information, upload harmful content, or attempt to access data without permission.
            </p>
          </div>
        </div>

        {/* 5. Content Ownership */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#FEE2E2] flex items-center justify-center shrink-0">
            <Ban className="w-5 h-5 text-[#EF4444] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              5. Content Ownership
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              Notes, materials and other content uploaded by teachers or colleges remain their property. You may access and use this content only for personal academic use and may not distribute it without permission.
            </p>
          </div>
        </div>

        {/* 6. Limitation of Liability */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#EFF6FF] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-[#2563EB] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              6. Limitation of Liability
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              ClassHere is provided “as is” for educational use. We do not guarantee that the app will always be error-free or available at all times. We are not responsible for any loss or damage arising from your use of the app.
            </p>
          </div>
        </div>

        {/* 7. Changes to These Terms */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#F1F5F9] flex items-center justify-center shrink-0">
            <Settings className="w-5 h-5 text-[#64748B] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              7. Changes to These Terms
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              We may update these Terms of Use from time to time. We will notify you about any major changes through the app. Continued use of ClassHere after changes means you accept the updated terms.
            </p>
          </div>
        </div>

        {/* 8. Contact Us */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#E8F9EE] flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-[#16A34A] stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15.5px] font-bold text-[#0F172A] mb-1">
              8. Contact Us
            </h2>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              If you have any questions about these Terms of Use, contact us at{' '}
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
