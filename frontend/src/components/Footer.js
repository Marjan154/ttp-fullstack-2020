import React, { Component } from "react";
//import "../Styling/Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer
        style={{
          bottom: 0,
          width: "100%",
          height: "120px",
          backgroundColor: "#1e1e6e",
          color: "white",
          paddingTop: "5px",
          // marginBottom: "-700px",
          position: "static"
        }}
      >
        <div className="container text-center">
          <span className="myfont" style={{ width: "100%" }}>
            <b>Created by: </b>
            <br />
            Marjan Ansar
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
