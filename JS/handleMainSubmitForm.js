import { incomes, expenses } from "./data.js";
import { addElementToList } from "./addElementToList.js";

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
    textInput.classList.add("error");
    isValid = false;
  } else {
    textErrorLabel.style.display = "none";
    textInput.classList.remove("error");
  }

  if (isNaN(amount) || amount <= 0) {
    amountErrorLabel.style.display = "block";
    amountInput.classList.add("error");
    isValid = false;
  } else {
    amountErrorLabel.style.display = "none";
    amountInput.classList.remove("error");
  }

  if (isValid) {
    const entry = {
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
  }
}

export default handleMainSubmitForm;
