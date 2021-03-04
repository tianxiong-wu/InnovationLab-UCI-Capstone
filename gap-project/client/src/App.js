import logo from './logo.svg';
import React, { useState, useMemo } from "react"
import NavPharmResponsive from "./components/navPharmResponsive/navPharmResponsive";
import PharmacistHome from "./pages/homePage/pharmacist/pharmacistHome";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import PatientNav from './components/patientNav/patientNav';
import NavPharmResponsive from "./components/navPharmResponsive/navPharmResponsive";
import PharmContact from './pages/pharmContact/pharmContact';
import FAQPage from './pages/FAQPage/faq';
import PatientHome from './pages/homePage/patient/patientHome';
import PharmacistHome from "./pages/homePage/pharmacist/pharmacistHome";
import Profile from './pages/patientProfile/profile';
import Error from './pages/404_error/404_error';
import Tutorials from './pages/patientTutorials/tutorial';
import LoginSignUp from "./pages/loginSignUp/loginSignUp";
import Footer from './components/footer/footer'
import Settings from './pages/patientSettings/settings';
import PharmSettings from './pages/pharmSettings/pharmSettings';
import Schedule from './pages/patientSchedule/patientSchedule';
import Tutorial from './pages/TutorialPage/tutorial'
import PharmTutorials from './pages/pharmTutorialList/pharmTutorialList';
import PharmAssign from './pages/pharmAssignPage/pharmAssign';
import { UserContext } from './UserContext';
import { PatientContext } from './PatientContext';
function App() {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({user, setUser}), [user, setUser]);
  
  const [patient, setPatient] = useState(null);
  const patientProviderValue = useMemo(() => ({patient, setPatient}), [patient, setPatient]);
  return (
    <UserContext.Provider value={providerValue}>
      {user !== null && user.role === "patient" ? 
        <Router>
          <PatientNav/>
            <Switch>
              <Route path="/faq" component={FAQPage}/>
              <Route path="/Schedule" component={Schedule}/>
              <Route path="/Tutorials" component={Tutorials}/>
              <Route path="/contact" component={PharmContact}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/settings" component={Settings}/>
              <Route path="/tutorial/:id" component={Tutorial}/>
              <Route path="/" component={PatientHome}/>
              <Route component = {Error}/>
            </Switch>
          <Footer/>
        </Router> : user !== null && user.role === "pharmacist" ?
        <PatientContext.Provider value={patientProviderValue}>
          <Router>
            <NavPharmResponsive/>
            <Switch>
              <Route path="/faq" component={FAQPage}/>
              <Route path="/Tutorials" component={PharmTutorials}/>
              <Route path="/settings" component={Settings}/>
              <Route path="/pharmAssign">
                <PharmAssign/>
              </Route>
              <Route path="/" component={PharmacistHome}/>
              <Route component = {Error}/>
            </Switch>
          </Router>
        </PatientContext.Provider> :
        <LoginSignUp/>}
    </UserContext.Provider>
  );
}
export default App;