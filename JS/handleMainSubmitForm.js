import {
  incomes,
  expenses,
  hideErrorLabel,
  displayErrorLabel,
} from "./data.js";
import { addElementToList } from "./addElementToList.js";
import { updateBalance } from "./updateBalance.js";

function handleMainSubmitForm(event, type) {
  event.preventDefault();

  const textInput = event.target.querySelector('input[type="text"]');
  const amountInput = event.target.querySelector('input[type="number"]');

  const text = textInput.value.trim();
  const amount = parseFloat(amountInput.value);

  const textErrorLabel = event.target.querySelector(`#${type}-name-error`);
  const amountErrorLabel = event.target.querySelector(`#${type}-amount-error`);

  let isValid = true;

  if (!text) {
    displayErrorLabel(textErrorLabel, textInput);
    isValid = false;
  } else {
    hideErrorLabel(textErrorLabel, textInput);
  }

  if (isNaN(amount) || amount <= 0) {
    displayErrorLabel(amountErrorLabel, amountInput);
    isValid = false;
  } else {
    hideErrorLabel(amountErrorLabel, amountInput);
  }

  if (isValid) {
    const entry = {
      id: Date.now(),
      text,
      amount,
    };

    textInput.value = "";
    amountInput.value = "";

    if (type === "income") {
      incomes.push(entry);
    } else if (type === "expense") {
      expenses.push(entry);
    }
    addElementToList(type, text, amount);
    updateBalance();
  }
}

export default handleMainSubmitForm;
