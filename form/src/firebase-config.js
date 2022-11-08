import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "config";

initializeApp(firebaseConfig);

export const db = getFirestore();
