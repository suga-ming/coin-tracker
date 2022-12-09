import styled from "styled-components";
import React from "react";
import { useQuery } from "react-query";
import { getCoinTickers } from "../api";

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: number;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 35px;
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Price = ({ coinId }: PriceProps) => {
  const { isLoading, data } = useQuery<PriceData>(["priceData", coinId!], () =>
    getCoinTickers(coinId)
  );
  console.log("룰", data);
  return (
    <div>
      {isLoading ? (
        "Price is loading..."
      ) : (
        <>
          <Container>
            <Box>
              <span>price:</span>
              <span>${data?.quotes.USD.price}</span>
            </Box>
            <Box>
              <span>ath_price:</span>
              <span>${data?.quotes.USD.ath_price}</span>
            </Box>
            <Box>
              <span>market_cap_change_24h:</span>
              <span>${data?.quotes.USD.market_cap_change_24h}</span>
            </Box>
            <Box>
              <span>percent_change_12h:</span>
              <span>${data?.quotes.USD.percent_change_12h}</span>
            </Box>
            <Box>
              <span>market_cap:</span>
              <span>${data?.quotes.USD.market_cap}</span>
            </Box>
          </Container>
        </>
      )}
    </div>
  );
};

export default Price;
