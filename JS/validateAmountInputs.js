export function validateAmountInputs(input) {
  const amountPattern = /^\d{0,7}(\.\d{0,2})?$/;
  input.addEventListener("input", (event) => {
    const value = event.target.value;

    if (!amountPattern.test(value)) {
      event.target.value = value.slice(0, -1);
    }
  });
}
