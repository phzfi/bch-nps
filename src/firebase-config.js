import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_nGSu_L_8wBub-dTKbOVuIFVpfSMX0rY",
  authDomain: "promoter-score.firebaseapp.com",
  projectId: "promoter-score",
  storageBucket: "promoter-score.appspot.com",
  messagingSenderId: "523044621567",
  appId: "1:523044621567:web:a023062d86968c3bc190ca"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();

console.log(app);
