// deliberately minimal service worker: network-first for navigations (so a
// fresh deploy is always picked up over anything cached), cache-first for
// hashed /assets/ files (safe, since every Vite build gives its files new
// hashed names -- a stale cached asset can never collide with a new one).
// no precache manifest on purpose, so this stays path-agnostic regardless
// of the deploy base path.

const CACHE_NAME = "corner-cache-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // navigations: always try the network first, so a new deploy shows up
  // immediately; fall back to cache only if actually offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
    );
    return;
  }

  // hashed build assets: cache-first, since the filename changes whenever
  // the content does.
  if (url.pathname.includes("/assets/")) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            return response;
          })
      )
    );
    return;
  }

  // everything else (fonts, manifest, icons): network-first, cache as a
  // fallback for offline use.
  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// tell every open tab a new version has finished installing, so the page
// can show a small "something new, tap to refresh" pill instead of a real
// (server-dependent) push notification. this fires on every activate,
// including the very first install, which registerSW.ts guards against by
// only listening for this after its own registration call resolves.
self.addEventListener("activate", () => {
  self.clients.matchAll({ type: "window" }).then((clients) => {
    for (const client of clients) {
      client.postMessage({ type: "corner:sw-updated" });
    }
  });
});
