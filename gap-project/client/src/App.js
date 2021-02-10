import logo from './logo.svg';
import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Nav from './components/nav/nav';
import FAQ from './pages/FAQ/FAQ';
import PatientHome from './pages/homePage/patient/patientHome';
import Profile from './pages/profile/profile';
import Error from './pages/404_error/404_error';
import Tutorials from './pages/Tutorial_List/Tutorial_List';
import Footer from './components/footer/footer';
import LoginSignUp from "./pages/loginSignUp/loginSignUp";

function App() {
  return (
    <Router>
      <Nav/>
        <Switch>
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
        </Switch>
      <Footer/>
    </Router>
  

    
  );
}
export default App;
/*

*/