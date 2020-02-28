import React, { Component } from "react";
//import "../Styling/Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer
        style={{
          bottom: 0,
          width: "100%",
          height: "130px",
          backgroundColor: "#1e1e6e",
          color: "white",
          paddingTop: "5px",
          position: "relative",
          marginTop: "44vh"
        }}
      >
        <div className="container text-center">
          <span className="myfont" style={{ width: "100%" }}>
            <b>Created by: </b>
            <br />
            Marjan Ansar
          </span>
          <div>
            Icons made by{" "}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
