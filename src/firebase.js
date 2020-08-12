import firebase from "firebase/app";
import "firebase/firestore";

// IMPORTANT: SET YOUR FIREBASE CRENDENTIALS

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

export { database };
