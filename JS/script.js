import handleMainSubmitForm from "./handleMainSubmitForm.js";


document.getElementById('income-form').addEventListener("submit", (event) => handleMainSubmitForm(event, 'income'));
document.getElementById('expense-form').addEventListener("submit", (event) => handleMainSubmitForm(event, 'expense'));