export function handleEdit(li, type, editButton) {
  const id = li.getAttribute("data-id");
  const listParagraph = li.querySelector(".list__paragraph");

  const currentText = listParagraph.textContent.split(" zł - ")[1];
  const currentAmount = parseFloat(
    listParagraph.textContent.split(" zł - ")[0].replace(",", ".")
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
  (textErrorLabel.setAttribute = "for"), `text-${id}`;

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

  const amountErrorLabel = document.createElement("label");
  amountErrorLabel.className = "error_label";
  (amountErrorLabel.setAttribute = "for"), `amount-${id}`;

  const amountWrapper = document.createElement("div");
  amountWrapper.className = "input__wrapper--edit";

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.name = "save";
  saveButton.className = `list__button save save--${type}`;
  saveButton.id = `button-save-${matchID}`;
  saveButton.addEventListener(
    "click",
    handleSave(textInput, amountInput, type, id)
  );

  listParagraph.innerHTML = "";
  listParagraph.appendChild(amountWrapper);
  amountWrapper.appendChild(amountErrorLabel);
  amountWrapper.appendChild(amountInput);
  listParagraph.appendChild(textWrapper);
  textWrapper.appendChild(textErrorLabel);
  textWrapper.appendChild(textInput);
  editButton.replaceWith(saveButton);
}
