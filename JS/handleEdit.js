import { incomes, expenses } from "./data.js";
import { updateBalance } from "./updateBalance.js";

export function handleEdit(li, type, editButton, deleteButton) {
  const id = li.getAttribute("data-id");
  const listParagraph = li.querySelector(".list__paragraph");

  const currentText = listParagraph.textContent.split(" zł - ")[1];
  const textContent = listParagraph.textContent;
  const amountText = textContent.split("zł - ")[0].trim();
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
  textWrapper.className = "input__wrapper--edit";

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
  amountWrapper.className = "input__wrapper--edit";

  listParagraph.innerHTML = "";
  listParagraph.appendChild(amountWrapper);
  amountWrapper.appendChild(amountErrorLabel);
  amountWrapper.appendChild(amountInput);
  listParagraph.appendChild(textWrapper);
  textWrapper.appendChild(textErrorLabel);
  textWrapper.appendChild(textInput);

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
      textErrorLabel.style.display = "block";
      textInput.classList.add("error");
      isValid = false;
    } else {
      textErrorLabel.style.display = "none";
      textInput.classList.remove("error");
    }
    if (isNaN(newAmount) || newAmount <= 0) {
      amountErrorLabel.style.display = "block";
      amountInput.classList.add("error");
      isValid = false;
    } else {
      amountErrorLabel.style.display = "none";
      amountInput.classList.remove("error");
    }

    if (isValid) {
      listParagraph.textContent = `${newAmount.toLocaleString("pl-PL", {
        minimumFractionDigits: 2,
      })} zł - ${newText}`;

      if (type === "income") {
        const entry = incomes.find((income) => income.id == id);
        if (entry) {
          entry.text = newText;
          entry.amount = newAmount;
        }
      } else if (type === "expense") {
        const entry = expenses.find((expense) => expense.id == id);
        if (entry) {
          entry.text = newText;
          entry.amount = newAmount;
        }
      }
      saveButton.replaceWith(editButton);
      cancelButton.replaceWith(deleteButton);
      updateBalance();
    }
  });
  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();

    listParagraph.textContent = `${currentAmount.toLocaleString("pl-PL", {
      minimumFractionDigits: 2,
    })} zł - ${currentText}`;
    saveButton.replaceWith(editButton);
    cancelButton.replaceWith(deleteButton);
  });
}
