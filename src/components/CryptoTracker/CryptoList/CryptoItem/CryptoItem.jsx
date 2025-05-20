import styles from "./CryptoItem.module.scss";
import React, { useState } from "react";
import CryptoChart from "./CryptoChart";

const CryptoItem = ({ coin }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={styles["crypto-item"]}>
      <div className={styles["crypto-item__body"]}>
        <img
          className={styles["crypto-item__icon"]}
          src={coin.icon}
          alt={coin.symbol}
          width={32}
          height={32}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png`;
          }}
        />
        <span className={styles["crypto-item__info"]}>
          {coin.name} ({coin.symbol.toUpperCase()})
        </span>
        <button className={styles["crypto-item__price-btn"]} onClick={() => setOpen((prev) => !prev)}>
          {coin.price.toLocaleString()} $
        </button>
      </div>
      {open && (
        <div className={styles["crypto-item__chart-block"]}>
          <CryptoChart coinId={coin.id} />
        </div>
      )}
    </div>
  );
};

export default CryptoItem;
