import styles from "./CryptoItem.module.scss";
import React, { useState } from "react";
import CryptoChart from "./CryptoChart";
import ImageWithFallback from "../../../UI/ImageWithFallback";

const CryptoItem = React.memo(({ coin, onDelete }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={styles["crypto-item"]}>
      <div className={styles["crypto-item__body"]}>
        <ImageWithFallback
          src={coin.icon}
          symbol={coin.symbol}
          alt={coin.symbol}
          width={32}
          height={32}
          className={styles["crypto-item__icon"]}
        />
        <span className={styles["crypto-item__info"]}>
          {coin.name} ({coin.symbol.toUpperCase()})
        </span>
        <button className={styles["crypto-item__price-btn"]} onClick={() => setOpen((prev) => !prev)}>
          {coin.price.toLocaleString()} $
        </button>
        <button className={styles["crypto-item__delete-btn"]} onClick={() => onDelete(coin.id)}>
          -
        </button>
      </div>
      <div className={`${styles["crypto-item__chart-block"]} ${open ? styles.open : ""}`}>
        <CryptoChart coinId={coin.id} />
      </div>
    </div>
  );
});

export default CryptoItem;
