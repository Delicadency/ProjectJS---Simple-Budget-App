export const incomes = [];
export const expenses = [];


export const state = {
  duringEdit: false,
};

export function getTotalIncomes() {
  return incomes.reduce((total, income) => total + income.amount, 0);
}

export function getTotalExpenses() {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export const displayErrorLabel = (errorLabel, typeOfInput) => {
  errorLabel.style.display = "block";
  typeOfInput.classList.add("error");
};

export const hideErrorLabel = (errorLabel, typeOfInput) => {
  errorLabel.style.display = "none";
  typeOfInput.classList.remove("error");
};
