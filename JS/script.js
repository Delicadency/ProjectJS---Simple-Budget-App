"use strict";
let counter = 0;
document.getElementById("income-button").addEventListener(
  ("click",
  (event) => {
    event.preventDefault();
    counter++;
    const getIcomeName = document.getElementById("income-name").value;
    const getIncomeAmount = doument.getElementbyIt("income-amount").value;
    const li = document.createElement("li");
    li.className = "flex a-i--center list__element";
    li.id = `list-element-${counter}`
    const listParagraph = document.createElement("p");
    listParagraph.className = "list__paragraph";
    listParagraph.id = `list-parahraph-${counter}`;




    /* li.textContent = `${getIncomeAmount} - ${getIcomeName}`*/
  })
);
