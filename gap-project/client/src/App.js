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
import Profile from './pages/patientProfile/profile';
import Error from './pages/404_error/404_error';
import Tutorials from './pages/patientTutorials/tutorial';
import LoginSignUp from "./pages/loginSignUp/loginSignUp";
import Footer from './components/footer/footer'
import Settings from './pages/patientSettings/settings';
import PharmSettings from './pages/pharmSettings/pharmSettings';
import Schedule from './pages/patientSchedule/patientSchedule';
function App() {
  return (
    <Router>
      <PatientNav/>
        <Switch>
          <Route path="/faq">
            <FAQPage />
          </Route>
          <Route path="/Schedule">
            <Schedule/>
          </Route>
          <Route path="/Tutorials">
            <Tutorials/>
          </Route>
          <Route path="/contact">
            <PharmContact/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/settings">
            <Settings/>
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
<Route path="/Tutorial/:id">
            <Tutorial/>
          </Route>*/