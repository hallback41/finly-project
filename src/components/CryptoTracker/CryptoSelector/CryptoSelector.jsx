import React, { useState } from "react";
import { usePaprikaCoins } from "../../../hooks/usePaprikaCoins";
import styles from "./CryptoSelector.module.scss";

const CryptoSelector = ({ onSelect }) => {
  const { coins, loading } = usePaprikaCoins();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${styles["crypto-selector"]} container`}>
      <button className={styles["crypto-selector__add-btn"]} onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "Close" : "Add coin"}
      </button>
      <div className={`${styles["crypto-selector__dropdown"]} ${isOpen ? styles.open : ""}`}>
        <input
          className={styles["crypto-selector__search"]}
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? (
          <div>Загрузка...</div>
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
                <img
                  src={coin.icon}
                  alt={coin.symbol}
                  width={32}
                  height={32}
                  className={styles["crypto-selector__img"]}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/btc.svg";
                  }}
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
