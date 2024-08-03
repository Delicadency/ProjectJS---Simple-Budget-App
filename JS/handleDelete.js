import { incomes, expenses, state } from "./data.js";
import { updateBalance } from "./updateBalance.js";
import { displayErrorMessage } from "./displayErrorMessage.js";


export function handleDelete(li, type) {
  if (state.duringEdit) {
    displayErrorMessage();
    return;
  }
  const id = li.getAttribute("data-id");
  li.remove();

  if (type === "income") {
    const index = incomes.findIndex((income) => income.id == id);
    if (index !== -1) {
      incomes.splice(index, 1);
    }
  } else if (type === "expense") {
    const index = expenses.findIndex((expense) => expense.id == id);
    if (index !== -1) {
      expenses.splice(index, 1);
    }
  }
  updateBalance();
}
