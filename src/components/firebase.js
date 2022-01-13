import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyA6XBpXNuoYIqI-WHthEI1j5cVdv8OEhEA",
authDomain: "verifyphone-a570a.firebaseapp.com",
projectId: "verifyphone-a570a",
storageBucket: "verifyphone-a570a.appspot.com",
messagingSenderId: "872387514792",
appId: "1:872387514792:web:4ca507e665ea5bfdeccd9d",
measurementId: "G-Z3KMQL3ZB5",
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;