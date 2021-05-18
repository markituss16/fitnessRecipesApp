import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBBF05ulip38z4hp4excqki58iUvOhYivs",
    authDomain: "fitnessrecipess-app.firebaseapp.com",
    projectId: "fitnessrecipess-app",
    storageBucket: "fitnessrecipess-app.appspot.com",
    messagingSenderId: "1054781238641",
    appId: "1:1054781238641:web:5f2f4edb04c627e8639ad0"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

export default firebase;