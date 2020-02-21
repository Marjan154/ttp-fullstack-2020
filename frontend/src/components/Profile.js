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
        const currVal = priceArray[trans.symbol].price * trans.shares;
        const color =
          priceArray[trans.symbol].price >
          priceArray[trans.symbol].ohlc.open.price
            ? "green"
            : "red";
        let cstyle = {
          color
        };
        return (
          <tr key={trans.symbol}>
            <td> {trans.symbol}</td>
            <td>{trans.shares}</td>
            <td style={cstyle}>{currVal}</td>
            <td>{priceArray[trans.symbol].ohlc.open.price || "N/A"} </td>
            <td style={cstyle}> {priceArray[trans.symbol].price} </td>
            <td> {priceArray[trans.symbol].ohlc.close.price || "N/A"} </td>
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
              fontSize: "5rem",
              margin: "30px",
              color: "#1e1e6e",
              marginTop: "-5vh"
            }}
          >
            Profile
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
                    <th>Number of Shares</th>
                    <th>Current Value</th>
                    <th>Open Price</th>
                    <th>Current Price</th>
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
