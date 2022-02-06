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
      input.value = '';
      input.focus();
      validateParagh.textContent = i18next.t('isValid');
      validateParagh.classList.remove('text-danger');
      validateParagh.classList.add('text-success');
    }
  }
};
export default renderValid;
