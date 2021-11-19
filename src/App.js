import logo from './logo.svg';
import './App.css';
import AstraInfo from './components/AstraInfo';
import GRPC from './components/GRPC';
import TestSentenceLoopGRPC from './components/TestSentenceLoopGRPC';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>TestSentenceLoopGRPC</h1>
        <TestSentenceLoopGRPC />
        <h1>GRPC</h1>
        <GRPC />
        <h1>AstraInfo(Astra DB)</h1>
        <AstraInfo />
      </header>
    </div>
  );
}

export default App;
