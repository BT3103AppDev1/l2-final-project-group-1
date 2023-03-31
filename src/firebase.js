import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAE6kTKvywwI-ssQsqPMPy35vUsACNbgY4",
  authDomain: "bt3103-thrive.firebaseapp.com",
  projectId: "bt3103-thrive",
  storageBucket: "bt3103-thrive.appspot.com",
  messagingSenderId: "638873242319",
  appId: "1:638873242319:web:9433007c4aa83ed58585ba",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export default firebaseApp;
 