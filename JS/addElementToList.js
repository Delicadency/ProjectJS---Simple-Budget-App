export function addElementToList(type, text, amount) {
  const list = document.querySelector(`#${type}-list`);

  const li = document.createElement("li");
  li.className = "flex a-i--center list__element";

  const listParagraph = document.createElement("p");
  listParagraph.className = "flex a-i--center j-c--between list__paragraph";
  listParagraph.textContent = `${amount.toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} zł - ${text}`;

  const listDiv = document.createElement("div");
  listDiv.className = "flex j-c--between a-i--center list__button_container";

  const editButton = document.createElement("button");
  editButton.type = "submit";
  editButton.className = `list__button edit edit--${type}`;
  editButton.name = "edit-button";
  /*  Dodaj event listener dla funkcji handleEdit*/

  const deleteButton = document.createElement("button");
  deleteButton.type = "submit";
  deleteButton.className = `list__button delete delete--${type}`;
  deleteButton.name = "delete-button";
  /*  Dodaj event listeren dla funkcji handleDelete */

  list.appendChild(li);
  li.appendChild(listParagraph);
  li.appendChild(listDiv);
  listDiv.appendChild(editButton);
  listDiv.appendChild(deleteButton);
}
