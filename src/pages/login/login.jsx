
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import './login.css';

import {
  IonInput, IonLoading
} from '@ionic/react'

import {
  signInWithEmailAndPassword, getAuth
} from 'firebase/auth'
import { getAdmin } from '../../firebase/config';

import Cookies from "js-cookie";



const auth = getAuth();



const AdminLogin = () => {
  const [email, setemail ] = useState();
  const [pw, setpw] = useState(); // password
  const [ isLoad, setIsLoad ] = useState( false )
  const history = useHistory()


  const logIn = () => {
    if( pw && email ) {
      setIsLoad( true )
      console.log("loading")
      signInWithEmailAndPassword( auth, email, pw ).then( user=> {
        const usr = user.user;
        // uid, email, pwd
        getAdmin( usr.uid, email, pw ).then(res => {
          Cookies.set("user", JSON.stringify(res) )
          if ( JSON.parse( Cookies.get("user") ) ) {
            history.push("/adminhome")
          }
        })
      })
      setTimeout(() => {
        setIsLoad( false )
        console.log( "loading false ")
      }, 3000);
    }
    else{
      setIsLoad( false )
      console.error("Sign In Error") }
  }


  return (
    <div id="adminLogin" >
      
      <h1 > Login </h1>
      { isLoad }

      <div>
        <div  >
          <IonInput
            className="adminLogInput"
            placeholder="Email"
            value={ email }
            onIonChange={ e => setemail( e.detail.value ) }/>
        </div>

        <div >
          <IonInput
            className="adminLogInput"
            value = { pw }
            onIonChange={e=> setpw( e.detail.value ) }
            placeholder="Enter Password" />
        </div>

        <div id="loginBtn" >
          <button onClick={ e => logIn() } className="buttons" > { 'Login' }</button>
        </div>

        <IonLoading
          isOpen={isLoad}
          onDidDismiss={e=>setIsLoad(false)}
          message='Connecting user'
          duration={ 4000 } />

      </div>

      <div className="regLink" >
        Don't Have Account ? 
        <Link to="/adminregister" > Register </Link>
      </div>
    </div>
  )
}

export default AdminLogin;