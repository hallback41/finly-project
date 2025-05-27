import "./styles/main.scss";
import React, { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./components/MainLayout/MainLayout";
import { CurrencyProvider } from "./context/CurrencyContext";
import i18n from "./i18n";
import { testFirestoreCRUD } from "./testFirestore";
import { AuthProvider } from "./context/AuthContext";
import { DatabaseProvider } from "./context/DataBaseContext.jsx";

function App() {
  const savedLang = localStorage.getItem("lang");
  if (savedLang) {
    i18n.changeLanguage(savedLang);
  }

  useEffect(() => {
    testFirestoreCRUD();
  }, []);

  return (
    <AuthProvider>
      <DatabaseProvider>
        <ThemeProvider>
          <CurrencyProvider>
            <MainLayout />
          </CurrencyProvider>
        </ThemeProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
