import {
  incomes,
  expenses,
  hideErrorLabel,
  displayErrorLabel,
  state,
} from "./data.js";
import { updateBalance } from "./updateBalance.js";
import { validateAmountInputs } from "./validateAmountInputs.js";
import { displayErrorMessage } from "./displayErrorMessage.js";

export function handleEdit(li, type, editButton, deleteButton) {
  if (state.duringEdit) {
    displayErrorMessage();
    return;
  }
  state.duringEdit = true;

  const id = li.getAttribute("data-id");
  const listParagraph = li.querySelector(".list__paragraph");

  const currentText = listParagraph.textContent.split(" - ")[0];
  const textContent = listParagraph.textContent;
  const amountText = textContent.split(" - ")[1].trim();
  const currentAmount = parseFloat(
    amountText.replace(/\s/g, "").replace(",", ".")
  );

  const textInput = document.createElement("input");
  textInput.className = `input input--edit input--${type} txt-a--center f-s-14`;
  textInput.type = "text";
  textInput.maxLength = 30;
  textInput.value = currentText;
  textInput.autocomplete = "off";
  textInput.placeholder = "Nazwa";
  textInput.id = `text-${id}`;

  const textErrorLabel = document.createElement("label");
  textErrorLabel.className = "error_label";
  textErrorLabel.textContent = "Uzupełnij pole";
  textErrorLabel.setAttribute("for", `text-${id}`);

  const textWrapper = document.createElement("div");
  textWrapper.className = "input__wrapper--edit-text";

  const amountInput = document.createElement("input");
  amountInput.className = `input input--edit input--${type} txt-a--center f-s-14`;
  amountInput.type = "number";
  amountInput.maxLength = 10;
  amountInput.value = currentAmount;
  amountInput.autocomplete = "off";
  amountInput.placeholder = "Kwota";
  amountInput.id = `amount-${id}`;
  amountInput.inputMode = "numeric";
  amountInput.pattern = "^d{0,7}(.d{0,2})?$";
  amountInput.step = "0.01";

  const amountErrorLabel = document.createElement("label");
  amountErrorLabel.className = "error_label";
  amountErrorLabel.textContent = "Uzupełnij pole";
  amountErrorLabel.setAttribute("for", `amount-${id}`);

  const amountWrapper = document.createElement("div");
  amountWrapper.className = "input__wrapper--edit-amount";

  listParagraph.innerHTML = "";
  listParagraph.appendChild(textWrapper);
  textWrapper.appendChild(textErrorLabel);
  textWrapper.appendChild(textInput);
  listParagraph.appendChild(amountWrapper);
  amountWrapper.appendChild(amountErrorLabel);
  amountWrapper.appendChild(amountInput);

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.name = "save";
  saveButton.className = `list__button save save--${type}`;
  saveButton.id = `button-save-${id}`;
  editButton.replaceWith(saveButton);

  const cancelButton = document.createElement("button");
  cancelButton.type = "submit";
  cancelButton.name = "cancel";
  cancelButton.className = `list__button cancel cancel--${type}`;
  cancelButton.id = `button-cancel-${id}`;
  deleteButton.replaceWith(cancelButton);

  saveButton.addEventListener("click", (event) => {
    event.preventDefault();

    const newText = textInput.value.trim();
    const newAmount = parseFloat(amountInput.value);
    let isValid = true;

    if (!newText) {
      displayErrorLabel(textErrorLabel, textInput);
      isValid = false;
    } else {
      hideErrorLabel(textErrorLabel, textInput);
    }
    if (isNaN(newAmount) || newAmount <= 0) {
      displayErrorLabel(amountErrorLabel, amountInput);
      isValid = false;
    } else {
      hideErrorLabel(amountErrorLabel, amountInput);
    }

    if (isValid) {
      listParagraph.textContent = `${newText} - ${newAmount.toLocaleString(
        "pl-PL",
        {
          minimumFractionDigits: 2,
        }
      )} zł`;

      const handleEntry = (entry) => {
        entry.text = newText;
        entry.amount = newAmount;
      };

      if (type === "income") {
        const entry = incomes.find((income) => income.id == id);
        if (entry) {
          handleEntry(entry);
        }
      } else if (type === "expense") {
        const entry = expenses.find((expense) => expense.id == id);
        if (entry) {
          handleEntry(entry);
        }
      }
      saveButton.replaceWith(editButton);
      cancelButton.replaceWith(deleteButton);
      updateBalance();
      state.duringEdit = false;
    }
  });

  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();

    listParagraph.textContent = `${currentText} - ${currentAmount.toLocaleString(
      "pl-PL",
      {
        minimumFractionDigits: 2,
      }
    )} zł`;
    saveButton.replaceWith(editButton);
    cancelButton.replaceWith(deleteButton);
    state.duringEdit = false;
  });

  li.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveButton.click();
    }
  });

  li.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelButton.click();
    }
  });
  if (amountInput) {
    validateAmountInputs(amountInput);
  }
}
