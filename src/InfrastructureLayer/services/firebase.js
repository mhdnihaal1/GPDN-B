"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
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
const app = (0, app_1.initializeApp)(firebaseConfig);
const analytics = (0, analytics_1.getAnalytics)(app);
exports.default = app;
