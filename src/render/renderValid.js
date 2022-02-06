import i18next from 'i18next';

const renderValid = (state, path, value) => {
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

/**        <form action="" class="rss-form text-body">
          <div class="row">
            <div class="col">
              <div class="form-floating">
                <input
                  id="url-input"
                  autofocus=""
                  required
                  name="url"
                  aria-label="url"
                  class="form-control w-100"
                  placeholder="ссылка RSS"
                  autocomplete="off"
                />
                <label for="url-input">Ссылка RSS</label>
              </div>
            </div>
            <div class="col-auto">
              <button
                type="submit"
                aria-label="add"
                class="h-100 btn btn-lg btn-primary px-sm-5"
              >
                Добавить
              </button>
            </div>
          </div>
        </form>
        <p class="mt-2 mb-0 text-muted">
          Пример: https://ru.hexlet.io/lessons.rss
        </p>
        <p class="feedback m-0 position-absolute small"></p> */
