import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCfTDbzD9aHtGpXqYsxmcIANK39e2xjd5c",
    authDomain: "heaven-marriage.firebaseapp.com",
    projectId: "heaven-marriage",
    storageBucket: "heaven-marriage.firebasestorage.app",
    messagingSenderId: "557161650662",
    appId: "1:557161650662:web:789440b1c6edc2e8971e27"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;