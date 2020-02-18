import axios from "axios";

export let getAllStocks = async searchval => {
  const key = "3U80U5NMFKZXQKS7";
  let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchval}&apikey=${key}`;
  let stockdata = await axios.get(url).then(data => data.data.bestMatches);
  return stockdata;
};
