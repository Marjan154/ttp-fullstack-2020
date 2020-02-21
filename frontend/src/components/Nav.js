import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import styles from "../styles/navbar.css";
import { LinkContainer } from "react-router-bootstrap";
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
    console.log("hashome", this.props.location.pathname.includes("/home/"));
    const styles = this.props.location.pathname.includes("/home/")
      ? stylesHome
      : stylesOther;
    console.log(styles);
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
              <LinkContainer style={styles} to={`/home/${email}`}>
                <NavItem eventKey={1}>Home</NavItem>
              </LinkContainer>
              <LinkContainer style={styles} to={`/buy/${email}`}>
                <NavItem eventKey={2}>Buy</NavItem>
              </LinkContainer>
              <LinkContainer style={styles} to={`/transactions/${email}`}>
                <NavItem eventKey={3}>Transactions</NavItem>
              </LinkContainer>
              <LinkContainer style={styles} to={`/`}>
                <NavItem eventKey={4}>Logout</NavItem>
              </LinkContainer>
              {/* <Link to={`/home/${email}`}>
                <Nav.Link style={styles} eventKey={1}>
                  Home
                </Nav.Link>
              </Link>
              <Link to={`/buy/${email}`}>
                <Nav.Link style={styles} eventKey={2}>
                  Buy
                </Nav.Link>
              </Link>
              <Link to={`/transactions/${email}`}>
                <Nav.Link style={styles} eventKey={3}>
                  Transactions
                </Nav.Link>
              </Link>
              <Link to={`/`}>
                <Nav.Link style={styles} eventKey={4}>
                  Logout
                </Nav.Link>
              </Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
}

export default withRouter(MyNav);
