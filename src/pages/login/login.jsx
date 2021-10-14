
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './login.css';

const AdminLogin = () => {
  const [uname, setuname ] = useState();
  const [pw, setpw] = useState(); // password


  return (
    <div id="adminLogin" >
      
      <h1 > Admin Login </h1>

      <div >
        <input placeholder="Enter username"
        value={ uname }
          onChange={ e => setuname( e.target.value ) }/>
      </div>

      <div >
        <input
          value = { pw }
          onChange={e=> setpw( e.target.value ) }
          placeholder="Enter Password" />
      </div>

      <div >
        <Link to="/adminhome" >
          Login Admin
        </Link>
      </div>


      <div >
        Don't Have Account ? 
        <Link to="/adminregister" > Register </Link>
      </div>
    </div>
  )
}

export default AdminLogin;