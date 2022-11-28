import axios from "axios";

export const getCoinList = async () => {
  return await axios
    .get("https://api.coinpaprika.com/v1/coins")
    .then((res) => res.data);
};
