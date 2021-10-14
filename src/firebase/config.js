

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, where, collection, query, getDocs, limit
} from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNOqQbvgSZ7liX2EXqVmDJGLUo4orBopg",
  authDomain: "salon-ffcac.firebaseapp.com",
  projectId: "salon-ffcac",
  storageBucket: "salon-ffcac.appspot.com",
  messagingSenderId: "1082304014814",
  appId: "1:1082304014814:web:755760932be8a09595154f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// check if a username exist in docs, b4 signing up user
export const checkUname = async ( uname ) => {
  const q = query( collection(fb_db, "Admins"), where("username", "==", uname ), limit(1) );
  const res = await getDocs( q )
  // console.log( "RES:", res );
  let data = [];
  res.forEach((doc)=> {
    // console.log( doc.data() )
    data.push( doc.data() )
  })
  // console.log("DATA:", data.length );
  if( data.length > 0 ) { return true }
  else { return false }
}


// exports getFirestore obj
export const fb_db = getFirestore();

export default app;