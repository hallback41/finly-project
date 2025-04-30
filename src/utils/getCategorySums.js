export const getCategorySums = (categories) => {
  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    sum: cat.expenses.reduce((acc, expense) => acc + expense.amount, 0),
  }));
};
