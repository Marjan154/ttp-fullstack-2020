import React, { Component } from "react";
import styles from "../styles/home.css";
import axios from "axios";
import MyNav from "./Nav";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { getBalance } from "../utils/transactions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email,
      balance: 0,
      searchbarVal: "",
      bestMatches: []
    };
  }

  async componentDidMount() {
    let balance = await getBalance(this.state.email);
    this.setState({ balance: Number(balance).toFixed(2) });
  }

  render() {
    const { email } = this.state;
    const d = new Date(Date.now());
    return (
      <div>
        <div>
          {/* <MyNav /> */}
          <div className="banner">
            {/* <h1>Welcome {this.state.email}</h1>
          <h1>Profile (${this.state.totalCash})</h1> */}
            <div className="grid-container">
              <h1 id="homeTitle">Welcome {email} !</h1>

              <h1
                style={{
                  color: "white",
                  width: "100vw",
                  marginTop: "-15vh"
                }}
              >
                Today is {d.toDateString()}.
                <br />
                Your'e balance is ${this.state.balance}. What would you like to
                do today?
              </h1>

              <div className="stats">
                <Link
                  to={`/profile/${email}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="stat">
                    <div>
                      <img
                        src={require("../images/user.png")}
                        style={{ padding: "20px" }}
                        className="p-icon"
                      ></img>
                      <h1>View Profile</h1>
                      <h3 style={{ color: "#1e1e6e" }}>
                        You have ${this.state.balance}
                      </h3>
                    </div>
                  </div>
                </Link>

                <Link
                  to={`/transactions/${email}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="stat">
                    <div>
                      <img
                        src={require("../images/transaction.png")}
                        style={{ padding: "20px" }}
                        className="p-icon"
                      ></img>
                      <h1>View Transactions</h1>
                      <h3 style={{ color: "#1e1e6e" }}>x transactions</h3>
                    </div>
                  </div>
                </Link>

                <Link to={`/buy/${email}`} style={{ textDecoration: "none" }}>
                  <div className="stat">
                    <div>
                      <img
                        src={require("../images/payment-method.png")}
                        style={{ padding: "20px" }}
                        className="p-icon"
                      ></img>
                      <h1>Buy/Sell Stocks</h1>
                      <h3 style={{ color: "#1e1e6e" }}>
                        {/* {this.minutesToHoursTimeString(
                        this.state.sleepTotalToday
                      )} */}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
