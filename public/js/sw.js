// On install - the application shell cached
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('sw-cache').then(function(cache) {
            // Static files the make up the applicaiton shell are cached
            return cache.add('/index.html');
            return cache.add('/chat.html');
            return cache.add('.css/style.css');
            return cache.add('animation.js');
            return cache.add('main.js');
            return cache.add('./utils/users.js');
            return cache.add('./utils/messages.js');
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