
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './home.css';

import Cookies from 'js-cookie';


const AdminHome = () => {
  const [ User, setUser ] = useState();


  useEffect(() => {
    setUser( JSON.parse( Cookies.get("user") ) )
  }, [])

  return (
    <div >
      
      <h1 > Admin Dash Board </h1>

      <p >
        { User?.names }
      </p>

    </div>
  )
}

export default AdminHome;