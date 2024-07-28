import { incomes, expenses } from "./data.js";
import { updateBalance } from "./updateBalance.js";

export function handleDelete(li, type) {
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
