// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
const { initializeApp } = require('firebase/app');
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
const { getAuth } = require('firebase/auth');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const path = require("path");
process.chdir(path.join(__dirname, "/.."));

const firebaseConfig = {
    apiKey: process.VITE_API_KEY,
    authDomain: process.VITE_AUTH_DOMAIN,
    projectId: process.VITE_PROJECT_ID,
    storageBucket: process.VITE_STORAGE_BUCKET,
    messagingSenderId: process.VITE_MESSANGING_SENDING_ID,
    appId: process.VITE_APP_ID,
    measurementId: process.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const provider = new GoogleAuthProvider();
const auth = getAuth();
module.exports = auth;