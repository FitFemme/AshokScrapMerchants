var CACHE_NAME = 'cache-and-update';

self.addEventListener('install', function(event) {
    // Perform install steps
    console.log("Install Event Fired");
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
        })
    );
});

self.addEventListener('fetch', function(event) {
    return;
});

self.addEventListener('activate', function(event) {
    console.log("Activate Event Fired");
    var cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});