// On install - the application shell cached
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('sw-cache').then(function(cache) {
            // Static files the make up the applicaiton shell are cached
            return cache.add('public/index.html');
            return cache.add('public/chat.html');
            return cache.add('public/css/style.css');
            return cache.add('public/js/animation.js');
            return cache.add('public/js/main.js');
            return cache.add('server.js');
        })
    );
});

// with request network
self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Try the cache
        caches.match(event.request).then(function(response) {
            // return it if there is a response, or else fetch again
            return response || fetch(event.request);
        })
    )
})