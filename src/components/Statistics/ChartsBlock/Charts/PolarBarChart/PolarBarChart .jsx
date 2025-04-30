import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import styles from "./PolarBarChart.module.scss";
import { useDatabase } from "@/context/DataBaseContext";

const PolarBarChart = () => {
  const chartRef = useRef(null);
  const { categories } = useDatabase();

  useEffect(() => {
    if (!chartRef.current) return;

    if (echarts.getInstanceByDom(chartRef.current)) {
      echarts.dispose(chartRef.current);
    }

    const myChart = echarts.init(chartRef.current);

    const getColor = (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

    const categoryNames = categories.map((cat) => cat.name);
    const categorySums = categories.map((cat) => cat.expenses.reduce((sum, exp) => sum + exp.amount, 0));

    const maxSum = Math.max(...categorySums) || 1;
    const MIN_PERCENT = 0.055;

    const data = categories.map((category) => {
      const sum = category.expenses.reduce((acc, exp) => acc + exp.amount, 0);
      const value = sum < maxSum * MIN_PERCENT ? maxSum * MIN_PERCENT : sum;

      return {
        value,
        realValue: sum,
        name: category.name,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: getColor(`--${category.id}-gradient-1`) },
            { offset: 1, color: getColor(`--${category.id}-gradient-2`) },
          ]),
          borderColor: "rgba(24, 19, 19, 0.49)",
          borderWidth: 3,
          borderType: "solid",
        },
      };
    });

    const option = {
      title: { text: "" },
      polar: { radius: [30, "80%"] },
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
          data: categories.map(() => maxSum),
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
          data: data,
          coordinateSystem: "polar",
          roundCap: true,
          barWidth: 150,
          label: {
            show: true,
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
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [categories]);

  return <div ref={chartRef} className={styles.chart}></div>;
};

export default PolarBarChart;
