import "./App.css";
import Header from "./components/Header";
import SentenceLoop from "./components/SentenceLoop";
import Footer from "./components/Footer";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

function App() {
  return (
    <>
      <div className="content">
        <Header title="Near Us" />

        <div className="App-content">
          <SentenceLoop />
        </div>

        <Footer title="Dashboard" />
      </div>
      <Canvas>
        <OrbitControls autoRotate autoRotateSpeed={0.2} />
        <Stars />
      </Canvas>
    </>
  );
}

export default App;
