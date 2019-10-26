import * as firebase from "firebase/app";
import 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyAPvp4rEc4yXaREE_RJ_V5ZK-JhalLelLU",
  authDomain: "slideviewer-fd03d.firebaseapp.com",
  databaseURL: "https://slideviewer-fd03d.firebaseio.com",
  projectId: "slideviewer-fd03d",
  storageBucket: "slideviewer-fd03d.appspot.com",
  messagingSenderId: "1025602115878",
  appId: "1:1025602115878:web:eccb90ff8864fc137e89e7",
  measurementId: "G-RKG98QRFVE"
};;
firebase.initializeApp(firebaseConfig);

export default firebase;
