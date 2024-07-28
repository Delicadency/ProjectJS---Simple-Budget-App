export const incomes = [];
export const expenses = [];

export function getTotalIncomes() {
  return incomes.reduce((total, income) => total + income.amount, 0);
}

export function getTotalExpenses() {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}
