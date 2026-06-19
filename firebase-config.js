// ============================================================
// Firebase Configuration - Cardox (Realtime Database)
// ============================================================

const firebaseConfig = {
    apiKey: "AIzaSyBBEItLX7jZfgR-bxWcTtCDVYqE_JNF1go",
    authDomain: "cardox-7d562.firebaseapp.com",
    databaseURL: "https://cardox-7d562-default-rtdb.asia-southeast1.firebasedatabase.app/",  // 🔥 URL ของคุณ
    projectId: "cardox-7d562",
    storageBucket: "cardox-7d562.firebasestorage.app",
    messagingSenderId: "273577001426",
    appId: "1:273577001426:web:485449e5276d4bfff6c80b",
    measurementId: "G-148GW7X081"
};

// เริ่มต้น Firebase
firebase.initializeApp(firebaseConfig);

// ใช้ Realtime Database
const db = firebase.database();

console.log('🔥 Firebase Connected - Cardox (Realtime Database)');
console.log('📦 Database URL:', firebaseConfig.databaseURL);
