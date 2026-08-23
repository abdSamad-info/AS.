// Service Worker for Abdul Samad Engineering Portfolio
// Provides Stale-While-Revalidate caching for instant rendering, offline capabilities, and zero-delay loads

const CACHE_NAME = "abdsamad-portfolio-v1";

const STATIC_PRECACHE_URLS = [
  "/",
  "/index.html",
  "/favicon.svg",
  "/robots.txt",
  "/sitemap.xml",
  "/images/presia.png",
  "/images/abdfolio.png"
];

// Install event - Pre-cache core shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_PRECACHE_URLS))
      .then(() => self.skipWaiting())
      .catch((err) => console.log("[SW] Pre-cache failed:", err))
  );
});

// Activate event - Clean up older version caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - Cache-First for static assets, Stale-While-Revalidate for HTML, Network-Only for /api
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Bypass API endpoints, admin actions, and non-GET requests
  if (request.method !== "GET" || url.pathname.startsWith("/api/")) {
    return;
  }

  // 2. Static Assets (Scripts, Styles, Fonts, Images) -> Cache-First with Network fallback
  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".pdf") ||
    url.hostname.includes("fonts.googleapis.com") ||
    url.hostname.includes("fonts.gstatic.com")
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache immediately
          return cachedResponse;
        }
        // Fetch from network and cache for subsequent visits
        return fetch(request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === "opaque") {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
    return;
  }

  // 3. Navigation / HTML Document -> Stale-While-Revalidate (Instant load from cache, refresh in background)
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
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

        // Return cached page instantly if available; otherwise wait for network fetch
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 4. Default fallback: Network with Cache fallback
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        return networkResponse;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});
