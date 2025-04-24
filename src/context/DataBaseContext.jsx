import { createContext, useContext } from "react";
import useLocalStorage from "../utils/useLocalStorage";
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

  return (
    <DatabaseContext.Provider value={{ categories, updateCategorie, resetCategories }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
