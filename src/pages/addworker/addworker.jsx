
import { IonInput, IonLoading } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addWorker } from "../../firebase/config";

import Cookies from 'js-cookie';

import "./addworker.css";


const AddWorker = () => {
  const [ name, setName ] = useState()
  const [ percent, setPercent ] = useState();
  const [ isLoad, setIsLoad ] = useState( false );

  const history = useHistory();

  const Admin = JSON.parse( Cookies.get("user") ); // console.log( Admin );  



  function add() {
    // uid, name, per 
    if( name && percent ) {
      setIsLoad( true )
      addWorker( Admin.authId, name, percent ).then( res => {
        if( res ) { 
          alert("Worker Added");
          setIsLoad( false )
          setName(""); setPercent("");
        }
        else {
          alert("Error Adding user");
          setIsLoad( false )
        }
      }).catch( err => {
        setIsLoad( false )
        console.log( err )
      })
    }
    else {
      console.error("Fill In All Input Fields")
      alert("Fill In All Input Fields")
    }
  }

  return <div id="addworker" >
    <h2 >Add Worker</h2>

    <div >
      <form onSubmit={ e=> e.preventDefault() } >

        <div >
          <IonInput 
            value={ name }
            onIonChange={ e => setName( e.detail.value ) }
            placeholder="Worker's Name"/>
        </div>

        <div >
          <IonInput 
            value={ percent }
            onIonChange={ e => setPercent( e.detail.value ) }
            type="number"
            max="80" min="0"
            placeholder="Work Percentage"/>
        </div>

        <div >
          <button type="submit" onClick={ e=> add() } > Add Worker </button>
          <button type="reset" onClick={ e=> history.push("adminhome")  } > Cancel </button>
        </div>
      </form>

      <IonLoading
        message={"Adding user"}
        onDidDismiss={ e=> setIsLoad( false ) }
        isOpen={ isLoad } />
    </div>
  </div>
}

export default AddWorker;