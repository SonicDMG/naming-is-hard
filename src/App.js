import "./App.css";
import Header from "./components/Header";
import SentenceLoop from "./components/SentenceLoop";

function App() {
  return (
    <div>
      <Header title="Near Us"/>

      <div className="App">
        <SentenceLoop />
      </div>
      
    </div>
  );
}

export default App;
