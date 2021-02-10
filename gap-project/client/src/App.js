import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Nav from './components/nav/nav';
import FAQ from './pages/FAQ/FAQ';
import PharmContact from './pages/pharmContact/pharmContact'
function App() {
  return (<>

  <Router>
      <Nav/>  
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/faq">
          <FAQ />
          </Route>
          <Route path="/users">
            User
          </Route>
          <Route path="/contact">
            <PharmContact/>
          </Route>
          <Route path="/">
            Home
          </Route>
        </Switch>
    </Router>
 
 
    </>
  );
}
export default App;
/**
 <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello world
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
 */