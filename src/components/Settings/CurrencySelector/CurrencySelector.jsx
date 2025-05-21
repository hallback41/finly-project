// CurrencySelector.jsx
import style from "./CurrencySelector.module.scss";

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "UAH", symbol: "₴", name: "Українська гривня ❤️" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
];

const CurrencySelector = () => {
  return (
    <div className={style.currencySelector}>
      <h2 className={style.currencySelector__title}>Choose Currency:</h2>
      <div className={style.currencySelector__buttons}>
        {currencies.map((currency) => (
          <button key={currency.code} className={style.currencySelector__btn}>
            {currency.symbol} {currency.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CurrencySelector;
