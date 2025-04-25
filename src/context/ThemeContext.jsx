import { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useLocalStorage("finly_theme", "ios");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>{children}</ThemeContext.Provider>;
};
