import "./App.css";
import Header from "./components/Header";
import SentenceLoop from "./components/SentenceLoop";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="content">
      <Header title="Near Us"/>

      <div className="App-content">
        <SentenceLoop />
      </div>
      
      <Footer title="Dashboard"/>
    </div>
  );
}

export default App;
