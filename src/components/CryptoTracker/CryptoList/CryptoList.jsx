import styles from "./CryptoList.module.scss";
import React from "react";
import CryptoItem from "./CryptoItem/CryptoItem";

const CryptoList = ({ coins }) => (
  <div className="crypto-list-tracked">
    {coins.map((coin) => (
      <CryptoItem key={coin.id} coin={coin} />
    ))}
  </div>
);

export default CryptoList;
