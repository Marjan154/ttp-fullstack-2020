import React, { Component } from "react";
import styles from "../styles/home.css";
import axios from "axios";
import { getAllStocks, getStockPrice, getStockAllPrices } from "../stockApi.js";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email,
      totalCash: 5000,
      searchbarVal: "",
      bestMatches: [],
      stockInfo: {},
      display: []
    };
  }
  componentDidMount() {}
  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  onSubmit = e => {
    e.preventDefault();
    getAllStocks(this.state.searchbarVal).then(data => {
      this.setState({
        bestMatches: data[0],
        stockInfo: data[1]
      });
    });
  };

  viewPrice = symbol => {
    getStockPrice(symbol).then(data => console.log(data));
    //getStockAllPrices(symbol).then(data => console.log(data));
  };

  displaySearches = (stockArray, stockInfo) => {
    let res =
      stockArray &&
      stockArray.map(stock => {
        return (
          <tr key={stock.symbol}>
            <td> {stock.symbol}</td>
            <td>{stock.securityName}</td>
            <td>{stock.securityType}</td>
            <td> {stock.region} </td>
            <td>{stock.exchange}</td>
            <td>{stockInfo[stock.symbol].price}</td>
          </tr>
        );
      });
    return res;
  };
  render() {
    let res = this.displaySearches(
      this.state.bestMatches,
      this.state.stockInfo
    );
    return (
      <div>
        <h1>My Transactions</h1>
        <div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Search stock"
              name="searchbarVal"
              onChange={this.inputHandler}
            />
            <button>Search</button>
          </form>
        </div>
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
                  <th>Symbol</th>
                  <th>Security Name</th>

                  <th>Security Type</th>
                  <th>Region</th>
                  <th>Exchange</th>
                  <th>View</th>
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

export default Transactions;
