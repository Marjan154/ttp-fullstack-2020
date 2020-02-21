import axios from "axios";
import { getStockAllPrices } from "./stockApi.js";

export let getAllTransactions = async email => {
  let url = "/api/transactions/transactions/";
  let trans = await axios.get(url, {
    params: {
      email
    }
  });
  let symbols = trans.data.map(trans => trans.symbol);
  let stockPrices = await getStockAllPrices(symbols);
  return [trans.data, stockPrices];
};
export let getAllSymbols = async email => {
  let url = "/api/transactions/groupbysymbol/";
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
  let url = `/api/users/find/`;
  let bal = await axios.get(url, {
    params: {
      email
    }
  });
  return bal.data.balance;
};

export let makeTransaction = async stock => {
  let url =
    "https://floating-bastion-36036.herokuapp.com/api/transactions/transactions/";
  // needs email, cost, symbol,  && number of shares
  await axios.post(url, { ...stock });
};
