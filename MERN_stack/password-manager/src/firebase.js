
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_YourActualApiKeyGoesHere",
  authDomain: "password-manger-aa556.firebaseapp.com",
  projectId: "password-manger-aa556",
  storageBucket: "password-manger-aa556.appspot.com",
  messagingSenderId: "724262173529",
  appId: "1:724262173529:web:YourActualAppIdGoesHere" 
};



const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
