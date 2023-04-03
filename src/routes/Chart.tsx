import { useQuery } from "react-query";
import { getCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilState } from "recoil";
import { isTheme } from "../atoms";

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
  const theme = useRecoilState(isTheme);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          options={{
            theme: {
              mode: theme ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: {
                show: false,
              },
              categories: data?.map((price) => price.open),
              type: "datetime",
              labels: {
                style: {
                  colors: "#fbc531",
                },
              },
            },
          }}
          series={[
            {
              name: "Price",
              data:
                data?.map((price) => ({
                  x: price.time_close * 1000,
                  y: [
                    parseFloat(price.open),
                    parseFloat(price.high),
                    parseFloat(price.low),
                    parseFloat(price.close),
                  ],
                })) ?? [],
            },
          ]}
        />
      )}
    </div>
  );
};

export default Chart;
