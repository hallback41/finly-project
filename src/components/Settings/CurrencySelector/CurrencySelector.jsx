import { useCurrency } from "../../../context/CurrencyContext";
import { useTranslation } from "react-i18next";
import style from "./CurrencySelector.module.scss";

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "UAH", symbol: "₴", name: "Ukrainian Hryvnia" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
];

const CurrencySelector = () => {
  const { t } = useTranslation();
  const { currency, setCurrency } = useCurrency();

  return (
    <div className={style.currencySelector}>
      <h2 className={style.currencySelector__title}>{t("Choose Currency") + ":"}</h2>
      <div className={style.currencySelector__buttons}>
        {currencies.map((cur) => (
          <button
            key={cur.code}
            className={`${style.currencySelector__btn} ${currency.code === cur.code ? style.active : ""}`}
            onClick={() => setCurrency(cur)}
          >
            {t(`${cur.symbol} ${cur.name}`)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CurrencySelector;
