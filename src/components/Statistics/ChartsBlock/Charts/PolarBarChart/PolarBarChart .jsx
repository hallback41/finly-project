import { useRef, useMemo, useCallback } from "react";
import * as echarts from "echarts";
import styles from "./PolarBarChart.module.scss";
import { useDatabase } from "@/context/DataBaseContext";
import { getCategorySums } from "@/utils/getCategorySums";
import useEChart from "@/hooks/useECharts";

const PolarBarChart = ({ expenses }) => {
  const chartRef = useRef(null);
  const { categories } = useDatabase();

  const categorySums = useMemo(() => {
    return categories.map((cat) => {
      const catExpenses = expenses.filter((exp) => exp.categoryId === cat.id);
      return {
        id: cat.id,
        name: cat.name,
        sum: catExpenses.reduce((acc, exp) => acc + exp.amount, 0),
      };
    });
  }, [expenses, categories]);

  const maxSum = useMemo(() => {
    return Math.max(...categorySums.map((cat) => cat.sum)) || 1;
  }, [categorySums]);

  const categoryNames = useMemo(() => categorySums.map((cat) => cat.name), [categorySums]);

  const getColor = useCallback((varName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }, []);

  const data = useMemo(() => {
    const MIN_PERCENT = 0.001;
    return categorySums.map((cat) => {
      const value = cat.sum < maxSum * MIN_PERCENT ? maxSum * MIN_PERCENT : cat.sum;
      return {
        value,
        realValue: cat.sum,
        name: cat.name,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: getColor(`--${cat.id}-gradient-1`) },
            { offset: 1, color: getColor(`--${cat.id}-gradient-2`) },
          ]),
          borderColor: "rgba(24, 19, 19, 0.49)",
          borderWidth: 3,
          borderType: "solid",
        },
      };
    });
  }, [categorySums, getColor, maxSum]);

  useEChart(
    chartRef,
    () => ({
      title: { text: "" },
      polar: { radius: [1, "95%"] },
      angleAxis: {
        max: maxSum,
        startAngle: 90,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
      },
      radiusAxis: {
        type: "category",
        data: categoryNames,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
      },
      tooltip: {},
      series: [
        {
          type: "bar",
          data: categorySums.map(() => maxSum),
          coordinateSystem: "polar",
          roundCap: true,
          barWidth: 1,
          itemStyle: {
            color: "rgba(255, 255, 255, 0.43)",
          },
          z: 1,
          silent: true,
        },
        {
          type: "bar",
          data,
          coordinateSystem: "polar",
          roundCap: true,
          barWidth: 150,
          label: {
            show: false,
            position: "insideStart",
            formatter: "{b}",
            color: "#000",
            fontWeight: "bold",
            fontSize: 14,
            textBorderColor: "#fff",
            textBorderWidth: 3,
            align: "left",
            verticalAlign: "middle",
            distance: 8,
          },
          labelLayout: {
            rotate: -8,
          },
          z: 2,
        },
      ],
    }),
    [categorySums, categoryNames, maxSum, data]
  );

  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <ul className={styles.legend}>
          {categorySums.map((cat) => (
            <li key={cat.id} className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{
                  background: `linear-gradient(to right, var(--${cat.id}-gradient-1), var(--${cat.id}-gradient-2))`,
                }}
              />
              <span className={styles.legendLabel}>{cat.name}</span>
            </li>
          ))}
        </ul>
        <div ref={chartRef} className={styles.chart} />
      </div>
    </div>
  );
};

export default PolarBarChart;
