import logo from './logo.svg';
import './App.css';
import Nav from './components/nav/nav';
import Footer from './components/footer/footer'; 

function App() {
  return (
	<div className="fullPage">
		<Nav/>
		<Footer/>
	</div>
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