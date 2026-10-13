import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { adminLogin, isAdminAuthenticated } from '../lib/adminAuth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect straight to admin dashboard
  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);

    // Enforce actual authentication
    const result = adminLogin(username, password);
    setIsLoading(false);

    if (result.success) {
      const target = location.state?.from?.pathname || '/admin/dashboard';
      navigate(target, { replace: true });
    } else {
      setError(result.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-[#0B0F19] px-4 py-8 select-none transition-colors duration-200">
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center">
        {/* Brand Logo Text: "Class" in vibrant blue, "Here" in dark slate */}
        <div className="font-extrabold text-[34px] sm:text-[36px] tracking-tight text-center leading-none">
          <span className="text-[#0075FF]">Class</span>
          <span className="text-[#0F172A] dark:text-[#F8FAFC]">Here</span>
        </div>

        {/* Heading */}
        <h1 className="text-[28px] sm:text-[32px] font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mt-3 mb-8 text-center">
          Admin Login
        </h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5" noValidate>
          {/* Error Message Banner */}
          {error && (
            <div className="p-3 rounded-[12px] bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center gap-2.5 text-red-600 dark:text-red-400 text-[13px] font-medium animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Username Field */}
          <div>
            <label
              htmlFor="admin-username"
              className="block text-[14px] font-normal text-[#64748B] dark:text-[#94A3B8] mb-2"
            >
              Username
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-[#94A3B8] dark:text-[#64748B] pointer-events-none">
                <User className="w-[18px] h-[18px] stroke-[2]" />
              </div>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your username"
                className="w-full h-[48px] pl-10 pr-4 rounded-[12px] border border-[#CBD5E1] dark:border-[#26354D] bg-white dark:bg-[#131B2E] text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#94A3B8] text-[15px] focus:outline-none focus:border-[#0075FF] dark:focus:border-[#3894FF] focus:ring-2 focus:ring-[#0075FF]/10 transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="admin-password"
              className="block text-[14px] font-normal text-[#64748B] dark:text-[#94A3B8] mb-2"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-[#94A3B8] dark:text-[#64748B] pointer-events-none">
                <Lock className="w-[18px] h-[18px] stroke-[2]" />
              </div>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your password"
                className="w-full h-[48px] pl-10 pr-11 rounded-[12px] border border-[#CBD5E1] dark:border-[#26354D] bg-white dark:bg-[#131B2E] text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#94A3B8] text-[15px] focus:outline-none focus:border-[#0075FF] dark:focus:border-[#3894FF] focus:ring-2 focus:ring-[#0075FF]/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-[#94A3B8] hover:text-[#475569] dark:hover:text-[#CBD5E1] transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-[19px] h-[19px] stroke-[2]" />
                ) : (
                  <Eye className="w-[19px] h-[19px] stroke-[2]" />
                )}
              </button>
            </div>
          </div>

          {/* Login Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[48px] rounded-[12px] bg-[#0075FF] hover:bg-[#0066E0] text-white font-medium text-[16px] transition-all active:scale-[0.99] shadow-sm hover:shadow flex items-center justify-center cursor-pointer disabled:opacity-60"
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Demo Helper Note */}
        <p className="text-[12px] text-[#94A3B8] dark:text-[#64748B] text-center mt-6">
          Authorized demo access: Username <span className="font-semibold text-[#0075FF] dark:text-[#3894FF]">admin</span>, Password <span className="font-semibold text-[#0075FF] dark:text-[#3894FF]">admin</span>
        </p>
      </div>
    </div>
  );
}
