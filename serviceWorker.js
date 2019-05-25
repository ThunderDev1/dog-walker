// mapbox tiles cache
self.addEventListener('fetch', function(event) {
  var url = event.request.url;
  if (url.startsWith('https://') && (url.includes('tiles.mapbox.com') || url.includes('api.mapbox.com'))) {
    event.respondWith(
      caches.match(event.request).then(function(resp) {
        return (
          resp ||
          fetch(event.request).then(function(response) {
            var cacheResponse = response.clone();
            caches.open('mapbox').then(function(cache) {
              cache.put(event.request, cacheResponse);
            });
            return response;
          })
        );
      })
    );
  }
});
