import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDi2G9ARAgkLk7pqipGdBsoBND-IcWvQHk",
  authDomain: "complete-heaven-marriage.firebaseapp.com",
  projectId: "complete-heaven-marriage",
  storageBucket: "complete-heaven-marriage.firebasestorage.app",
  messagingSenderId: "571296984597",
  appId: "1:571296984597:web:946c93a886179f727fe81c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;