export default (value) => {
  const button = document.querySelector('[aria-label="add"]');
  if (value) {
    button.setAttribute('disabled', 'disabled');
  } else button.removeAttribute('disabled');
};
