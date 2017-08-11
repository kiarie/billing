var VERSION = '1.0';/** bump up this to refresh cache */
var CACHE_NAME = 'billing-static-cache';
var CACHE_DYNAMIC = "billing-dynamic-cache-" + VERSION;
var urls = [
    '/',
    'manifest.json',
    '/css/animate.css',
    '/css/bootstrap.css',
    '/css/flexslider.css',
    '/css/icomoon.css',
    '/css/style.css',
    '/css/fonts/',
    '/js/jquery.min.js',
    '/js/handlebars.min.js',
    '/js/jquery.flexslider-min.js',
    '/js/jquery.waypoints.min.js',
    '/images/',
    '/images/loader.gif',
    '/images/loading.gif',
    '/images/billing_images/googleplay.png',
    '/images/slide_1.jpg',
    '/images/slide_2.jpg',
    '/images/slide_3.jpg',
    '/images/slide_4.jpg',
    '/images/slide_5.jpg',
    '/images/slide_6.jpg',
];
var DynamicUrls = [
    '/js/bundle.js',
    '/js/main.js',
    '/list'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_DYNAMIC).then(function (cache) {
            return cache.addAll(DynamicUrls);
        })
    );
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('opened cache');
            return cache.addAll(urls);
        })
    );
});
self.addEventListener('fetch', function (event) {
    console.log(event.request.url)
    if (event.request.method == 'POST' || event.request.url.split('?')[0] == location.origin+'/ipn' || event.request.url.split('?')[1] !== undefined){
        event.respondWith(fetch(event.request).then(function (response) {
            return response;
        }));
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    console.log('opened cache');
                    if (response) {
                        return response;
                    }
                    console.log('bypassed cache');
                    var fetchrequest = event.request.clone();

                    return fetch(fetchrequest, { credentials: 'include' }).then(function (response) {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        var responseToCache = response.clone();
                        caches.open(CACHE_NAME).
                            then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }).catch(function (error) {
                        sendMessage({ type: 'fetch' });
                    });
                })
        );
    }

});

self.addEventListener('activate', function (event) {
    var cacheWhitList = [CACHE_NAME, CACHE_DYNAMIC];
    clients.claim();
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (cacheName) {
                if (cacheWhitList.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName)
                }
            })
            );
        })
    );

});
self.addEventListener('push', function (event) {

});
function sendMessage(messageType) {
    /** Get all clients attached to this service worker and iterate through them if they are many posting a message event to them with the specified messagetype object like: {type:....} */
    self.clients.matchAll().then(function (allClients) {
        allClients.map(function (client) {
            client.postMessage(messageType)
        });
    });
}