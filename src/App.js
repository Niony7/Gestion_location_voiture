//import logo from './logo.svg';
//import './components/cs/style.scss'
//import './style.css'
import 'jquery/dist/jquery.min.js';
//import '../node_modules/bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist'

import Navbar from "./components/layout/Navbar";
import Categorie from './components/Contenu/Categorie/categorie';
import Voiture from './components/Contenu/Voitures/voiture'
import FormulaireVoiture from './components/Contenu/Voitures/FormulaireVoiture'
import {BrowserRouter as Router, Route, Switch, Redirect, useHistory} from 'react-router-dom'
import Assurance from './components/Contenu/Assurance/assurance';
import VisiteTechnique from './components/Contenu/Visite/visite';
import Reparation from './components/Contenu/Reparation/reparation';
import Client from './components/Contenu/Client/client';
import Location from './components/Contenu/Location/location'
import Employer from './components/Contenu/Employer/employer'
import InterfaceClient from './components/Contenu/interfaceClient/interfaceClient'
import FormulaireModifierVoiture from './components/Contenu/Voitures/FormulaireModifierVoiture1'
import SideBar from './components/layout/SideBar'
import SideBarAdmin from './components/layout/SideBarAdmin'
import Bilan from './components/Contenu/bilan/bilan';
import Header from './components/layout/header'
import Parametre from './components/Contenu/Parametre/parametre'
import Chart from './components/Contenu/chart/chart'
import AuditCategorie from './components/Contenu/auditCategorie/auditCategorie'
import AuditVoiture from './components/Contenu/auditVoiture/auditVoiture'
import AuditLocation from './components/Contenu/auditLocation/auditLocation'
import './main.css'
import React from 'react';
import axios from 'axios';
import FormulaireAuthentification from './components/Contenu/authentification/authentification'
import NavBar from './components/layout/Navbar';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginStatus : false,
      adminStatus : false
    }
  }
  setLoginStatus = (status) => {
    this.setState({loginStatus:status});
  }
  setAdminStatus = (admin) => {
    this.setState({adminStatus : admin});
  }
 componentWillMount(){
    axios.defaults.withCredentials = true;
    console.log("requete useeffect");
    axios.get('http://localhost:3001/authentification')
    .then( response => {
      console.log(response)
      if(response.data.loggedIn === true){
          this.setLoginStatus(true);
      }else{
          this.setLoginStatus(false);
      }
      if(response.data.adminStatus === true){
        this.setAdminStatus(true);
      }else{
        this.setAdminStatus(false);
      }
      console.log(response.data);
      })
      .catch(e => console.log(e))
  }
  
render = () => {
  var {loginStatus,  adminStatus } = this.state;
  var setAdminStatus = this.setAdminStatus;
  var setLoginStatus = this.setLoginStatus;
  return (
    <Router>
       <div className="App">
         <BooleanComponent afficher={loginStatus} setAdminStatus={setAdminStatus}  setLoginStatus={setLoginStatus} component={Header}/>
         <BooleanComponent afficher={!adminStatus&&loginStatus} component={SideBar}/>
         <BooleanComponent afficher={adminStatus} component={SideBarAdmin}/>
         <BooleanComponent afficher={!loginStatus} component={NavBar}/>
        <div className="main">
          <Switch>
            <ProtectedRouteAuthentification exact path="/authentification" setLoginStatus={setLoginStatus} 
            setAdminStatus={setAdminStatus}  autorisee={loginStatus} component={FormulaireAuthentification}
            history={this.history}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/location" component={Location} />
            <ProtectedRoute  autorisee={loginStatus} exact path="/categorie" component={Categorie}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/voiture" component={Voiture}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/voiture/ajout" component={FormulaireVoiture}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/assurance" component={Assurance}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/visiteTechnique" component={VisiteTechnique}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/reparation" component={Reparation}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/client" component={Client}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/histogramme" component={Chart}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/location" component={Location}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/interfaceClient" component={InterfaceClient}/>
            <ProtectedRoute  autorisee={loginStatus} path="/voiture/modifier/:idVoiture" component={FormulaireModifierVoiture}/>
            <ProtectedRouteAdmin  autorisee={loginStatus} adminStatus={adminStatus} exact path="/parametre" component={Parametre}/>
            <ProtectedRouteAdmin  autorisee={loginStatus}  adminStatus={adminStatus} exact path="/employer" component={Employer}/>
            <ProtectedRouteAdmin  autorisee={loginStatus}  adminStatus={adminStatus} exact path="/bilan" component={Bilan}/>
            <ProtectedRouteAdmin  autorisee={loginStatus}  adminStatus={adminStatus} exact path="/auditCategorie" component={AuditCategorie}/>
            <ProtectedRouteAdmin  autorisee={loginStatus}  adminStatus={adminStatus} exact path="/auditVoiture" component={AuditVoiture}/>
            <ProtectedRouteAdmin  autorisee={loginStatus}  adminStatus={adminStatus} exact path="/auditLocation" component={AuditLocation}/>
          </Switch>  
      </div>
      </div>
    </Router>
    
  )
}
}
/*function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [adminStatus, setAdminStatus] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect( () => {
    console.log("requete useeffect");
    axios.get('http://localhost:3001/authentification')
    .then( response => {
        console.log(response)
        if(response.data.loggedIn === true){
          alert('logg')
            setLoginStatus(true);
        }else{
            setLoginStatus(false);
        }
        if(response.data.adminStatus === true){
          alert('admin')
          setAdminStatus(true);
          alert(adminStatus)
        }else{
          setAdminStatus(false);
        }

        console.log(response.data);
    })
    .catch(e => console.log(e))
}, [loginStatus, adminStatus]);
  return (
    <Router>
      
       <div className="App">
         <BooleanComponent afficher={loginStatus} component={Header}/>
         <BooleanComponent afficher={loginStatus} adminStatus={adminStatus} component={SideBar}/>
         <BooleanComponent afficher={!loginStatus} component={NavBar}/>
        <div className="main">
          <Switch>
            <ProtectedRouteAuthentification exact path="/authentification" setLoginStatus={setLoginStatus} setAdminStatus={setAdminStatus} autorisee={loginStatus} component={FormulaireAuthentification}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/" component={Home}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/location" component={Location} />
            <ProtectedRoute  autorisee={loginStatus} exact path="/categorie" component={Categorie}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/voiture" component={Voiture}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/voiture/ajout" component={FormulaireVoiture}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/assurance" component={Assurance}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/visiteTechnique" component={VisiteTechnique}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/reparation" component={Reparation}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/client" component={Client}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/location" component={Location}/>
            <ProtectedRoute  autorisee={loginStatus} exact path="/interfaceClient" component={InterfaceClient}/>
            <ProtectedRoute  autorisee={loginStatus} path="/voiture/modifier/:id_voiture" component={FormulaireModifierVoiture}/>
            <ProtectedRouteAdmin  autorisee={loginStatus} adminStatus={adminStatus} exact path="/parametre" component={Parametre}/>
            <ProtectedRouteAdmin  autorisee={loginStatus}  adminStatus={adminStatus} exact path="/employer" component={Employer}/>
          </Switch>  
      </div>
      </div>
    </Router>
    
  );
}*/

function ProtectedRouteAuthentification({autorisee, setLoginStatus,setAdminStatus,component:Component,...rest}){
  return(
    <Route
      {...rest}
      render={ () => !autorisee ? (
        <Component  setLoginStatus={setLoginStatus} setAdminStatus={setAdminStatus}/>
      ):(
        <Redirect to='/voiture'/>
      )
      }
    />
  )
}
function BooleanComponent({afficher, component:Component, ...rest}){
  if(afficher){
    return(
      <Component {...rest}/>
    )
  }
  return(
    ''
  )
}
function ProtectedRoute({autorisee, component:Component,...rest}){
  return(
    <>
    <Route
      {...rest}
      render={ () => autorisee ? (
        <Component/>
      ):(
        <Redirect to='/authentification'/>
      )
      }
    /></>
  )
}
function ProtectedRouteAdmin({autorisee, adminStatus,component:Component,...rest}){
  return(
    <>
    <Route
      {...rest}
      render={ () => (autorisee && adminStatus) ? (
        <Component/>
      ):(
        <Redirect to='/home'/>
      )
      }
    /></>
  )
}
export default App;
