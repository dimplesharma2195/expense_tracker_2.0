import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCWSzJFe_KAOSqdG3rXDyvAkxCMyjb1fkM",
  authDomain: "expense-track-a61c7.firebaseapp.com",
  databaseURL: "https://expense-track-a61c7-default-rtdb.firebaseio.com",
  projectId: "expense-track-a61c7",
  storageBucket: "expense-track-a61c7.appspot.com",
  messagingSenderId: "338018620114",
  appId: "1:338018620114:web:10573caf7694b16996930b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export {auth, database, createUserWithEmailAndPassword, ref, set, update};