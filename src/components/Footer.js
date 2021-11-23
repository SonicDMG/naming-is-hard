import React from "react";

function Footer (props) {
  const { title } = props;

  const label = title;

  return (
    <div className="App-footer">
        <div>{label}</div>
    </div>
  );
}

export default Footer;