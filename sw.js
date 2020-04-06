self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
  
    var body = '';
    if (event.data) {
        console.log('This push event has data: ', event.data.text());
        body = event.data.text();
    } else {
        console.log('This push event has no data.');
    }

    const title = 'Example Push Notification';
    const options = {
      body: body
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
  
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('https://developers.google.com/web/')
    );
  });