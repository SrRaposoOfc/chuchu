const CACHE_NAME = 'perfeita-v1';
const urlsToCache = [
    '/meubebe/',
    '/meubebe/index.html',
    '/meubebe/styles.css',
    '/meubebe/script.js',
    '/meubebe/theme.js',
    '/meubebe/clouds.js',
    '/meubebe/stars.js',
    '/meubebe/oneko.js',
    '/meubebe/food.js',
    '/meubebe/assets/oneko.gif',
    '/meubebe/assets/onezumi.gif',
    '/meubebe/assets/icon-192x192.png',
    '/meubebe/assets/icon-512x512.png'
];

// Instalação
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

// Ativação
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
}); 