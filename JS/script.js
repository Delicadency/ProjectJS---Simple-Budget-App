"use strict";
let counter = 0;

function handleSave(event) {
  const saveButtonID = event.target.id;
  const splitID = saveButtonID.split("-");
  const matchID = splitID[splitID.length - 1];
}

function handleDelete(event) {
  const deleteButtonID = event.target.id;
  const splitID = deleteButtonID.split("-");
  const matchID = splitID[splitID.length - 1];
  const liToDelete = document.getElementById(`list-element-${matchID}`);
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
      const inputName = document.getElementById(`${type}-name`).value;
      let inputAmount = document.getElementById(`${type}-amount`).value;
      if (inputName === "" || inputAmount === "") {
        console.error(
          "Tu wstaw element z komunikatem o konieczności uzupełnienia obu pól."
        );
        return;
      }

      const li = document.createElement("li");
      li.className = "flex a-i--center list__element";
      li.id = `list-element-${counter}`;

      const listParagraph = document.createElement("p");
      listParagraph.className = "list__paragraph";
      listParagraph.id = `list-parahraph-${counter}`;
      listParagraph.textContent = `${inputAmount.replace(
        ".",
        ","
      )} zł - ${inputName}`;
      listParagraph.setAttribute("data-name", inputName);
      listParagraph.setAttribute("data-amount", inputAmount);

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
      document.getElementById(`${type}-name`).value = "";
      document.getElementById(`${type}-amount`).value = "";
    });
});
