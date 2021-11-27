

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, where, collection, query, getDocs,
  limit, addDoc
} from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { async } from "@firebase/util";

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
const auth = getAuth();
// exports getFirestore obj
export const db = getFirestore( app );



// check if a username exist in docs, b4 signing up user
export const checkUname = async ( uname ) => {
  const q = query( collection(db, "Admins"), where("username", "==", uname ), limit(1) );
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



// add admin data after authentication
export const AddAdmin = async(names, email, pw, userid) => {
  try {
    const docRef = await addDoc( collection(db,"Admins"), {
      names: names,
      password: pw,
      email: email,
      authId: userid,
    });
    if( docRef.id ) { return true }
    else{ return false }
  }
  catch( err ) { console.error( "ERROR: ", err ); return false }
}


// get user details
export const getAdmin = async( uid, email, pwd ) => {
  try {
    const q = query( collection(db, "Admins"),
      where('authId', '==', uid),
      where('email', '==', email),
      where('password', '==', pwd ), limit(1))
    
      const res = await getDocs( q );
      const data = [];
      res.docs.map( d => {
        var u = d.data()
        u["id"] = d.id
        data.push( u )
      })
      if( data.length > 0 ) return data[0]
      else return false;
  }catch( e ) {
    console.log( e )
  }
}








export default app;