import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import PatientNav from './components/patientNav/patientNav';
import FAQPage from './pages/FAQPage/faq';
import PatientHome from './pages/homePage/patient/patientHome';
import Profile from './pages/profile/profile';
import Error from './pages/404_error/404_error';
import Tutorials from './pages/Tutorial_List/Tutorial_List';
import Footer from './components/footer/footer'

function App() {
  return (<>

  <Router>
      <PatientNav/>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        <Switch>
          <Route path="/faq">
            <FAQPage />
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
      <Footer></Footer>

    </Router>


    </>
  );
}
export default App;
