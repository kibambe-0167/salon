import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Switch, Route, } from 'react-router-dom'


// import pages
import AdminReg from './pages/reg/reg';
import AdminLogin from './pages/login/login';
import AdminHome from './pages/home/home';
import AddLog from './pages/addlog/addlog';
import AddWorker from './pages/addworker/addworker';



function App() {
  return (
    <BrowserRouter >

      <Switch >
        <Route exact path="/" component={ AdminLogin } />

        <Route exact path="/adminregister" component={ AdminReg } />  

        <Route exact path="/adminhome" component={ AdminHome } />

        <Route exact path="/addlog" component={ AddLog } />

        <Route exact path="/addworker" component={ AddWorker } />

      </Switch>
    
    </BrowserRouter>
  );
}

export default App;
