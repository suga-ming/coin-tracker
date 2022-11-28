import axios from "axios";

const Base_URL = "https://api.coinpaprika.com";

export const getCoinList = async () => {
  return await axios.get(`${Base_URL}/v1/coins`).then((res) => res.data);
};

export const getCoinInfo = async (coinId: string) => {
  return await axios
    .get(`${Base_URL}/v1/coins/${coinId}`)
    .then((res) => res.data);
};

export const getCoinTickers = async (coinId: string) => {
  return await axios
    .get(`${Base_URL}/v1/tickers/${coinId}`)
    .then((res) => res.data);
};

export const getCoinHistory = async (coinId: string) => {
  return await axios
    .get(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)
    .then((res) => res.data);
};
