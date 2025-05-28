import { createContext, useContext, useEffect, useState } from "react";
import categoriesData from "../components/categoriesData/categoriesData";
import { useAuth } from "../context/AuthContext";
import { saveToCloud } from "../utils/saveToCloud";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const { user } = useAuth();
  // Внутренний state категорий — всегда актуальное значение
  const [categories, setCategories] = useState(categoriesData);

  // 1. При логине — всегда слушай Firestore и обновляй state (и localStorage)
  useEffect(() => {
    if (!user) {
      // Если не залогинен — берём из localStorage
      try {
        const item = localStorage.getItem("finly_categoriesData");
        setCategories(item ? JSON.parse(item) : categoriesData);
      } catch {
        setCategories(categoriesData);
      }
      return;
    }

    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      const cloudCats = snap.exists() ? snap.data().finly_categoriesData : null;
      if (Array.isArray(cloudCats)) {
        setCategories(cloudCats);
        localStorage.setItem("finly_categoriesData", JSON.stringify(cloudCats)); // (опционально)
      }
    });

    return () => unsub();
  }, [user]);

  // 2. updateCategorie — всегда обновляет state, localStorage и (если user) Firestore
  const updateCategorie = (id, updatedFields) => {
    setCategories((prev) => {
      const updated = prev.map((cat) => (cat.id === id ? { ...cat, ...updatedFields } : cat));
      localStorage.setItem("finly_categoriesData", JSON.stringify(updated));
      if (user) saveToCloud(user.uid, "finly_categoriesData", updated);
      return updated;
    });
  };

  // 3. resetCategories — сброс до дефолта
  const resetCategories = () => {
    setCategories(() => {
      localStorage.setItem("finly_categoriesData", JSON.stringify(categoriesData));
      if (user) saveToCloud(user.uid, "finly_categoriesData", categoriesData);
      return categoriesData;
    });
  };

  // 4. removeExpenseFromCategory — удаляет трату
  const removeExpenseFromCategory = (parentId, expenseId) => {
    setCategories((prev) => {
      const updated = prev.map((cat) => {
        if (cat.id !== parentId) return cat;
        return {
          ...cat,
          expenses: cat.expenses.filter((exp) => exp.id !== expenseId),
        };
      });
      localStorage.setItem("finly_categoriesData", JSON.stringify(updated));
      if (user) saveToCloud(user.uid, "finly_categoriesData", updated);
      return updated;
    });
  };

  return (
    <DatabaseContext.Provider
      value={{
        categories,
        updateCategorie,
        resetCategories,
        removeExpenseFromCategory,
        setCategories,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
