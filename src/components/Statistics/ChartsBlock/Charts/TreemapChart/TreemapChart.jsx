import styles from "./TreemapChart.module.scss";
import { useRef, useMemo } from "react";
import * as echarts from "echarts";
import { useDatabase } from "@/context/DataBaseContext";
import { useTranslation } from "react-i18next";
import useEChart from "@/hooks/useECharts";

const getTreemapData = (categories, t) => {
  return categories.map((cat) => ({
    name: t ? t(cat.name) : cat.name,
    value: Array.isArray(cat.expenses) ? cat.expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0) : 0,
    itemStyle: {
      color: cat.color,
    },
  }));
};

const TreemapChart = () => {
  const chartRef = useRef(null);
  const { categories } = useDatabase();
  const { t } = useTranslation();

  const treemapData = useMemo(() => getTreemapData(categories, t), [categories, t]);

  useEChart(
    chartRef,
    () => ({
      series: [
        {
          type: "treemap",
          data: treemapData,
          focus: "none",
          blurScope: "global",
          selectedMode: false,
          nodeClick: false,

          label: {
            show: true,
            formatter: "{b}\n{c}",
            fontSize: 18,
            color: "#fff",
            fontWeight: "bold",
            textBorderColor: "#000", // черная окантовка
            textBorderWidth: 3,
          },
          leafDepth: 1,
          roam: false,
        },
      ],
      tooltip: {
        formatter: (params) => `<b>${params.name}</b><br>Сумма: ${params.value}`,
      },
    }),
    [treemapData]
  );

  return (
    <div className={styles.treemapChartContainer}>
      <div className={styles.treemapChartWrapper}>
        <div ref={chartRef} className={styles.treemapChart} />
      </div>
    </div>
  );
};

export default TreemapChart;
