import styles from "./CryptoTracker.module.scss";
import CryptoSelector from "./CryptoSelector/CryptoSelector";
import CryptoList from "./CryptoList/CryptoList";
import React, { useState } from "react";
import ThemeVideoBackground from "../CategoriesBlock/ThemeVideoBackground";
import { useTheme } from "@/context/ThemeContext";
import useLocalStorage from "../../hooks/useLocalStorage";

const CryptoTracker = () => {
  const [selectedCoins, setSelectedCoins] = useLocalStorage("selectedCoins", []);
  const { currentTheme } = useTheme();

  const handleAddCoin = (coin) => {
    if (!selectedCoins.some((c) => c.id === coin.id)) {
      setSelectedCoins((prev) => [...prev, coin]);
    }
  };

  const handleDeleteCoin = (coinId) => {
    setSelectedCoins((prev) => prev.filter((coin) => coin.id !== coinId));
  };

  return (
    <div className={`${styles.crypto} container`}>
      <ThemeVideoBackground theme={currentTheme} />

      <CryptoSelector onSelect={handleAddCoin} />
      <CryptoList coins={selectedCoins} onDelete={handleDeleteCoin} />
    </div>
  );
};

export default CryptoTracker;
