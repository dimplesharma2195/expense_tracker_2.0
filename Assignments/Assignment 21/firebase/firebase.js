import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDFN32GruME_n-HivkzFYlGFwIAI13oMPM",
    authDomain: "dummy-movie-27ae3.firebaseapp.com",
    databaseURL: "https://dummy-movie-27ae3-default-rtdb.firebaseio.com",
    projectId: "dummy-movie-27ae3",
    storageBucket: "dummy-movie-27ae3.firebasestorage.app",
    messagingSenderId: "890637246362",
    appId: "1:890637246362:web:89ace8bd3a2877e1ff6423"
  };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);