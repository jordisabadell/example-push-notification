const applicationServerPublicKey = 'BEcXEohj2nt7M6dZYC_6ryVI63HeVFl8BJ31ZHu6lZGhneuY8vEkB29NaRU9DFSAhdrCBsLrTyK561CaQWtqICQ';

let isSubscribed = false;
let swRegistration = null; //service worker registration

const pushButton = document.querySelector('.js-push-btn');

//check if the current browser actually supports push messaging
if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    //register Service worker
    navigator.serviceWorker.register('sw.js')
    .then(function(swReg) {
        console.log('Service Worker is registered', swReg);

        swRegistration = swReg;
        initializeUI();
    })
    .catch(function(error) {
        console.error('Service Worker Error', error);
    });
} else { //not supported
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
}

function initializeUI() {

    pushButton.addEventListener('click', function() {
        pushButton.disabled = true;
        if (isSubscribed) {
          unsubscribeUser();
        } else {
          subscribeUser();
        }
    });

    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
        isSubscribed = !(subscription === null);

        if (isSubscribed) {
            console.log('User IS subscribed.');
            //console.log(JSON.stringify(subscription));
        } else {
            console.log('User is NOT subscribed.');
        }

        updateBtn();
    });
}

function updateBtn() {

    if (Notification.permission === 'denied') {
        pushButton.textContent = 'Push Messaging Blocked.';
        pushButton.disabled = true;
        updateSubscriptionOnServer(null);
        return;
    }
    
    if (isSubscribed) {
        pushButton.textContent = 'Disable Push Messaging';
    } else {
        pushButton.textContent = 'Enable Push Messaging';
    }

    pushButton.disabled = false;
}

function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
    .then(function(subscription) {
        console.log('User is subscribed.');

        updateSubscriptionOnServer(subscription);

        isSubscribed = true;

        updateBtn();
    })
    .catch(function(err) {
        console.log('Failed to subscribe the user: ', err);
        updateBtn();
    });
}

function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server

    const subscriptionJson = document.querySelector('.js-subscription-json');
    const subscriptionDetails = document.querySelector('.js-subscription-details');

    if (subscription) {
        subscriptionJson.textContent = JSON.stringify(subscription);
        subscriptionDetails.classList.remove('is-invisible');
    } else {
        subscriptionDetails.classList.add('is-invisible');
    }
}

  function unsubscribeUser() {
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .catch(function(error) {
      console.log('Error unsubscribing', error);
    })
    .then(function() {
      updateSubscriptionOnServer(null);
  
      console.log('User is unsubscribed.');
      isSubscribed = false;
  
      updateBtn();
    });
  }

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}