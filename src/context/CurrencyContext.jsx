import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

const DEFAULT_CURRENCY = {
  code: "USD",
  symbol: "$",
  name: "US Dollar",
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState(() => {
    const fromStorage = localStorage.getItem("finly_currency");
    return fromStorage ? JSON.parse(fromStorage) : DEFAULT_CURRENCY;
  });

  useEffect(() => {
    localStorage.setItem("finly_currency", JSON.stringify(currency));
  }, [currency]);

  const setCurrency = (newCurrency) => {
    setCurrencyState(newCurrency);
  };

  return <CurrencyContext.Provider value={{ currency, setCurrency }}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = () => useContext(CurrencyContext);
