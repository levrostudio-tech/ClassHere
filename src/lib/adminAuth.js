/**
 * Admin Authentication & Authorization Service
 * Enforces authentication independently of viewport width or device type.
 */

const ADMIN_STORAGE_KEY = 'classhere_admin_auth';

// Authorized demo admin credentials
const VALID_CREDENTIALS = [
  { username: 'admin', password: 'admin' },
  { username: 'admin', password: 'admin123' },
  { username: 'superadmin', password: 'admin' },
];

/**
 * Check if current user is an authenticated admin
 * @returns {boolean}
 */
export function isAdminAuthenticated() {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    return Boolean(session && session.token && session.role === 'admin');
  } catch (err) {
    return false;
  }
}

/**
 * Perform admin login authentication
 * @param {string} username 
 * @param {string} password 
 * @returns {{ success: boolean, error?: string }}
 */
export function adminLogin(username, password) {
  const cleanUsername = (username || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  if (!cleanUsername || !cleanPassword) {
    return { success: false, error: 'Please enter both username and password.' };
  }

  const isValid = VALID_CREDENTIALS.some(
    (c) => c.username.toLowerCase() === cleanUsername && c.password === cleanPassword
  );

  if (isValid) {
    const sessionData = {
      username: cleanUsername,
      role: 'admin',
      token: `admin_session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      authenticatedAt: new Date().toISOString(),
    };
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(sessionData));
    localStorage.setItem('classhere_role', 'admin');
    return { success: true };
  }

  return { 
    success: false, 
    error: 'Invalid credentials. Demo login: username "admin", password "admin".' 
  };
}

/**
 * Log out admin user
 */
export function adminLogout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_STORAGE_KEY);
  if (localStorage.getItem('classhere_role') === 'admin') {
    localStorage.removeItem('classhere_role');
  }
}

/**
 * Retrieve current admin profile
 */
export function getAdminUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
