import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import styles from "./BarRaceChart.module.css";
import { useDatabase } from "@/context/DataBaseContext";

const BarRaceChart = () => {
  const chartRef = useRef(null);
  const { categories } = useDatabase();

  useEffect(() => {
    if (!chartRef.current) return;

    if (echarts.getInstanceByDom(chartRef.current)) {
      echarts.dispose(chartRef.current);
    }

    const myChart = echarts.init(chartRef.current);

    const getColor = (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

    // Готовим данные по категориям
    const sortedCategories = [...categories]
      .map((cat) => ({
        ...cat,
        sum: cat.expenses.reduce((sum, exp) => sum + exp.amount, 0),
      }))
      .sort((a, b) => b.sum - a.sum); // сортировка по убыванию сумм

    const option = {
      xAxis: {
        max: "dataMax",
        show: false,
      },
      yAxis: {
        type: "category",
        data: sortedCategories.map((cat) => cat.name),
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      series: [
        {
          // Фоновые белые полоски
          type: "bar",
          data: sortedCategories.map(() => Math.max(...sortedCategories.map((c) => c.sum))),
          barWidth: 50,
          itemStyle: {
            color: "rgba(255,255,255,0.2)", // Полупрозрачный белый
            borderRadius: 16, // скруглить, если хочешь
          },
          silent: true,
          barGap: "-100%", // Наложение на следующее
          z: 1,
        },
        {
          // Основные цветные полоски
          type: "bar",
          data: sortedCategories.map((cat) => ({
            value: cat.sum,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: getColor(`--${cat.id}-gradient-1`) },
                { offset: 1, color: getColor(`--${cat.id}-gradient-2`) },
              ]),
              borderRadius: 16, // ✅ скругляем углы цветных полос!
            },
          })),
          barWidth: 50,
          label: {
            show: true,
            position: "insideLeft",
            formatter: (params) => `${params.name}: ${params.value}`,
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
        top: 10,
        bottom: 10,
        left: 100,
        right: 30,
      },
      animationDurationUpdate: 500,
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [categories]); // <-- теперь обновление ТОЛЬКО когда меняются категории

  return <div ref={chartRef} className={styles.chart} style={{ width: "100%", height: "800px" }}></div>;
};

export default BarRaceChart;
