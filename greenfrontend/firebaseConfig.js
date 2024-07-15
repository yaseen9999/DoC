import { initializeApp } from 'firebase/app';

// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBI1CN352AgjMZUwYUUi_ywZd_7ETZXjcA",
    authDomain: "igt-fe.firebaseapp.com",
    projectId: "igt-fe",
    storageBucket: "igt-fe.appspot.com",
    messagingSenderId: "175783153420",
    appId: "1:175783153420:web:90e7684a6f0331d40fc329",
    measurementId: "G-MSG5JKW6CJ"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage
