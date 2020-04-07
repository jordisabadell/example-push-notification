# Push notification example

## How to configure/install
1. Access to [Push Companion](https://web-push-codelab.glitch.me) web. It will create an **Application Server Keys**.
1. Copy **Public key** value to the **applicationServerPublicKey** variable on **main.js** project file.
1. Launch your web using a local server like **Web Server for Chrome** or **Firebase server**.
1. Click on **Enable Push Messaging** button.
1. Copy **Application server key** value to Push Companion web, on **Subscription to Send To** field.
1. Write any **Text to send** and click on **Send push message**. You'll recive a push notification. 

## Local Server

### Web Server for Chrome
https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb

### Firebase local server
Install Firebase tools. 
```
npm install -g firebase-tools
```
Initialitze a Firebase project.
```
firebase login
firebase init
```
Launch a local server.
```
firebase use --add
firebase serve -p 8081
``` 
Open [http://localhost:8081](http://localhost:8081).

## Cloud server

After install and initialize Firebase project, execute the next command to deploy on Firebase hosting.
```
firebase deploy
```

## Original example and other references that I used
- Original example 'Adding Push Notifications to a Web App' https://developers.google.com/web/fundamentals/codelabs/push-notifications
- Web Fundamentals https://developers.google.com/web/fundamentals/push-notifications
- Notification possibilities example https://tests.peter.sh/notification-generator