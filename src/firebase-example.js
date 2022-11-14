// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCeqqb8EAST9fLkZpulnnHPw8DqUd0z6XM",
    authDomain: "aja-bookstore.firebaseapp.com",
    projectId: "aja-bookstore",
    storageBucket: "aja-bookstore.appspot.com",
    messagingSenderId: "675930341670",
    appId: "1:675930341670:web:ae03167e7e8d4d38eac1e7",
    measurementId: "G-3J7ZY59LH5"
  };
  firebase.initializeApp(firebaseConfig);
  
  export default firebase;