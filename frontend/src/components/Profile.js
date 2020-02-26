import React, { Component } from "react";
import axios from "axios";
import { getAllSymbols, getBalance } from "../utils/transactions";
import MyNav from "./Nav";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email,
      transactions: [],
      prices: {}
    };
  }
  async componentDidMount() {
    let transactions = await getAllSymbols(this.state.email);
    let balance = await getBalance(this.state.email);
    this.setState({
      transactions: transactions[0],
      prices: transactions[1],
      balance: Number(balance).toFixed(2)
    });
  }

  displayTrans = (transArray, priceArray) => {
    let res =
      transArray &&
      transArray.map(trans => {
        const currentPrice = priceArray[trans.symbol].price;
        const latestPrice = priceArray[trans.symbol].quote.latestPrice;
        const price = currentPrice || latestPrice;
        const openPrice =
          priceArray[trans.symbol].ohlc.open.price || latestPrice || "N/A";
        let closePrice =
          priceArray[trans.symbol].ohlc.close.price || latestPrice || "N/A";
        const currVal = price * trans.shares;
        let cstyle = {
          color:
            Number(price).toFixed(2) === Number(openPrice).toFixed(2)
              ? "grey"
              : price > openPrice
              ? "green"
              : "red"
        };
        return (
          <tr key={trans.symbol}>
            <td style={cstyle}> {trans.symbol}</td>
            <td>{trans.shares}</td>
            <td style={cstyle}>
              <strong>${Number(currVal).toFixed(2)}</strong>
            </td>
            <td style={cstyle}> ${Number(currentPrice).toFixed(2)} </td>
            <td>${Number(openPrice).toFixed(2)} </td>
            <td> ${Number(closePrice).toFixed(2)} </td>
          </tr>
        );
      });
    return res;
  };
  render() {
    let res = this.displayTrans(this.state.transactions, this.state.prices);
    return (
      <div>
        <MyNav />
        <div style={{ marginTop: "100px" }}>
          <h1
            style={{
              margin: "30px",
              color: "#1e1e6e",
              marginTop: "-5vh"
            }}
          >
            Profile
          </h1>
          <h1>
            <h2>Hi {this.state.email} !</h2>
          </h1>
          <h1
            style={{
              textAlign: "right",
              padding: "40px",
              color: "#91b0ff",
              marginTop: "-5vh"
            }}
          >
            Your balance is ${this.state.balance}
          </h1>
          <div>
            <div>
              <table
                className="datatable"
                style={{
                  width: "85vw",
                  boxShadow: "4px 4px 5px grey",
                  margin: "auto",
                  paddingTop: "80px"
                }}
              >
                <thead className="thead-light">
                  <tr>
                    <th>Symbol/Ticker</th>
                    <th># of Shares</th>
                    <th>Current Value</th>
                    <th>Current Price</th>
                    <th>Open Price</th>
                    <th>Close Price</th>
                  </tr>
                </thead>
                <tbody>{res}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
