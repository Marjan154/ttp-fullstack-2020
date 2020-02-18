import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "../styles/navbar.css";

class Nav extends Component {
  render() {
    const email = this.props.match.params.email;
    return (
      <div id="nav-container">
        <nav className="nav">
          {/* <span className = "titleHome">Health Tracker</span> */}
          <div className="navName">
            <h1 style={{ color: "#1e1e6e" }}>Stock Portfolio</h1>
          </div>
          <ul>
            <li>
              <Link to={`/home/${email}`} style={{ textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to={`/transactions/${email}`}
                style={{ textDecoration: "none" }}
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link to={`/buy/${email}`} style={{ textDecoration: "none" }}>
                Buy
              </Link>
            </li>
            <li>
              <Link to="/" style={{ textDecoration: "none" }}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default withRouter(Nav);
