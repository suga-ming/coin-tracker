import { useQuery } from "react-query";
import { getCoinHistory } from "../api";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    getCoinHistory(coinId)
  );
  return <div>Chart</div>;
};

export default Chart;
