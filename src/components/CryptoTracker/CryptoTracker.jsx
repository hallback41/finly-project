import styles from "./CryptoTracker.module.scss";
import CryptoSelector from "./CryptoSelector/CryptoSelector";
import CryptoList from "./CryptoList/CryptoList";
import { useCallback } from "react";
import ThemeVideoBackground from "../CategoriesBlock/ThemeVideoBackground";
import { useTheme } from "@/context/ThemeContext";
// import useLocalStorage from "../../hooks/useLocalStorage";
import useCloudLocalStorage from "../../hooks/useCloudLocalStorage";

const CryptoTracker = () => {
  const [selectedCoins, setSelectedCoins] = useCloudLocalStorage("selectedCoins", []);
  const { currentTheme } = useTheme();

  const handleAddCoin = useCallback(
    (coin) => {
      setSelectedCoins((prev) => {
        if (!prev.some((c) => c.id === coin.id)) {
          return [...prev, coin];
        }
        return prev;
      });
    },
    [setSelectedCoins]
  );

  const handleDeleteCoin = useCallback(
    (coinId) => {
      setSelectedCoins((prev) => prev.filter((coin) => coin.id !== coinId));
    },
    [setSelectedCoins]
  );

  return (
    <div className={`${styles.crypto} container`}>
      <ThemeVideoBackground theme={currentTheme} />

      <CryptoSelector onSelect={handleAddCoin} />
      <CryptoList coins={selectedCoins} onDelete={handleDeleteCoin} />
    </div>
  );
};

export default CryptoTracker;
