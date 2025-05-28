import React, { useRef, useMemo, useCallback, useEffect } from "react";
import * as echarts from "echarts";
import styles from "./BarRaceChart.module.scss";
import { useDatabase } from "@/context/DataBaseContext";
import useEChart from "@/hooks/useECharts";
import { useTheme } from "../../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const BarRaceChart = ({ expenses }) => {
  const chartRef = useRef(null);
  const { categories } = useDatabase();
  const { currentTheme } = useTheme();
  const { t } = useTranslation();

  const getColor = useCallback((varName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }, []);

  const categorySums = useMemo(() => {
    return categories.map((cat) => {
      const catExpenses = expenses.filter((exp) => exp.categoryId === cat.id);
      return {
        id: cat.id,
        name: cat.name,
        sum: catExpenses.reduce((acc, exp) => acc + exp.amount, 0),
      };
    });
  }, [categories, expenses]);

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
        name: t(cat.name),
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
  }, [categorySums, getColor, maxSum, t]);

  const categoryNames = useMemo(() => categorySums.map((cat) => t(cat.name)), [categorySums, t]);

  useEChart(
    chartRef,
    () => {
      const fontFamily =
        getComputedStyle(document.documentElement).getPropertyValue("--font-family-them").trim() ||
        "Inter, Segoe UI, Arial, sans-serif";

      return {
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
              fontFamily,
              color: "#000",
              fontWeight: "bold",
              fontSize: 18,
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
          top: 10,
          bottom: 10,
          left: 5,
          right: 5,
        },
        animationDurationUpdate: 500,
      };
    },
    [barData, backgroundData, categoryNames, currentTheme]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!chartRef.current) return;
      const chart = echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        const fontFamily = getComputedStyle(document.documentElement).getPropertyValue("--font-family-them").trim();
        chart.setOption(
          {
            series: [
              {},
              {
                label: { fontFamily },
              },
            ],
          },
          false
        );
      }
    }, 30);

    return () => clearTimeout(timeout);
  }, [currentTheme, t]);

  return <div ref={chartRef} className={styles.chart} style={{ width: "100%", height: "800px" }} />;
};

export default BarRaceChart;
