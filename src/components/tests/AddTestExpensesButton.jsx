import React from "react";
import { useDatabase } from "@/context/DataBaseContext";

const AddTestExpensesButton = () => {
  const { categories, setCategories } = useDatabase();

  const handleAddTestExpenses = () => {
    const now = new Date();
    const firstYear = 2020;
    const lastYear = now.getFullYear();
    let years = [];
    for (let y = firstYear; y <= lastYear; y++) {
      years.push(y);
    }

    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));

    const newCategories = categories.map((cat) => {
      let expenses = [...cat.expenses];

      years.forEach((year) => {
        months.forEach((month) => {
          const daysInMonth = new Date(year, parseInt(month), 0).getDate();

          // В этом месяце всего 10 трат (разных дней)
          const usedDays = new Set();
          while (usedDays.size < 10) {
            usedDays.add(Math.floor(Math.random() * daysInMonth) + 1);
          }

          Array.from(usedDays).forEach((randomDay) => {
            const date = `${year}-${month}-${randomDay.toString().padStart(2, "0")}T12:00:00.000Z`;
            expenses.push({
              id: crypto.randomUUID(),
              amount: Math.floor(Math.random() * 500) + 1,
              date,
            });
          });
        });
      });

      return { ...cat, expenses };
    });

    setCategories(newCategories);
    alert("Тестовые траты (по 10 на месяц) добавлены по всем категориям!");
  };

  return (
    <button
      style={{
        margin: "40px auto",
        padding: "16px 32px",
        background: "#1a1a1a",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        fontSize: "18px",
        cursor: "pointer",
        display: "block",
      }}
      onClick={handleAddTestExpenses}
    >
      Add test expenses (10 per month)
    </button>
  );
};

export default AddTestExpensesButton;
