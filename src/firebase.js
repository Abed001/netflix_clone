import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyB9O7B0dl-x1Mk6wtZu7sT06Y3tqxbk5OM",
  authDomain: "netflix-clone-7b9b4.firebaseapp.com",
  projectId: "netflix-clone-7b9b4",
  storageBucket: "netflix-clone-7b9b4.appspot.com",
  messagingSenderId: "1072926386683",
  appId: "1:1072926386683:web:d337b05f52ae7ed5ac435e"
};
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export default { db, auth };