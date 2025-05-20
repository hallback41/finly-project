import styles from "./CryptoItem.module.scss";
import React, { useState } from "react";
import CryptoChart from "./CryptoChart";

const CryptoItem = ({ coin }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="crypto-item-row">
      <img
        src={coin.icon}
        alt={coin.symbol}
        width={32}
        height={32}
        style={{ borderRadius: "50%", background: "#fff", marginRight: 12 }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://cryptoicon-api.vercel.app/api/icon/btc";
        }}
      />
      <span>
        {coin.name} ({coin.symbol.toUpperCase()})
      </span>
      <button className="crypto-price-btn" onClick={() => setOpen((prev) => !prev)}>
        {coin.price.toLocaleString()} $
      </button>
      {open && (
        <div className="crypto-chart-block">
          <CryptoChart coinId={coin.id} />
        </div>
      )}
    </div>
  );
};

export default CryptoItem;
