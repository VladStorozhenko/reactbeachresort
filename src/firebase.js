import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5zqIEzkjk2oFOtWmIKMIj61VNGbqbj4I",
    authDomain: "react-beach-resort.firebaseapp.com",
    databaseURL: "https://react-beach-resort.firebaseio.com",
    projectId: "react-beach-resort",
    storageBucket: "react-beach-resort.appspot.com",
    messagingSenderId: "264966922053",
    appId: "1:264966922053:web:de8c823a2def775795682c",
    measurementId: "G-CFVKEDHN8M"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

export default db;