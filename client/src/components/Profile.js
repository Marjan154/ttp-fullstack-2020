import React, { Component } from "react";
import axios from "axios";
import { getAllTransactions, getAllSymbols } from "../utils/transactions";
import Nav from "./Nav";

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
    this.setState({ transactions: transactions[0], prices: transactions[1] });
  }

  displayTrans = (transArray, priceArray) => {
    let res =
      transArray &&
      transArray.map(trans => {
        return (
          <tr key={trans.symbol}>
            <td> {trans.symbol}</td>
            <td>{trans.shares}</td>
            <td>{priceArray[trans.symbol].price * trans.shares}</td>
            <td> {priceArray[trans.symbol].ohlc.open.price} </td>
            <td> {priceArray[trans.symbol].price} </td>
            <td> {priceArray[trans.symbol].ohlc.close.price} </td>
          </tr>
        );
      });
    return res;
  };
  render() {
    let res = this.displayTrans(this.state.transactions, this.state.prices);
    return (
      <div style={{ marginTop: "100px" }}>
        <Nav />
        <h1>My Transactions</h1>
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
                  <th>Current Values</th>
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
    );
  }
}

export default Profile;
