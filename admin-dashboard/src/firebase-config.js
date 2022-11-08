import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, EmailAuthProvider } from "firebase/auth";
import { firebaseConfig } from "config";

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
