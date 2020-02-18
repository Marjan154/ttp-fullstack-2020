import axios from "axios";

export let getAllTransactions = () => {
  let url = "http://localhost:5000/api/transactions/transactions/";
  axios.get(url).then(data => console.log(data));
};

export let getBalance = async email => {
  let url = `http://localhost:5000/api/users/find/`;
  let bal = await axios.get(url, {
    params: {
      email
    }
  });
  return bal.data.balance;
};

export let makeTransaction = async stock => {
  let url = "http://localhost:5000/api/transactions/transactions/";
  // needs email, cost, symbol,  && number of shares
  await axios.post(url, { ...stock });
};
