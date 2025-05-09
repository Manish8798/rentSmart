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
  // For images, use cache-first strategy
  if (event.request.destination === "image") {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          // Return cached image if found
          if (cachedResponse) {
            return cachedResponse;
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
          // If we get a valid response, clone it and cache it
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try to get from cache
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // For other resources, return a basic offline page
            return new Response("Offline - Please check your connection");
          });
        })
    );
  }
});

// Listen for messages from the client
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
  if (event.data === "CLEAR_CACHE") {
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    });
  }
});
