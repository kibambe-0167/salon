
import {
  IonInput, IonLabel, IonLoading, IonRadio, IonRadioGroup, IonSelect, IonSelectOption
} from '@ionic/react'

import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'

import getDate from '../../components/script';
import { addLogs, getWorker } from '../../firebase/config';

// get session user
import Cookies from 'js-cookie';

import "./addlog.css";





const AddLog = () => {
  const [ isCash, setIsCash ] = useState( false );
  const [ worker, setWorker ] = useState();
  const [ client, setClient ] = useState();
  const [ price, setPrice ] = useState(0);
  const [ style, setStyle ] = useState();
  const [ load, setLoad ] = useState( true );
  const [ isLoad, setIsLoad ] = useState( false );
  const [ workers, setWorkers ] = useState();
  const history = useHistory();
  const Admin = JSON.parse( Cookies.get("user") ); // console.log( Admin );


  getDate()

  // var workers;
  useEffect( () => {

    getWorker().then( data => {
      if( data ) {
        // workers = data;
        // console.log( workers )
        setWorkers( data )
        setLoad( false )
      }
      else {
        console.error("Empty Data....");
      }
    }).catch( e => {
      console.error( "Error getting workers: ", e );
    })



  }, [])
  


  const add_log = () => {
    if( worker && style && client ) {
      setIsLoad( true );
      // work, uid, uid_name, c_name, style, price
      addLogs(worker, Admin.authId, Admin.names, client, style, price )
        .then( res => {
          if( res ) {
            setIsLoad( false );
            alert("Client Details Added");
            setPrice(0); setClient(""); setStyle(""); setWorker("");
          }
          else {
            setIsLoad( false );
            console.log("Error Adding Client Details....")
          }
        }).catch( e => console.log( "Error Adding Client", e ) )
    }
    else {
      alert("Fill All Fields")
    }
  }


  return (
    <div id="log_form" >
      <h2 > Add Log </h2>



      <div id="log_inputs" >

        <div >
          <IonSelect value={ worker} placeholder="Select Worker" onIonChange={ e=> setWorker( e.detail.value )  } >
            {
              workers && workers?.map( (w, i) => {
                return (
                  <IonSelectOption value={ w.names } key={ i } > { w?.names } </IonSelectOption>
                )
              }) 
            }
          </IonSelect>
        </div>

        <div >
          <IonInput
            value={ client }
            onIonChange={ e => setClient( e.detail.value ) }
            className="ionic_inputs"
            placeholder="Clients Name" />
        </div>

        <div >
          <IonInput
            value={ style }
            onIonChange={ e => setStyle( e.detail.value ) }
            className="ionic_inputs"
            placeholder="Hair Style" />
        </div>

        <div  >
          <IonRadioGroup className="cash" >
            <div>
              <IonRadio onClick={ e=> setIsCash( true ) } className="radio" ></IonRadio>
              <IonLabel className="label" >Cash</IonLabel>
            </div>

            <div>
              <IonRadio onClick={ e=> setIsCash( false ) } className="radio" ></IonRadio>
              <IonLabel className="label" >Not Cash</IonLabel>
            </div>
          </IonRadioGroup>
        </div>

        <div >
          <IonInput
            value={ price }
            onIonChange={ e => setPrice( e.detail.value ) }
            disabled={ !isCash }
            type="number"
            min="0.0"
            className="ionic_inputs"
            placeholder="Amount Style" />
        </div>


        <div id="cancel_upload" >
          <button onClick={ e => add_log() } > Upload </button>
          <button onClick={ e=> history.push("/adminhome") } > Cancel </button>
        </div>
        
        {/* when the page loads */}
        <IonLoading
          onDidDismiss={ e => setLoad( false ) }
          isOpen={ load }
          message="loading" />

        {/* when adding a new log */}
        <IonLoading
          onDidDismiss={ e => setIsLoad( false ) }
          isOpen={ isLoad }
          message="Adding Client Details" />
      </div>
    </div>
  )
}

export default AddLog;