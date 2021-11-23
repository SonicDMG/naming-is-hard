import React from "react";
import "./App.css";
import Header from "./components/Header";
import SentenceLoop from "./components/SentenceLoop";
import Footer from "./components/Footer";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { useState } from "react";

function App() {
  const [easterEgg, setEasterEgg] = useState(false);
  return (
    <>
      <div className="content" style={!easterEgg ? { zIndex: 1 } : {}}>
        <Header title="Near Us" />

        <div className="App-content">
          <SentenceLoop />
        </div>

        <Footer>
          <button
            className="ui"
            onClick={() => setEasterEgg(!easterEgg)}
          ></button>
        </Footer>
      </div>
      <Canvas>
        <OrbitControls autoRotate autoRotateSpeed={0.2} />
        <Stars />
      </Canvas>
    </>
  );
}

export default App;
