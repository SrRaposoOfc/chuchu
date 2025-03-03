const CACHE_NAME = 'pagina-especial-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/theme.js',
    '/clouds.js',
    '/stars.js',
    '/oneko.js',
    '/food.js',
    '/assets/oneko.gif',
    '/assets/onezumi.gif',
    '/assets/icon-192x192.png',
    '/assets/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
}); 