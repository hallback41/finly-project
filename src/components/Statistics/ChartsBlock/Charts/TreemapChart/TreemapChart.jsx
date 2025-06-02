import styles from "./TreemapChart.module.scss";
import { useRef, useMemo } from "react";
import * as echarts from "echarts";
import { useDatabase } from "@/context/DataBaseContext";
import { useTranslation } from "react-i18next";
import useEChart from "@/hooks/useECharts";

const getTreemapData = (categories, expenses, t) => {
  return categories.map((cat) => {
    const sum = expenses.filter((exp) => exp.categoryId === cat.id).reduce((acc, exp) => acc + exp.amount, 0);

    return {
      name: t ? t(cat.name) : cat.name,
      value: sum,
      itemStyle: {
        color: cat.color,
      },
    };
  });
};

const TreemapChart = ({ expenses }) => {
  const chartRef = useRef(null);
  const { categories } = useDatabase();
  const { t } = useTranslation();

  const treemapData = useMemo(() => getTreemapData(categories, expenses, t), [categories, expenses, t]);

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
            textBorderColor: "#000",
            textBorderWidth: 3,
          },
          leafDepth: 1,
          roam: false,
        },
      ],
      tooltip: {
        show: false,
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
