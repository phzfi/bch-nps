import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, EmailAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJPHyGZTovh2dOn5NWFzuSPoaFOI59mN4",
    authDomain: "phzgs-nps.firebaseapp.com",
    projectId: "phzgs-nps",
    storageBucket: "phzgs-nps.appspot.com",
    messagingSenderId: "611941675651",
    appId: "1:611941675651:web:373fcb796e1ab483b461b6"
};

initializeApp(firebaseConfig);

export const authUiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        EmailAuthProvider.PROVIDER_ID
    ]
}

export const db = getFirestore();
export const auth = getAuth();
