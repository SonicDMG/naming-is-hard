import React from "react";
import GRPC from "./GRPC";
import AstraInfo from "./AstraInfo";

function Header (props) {
  const { title } = props;

  const label = title;

  return (
    <div className="App-header">
        <div className="App-title">{label}</div>
        <div className="App-region">
            <GRPC />
            <AstraInfo />
        </div>
    </div>
  );
}

export default Header;