import logo from './logo.svg';
import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import PatientNav from './components/patientNav/patientNav';
import PharmContact from './pages/pharmContact/pharmContact'
import FAQPage from './pages/FAQPage/faq';
import PatientHome from './pages/homePage/patient/patientHome';
import Profile from './pages/profile/profile';
import Error from './pages/404_error/404_error';
import Tutorials from './pages/Tutorial_List/Tutorial_List';
import Tutorial from './pages/TutorialPage/tutorial';
import LoginSignUp from "./pages/loginSignUp/loginSignUp";
import Footer from './components/footer/footer'
import PatientSettings from './pages/patientSettings/settings';
import Schedule from './pages/patientSchedule/patientSchedule';
//import Settings from './pages/settings/settings'

/*
<Route path="/faq">
  <FAQ />
</Route>
<Route path="/Schedule">
  Schedule
</Route>
<Route path="/Tutorials">
  <Tutorials/>
</Route>
<Route path="/">
  <PatientHome/>
</Route>
*/

/**
     
 */
function App() {
  return (
    <Router>
      <PatientNav/>
        <Switch>
          <Route path="/faq">
            <FAQPage />
          </Route>
          <Route path="/schedule">
            <Schedule/>
          </Route>
          <Route path="/Tutorials">
            <Tutorial/>
          </Route>
          <Route path="/contact">
            <PharmContact/>
          </Route>
          <Route path="/">
            <PatientHome/>
          </Route>
        </Switch>
      <Footer/>
    </Router>
  );
}
export default App;
/*

*/