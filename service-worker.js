var dataCacheName = 'tnpwa';
var cacheName = 'tnpwa';
var filesToCache = [
    '/',
    "https://vladimirmalina.github.io/vladimirmalina/fonts/",
    "https://vladimirmalina.github.io/vladimirmalina/fonts/roboto",
    "https://vladimirmalina.github.io/vladimirmalina/fonts/roboto/Roboto-Bold.woff",
    "https://vladimirmalina.github.io/vladimirmalina/fonts/roboto/Roboto-Bold.woff2",
    "https://vladimirmalina.github.io/vladimirmalina/fonts/roboto/Roboto-Light.woff",
    "https://vladimirmalina.github.io/vladimirmalina/fonts/roboto/Roboto-Light.woff2",
    "https://vladimirmalina.github.io/vladimirmalina/fonts/roboto/Roboto-Medium.woff",
    "https://vladimirmalina.github.io/vladimirmalina/fonts/roboto/Roboto-Medium.woff2",
    "https://vladimirmalina.github.io/vladimirmalina/fonts/roboto/Roboto-Regular.woff",
    "https://vladimirmalina.github.io/vladimirmalina/fonts/roboto/Roboto-Regular.woff2",
    "https://vladimirmalina.github.io/vladimirmalina/fonts/roboto/Roboto-Thin.woff",
    "https://vladimirmalina.github.io/vladimirmalina/fonts/roboto/Roboto-Thin.woff2",
    "https://vladimirmalina.github.io/vladimirmalina/images",
    "https://vladimirmalina.github.io/vladimirmalina/images/icons",
    "https://vladimirmalina.github.io/vladimirmalina/images/icons/g1.jpg",
    "https://vladimirmalina.github.io/vladimirmalina/images/icons/g2.jpg",
    "https://vladimirmalina.github.io/vladimirmalina/images/icons/g3.jpg",
    "https://vladimirmalina.github.io/vladimirmalina/images/icons/g4.jpg",
    "https://vladimirmalina.github.io/vladimirmalina/images/icons/g5.jpg",
    "https://vladimirmalina.github.io/vladimirmalina/index.html",
    "https://vladimirmalina.github.io/vladimirmalina/manifest.json",
    "https://vladimirmalina.github.io/vladimirmalina/scripts",
    "https://vladimirmalina.github.io/vladimirmalina/scripts/app.js",
    "https://vladimirmalina.github.io/vladimirmalina/scripts/jquery-3.3.1.js",
    "https://vladimirmalina.github.io/vladimirmalina/service-worker.js",
    "https://vladimirmalina.github.io/vladimirmalina/styles",
    "https://vladimirmalina.github.io/vladimirmalina/styles/style.css"
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});