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
    const MIN_PERCENT = 0.025; // Минимум 10% от максимального значения

    const data = categories.map((category) => {
      const sum = category.expenses.reduce((acc, exp) => acc + exp.amount, 0);
      const value = sum < maxSum * MIN_PERCENT ? maxSum * MIN_PERCENT : sum;

      return {
        value,
        realValue: sum, // сохраним реальное значение для подписи если нужно
        name: category.name,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: getColor(`--${category.id}-gradient-1`) },
            { offset: 1, color: getColor(`--${category.id}-gradient-2`) },
          ]),
          borderColor: "#000", // ✅ черная обводка
          borderWidth: 2, // ✅ толщина обводки
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
      series: {
        type: "bar",
        data: data,
        coordinateSystem: "polar",
        roundCap: true,
        barWidth: 150,
        label: {
          show: true,
          position: "insideStart", // В начале линии
          formatter: "{b}", // Показываем только название категории
          color: "#000", // Чёрный текст
          fontWeight: "bold",
          fontSize: 14,
          textBorderColor: "#fff", // Белая обводка
          textBorderWidth: 3,
          rotate: 0, // Держим горизонтально
          align: "left", // Выравнивание в начале полоски
          verticalAlign: "middle",
          distance: 8, // Отступ от начала полоски
        },
        labelLayout: {
          rotate: -8,
        },
      },
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [categories]);

  return <div ref={chartRef} className={styles.chart}></div>;
};

export default PolarBarChart;
