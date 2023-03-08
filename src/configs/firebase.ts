// Import the functions you need from the SDKs you need
import Firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore';
import { exit } from 'process';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
if(firebaseConfig == undefined) {
  console.error("⚠ Firebase config does not exist. Please set NEXT_PUBLIC_FIREBASE_CONFIG in .env first!");
  exit(99);
}

let firebaseApp: Firebase.app.App;

// Initialize Firebase
if (!Firebase.apps.length) {
  firebaseApp =  Firebase.initializeApp(JSON.parse(firebaseConfig))
} else {
  firebaseApp = Firebase.app()
}

export default Firebase
// export {firebaseApp};
export const getFirestore = () => firebaseApp.firestore();

export const getStorage = () => firebaseApp.storage();