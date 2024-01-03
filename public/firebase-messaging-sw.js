// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');

let firebaseConfig = {
  apiKey: "AIzaSyBHi0LFaSe7TfMtCWhlLVFGNktd6JJ0QgI",
  authDomain: "nlt-smarts-2946d.firebaseapp.com",
  projectId: "nlt-smarts-2946d",
  storageBucket: "nlt-smarts-2946d.appspot.com",
  messagingSenderId: "409637778044",
  appId: "1:409637778044:web:60d1cc301250f34b5e4ff9",
  measurementId: "G-SF4NMMXYCN"
}

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
// messaging.onBackgroundMessage((payload) => {
//   console.log('Service Worker', payload)
//   let notificationTitle = payload.notification.title;
//   let notificationOptions = {
//     body: payload.notification.body,
//     icon: '/Logo.png'
//   };
//
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
