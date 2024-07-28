import { getTotalIncomes, getTotalExpenses } from "./data.js";

export function updateBalance() {
  const totalIncomes = getTotalIncomes();
  const totalExpenses = getTotalExpenses();
  const balance = totalIncomes - totalExpenses;

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
    span.className = "paragraph-gradient--expense";
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
