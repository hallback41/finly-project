import "./styles/main.scss";
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./components/MainLayout/MainLayout";

function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
