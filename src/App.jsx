import "./styles/main.scss";
import React from "react";
import categoriesData from "./components/categoriesData/categoriesData";
import CategoriesBlock from "./components/CategoriesBlock";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeSelector from "./components/ThemeSelector";
import StatisticsBlock from "./components/Statistics/StatisticsBlock";
import CryptoTracker from "./components/CryptoTracker/CryptoTracker";

function App() {
  return (
    <ThemeProvider>
      <ThemeSelector />
      <CryptoTracker />
      <React.Fragment>
        <CategoriesBlock categoriesData={categoriesData} />
        <StatisticsBlock />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
