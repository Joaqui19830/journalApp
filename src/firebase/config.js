// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnviroments } from "../helpers/getEnviroments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
    VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_DATABASEURL,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERID,
    VITE_APPID,
    VITE_MEASUREMENTID,
} = getEnviroments();
// console.log(env);
// Your web app's Firebase configuration
//Dev/Prod
// const firebaseConfig = {
//     apiKey: "AIzaSyA7AuE_dtPv326QA44UL_QagHoFIP4kYbg",
//     authDomain: "react-cursos-47a11.firebaseapp.com",
//     projectId: "react-cursos-47a11",
//     storageBucket: "react-cursos-47a11.appspot.com",
//     messagingSenderId: "463739662902",
//     appId: "1:463739662902:web:95f90f468525f52e525e97"
// };

// Testing
// const firebaseConfig = {
//     apiKey: "AIzaSyDUXPXz9e1gxYfUo445OEjEOa67n76Cz18",
//     authDomain: "flutter-varios-422b6.firebaseapp.com",
//     databaseURL: "https://flutter-varios-422b6.firebaseio.com",
//     projectId: "flutter-varios-422b6",
//     storageBucket: "flutter-varios-422b6.appspot.com",
//     messagingSenderId: "333640464181",
//     appId: "1:333640464181:web:e9356e9d4844f6f9067e7c",
//     measurementId: "G-4N849SJ2W5"
// };
const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    databaseURL: VITE_DATABASEURL,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID,
    measurementId: VITE_MEASUREMENTID,
};

// console.log(firebaseConfig);

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);