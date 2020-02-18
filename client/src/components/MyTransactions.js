import React, { Component } from "react";
import axios from "axios";
import { getBalance } from "../utils/transactions";

class MyTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return <div>My transactions</div>;
  }
}

export default MyTransactions;
