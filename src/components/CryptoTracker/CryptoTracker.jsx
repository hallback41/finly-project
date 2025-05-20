import styles from "./CryptoTracker.module.scss";
import CryptoSelector from "./CryptoSelector/CryptoSelector";
import CryptoList from "./CryptoList/CryptoList";
import React, { useState } from "react";
import ThemeVideoBackground from "../CategoriesBlock/ThemeVideoBackground";
import { useTheme } from "@/context/ThemeContext";

const CryptoTracker = () => {
  const [selectedCoins, setSelectedCoins] = useState([]);
  const { currentTheme } = useTheme();

  const handleAddCoin = (coin) => {
    if (!selectedCoins.some((c) => c.id === coin.id)) {
      setSelectedCoins((prev) => [...prev, coin]);
    }
  };

  return (
    <div className={`${styles.crypto} container`}>
      <ThemeVideoBackground theme={currentTheme} />

      <CryptoSelector onSelect={handleAddCoin} />
      <CryptoList coins={selectedCoins} />
    </div>
  );
};

export default CryptoTracker;
