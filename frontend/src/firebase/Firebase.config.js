import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCgsn8KLzXzyo-2ayWmvrIhn9pPwp2uFAs",
  authDomain: "msu-result-scraper.firebaseapp.com",
  projectId: "msu-result-scraper",
  storageBucket: "msu-result-scraper.appspot.com",
  messagingSenderId: "161986469935",
  appId: "1:161986469935:web:408287eda49ab0723726da"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

export {db,auth}