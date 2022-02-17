export default (value) => {
  const button = document.querySelector('[aria-label="add"]');
  const input = document.querySelector('input');
  if (value) {
    button.setAttribute('disabled', true);
    input.setAttribute('readonly', true);
  } else {
    button.removeAttribute('disabled');
    input.removeAttribute('readonly');
  }
};
