import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import styles from "../styles/login.css";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      invalid: false
    };
  }
  onSubmit = e => {
    e.preventDefault();
    axios
      .post("https://floating-bastion-36036.herokuapp.com/api/users/create", {
        ...this.state
      })
      .then(data => {
        this.props.history.push(`/home/${data.data.email}`);
      })
      .catch(e => {
        this.setState({ invalid: true });
        console.log(e);
      });
  };

  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="login-page">
        <h1>STOCK PORTFOLIO</h1>
        {this.state.invalid ? (
          <h5
            style={{
              padding: "15px",
              backgroundColor: "#ed8282",
              color: "white",
              opacity: "85%"
            }}
          >
            This user already exists.
          </h5>
        ) : (
          <div />
        )}
        <div className="form">
          <form className="login-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              required
              placeholder="name"
              name="name"
              onChange={this.inputHandler}
            />
            <input
              type="text"
              required
              placeholder="email address"
              name="email"
              onChange={this.inputHandler}
            />
            <input
              type="password"
              required
              placeholder="password"
              name="password"
              onChange={this.inputHandler}
            />

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
