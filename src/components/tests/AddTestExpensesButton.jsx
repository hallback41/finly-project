import React from "react";
import { useDatabase } from "@/context/DataBaseContext";

const AddTestExpensesButton = () => {
  const { categories, setCategories } = useDatabase();

  const handleAddTestExpenses = () => {
    const now = new Date();
    const thisYear = 2025; // Только за 2025 год
    const thisMonth = now.getFullYear() === thisYear ? now.getMonth() + 1 : 12; // до текущего месяца если год совпадает
    const thisDay = now.getFullYear() === thisYear ? now.getDate() : 31; // до сегодняшнего дня если месяц совпадает

    // Составляем месяцы с учетом текущего дня
    let months = [];
    for (let m = 1; m <= thisMonth; m++) {
      const daysInMonth = m === thisMonth ? thisDay : new Date(thisYear, m, 0).getDate();

      months.push({
        month: m.toString().padStart(2, "0"),
        days: daysInMonth,
      });
    }

    // Генерим новые категории с тратами
    const newCategories = categories.map((cat) => {
      let expenses = [...cat.expenses];

      months.forEach(({ month, days }) => {
        // В каждый месяц — по 20 трат
        for (let i = 0; i < 20; i++) {
          const randomDay = Math.floor(Math.random() * days) + 1;
          const date = `${thisYear}-${month}-${randomDay.toString().padStart(2, "0")}T12:00:00.000Z`;
          expenses.push({
            id: crypto.randomUUID(),
            amount: Math.floor(Math.random() * 500) + 1,
            date,
          });
        }
      });

      return { ...cat, expenses };
    });

    setCategories(newCategories);
    alert("Тестовые траты за 2025 год до сегодняшнего дня добавлены по всем категориям!");
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
      Добавить тестовые траты за 2025 до сегодня
    </button>
  );
};

export default AddTestExpensesButton;
