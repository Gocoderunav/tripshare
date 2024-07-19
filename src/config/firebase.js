
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth';
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYT08U3_U29yCOsyk7RipzNPwZdYbJ7e8",
  authDomain: "planner-769bb.firebaseapp.com",
  projectId: "planner-769bb",
  storageBucket: "planner-769bb.appspot.com",
  messagingSenderId: "876318117208",
  appId: "1:876318117208:web:04383e026362f4613ae92d"
};


const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);