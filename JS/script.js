import handleMainSubmitForm from "./handleMainSubmitForm.js";
import { validateAmountInputs } from "./validateAmountInputs.js";

const incomeForm = document.getElementById("income-form");
const expenseForm = document.getElementById("expense-form");

incomeForm.addEventListener("submit", (event) =>
  handleMainSubmitForm(event, "income")
);

expenseForm.addEventListener("submit", (event) =>
  handleMainSubmitForm(event, "expense")
);

incomeForm.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    incomeForm.dispatchEvent(new Event("submit"));
  }
});

expenseForm.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    expenseForm.dispatchEvent(new Event("submit"));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const amountInputs = document.querySelectorAll('input[type="number"]');
  amountInputs.forEach((input) => {
    validateAmountInputs(input);
  });
});
