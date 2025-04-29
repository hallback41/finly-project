import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import categoriesData from "../components/categoriesData/categoriesData";

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [categories, setCategories] = useLocalStorage("finly_categoriesData", categoriesData);

  const updateCategorie = (id, updatedFields) => {
    setCategories((prev) => prev.map((cat) => (cat.id === id ? { ...cat, ...updatedFields } : cat)));
  };

  const resetCategories = () => {
    setCategories(categoriesData);
  };

  const removeExpenseFromCategory = (parentId, expenseId) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== parentId) return cat;
        return {
          ...cat,
          expenses: cat.expenses.filter((exp) => exp.id !== expenseId),
        };
      })
    );
  };

  return (
    <DatabaseContext.Provider value={{ categories, updateCategorie, resetCategories, removeExpenseFromCategory }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
