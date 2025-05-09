const CACHE_NAME = "rentsmart-cache-v1";
const IMAGE_CACHE_NAME = "rentsmart-images-v1";

// List of URLs to cache immediately
const urlsToCache = ["/", "/index.html", "/manifest.json"];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - handle requests
self.addEventListener("fetch", (event) => {
  // Handle image requests with a cache-first strategy
  if (event.request.destination === "image") {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          // Return cached image if found
          if (response) {
            return response;
          }

          // If not in cache, fetch from network
          return fetch(event.request)
            .then((networkResponse) => {
              // Cache the new image
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            .catch(() => {
              // If network fails, return a placeholder image
              return cache.match("/images/placeholder.jpg");
            });
        });
      })
    );
  } else {
    // For non-image requests, use network-first strategy
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});
