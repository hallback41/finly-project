import styles from "./CryptoList.module.scss";
import React from "react";
import CryptoItem from "./CryptoItem/CryptoItem";

const CryptoList = ({ coins, onDelete }) => (
  <div className={styles["crypto-list-tracked"]}>
    {coins.map((coin) => (
      <CryptoItem key={coin.id} coin={coin} onDelete={onDelete} />
    ))}
  </div>
);

export default CryptoList;
