import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, doc, setDoc, onSnapshot, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwlsaJN6E-W0V24YISDc78UKYs9adZGQQ",
  authDomain: "comparacopa-arena.firebaseapp.com",
  projectId: "comparacopa-arena",
  storageBucket: "comparacopa-arena.firebasestorage.app",
  messagingSenderId: "1040523656137",
  appId: "1:1040523656137:web:8d4d4e9e2486d86b480618",
  measurementId: "G-P7D3ZF1SRE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.firebaseDB = db;
window.firebaseAPI = { collection, doc, setDoc, onSnapshot, getDoc, updateDoc };
