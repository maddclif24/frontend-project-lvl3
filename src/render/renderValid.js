const renderValid = (state, path, value, i18next) => {
  const input = document.querySelector('input');
  const validateParagh = document.querySelector('.feedback');
  if (path === 'form.error') {
    input.classList.add('is-invalid');
    validateParagh.textContent = value;
    validateParagh.classList.add('text-danger');
  }
  if (path === 'validateForm') {
    if (value === 'is-valid') {
      input.classList.remove('is-invalid');
      validateParagh.classList.remove('text-danger');
      validateParagh.classList.add('text-success');
      validateParagh.textContent = i18next.t('isValid');
      input.value = '';
      input.focus();
    }
  }
};
export default renderValid;
