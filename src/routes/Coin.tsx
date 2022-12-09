import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { getCoinInfo, getCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
// import { isTheme } from "../atoms";
// import { blueTheme, pinkTheme, purpleTheme } from "../theme";
import { lightTheme, darkTheme } from "../theme";
import { isTheme } from "../atoms";

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
  margin-top: 20px;
  position: relative;
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

const Description = styled.div`
  color: ${(props) => props.theme.textColor};
  /* color: black; */
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
  color: ${(props) => (props.isActive ? props.theme.accentColor : "white")};
  a {
    display: block;
  }
`;
const Back = styled.div`
  position: absolute;
  font-size: 40px;
  left: 10px;
  top: 22px;
`;

// const ThemePurple = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 100%;
//   background-color: #9c88ff;
//   margin-left: 10px;
//   cursor: pointer;
// `;

// const ThemeBlue = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 100%;
//   background-color: #575fcf;
//   margin-left: 10px;

//   cursor: pointer;
// `;

// const ThemePink = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 100%;
//   background-color: #ef5777;
//   margin-left: 10px;

//   cursor: pointer;
// `;

const ChangeTheme = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

// const ThemeDark = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 100%;
//   background-color: #ef5777;
//   margin-left: 10px;

//   cursor: pointer;
// `;

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

interface ICoinsProps {}

const Coin = ({}: ICoinsProps) => {
  const { coinId } = useParams<{ coinId: string }>();
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const navigate = useNavigate();

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => getCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => getCoinTickers(coinId!),
    {
      refetchInterval: 10000,
    }
  );
  // const [loading, setLoading] = useState(true);
  // const [infoData, setInfo] = useState<InfoData>();
  // const [tickersData, setPriceInfo] = useState<PriceData>();
  // console.log(priceMatch);
  // console.log(chartMatch);

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await axios.get(
  //       `https://api.coinpaprika.com/v1/coins/${coinId}`
  //     );
  //     const priceData = await axios.get(
  //       `https://api.coinpaprika.com/v1/tickers/${coinId}`
  //     );

  //     setInfo(infoData.data);
  //     setPriceInfo(priceData.data);
  //     setLoading(false);
  //   })();
  // }, []);

  const loading = infoLoading || tickersLoading;
  const [Theme, setTheme] = useRecoilState(isTheme);
  // const toggleTheme = () => setTheme((current) => !current);
  // const [Theme, setTheme] = useRecoilState(colorTheme);
  // const PurPleTheme = () => setTheme(purpleTheme);
  // const BlueTheme = () => setTheme(blueTheme);
  // const PinkTheme = () => setTheme(pinkTheme);
  const changeTheme = () => setTheme((current) => !current);

  return (
    <div>
      <Container>
        <Helmet>
          <title>
            {state ? state : loading ? "Loading..." : infoData?.name}
          </title>
        </Helmet>
        <Header>
          <Title>
            {state ? state : loading ? "Loading..." : infoData?.name}
          </Title>
          <Link to="/">
            <Back>←</Back>
          </Link>
          {/* <ThemePurple onClick={PurPleTheme} />
          <ThemeBlue onClick={BlueTheme} />
          <ThemePink onClick={PinkTheme} /> */}
          {/* <ThemeLight onClick={changeTheme} /> */}
          <ChangeTheme onClick={changeTheme}>🌓</ChangeTheme>
        </Header>
        {loading ? (
          <Loader>loading...</Loader>
        ) : (
          <div>
            <OverView>
              <OverViewItem>
                <OverViewText>RANK:</OverViewText>
                <div>{infoData?.rank}</div>
              </OverViewItem>
              <OverViewItem>
                <OverViewText>SYMBOL:</OverViewText>
                <div>${infoData?.symbol}</div>
              </OverViewItem>
              <OverViewItem>
                <OverViewText>PRICE:</OverViewText>
                <div>${tickersData?.quotes.USD.price.toFixed(2)}</div>
              </OverViewItem>
            </OverView>
            <Description>{infoData?.description}</Description>
            <OverView>
              <OverViewItem>
                <OverViewText>TOTAL SUPLY:</OverViewText>
                {tickersData?.total_supply}
              </OverViewItem>
              <OverViewItem>
                <OverViewText>MAX SUPPLY:</OverViewText>
                {tickersData?.max_supply}
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
              <Route path="chart" element={<Chart coinId={coinId!} />} />
              <Route path="price" element={<Price coinId={coinId!} />} />
            </Routes>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Coin;
