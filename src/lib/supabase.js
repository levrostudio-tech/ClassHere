import { createClient } from '@supabase/supabase-js';

const STORAGE_KEY_URL = 'classhere_supabase_url';
const STORAGE_KEY_ANON = 'classhere_supabase_anon_key';

/**
 * Retrieves the current Supabase configuration:
 * 1. From localStorage if configured by user in Admin Settings
 * 2. From Vite environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
 */
export function getSupabaseConfig() {
  const localUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_URL) : null;
  const localKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_ANON) : null;

  const envObj = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
  const envUrl = envObj.VITE_SUPABASE_URL || '';
  const envKey = envObj.VITE_SUPABASE_ANON_KEY || '';

  if (localUrl && localKey) {
    return {
      url: localUrl.trim(),
      key: localKey.trim(),
      source: 'localStorage',
    };
  }

  if (envUrl && envKey && !envUrl.includes('your-project')) {
    return {
      url: envUrl.trim(),
      key: envKey.trim(),
      source: 'env',
    };
  }

  return {
    url: '',
    key: '',
    source: 'none',
  };
}

/**
 * Validates whether a given URL & Key pair is structurally valid
 */
export function isValidSupabaseCredentials(url, key) {
  if (!url || !key) return false;
  const cleanUrl = url.trim();
  const cleanKey = key.trim();
  return (
    cleanUrl.startsWith('https://') &&
    cleanUrl.includes('.supabase.co') &&
    !cleanUrl.includes('your-project') &&
    cleanKey.length > 20
  );
}

// Current runtime client instance
let currentClient = null;
let currentConfig = getSupabaseConfig();

function createSupabaseInstance(url, key) {
  if (!isValidSupabaseCredentials(url, key)) return null;
  try {
    return createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } catch (err) {
    console.error('Failed to create Supabase client:', err);
    return null;
  }
}

currentClient = createSupabaseInstance(currentConfig.url, currentConfig.key);

/**
 * Dynamic Supabase client proxy that always routes to the active client
 */
export const supabase = new Proxy({}, {
  get(target, prop) {
    if (!currentClient) {
      return undefined;
    }
    const val = currentClient[prop];
    return typeof val === 'function' ? val.bind(currentClient) : val;
  },
});

/**
 * Flag indicating whether Supabase has valid credentials configured
 */
export const isSupabaseConfigured = Boolean(currentClient);

/**
 * Saves new Supabase credentials to localStorage and re-initializes client
 */
export function saveSupabaseConfig(url, key) {
  if (typeof window === 'undefined') return false;

  const cleanUrl = (url || '').trim();
  const cleanKey = (key || '').trim();

  localStorage.setItem(STORAGE_KEY_URL, cleanUrl);
  localStorage.setItem(STORAGE_KEY_ANON, cleanKey);

  currentConfig = { url: cleanUrl, key: cleanKey, source: 'localStorage' };
  currentClient = createSupabaseInstance(cleanUrl, cleanKey);

  window.dispatchEvent(
    new CustomEvent('classhere_supabase_changed', {
      detail: { url: cleanUrl, configured: Boolean(currentClient) },
    })
  );

  return Boolean(currentClient);
}

/**
 * Clears saved Supabase credentials and reverts to defaults
 */
export function clearSupabaseConfig() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(STORAGE_KEY_URL);
  localStorage.removeItem(STORAGE_KEY_ANON);

  currentConfig = getSupabaseConfig();
  currentClient = createSupabaseInstance(currentConfig.url, currentConfig.key);

  window.dispatchEvent(
    new CustomEvent('classhere_supabase_changed', {
      detail: { url: '', configured: false },
    })
  );
}

/**
 * Tests connection to a Supabase project by performing a lightweight query
 */
export async function testSupabaseConnection(testUrl = null, testKey = null) {
  const url = testUrl || currentConfig.url;
  const key = testKey || currentConfig.key;

  if (!url || !key) {
    return {
      success: false,
      message: 'Supabase URL and Anon Key cannot be empty.',
      latencyMs: 0,
    };
  }

  if (!url.startsWith('https://')) {
    return {
      success: false,
      message: 'Project URL must begin with https:// (e.g. https://xyzcompany.supabase.co)',
      latencyMs: 0,
    };
  }

  try {
    const startTime = performance.now();
    const tempClient = createClient(url.trim(), key.trim(), {
      auth: { persistSession: false },
    });

    // Run quick query against departments or auth endpoint
    const { error } = await tempClient
      .from('departments')
      .select('id')
      .limit(1);

    const endTime = performance.now();
    const latencyMs = Math.round(endTime - startTime);

    if (error) {
      // If table doesn't exist yet, but connection authenticated:
      if (error.code === '42P01') {
        return {
          success: true,
          needsSchema: true,
          message: `Connected successfully (${latencyMs}ms), but the database tables need to be created. Run supabase_schema.sql in your Supabase SQL Editor.`,
          latencyMs,
        };
      }
      return {
        success: false,
        message: `Supabase error (${error.code || 'API'}): ${error.message}`,
        latencyMs,
      };
    }

    return {
      success: true,
      needsSchema: false,
      message: `Connection verified! Response time: ${latencyMs}ms`,
      latencyMs,
    };
  } catch (err) {
    return {
      success: false,
      message: `Network or configuration error: ${err.message || 'Could not reach Supabase endpoint'}`,
      latencyMs: 0,
    };
  }
}
