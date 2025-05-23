import styles from "./TotalSum.module.scss";

const TotalSum = ({ expenses, month, year }) => {
  const total = expenses
    .filter((exp) => {
      const d = new Date(exp.date);
      return d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <div className={styles.total}>
      <span className={styles.total__label}>Total spent: </span>
      <span className={styles.total__value}> {total} $</span>
    </div>
  );
};

export default TotalSum;
