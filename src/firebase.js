import { firestore } from "firebase";

const firebase = require("firebase");
require("firebase/firestore");


firebase.initializeApp({
  apiKey: "AIzaSyC-OHKrwKQg3Y8IOB9EdMiABcYFF_1mnhk",
  authDomain: "comparison-table-mockup.firebaseapp.com",
  databaseURL: "https://comparison-table-mockup.firebaseio.com",
  projectId: "comparison-table-mockup",
  storageBucket: "comparison-table-mockup.appspot.com",
  messagingSenderId: "311621570505",
  appId: "1:311621570505:web:45ce2a534794920eee6218",
  measurementId: "G-2WL6X8GDV2"
});

export const db = firebase.firestore();

export default firebase
