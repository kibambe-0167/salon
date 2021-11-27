
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import './reg.css';

import {
  IonInput
} from "@ionic/react"


// firebase funcs
import { db, checkUname, AddAdmin

} from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

import {
  createUserWithEmailAndPassword, getAuth
} from 'firebase/auth'



const auth = getAuth();


const AdminReg = () => {
  const [names, setnames] = useState('');
  const [email, setemail] = useState('');
  const [pw, setpw] = useState(''); // password
  const [pwc, setpwc] = useState(); // password confirm
  const [isReg, setisReg] = useState();
  const [isUnameFound, setisUnameFound] = useState(false);
  const [resetPw, setresetPw] = useState(true)

  const history = useHistory(); // useed to route dymanically.


  
  const AddAdminFunc = async () => {

    if( pw === pwc && names && email ) {

      createUserWithEmailAndPassword( auth, email, pw )
        .then(( user_i ) => {
          const user = user_i.user
          if( user.uid ) { 
            console.log( user.uid );
            AddAdmin( names, email, pw, user.uid ).then( res => {
              if( res ) { // console.log( docRef );
                setisReg( true );
                alert("Successfully Registered " + names );
                setemail(""); setnames(""); setpw(""); setpwc("");
                setTimeout(()=> { history.push("/")}, 3000 )
              }
              else{ // console.log( docRef );
                alert("A problem.....");
                setisReg( false );
              }
            })
          }

          else { return false }
        }).catch( err => {
          console.error( err.message )
          console.error( err.code )
          return false;
        })
    }
    else { alert("Please Check Your Input....")}
  }



  return (
    <div id="adminReg" >
      
      <h1 > Register </h1>

      {/* { fname } { uname } { pw } { pwc } */}

      <div >
        <IonInput
          className="adminRegInput"
          placeholder="Names"
          value = { names }
          onIonChange={ e => setnames( e.target.value ) } />
      </div>

      <div >
        <IonInput
          className="adminRegInput"
          style={{borderColor: isUnameFound ? "red":"" }}
          placeholder="Email"
          value={ email }
          onIonChange={ e => setemail( e.target.value ) }/>
        {
          isUnameFound ? (<i className="error" > User Name Exist </i>) : ''
        }
        
      </div>

      <div >
        <IonInput
          className="adminRegInput"
          value = { pw }
          onIonChange={e=> setpw( e.target.value ) }
          placeholder="Password" />
      </div>

      <div >
        <IonInput
          className="adminRegInput"
          value={ pwc }
          onIonChange={e=> { setpwc( e.target.value )  }}
          placeholder="Confirm password" />

        <br />
        <i >
          {pw === pwc ? (<span style={{color:"green"}} >password matched</span> ) :
              (<span style={{color:"red"}} ></span> ) }
        </i>

        <br />
        <i >
          { pw && pwc && pw.length > 0 && pwc.length > 0 && pwc !== pw ? (
            <span > password don't match </span>
          ) : ( <span ></span> )
          }
        </i>
      </div>

      <div className="regButton" >
        <button
          className="buttons"
          onClick={ e=> AddAdminFunc() }
          disabled={ pw === pwc ? false : true } >
          Register
        </button>
      </div>

      <div >
        { isReg && isReg === true ? (
            <i style={{color:"green"}} > User Admin Successfully Registered </i>
          ) : ( <i ></i> ) }
      </div>

      <div className="logLink" >
        Already Have Account ? 
        <Link to="/" > Login </Link>
      </div>
    </div>
  )
}


export default AdminReg;