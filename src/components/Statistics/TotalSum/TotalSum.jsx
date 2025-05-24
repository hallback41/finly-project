import styles from "./TotalSum.module.scss";
import { useTranslation } from "react-i18next";
import { useCurrency } from "../../../context/CurrencyContext"; // добавь импорт

const TotalSum = ({ expenses, month, year }) => {
  const { t } = useTranslation();
  const { currency } = useCurrency(); // получаем текущую валюту

  const total = expenses
    .filter((exp) => {
      const d = new Date(exp.date);
      return d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <div className={styles.total}>
      <span className={styles.total__label}>{t("Total spent")}:</span>
      <span className={styles.total__value}>
        {total} {currency.symbol}
      </span>
    </div>
  );
};

export default TotalSum;
