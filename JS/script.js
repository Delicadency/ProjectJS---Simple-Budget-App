"use strict";
let counter = 0;
const buttonTypes = ["income", "outcome"];
buttonTypes.forEach((buttonType) => {
  document.getElementById(`intput-button-${buttonType}`).addEventListener(
    ("click",
    (event) => {
      event.preventDefault();
      counter++;
      const getIcomeName = document.getElementById("income-name").value;
      const getIncomeAmount = doument.getElementbyIt("income-amount").value;
      const li = document.createElement("li");
      li.className = "flex a-i--center list__element";
      li.id = `list-element-${counter}`;
      const listParagraph = document.createElement("p");
      listParagraph.className = "list__paragraph";
      listParagraph.id = `list-parahraph-${counter}`;
      listParagraph.textContent = `${getIncomeAmount} - ${getIcomeName}`;
      const listDiv = document.createElement("div");
      listDiv.className =
        "flex j-c--between a-i--center list__button_container";
      listDiv.id = `list-div-${counter}`;
      const editButton = document.createElement("button");
      editButton.type = "submit";
      editButton.name = "edit";
      editButton.className = "list__button edit edit--income";
    })
  );
});
