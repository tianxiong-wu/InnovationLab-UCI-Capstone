import logo from './logo.svg';
import './App.css';
import Nav from './components/nav/nav';
import LoginSignUp from "./pages/loginSignUp/loginSignUp"

function App() {
  return (
    <div>
      <Nav/>
      <LoginSignUp/>
    </div>
  );
}

export default App;