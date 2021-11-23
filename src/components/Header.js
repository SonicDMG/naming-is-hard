import React from "react";
import GRPC from "./GRPC";
import AstraInfo from "./AstraInfo";

function Header(props) {
  const { title } = props;

  const label = title;

  return (
    <div className="App-header">
      <div className="App-title ui">{label}</div>
      <div className="App-region ui">
        <GRPC />
        <AstraInfo />
      </div>
    </div>
  );
}

export default Header;
