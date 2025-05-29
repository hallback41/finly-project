import { useRef, useMemo } from "react";
import styles from "./MonthExpensesChart.module.scss";
import useEChart from "@/hooks/useECharts";
import { useTranslation } from "react-i18next";

const MonthExpensesBarChart = ({ expenses }) => {
  const chartRef = useRef(null);
  const { t } = useTranslation();

  const { dayLabels, dailySums } = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    const sums = Array(daysInMonth).fill(0);

    expenses.forEach((exp) => {
      const date = new Date(exp.date);
      if (date.getFullYear() === year && date.getMonth() === month) {
        const day = date.getDate();
        sums[day - 1] += exp.amount;
      }
    });

    return { dayLabels: labels, dailySums: sums };
  }, [expenses]);

  // 2. ECharts
  useEChart(
    chartRef,
    () => ({
      grid: { left: 20, right: 10, top: 30, bottom: 40, containLabel: true },
      xAxis: {
        type: "category",
        data: dayLabels,
        axisLabel: { interval: 0, rotate: 45, fontSize: 11, color: "#888" },
        axisLine: { lineStyle: { color: "#e5e5e5" } },
      },
      yAxis: {
        type: "value",
        minInterval: 1,
        axisLabel: { color: "#888" },
        splitLine: { lineStyle: { color: "#eee" } },
      },
      tooltip: {
        trigger: "axis",
        formatter: (params) => `<b>${params[0].axisValue} ${t("day")}</b><br>${t("Spent")}: <b>${params[0].data}</b>`,
        backgroundColor: "#222",
        borderColor: "#60a5fa",
        textStyle: { color: "#fff" },
      },
      series: [
        {
          data: dailySums,
          type: "bar",
          barMaxWidth: 24,
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: "#60a5fa",
          },
        },
      ],
    }),
    [dayLabels, dailySums]
  );

  return (
    <div className={styles.container}>
      <div ref={chartRef} className={styles.chart} />
    </div>
  );
};

export default MonthExpensesBarChart;
