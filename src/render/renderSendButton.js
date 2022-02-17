export default (value) => {
  const button = document.querySelector('[aria-label="add"]');
  if (value) {
    button.setAttribute('readonly', 'readonly');
  } else button.removeAttribute('readonly');
};
