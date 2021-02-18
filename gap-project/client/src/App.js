import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Nav from './components/nav/nav';
import NavResponsive from './components/navResponsive/navResponsive';
import NavPharmResponsive from './components/navPharmResponsive/navPharmResponsive';
import FAQPage from './pages/FAQPage/faq';
import PatientHome from './pages/homePage/patient/patientHome';
import PharmacistHome from './pages/homePage/pharmacist/pharmacistHome';
import Profile from './pages/profile/profile';
import Error from './pages/404_error/404_error';
import Tutorials from './pages/Tutorial_List/Tutorial_List';
import Footer from './components/footer/footer'

function App() {
  return (<>

  <Router>
      <NavPharmResponsive/>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

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


    </>
  );
}
export default App;
