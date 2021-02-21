import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Nav from './components/nav/nav';
import FAQPage from './pages/FAQPage/faq';
import PatientHome from './pages/homePage/patient/patientHome';
import Profile from './pages/profile/profile';
import Error from './pages/404_error/404_error';
import Tutorials from './pages/Tutorial_List/Tutorial_List';
import Footer from './components/footer/footer'
import PatientSettings from './pages/patientSettings/settings';
import Settings from './pages/settings/settings';
import PharmSettings from './pages/pharmSettings/pharmSettings';


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

function App() {
  return (<>

  <Router>
      <Nav/>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        <Switch>
        <PharmSettings/>
        </Switch>
    </Router>


    </>
  );
}
export default App;
