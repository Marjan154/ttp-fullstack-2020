import axios from "axios";

const key = "Tpk_629c2ff3f36c4aa4821c7f061431f683";
export let getAllStocks = async searchval => {
  let url = `https://sandbox.iexapis.com/stable/search/${searchval}?token=${key}`;
  let stockdata = await axios.get(url).then(data => data.data);
  let symbols = stockdata.map(stock => stock.symbol);
  let priceData = await getStockAllPrices(symbols);
  return [stockdata, priceData];
};

export let getStockAllPrices = async symbols => {
  let symbolsS = symbols.join(",");
  let url = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbolsS}&types=price,ohlc&token=${key}`;
  let sdata = await axios.get(url).then(data => data.data);
  return sdata;
};

export let getStockPrice = async symbol => {
  let url = `https://sandbox.iexapis.com/stable/stock/${symbol}/price?token=${key}`;
  let sprice = await axios.get(url).then(data => {
    return data.data;
  });
  return sprice;

  // GET /stock/{symbol}/price
  // GET /stock/{symbol}/ohlc
  // GET /search/{fragment}
  // GET /stock/{symbol}/quote/{field}
};
