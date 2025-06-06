import { useState } from "react";
import { useGeckoCoins } from "../../../hooks/useGeckoCoins";
import styles from "./CryptoSelector.module.scss";
import ImageWithFallback from "../../UI/ImageWithFallback";
import { useTranslation } from "react-i18next";

const CryptoSelector = ({ onSelect }) => {
  const { t } = useTranslation();
  const { coins, loading } = useGeckoCoins();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${styles["crypto-selector"]} container`}>
      <button className={styles["crypto-selector__add-btn"]} onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? t("Close") : t("Add coin")}
      </button>
      <div className={`${styles["crypto-selector__dropdown"]} ${isOpen ? styles.open : ""}`}>
        <input
          className={styles["crypto-selector__search"]}
          type="text"
          placeholder={t("Search...")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? (
          <div>{t("Loading...")}</div>
        ) : (
          <ul className={styles["crypto-selector__list"]}>
            {filteredCoins.map((coin) => (
              <li
                key={coin.id}
                onClick={() => {
                  onSelect(coin);
                  setIsOpen(false);
                  setSearch("");
                }}
                className={styles["crypto-selector__item"]}
              >
                <ImageWithFallback
                  src={coin.icon}
                  symbol={coin.symbol}
                  alt={coin.symbol}
                  width={32}
                  height={32}
                  className={styles["crypto-selector__img"]}
                />
                {coin.name} ({coin.symbol}) — {coin.price.toLocaleString()}$
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CryptoSelector;
