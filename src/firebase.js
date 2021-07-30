import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig.json';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

export { database };
