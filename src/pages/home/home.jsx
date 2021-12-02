
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';


// css
import profileClose, { profileCloseBtn } from './home';
import './home.css';

import {
  IonButton, IonSelect, IonSelectOption,
  IonCard, IonLoading,
  IonCardSubtitle,
  IonInput, IonLabel, IonModal, IonTitle, IonItem, IonCardTitle, IonCardHeader
} from '@ionic/react'

import {
  Close, LogOut, Pencil
} from 'react-ionicons';


import Cookies from 'js-cookie';
import { getWorker, getWorks } from '../../firebase/config';
import { Months, Years } from '../../components/script';




const AdminHome = () => {
  const [ Admin, setAdmin ] = useState();
  const [ showModal, setModal ] = useState( false );
  const [ load, setLoad ] = useState( true ); // when the page loads.
  const [ load_w, setWLoad ] = useState( false ); // when worker is selected.
  const [ isEmpty, setIsEmpty ] = useState( false ); // when no works available.
  const [ worker, setWorker ] = useState();
  const [ workers, setWorkers ] = useState();
  const [ works, setWorks ] = useState();
  const [ total, setTotal ] = useState();
  // filter
  const [ month, setMonth ] = useState();
  const [ year, setYear ] = useState();
  // const [ workers, setWorkers ] = useState();

  const history = useHistory()

  // getWorker


  useEffect(() => {
    setAdmin( JSON.parse( Cookies.get("user") ) );
    // 
    getWorker().then( data => {
      if( data ) {
        setWorkers( data )
        setLoad( false )
      }
      else { console.error("Empty Data...."); }
    }).catch( e => {
      console.error( "Error getting workers: ", e );
    })
  }, [])


  const filter_w = ( e ) => {
    setWLoad( true )
    var work = e.detail.value; // console.log( work )
    setWorker( work );
    setWorks(null);
    getWorks( work ).then( res => {
      var data = res; // console.log(data );
      if( data && data.length > 0 ) {
        setWorks( data );
        setIsEmpty( false );
        // console.log( data );
        var t = 0;
        data.map( w => {
          t += Number( w.price );
        })
        setTotal( t ); // console.log( t )
        setWLoad( false )
      }
      else if( data && data.length == 0 ) {
        setWorks( null )
        setIsEmpty( true );
        setWLoad( false )
      }
    })
  }

  return (
    <div id="home" >

      <div id="header" >
        <IonTitle > Salon </IonTitle>
        <div style={{backgroundColor:"pink"}} onClick={ e => setModal( true ) } >
          { Admin?.names.split("")[0] }
        </div>
      </div>

      {/* when the page loads */}
      <IonLoading
        onDidDismiss={ e => setLoad( false ) }
        isOpen={ load }
        message="loading" />

      <div >
        <button onClick={ e=> history.push("addlog") } >
          Add Log
        </button>

        <button onClick={ e=> history.push("addworker") } >
          Add Worker
        </button>
      </div>

      <IonModal isOpen={ showModal } >

        <div style={ profileClose } >
          <IonTitle > Salon
          </IonTitle>
          <button
            style={ profileCloseBtn } 
            className="profileClose" onClick={ e => setModal( false ) } >
            <Close /> </button>
        </div>
        
        <div style={{textAlign:"center"}} >
          <IonCard style={{padding:"0em 0em 1em 0em", color:"black"}} >
          <h2 > { Admin?.names } </h2>
          <IonTitle > { Admin?.email } </IonTitle>
          </IonCard>
        </div>

        <IonCard style={{marginTop:"1em", padding:"1em .2em"}} >
          <button onClick={ e => history.push("/") } >
            here <LogOut /> </button>

          <button disabled={true} onClick={ e => "" } >
            Edit <Pencil /> </button>
        </IonCard>
        
      </IonModal>


      <IonCard className="filter">

        <IonSelect value={ worker} placeholder="Select Worker"
          onIonChange={ e => filter_w( e ) } >
          { workers && workers?.map( (w, i) => (
            <IonSelectOption value={ w.names } key={ i } > { w?.names } </IonSelectOption>
            )) 
          }
        </IonSelect>

        <IonSelect value={ month } placeholder="Month"
          onIonChange={ e=> setMonth( e.detail.value )  } >
          { Months && Months?.map( (mon, i) => (
            <IonSelectOption value={ mon } key={ i } >
              { mon } </IonSelectOption>
          )) }
        </IonSelect>

        <IonSelect value={ year } placeholder="Year"
          onIonChange={ e=> setYear( e.detail.value )  } >
          { Years && Years?.map( (y, i) =>(
            <IonSelectOption value={ y } key={ i } >
              { y } </IonSelectOption>
            )) }
        </IonSelect>
      </IonCard>
      

      {/* style           price */}
      {/* client                */}
      {/* year, month     addedby*/}
      <div id="works" >
        {
          works && (<IonCard className="total" >
            <span style={{fontSize:"1.2em", fontWeight:"bolder"}} > total </span>
            <span style={{fontSize:"1.2em", fontWeight:"bolder"}} > R { total } </span>
          </IonCard>)
        }
        {
          works && works.map((ws, i) => (
            <IonCard >
              <IonCardTitle className="price_style" >
                <span style={{textTransform:"capitalize"}} > { ws?.style } </span>
                <span> R { ws?.price } </span>
              </IonCardTitle>

              <div className="client_date" > 
                <span style={{textTransform:"capitalize"}} > { ws?.client } </span>
                <span className="work_date" >
                  { ws?.day} { ws?.month } { ws?.year } | { ws?.time } </span>
              </div>

              <div className="user" >
                <IonCardSubtitle style={{textTransform:"capitalize"}} >
                  { worker }  </IonCardSubtitle> :
                <IonCardSubtitle style={{margin:"0em 0em 0em .5em",textTransform:"capitalize"}} >
                  { ws.addedby_name }  </IonCardSubtitle>
              </div>
            </IonCard>
          ))
        }
      </div>


      <div >
        { isEmpty && (
          <h2 style={{textAlign:"center", margin:"2em 0em",}} >
            No Work For { worker }</h2>
          )}
      </div>
      
    </div>
  )
}

export default AdminHome;