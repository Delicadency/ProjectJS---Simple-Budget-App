export function displayErrorMessage() {
  const message = document.querySelector(".header__error");
  if (message) {
    message.classList.add("show");
    setTimeout(() => {
      message.classList.remove("show");
    }, 3000);
  }
}
