import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip } from "victory";

// Получай id монеты напрямую из списка (например "btc-bitcoin")
const CryptoChart = ({ coinId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!coinId) return;
    const endDateObj = new Date();
    const end = endDateObj.toISOString().split("T")[0];
    const startDateObj = new Date();
    startDateObj.setDate(endDateObj.getDate() - 7);
    const start = startDateObj.toISOString().split("T")[0];

    fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}/historical?start=${start}&end=${end}&interval=1d`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return setData([]);
        const chartData = data.map((item) => ({
          x: new Date(item.timestamp).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          }),
          y: item.price,
        }));
        setData(chartData);
      })
      .catch(() => setData([]));
  }, [coinId]);

  if (!data || data.length === 0) return <div>Нет данных для графика</div>;

  return (
    <div
      style={{
        background: "#20232a",
        padding: 24,
        borderRadius: 16,
        color: "#fff",
        boxShadow: "0 2px 16px #10101060",
      }}
    >
      <VictoryChart
        theme={VictoryTheme.material}
        width={800}
        height={320}
        padding={{ top: 40, bottom: 40, left: 80, right: 40 }}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => `${datum.y.toLocaleString("en-US", { maximumFractionDigits: 2 })} $`}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{
                  fill: "#232633",
                  stroke: "#333",
                  fontSize: 14,
                  padding: 8,
                }}
                style={{ fill: "#fff", fontWeight: 700 }}
              />
            }
          />
        }
      >
        <VictoryAxis
          style={{
            axis: { stroke: "transparent" },
            tickLabels: { fill: "#7e8299", fontSize: 12 },
            grid: { stroke: "#444", strokeDasharray: "6, 6" },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "transparent" },
            tickLabels: { fill: "#7e8299", fontSize: 12 },
            grid: { stroke: "#444", strokeDasharray: "6, 6" },
          }}
        />
        <VictoryLine
          data={data}
          interpolation="linear"
          style={{
            data: {
              stroke: "#00e676",
              strokeWidth: 2,
              filter: "drop-shadow(0px 2px 6px #00e67677)",
            },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default CryptoChart;
