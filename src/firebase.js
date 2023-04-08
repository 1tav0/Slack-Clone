import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDX1ek8ErBrxsS7VvaUGO1hNerT6xFpEGo",
    authDomain: "slack-clone-2ddf6.firebaseapp.com",
    projectId: "slack-clone-2ddf6",
    storageBucket: "slack-clone-2ddf6.appspot.com",
    messagingSenderId: "1019645019416",
    appId: "1:1019645019416:web:199a4ceb044a1b46794a6d"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { provider, auth, db }