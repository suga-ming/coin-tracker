import axios from "axios";
import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
`;

const OverView = styled.div`
  display: flex;
  background-color: black;
  color: white;
  height: 50px;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 15px 0;
`;

const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px 0 15px;
`;

const OverViewText = styled.div`
  font-size: 10px;
  margin-bottom: 6px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  background-color: black;
  font-size: 12px;
  font-weight: 400;
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor}
    a {
    display: block;
  }
`;

interface RouteState {
  state: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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
    USd: {
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

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<{ coinId: string }>();
  const { state } = useLocation() as RouteState;
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  console.log(priceMatch);

  useEffect(() => {
    (async () => {
      const infoData = await axios.get(
        `https://api.coinpaprika.com/v1/coins/${coinId}`
      );
      const priceData = await axios.get(
        `https://api.coinpaprika.com/v1/tickers/${coinId}`
      );

      setInfo(infoData.data);
      setPriceInfo(priceData.data);
      setLoading(false);
    })();
  }, []);
  return (
    <div>
      <Container>
        <Header>
          <Title>{state ? state : loading ? "Loading..." : info?.name}</Title>
        </Header>
        {loading ? (
          <Loader>loading...</Loader>
        ) : (
          <div>
            <OverView>
              <OverViewItem>
                <OverViewText>RANK:</OverViewText>
                <div>{info?.rank}</div>
              </OverViewItem>
              <OverViewItem>
                <OverViewText>SYMBOL:</OverViewText>
                <div>${info?.symbol}</div>
              </OverViewItem>
              <OverViewItem>
                <OverViewText>OPEN SOURCE:</OverViewText>
                <div>{info?.open_source ? "Yes" : "No"}</div>
              </OverViewItem>
            </OverView>
            <div>{info?.description}</div>
            <OverView>
              <OverViewItem>
                <OverViewText>TOTAL SUPLY:</OverViewText>
                {priceInfo?.total_supply}
              </OverViewItem>
              <OverViewItem>
                <OverViewText>MAX SUPPLY:</OverViewText>
                {priceInfo?.max_supply}
              </OverViewItem>
            </OverView>
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to="chart">Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to="price">Price</Link>
              </Tab>
            </Tabs>

            <Routes>
              <Route path="chart" element={<Chart />} />
              <Route path="price" element={<Price />} />
            </Routes>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Coin;
