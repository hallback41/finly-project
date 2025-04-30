import React, { useRef, useMemo, useCallback } from "react";
import * as echarts from "echarts";
import styles from "./BarRaceChart.module.scss";
import { useDatabase } from "@/context/DataBaseContext";
import { getCategorySums } from "@/utils/getCategorySums";
import useEChart from "@/hooks/useECharts";

const BarRaceChart = () => {
  const chartRef = useRef(null);
  const { categories } = useDatabase();

  const getColor = useCallback((varName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }, []);

  const categorySums = useMemo(() => {
    return getCategorySums(categories).sort((a, b) => b.sum - a.sum);
  }, [categories]);

  const maxSum = useMemo(() => {
    return Math.max(...categorySums.map((c) => c.sum)) || 1;
  }, [categorySums]);

  const backgroundData = useMemo(() => categorySums.map(() => maxSum), [categorySums, maxSum]);

  const barData = useMemo(() => {
    const MIN_PERCENT = 0.1;
    return categorySums.map((cat) => {
      const displayValue = cat.sum < maxSum * MIN_PERCENT ? maxSum * MIN_PERCENT : cat.sum;
      return {
        value: displayValue,
        name: cat.name,
        realValue: cat.sum,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: getColor(`--${cat.id}-gradient-1`) },
            { offset: 1, color: getColor(`--${cat.id}-gradient-2`) },
          ]),
          borderRadius: 16,
        },
      };
    });
  }, [categorySums, getColor, maxSum]);

  const categoryNames = useMemo(() => categorySums.map((cat) => cat.name), [categorySums]);

  useEChart(
    chartRef,
    () => ({
      xAxis: {
        max: "dataMax",
        show: false,
      },
      yAxis: {
        type: "category",
        data: categoryNames,
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      series: [
        {
          type: "bar",
          data: backgroundData,
          barWidth: 50,
          itemStyle: {
            color: "rgba(255,255,255,0.2)",
            borderRadius: 16,
          },
          silent: true,
          barGap: "-100%",
          z: 1,
        },
        {
          type: "bar",
          data: barData,
          barWidth: 50,
          label: {
            show: true,
            position: "insideLeft",
            formatter: (params) => `${params.name}: ${params.data.realValue}`,
            color: "#000",
            fontWeight: "bold",
            fontSize: 22,
            textBorderColor: "#fff",
            textBorderWidth: 3,
            align: "left",
            verticalAlign: "middle",
            distance: 10,
            labelLayout: {
              moveOverlap: "shiftY",
            },
          },
          z: 2,
        },
      ],
      grid: {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30,
      },
      animationDurationUpdate: 500,
    }),
    [barData, backgroundData, categoryNames]
  );

  return <div ref={chartRef} className={styles.chart} style={{ width: "100%", height: "800px" }} />;
};

export default BarRaceChart;
