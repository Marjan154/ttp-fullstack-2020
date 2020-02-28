import axios from "axios";
require("dotenv").config();

const key = "Tpk_629c2ff3f36c4aa4821c7f061431f683";
const skey = process.env.REACT_APP_IEX_API_KEY;

export let getAllStocks = async searchval => {
  let url = `https://sandbox.iexapis.com/stable/search/${searchval}?token=${key}`;
  let stockdata = await axios.get(url).then(data => data.data);
  let symbols = stockdata.map(stock => stock.symbol);
  let priceData = await getStockAllPrices(symbols);
  return [stockdata, priceData];
};

export let getStockAllPrices = async symbols => {
  let symbolsS = symbols.join(",");
  let url = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbolsS}&types=price,quote,ohlc&token=${key}`;
  let sdata = await axios.get(url).then(data => data.data);
  return sdata;
};

export let getStockPrice = async symbol => {
  let url = `https://sandbox.iexapis.com/stable/stock/${symbol}/quote/latestPrice?token=${key}`;
  let sprice = await axios.get(url).then(data => {
    return data.data;
  });
  return sprice;
};
