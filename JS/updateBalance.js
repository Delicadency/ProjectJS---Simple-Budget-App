import { getTotalIncomes, getTotalExpenses } from "./data.js";

export function updateBalance() {
  const totalIncomes = getTotalIncomes();
  const totalExpenses = getTotalExpenses();
  const balance = totalIncomes - totalExpenses;

  const headerParagraph = document.getElementById("header-paragraph");
  const newHeaderParagraph = document.createElement("p");
  const span = document.createElement("span");
  const afterSpan = document.createTextNode(" zł");
  const beforeSpanInTheBlack = document.createTextNode("Możesz jeszcze wydać ");
  const beforeSpanInTheRed = document.createTextNode("Jesteś na minusie ");

  const setPropertiesAndReplace = () => {
    newHeaderParagraph.className = "header__paragraph txt-a--center";
    newHeaderParagraph.id = "header-paragraph";
    headerParagraph.replaceWith(newHeaderParagraph);
  };
  const appendParagraph = (beforeSpan) => {
    newHeaderParagraph.appendChild(beforeSpan);
    newHeaderParagraph.appendChild(span);
    newHeaderParagraph.appendChild(afterSpan);
  };

  const numberToLocaleString = (element) => {
    return element.toLocaleString("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  span.textContent = numberToLocaleString(balance);
  span.id = "span";

  if (balance > 0) {
    span.className = "paragraph-gradient--income";
    setPropertiesAndReplace();
    appendParagraph(beforeSpanInTheBlack);
  } else if (balance < 0) {
    span.className = "paragraph-gradient--expense";
    setPropertiesAndReplace();
    appendParagraph(beforeSpanInTheRed);
  } else {
    newHeaderParagraph.textContent = "Bilans wynosi zero";
    setPropertiesAndReplace();
  }

  const incomesSum = document.querySelector("#total-income");
  incomesSum.textContent = numberToLocaleString(totalIncomes);

  const expensesSum = document.querySelector("#total-expense");
  expensesSum.textContent = numberToLocaleString(totalExpenses);
}
