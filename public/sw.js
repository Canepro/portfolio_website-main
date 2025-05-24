const CACHE_NAME = 'portfolio-v1.0.0';
const STATIC_CACHE = 'portfolio-static-v1';
const DYNAMIC_CACHE = 'portfolio-dynamic-v1';

const staticAssets = [
  '/',
  '/manifest.json',
  '/_next/static/css/',
  '/_next/static/js/',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

const dynamicAssets = [
  '/api/',
  '/_next/image',
  'https://fonts.googleapis.com/',
  'https://fonts.gstatic.com/'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(staticAssets);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Cache installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external origins (except fonts)
  if (url.origin !== location.origin && !url.origin.includes('fonts.g')) {
    return;
  }

  event.respondWith(
    // Try network first, then cache
    fetch(request)
      .then((response) => {
        // Check if response is valid
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Determine which cache to use
        const cacheName = isStaticAsset(request.url) ? STATIC_CACHE : DYNAMIC_CACHE;

        // Cache the response
        caches.open(cacheName)
          .then((cache) => {
            cache.put(request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request)
          .then((response) => {
            if (response) {
              return response;
            }

            // If no cache match, return offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/');
            }

            // For other requests, return a generic offline response
            return new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

// Push notification handler
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Portfolio Update', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handler for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'UPDATE_CACHE') {
    event.waitUntil(updateCache());
  }
});

// Helper functions
function isStaticAsset(url) {
  return staticAssets.some(asset => url.includes(asset)) ||
         url.includes('/_next/static/') ||
         url.includes('/favicon.ico') ||
         url.includes('/icons/');
}

async function syncContactForm() {
  try {
    // Get stored form data from IndexedDB
    const formData = await getStoredFormData();
    
    if (formData) {
      // Try to submit the form
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Remove from local storage on successful submission
        await removeStoredFormData();
        
        // Show success notification
        self.registration.showNotification('Form Submitted', {
          body: 'Your contact form has been submitted successfully!',
          icon: '/icons/icon-192x192.png'
        });
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

async function updateCache() {
  try {
    const cache = await caches.open(STATIC_CACHE);
    await cache.addAll(staticAssets);
    console.log('Cache updated successfully');
  } catch (error) {
    console.error('Cache update failed:', error);
  }
}

async function getStoredFormData() {
  // Implement IndexedDB retrieval
  return null;
}

async function removeStoredFormData() {
  // Implement IndexedDB removal
  return true;
}

// Performance monitoring
self.addEventListener('fetch', (event) => {
  // Measure cache hit ratio
  const startTime = performance.now();
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Log cache performance
        if (response) {
          console.log(`Cache hit: ${event.request.url} (${duration.toFixed(2)}ms)`);
        }
        
        return response || fetch(event.request);
      })
  );
});

console.log('Service Worker: Loaded and ready!');
