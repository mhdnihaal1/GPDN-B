// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// put all this is env before  hosting
const firebaseConfig = {
  apiKey: "AIzaSyBPuS8BhM4g44xf1W04xDm0mkbnZkdUDjo",
  authDomain: "gpdn-dd4de.firebaseapp.com",
  projectId: "gpdn-dd4de",
  storageBucket: "gpdn-dd4de.firebasestorage.app",
  messagingSenderId: "497053686748",
  appId: "1:497053686748:web:de154698e57c4694408d19",
  measurementId: "G-8TKK75FZL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;