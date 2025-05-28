import { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useAdaptiveTheme from "../hooks/useAdaptiveTheme";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useLocalStorage("finly_theme", "ios");
  const [activeTheme, setActiveTheme] = useState(currentTheme);
  useAdaptiveTheme(currentTheme, setCurrentTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "iosAuto") {
      const hour = new Date().getHours();
      const isNight = hour < 7 || hour > 19;
      setActiveTheme(isNight ? "iosDark" : "ios");
    } else {
      setActiveTheme(currentTheme);
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, activeTheme }}>{children}</ThemeContext.Provider>
  );
};
