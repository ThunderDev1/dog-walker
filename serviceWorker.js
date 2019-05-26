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

// Firebase push notifications
if ('function' === typeof importScripts) {
  importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
  importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

  const config = {
    messagingSenderId: '*************',
  };
  firebase.initializeApp(config);

  var messaging = firebase.messaging();
  messaging.setBackgroundMessageHandler(function(payload) {
    var dataFromServer = JSON.parse(payload.data.notification);
    var notificationTitle = dataFromServer.title;
    var notificationOptions = {
      body: dataFromServer.body,
      icon: dataFromServer.icon,
      tag: dataFromServer.tag,
      data: {
        url: dataFromServer.url,
      },
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
  });

  self.addEventListener('notificationclick', function(event) {
    var urlToRedirect = event.notification.data.url;
    event.notification.close();
    event.waitUntil(clients.openWindow(urlToRedirect));
  });
}
