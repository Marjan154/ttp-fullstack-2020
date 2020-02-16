import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "../styles/login.css";
class Register extends Component {
  state = {};
  render() {
    return (
      <div className="login-page">
        <h1>STOCK PORTFOLIO</h1>
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="name" />
            <input type="password" placeholder="password" />
            <input type="text" placeholder="email address" />
            <button>create</button>
            <Link to="/">
              <p className="message">Already registered?</p>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
