// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7AuE_dtPv326QA44UL_QagHoFIP4kYbg",
    authDomain: "react-cursos-47a11.firebaseapp.com",
    projectId: "react-cursos-47a11",
    storageBucket: "react-cursos-47a11.appspot.com",
    messagingSenderId: "463739662902",
    appId: "1:463739662902:web:95f90f468525f52e525e97"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);