
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import './reg.css';


// firebase funcs
import { fb_db, checkUname } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';


const AdminReg = () => {
  const [fname, setfname] = useState('');
  const [uname, setuname] = useState('');
  const [pw, setpw] = useState(''); // password
  const [pwc, setpwc] = useState(); // password confirm
  const [isReg, setisReg] = useState();
  const [isUnameFound, setisUnameFound] = useState(false);
  const [resetPw, setresetPw] = useState(true)

  const history = useHistory(); // useed to route dymanically.




  const AddAdmin = async() => {
    try {
      const docRef = await addDoc( collection(fb_db,"Admins"), {
        firstname: fname, password: pw, username: uname
      } );

      if( docRef.id ) {
        // console.log( docRef );
        setisReg( true );
        alert("Successfully Registered " + uname );
        setuname(""); setfname(""); setpw(""); setpwc("");
        setTimeout(()=> { history.push("/")}, 3000 )
      }
      else{
        // console.log( docRef );
        alert("A problem.....");
        setisReg( false );
      }
    }
    catch( err ) { console.log( "ERROR: ", err )}
  }

  const AddAdminFunc = async () => {

    if( pw === pwc && fname && uname ) {

      // check if username already exist. pass the username to check..
      checkUname( uname.toLowerCase() ).then(( isUniqueUser ) =>  {
        // console.log( isUniqueUser )

        if( isUniqueUser !== true ) {
          alert("User Name is Unique");
          AddAdmin();
        }
        else {
          setisUnameFound( true );
          alert("User Name Is Already Used...");
          setpw(""); setpwc(' '); // delete data in pw fields
          // setresetPw( false )
        }

      } );
    }
    // else { alert("Please Check Your Input....")}
  }



  return (
    <div id="adminReg" >
      
      <h1 > Admin Register </h1>

      { fname } { uname } { pw } { pwc }

      <div >
        <input placeholder="Enter Firstname"
          value = { fname }
          onChange={e=>setfname( e.target.value ) } />
      </div>

      <div >
        <input
          style={{borderColor: isUnameFound ? "red":"" }}
          placeholder="Enter username"
          value={ uname }
          onChange={ e => setuname( e.target.value ) }/> <br />
        {
          isUnameFound ? (<i className="error" > User Name Exist </i>) : ''
        }
        
      </div>

      <div >
        <input
          value = { pw }
          onChange={e=> setpw( e.target.value ) }
          placeholder="Enter Password" />
      </div>

      <div >
        <input
          value={ pwc }
          onChange={e=> { setpwc( e.target.value )  }}
          placeholder="Confirm" />

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

      <div >
        <button
          onClick={ e=> AddAdminFunc() }
          disabled={ pw === pwc ? false : true } >
          Register Admin
        </button>
      </div>

      <div >
        { isReg && isReg === true ? (
            <i style={{color:"green"}} > User Admin Successfully Registered </i>
          ) : ( <i ></i> ) }
      </div>

      <div >
        Already Have Account ? 
        <Link to="/" > Login </Link>
      </div>
    </div>
  )
}


export default AdminReg;