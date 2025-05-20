import "./styles/main.scss";
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./components/MainLayout/MainLayout";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";

function App() {
  return (
    <ThemeProvider>
      <ThemeSelector />
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
