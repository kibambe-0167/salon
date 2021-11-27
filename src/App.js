import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Switch, Route, } from 'react-router-dom'


// import pages
import AdminReg from './pages/reg/reg';
import AdminLogin from './pages/login/login';
import AdminHome from './pages/home/home';



function App() {
  return (
    <BrowserRouter >

      <Switch >
        <Route exact path="/" component={ AdminLogin } />

        <Route exact path="/adminregister" component={ AdminReg } />  

        <Route exact path="/adminhome" component={ AdminHome } />
      </Switch>
    
    </BrowserRouter>
  );
}

export default App;
