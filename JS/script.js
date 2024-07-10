"use strict";
let counter = 0;
const types = ["income", "outcome"];
types.forEach((type) => {
  document
    .getElementById(`input-button-${type}`)
    .addEventListener("click", (event) => {
      event.preventDefault();
      counter++;
      const inputName = document.getElementById(`${type}-name`).value;
      const inputAmount = document.getElementById(`${type}-amount`).value;
      const li = document.createElement("li");
      li.className = "flex a-i--center list__element";
      li.id = `list-element-${counter}`;
      const listParagraph = document.createElement("p");
      listParagraph.className = "list__paragraph";
      listParagraph.id = `list-parahraph-${counter}`;
      listParagraph.textContent = `${inputAmount} zł - ${inputName}`;
      const listDiv = document.createElement("div");
      listDiv.className =
        "flex j-c--between a-i--center list__button_container";
      listDiv.id = `list-div-${counter}`;
      const editButton = document.createElement("button");
      editButton.type = "submit";
      editButton.name = "edit";
      editButton.className = `list__button edit edit--${type}`;
      editButton.id = `button-edit-${counter}`;
      const deleteButton = document.createElement("button");
      deleteButton.type = "submit";
      deleteButton.name = "delete";
      deleteButton.className = `list__button delete delete--${type}`;
      deleteButton.id = `button-delete-${type}`;
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
