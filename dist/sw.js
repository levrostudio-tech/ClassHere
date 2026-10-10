// ClassHere Progressive Web App Service Worker
const CACHE_NAME = 'classhere-pwa-v2';

// Static App-Shell Assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/assets/campus_illustration_clean.png',
  '/assets/campus_illustration_high.png',
  '/assets/logo_icon.png',
  '/assets/consent_shield.png',
  '/assets/privacy_illustration.png',
  '/assets/terms_illustration.png',
];

// Patterns that must NEVER be cached (sensitive data, auth tokens, Supabase API)
const NEVER_CACHE_PATTERNS = [
  /\/auth\/v1\//,
  /\/rest\/v1\//,
  /supabase\.co/,
  /\/api\//,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Some precache assets failed to fetch:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests and HTTP/HTTPS schemes
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // 1. Strict security check: NEVER cache sensitive auth or private API responses
  const isNeverCache = NEVER_CACHE_PATTERNS.some((pattern) => pattern.test(url.href));
  if (isNeverCache) {
    return;
  }

  // 2. SPA Navigation requests (HTML documents like /dashboard, /timetable, /subjects)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        // Fallback to cached index.html for offline client-side routing
        const cache = await caches.open(CACHE_NAME);
        const cachedIndex = await cache.match('/index.html');
        return cachedIndex || cache.match('/');
      })
    );
    return;
  }

  // 3. Static assets: Stale-While-Revalidate caching strategy
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
