import "./styles/main.scss";
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./components/MainLayout/MainLayout";
import { CurrencyProvider } from "./context/CurrencyContext";
import i18n from "./i18n";

function App() {
  const savedLang = localStorage.getItem("lang");
  if (savedLang) {
    i18n.changeLanguage(savedLang);
  }

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <MainLayout />
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
