"use strict";
let counter = 0;
let totals = {
  income: 0,
  outcome: 0,
};
let balance = totals.income - totals.outcome;

function updateBalance() {
  balance = totals.income - totals.outcome;

  const headerParagraph = document.getElementById("header-paragraph");
  const newHeaderParagraph = document.createElement("p");
  const span = document.createElement("span");

  newHeaderParagraph.className = "header__paragraph txt-a--center";
  newHeaderParagraph.id = "header-paragraph";

  span.textContent = balance.toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  span.id = "span";

  if (balance > 0) {
    span.className = "paragraph-gradient--income";
    const beforeSpan = document.createTextNode("Możesz jeszcze wydać ");
    const afterSpan = document.createTextNode(" zł");
    headerParagraph.replaceWith(newHeaderParagraph);
    newHeaderParagraph.appendChild(beforeSpan);
    newHeaderParagraph.appendChild(span);
    newHeaderParagraph.appendChild(afterSpan);
  } else if (balance < 0) {
    span.className = "paragraph-gradient--outcome";
    const beforeSpan = document.createTextNode("Jesteś na minusie ");
    const afterSpan = document.createTextNode(" zł");
    headerParagraph.replaceWith(newHeaderParagraph);
    newHeaderParagraph.appendChild(beforeSpan);
    newHeaderParagraph.appendChild(span);
    newHeaderParagraph.appendChild(afterSpan);
  } else {
    newHeaderParagraph.textContent = "Bilans wynosi zero";
    headerParagraph.replaceWith(newHeaderParagraph);
  }
}

function handleSave(event) {
  const saveButtonID = event.target.id;
  const splitID = saveButtonID.split("-");
  const matchID = splitID[splitID.length - 1];
  const liToSave = document.getElementById(`list-element-${matchID}`);
  const amountInput = liToSave.querySelector(`#edit-amountinput-${matchID}`);
  const nameInput = liToSave.querySelector(`#edit-nameinput-${matchID}`);
  const paragraphToChange = liToSave.querySelector(
    `#list-parahraph-${matchID}`
  );
  const previousAmount = parseFloat(
    paragraphToChange.getAttribute("data-amount")
  );
  const labelNameToRemove = document.getElementById(
    `${matchID}-name-input-error`
  );
  const labelAmountToRemove = document.getElementById(
    `${matchID}-amount-input-error`
  );

  if (amountInput.value === "") {
    if (!labelAmountToRemove) {
      const errorLabel = document.createElement("label");
      errorLabel.setAttribute("for", amountInput.id);
      errorLabel.className = "error_label";
      errorLabel.textContent = "Uzupełnij pole";
      errorLabel.id = `${matchID}-amount-input-error`;
      amountInput.parentNode.insertBefore(errorLabel, amountInput);
      amountInput.classList.add("error");
      return;
    }
    return;
  }
  if (nameInput.value === "") {
    if (!labelNameToRemove) {
      const errorLabel = document.createElement("label");
      errorLabel.setAttribute("for", nameInput.id);
      errorLabel.className = "error_label";
      errorLabel.textContent = "Uzupełnij pole";
      errorLabel.id = `${matchID}-amount-input-error`;
      nameInput.parentNode.insertBefore(errorLabel, nameInput);
      nameInput.classList.add("error");
      return;
    }
    return;
  } else {
    if (labelAmountToRemove) {
      labelAmountToRemove.remove();
      amountInput.classList.remove("error");
    }
    if (labelNameToRemove) {
      labelNameToRemove.remove();
      nameInput.classList.remove("error");
    }
    const name = nameInput.value;
    let amount = amountInput.value;
    const type = event.target.getAttribute("data-type");

    const listParagraph = document.createElement("p");
    listParagraph.className = "list__paragraph";
    listParagraph.id = `list-parahraph-${matchID}`;
    listParagraph.textContent = `${amount.replace(".", ",")} zł - ${name}`;
    listParagraph.setAttribute("data-name", name);
    listParagraph.setAttribute("data-amount", amount);
    listParagraph.setAttribute("data-type", type);

    amount = parseFloat(amount);

    const editButton = document.createElement("button");
    editButton.setAttribute("data-type", `${type}`);
    editButton.type = "submit";
    editButton.name = "edit";
    editButton.className = `list__button edit edit--${type}`;
    editButton.id = `button-edit-${matchID}`;
    editButton.addEventListener("click", handleEdit);

    totals[type] = totals[type] - previousAmount + amount;
    document.getElementById(`total-${type}`).textContent = totals[
      type
    ].toLocaleString("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    updateBalance();

    paragraphToChange.replaceWith(listParagraph);
    event.target.replaceWith(editButton);
  }
}

function handleDelete(event) {
  const deleteButtonID = event.target.id;
  const splitID = deleteButtonID.split("-");
  const matchID = splitID[splitID.length - 1];
  const liToDelete = document.getElementById(`list-element-${matchID}`);
  const listParagraph = liToDelete.querySelector(".list__paragraph");
  const type = event.target.getAttribute("data-type");

  const amount = parseFloat(listParagraph.getAttribute("data-amount"));

  totals[type] -= amount;
  document.getElementById(`total-${type}`).textContent = totals[
    type
  ].toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  updateBalance();

  liToDelete.remove();
}

function handleEdit(event) {
  const editButtonID = event.target.id;
  const splitID = editButtonID.split("-");
  const matchID = splitID[splitID.length - 1];
  const liToEdit = document.getElementById(`list-element-${matchID}`);
  const listParagraph = liToEdit.querySelector(".list__paragraph");

  const name = listParagraph.getAttribute("data-name");
  const amount = listParagraph.getAttribute("data-amount");
  const type = event.target.getAttribute("data-type");

  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.autocomplete = "off";
  amountInput.maxLength = "10";
  amountInput.pattern = "^d{0,7}(.d{0,2})?$";
  amountInput.inputMode = "numeric";
  amountInput.placeholder = "Kwota";
  amountInput.className = `input input--edit input--${type} txt-a--center f-s-14`;
  amountInput.value = amount;
  amountInput.id = `edit-amountinput-${matchID}`;

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.autocomplete = "off";
  nameInput.maxLength = "30";
  nameInput.placeholder = "Nazwa";
  nameInput.className = `input input--edit input--${type} txt-a--center f-s-14`;
  nameInput.value = name;
  nameInput.id = `edit-nameinput-${matchID}`;

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.name = "save";
  saveButton.className = `list__button save save--${type}`;
  saveButton.id = `button-save-${matchID}`;
  saveButton.setAttribute("data-type", type);
  saveButton.addEventListener("click", handleSave);

  listParagraph.innerHTML = "";
  listParagraph.appendChild(amountInput);
  listParagraph.append(" zł - ");
  listParagraph.appendChild(nameInput);
  event.target.replaceWith(saveButton);
}

const types = ["income", "outcome"];
types.forEach((type) => {
  document
    .getElementById(`total-${type}`)
    .addEventListener("change", updateBalance);

  document
    .getElementById(`${type}-amount`)
    .addEventListener("input", (event) => {
      event.preventDefault();
      const input = event.target;
      let value = input.value;
      const regex = /^\d{0,7}(\.\d{0,2})?$/;
      if (!regex.test(value)) {
        value = value.slice(0, -1);
        input.value = value;
      }
    });

  document.getElementById(`${type}-name`).addEventListener("input", (event) => {
    event.preventDefault();
    const input = event.target;
    let value = input.value;
    const regex = /^.{0,30}$/;
    if (!regex.test(value)) {
      (value = value.slice(0, 30)), (input.value = value);
    }
  });

  document
    .getElementById(`input-button-${type}`)
    .addEventListener("click", (event) => {
      event.preventDefault();
      counter++;
      const inputName = document.getElementById(`${type}-name`);
      const inputAmount = document.getElementById(`${type}-amount`);
      const inputNameValue = document.getElementById(`${type}-name`).value;
      let inputAmountValue = document.getElementById(`${type}-amount`).value;
      const labelNameToRemove = document.getElementById(
        `${type}-name-input-error`
      );
      const labelAmountToRemove = document.getElementById(
        `${type}-amount-input-error`
      );

      if (inputNameValue === "") {
        if (!labelNameToRemove) {
          const errorLabel = document.createElement("label");
          errorLabel.setAttribute("for", inputName.id);
          errorLabel.className = "error_label";
          errorLabel.textContent = "Uzupełnij pole";
          errorLabel.id = `${type}-name-input-error`;
          inputName.parentNode.insertBefore(errorLabel, inputName);
          inputName.classList.add("error");
          return;
        }
        return;
      } else if (inputAmountValue === "") {
        if (!labelAmountToRemove) {
          const errorLabel = document.createElement("label");
          errorLabel.setAttribute("for", inputAmount.id);
          errorLabel.className = "error_label";
          errorLabel.textContent = "Uzupełnij pole";
          errorLabel.id = `${type}-amount-input-error`;
          inputAmount.parentNode.insertBefore(errorLabel, inputAmount);
          inputAmount.classList.add("error");
          return;
        }
        return;
      } else {
        if (labelAmountToRemove) {
          labelAmountToRemove.remove();
          inputAmount.classList.remove("error");
        }
        if (labelNameToRemove) {
          labelNameToRemove.remove();
          inputName.classList.remove("error");
        }
        const li = document.createElement("li");
        li.className = "flex a-i--center list__element";
        li.id = `list-element-${counter}`;

        const listParagraph = document.createElement("p");
        listParagraph.className = "list__paragraph";
        listParagraph.id = `list-parahraph-${counter}`;
        listParagraph.textContent = `${inputAmountValue.replace(
          ".",
          ","
        )} zł - ${inputNameValue}`;
        listParagraph.setAttribute("data-name", inputNameValue);
        listParagraph.setAttribute("data-amount", inputAmountValue);
        listParagraph.setAttribute("data-type", type);

        inputAmountValue = parseFloat(inputAmountValue);

        const listDiv = document.createElement("div");
        listDiv.className =
          "flex j-c--between a-i--center list__button_container";
        listDiv.id = `list-div-${counter}`;

        const editButton = document.createElement("button");
        editButton.setAttribute("data-type", `${type}`);
        editButton.type = "submit";
        editButton.name = "edit";
        editButton.className = `list__button edit edit--${type}`;
        editButton.id = `button-edit-${counter}`;
        editButton.addEventListener("click", handleEdit);

        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("data-type", `${type}`);
        deleteButton.type = "submit";
        deleteButton.name = "delete";
        deleteButton.className = `list__button delete delete--${type}`;
        deleteButton.id = `button-delete-${counter}`;
        deleteButton.addEventListener("click", handleDelete);

        const ul = document.getElementById(`${type}-list`);
        ul.appendChild(li);
        li.appendChild(listParagraph);
        li.appendChild(listDiv);
        listDiv.appendChild(editButton);
        listDiv.appendChild(deleteButton);

        totals[type] += inputAmountValue;
        document.getElementById(`total-${type}`).textContent = totals[
          type
        ].toLocaleString("pl-PL", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        updateBalance();

        document.getElementById(`${type}-name`).value = "";
        document.getElementById(`${type}-amount`).value = "";
      }
    });
});
