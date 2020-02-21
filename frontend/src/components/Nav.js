import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import styles from "../styles/navbar.css";
// import "https://fonts.googleapis.com/css?family=Ubuntu&display=swap";

class MyNav extends Component {
  render() {
    const email = "john@john.com";
    const stylesHome = {
      height: "100px",
      fontSize: "40px",
      fontFamily: "Ubuntu, sans-serif",
      fontWeight: "1000",
      color: "white",
      backgroundColor: "#1e1e6e"
    };
    const stylesOther = {
      height: "100px",
      fontSize: "40px",
      fontFamily: "Ubuntu, sans-serif",
      fontWeight: "1000",
      color: "#1e1e6e",
      backgroundColor: "white"
    };
    console.log(this.props.location.pathname.includes("/home/"));
    const styles = this.props.location.pathname.includes("/home/")
      ? stylesHome
      : stylesOther;
    if (
      this.props.location.pathname === "/" ||
      this.props.location.pathname === "/register"
    ) {
      return <div></div>;
    } else {
      return (
        <Navbar
          collapseOnSelect
          expand="lg"
          variant={
            this.props.location.pathname.includes("/home/") ? "dark" : "light"
          }
          style={styles}
        >
          <Navbar.Brand style={styles} href={`/home/${email}`}>
            StockPortfolio
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{ color: "white" }}
          >
            <Nav className="ml-auto">
              <Nav.Link style={styles} eventKey={1} href={`/home/${email}`}>
                Home
              </Nav.Link>
              <Nav.Link style={styles} eventKey={2} href={`/buy/${email}`}>
                Buy
              </Nav.Link>
              <Nav.Link
                style={styles}
                eventKey={3}
                href={`/transactions/${email}`}
              >
                Transactions
              </Nav.Link>

              <Nav.Link style={styles} eventKey={4} href={`/`}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
}

export default withRouter(MyNav);
