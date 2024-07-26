import { incomes, expenses } from "./data.js";

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
    textErrorLabel.style.display = "block";
    isValid = false;
  } else {
    textErrorLabel.style.display = "none";
  }

  if (isNaN(amount) || amount <= 0) {
    amountErrorLabel.style.display = "block";
    isValid = false;
  }

  if (isValid) {
    const entry = {
      text,
      amount,
    };

    if (type === "income") {
      incomes.push(entry);
    } else if (type === "expense") {
      expenses.push(entry);
    }
  }
  textInput.value = "";
  amountInput.value = "";
}

export default handleMainSubmitForm;
