import axios from "axios";
import { getStockAllPrices } from "./stockApi.js";

export let getAllTransactions = async (email, limit, offset) => {
  let url =
    "https://floating-bastion-36036.herokuapp.com/api/transactions/transactions/";
  let trans = await axios.get(url, {
    params: {
      email,
      limit,
      offset
    }
  });
  let symbols = trans.data.map(trans => trans.symbol);
  let stockPrices = await getStockAllPrices(symbols);
  return [trans.data, stockPrices];
};
export let getAllSymbols = async email => {
  let url =
    "https://floating-bastion-36036.herokuapp.com/api/transactions/groupbysymbol/";
  let trans = await axios.get(url, {
    params: {
      email
    }
  });
  let symbols = trans.data.map(trans => trans.symbol);
  let stockPrices = await getStockAllPrices(symbols);
  return [trans.data, stockPrices];
};

export let getBalance = async email => {
  let url = `https://floating-bastion-36036.herokuapp.com/api/users/find/`;
  let bal = await axios.get(url, {
    params: {
      email
    }
  });
  return bal.data.balance;
};
export let getSpent = async email => {
  console.log("in");
  let url = `https://floating-bastion-36036.herokuapp.com/api/transactions/spent/`;
  let spent = await axios.get(url, {
    params: {
      email
    }
  });
  console.log("spent is", spent);
  return spent.data.spent;
};

export let makeTransaction = async stock => {
  let url =
    "https://floating-bastion-36036.herokuapp.com/api/transactions/transactions/";
  // needs email, cost, symbol,  && number of shares
  await axios.post(url, { ...stock });
};
