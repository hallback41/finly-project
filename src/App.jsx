import { useState } from "react";
import "./styles/main.scss";
import React from "react";
import categoriesData from "./components/categoriesData/categoriesData";
import CategoriesBlock from "./components/CategoriesBlock";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeSelector from "./components/ThemeSelector";

function App() {
  return (
    <ThemeProvider>
      <ThemeSelector />
      <React.Fragment>
        <CategoriesBlock categoriesData={categoriesData} />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
