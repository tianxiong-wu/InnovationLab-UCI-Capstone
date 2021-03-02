import logo from './logo.svg';
import React, { useState, useMemo } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import NavPharmResponsive from './components/navPharmResponsive/navPharmResponsive';
import PharmacistHome from './pages/homePage/pharmacist/pharmacistHome';
import PatientNav from './components/patientNav/patientNav';
import PharmContact from './pages/pharmContact/pharmContact'
import FAQPage from './pages/FAQPage/faq';
import PatientHome from './pages/homePage/patient/patientHome';
import Profile from './pages/patientProfile/profile';
import Error from './pages/404_error/404_error';
import Tutorials from './pages/patientTutorials/tutorial';
import LoginSignUp from "./pages/loginSignUp/loginSignUp";
import Footer from './components/footer/footer'
import Settings from './pages/patientSettings/settings';
import PharmSettings from './pages/pharmSettings/pharmSettings';
import Schedule from './pages/patientSchedule/patientSchedule';
import PharmTutorials from './pages/pharmTutorialList/pharmTutorialList';
import PharmAssign from './pages/pharmAssignPage/pharmAssign';
import { UserContext } from './UserContext';
function App() {

  /*  return (<>
  <Router>
      <NavPharmResponsive/>
        <Switch>
          <Route path="/faq">
            <FAQPage />
          </Route>
          <Route path="/Tutorials">
            <Tutorials/>
          </Route>
          <Route path="/">
            <PharmacistHome/>
          </Route>
        </Switch>
      <Footer></Footer>

    </Router>
*/
  
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({user, setUser}), [user, setUser]);
  
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
              <Route path="/" component={PatientHome}/>
            </Switch>
          <Footer/>
        </Router> : user !== null && user.role === "pharmacist" ?
        <Router>
          <NavPharmResponsive/>
          <Switch>
            <Route path="/faq" component={FAQPage}/>
            <Route path="/Tutorials" component={PharmTutorials}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/" component={PharmacistHome}/>
          </Switch>
        </Router> :
        <LoginSignUp/>}
    </UserContext.Provider>
  );
}
export default App;