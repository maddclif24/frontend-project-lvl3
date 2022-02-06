// import onChange from 'on-change';
// import { setLocale } from 'yup';
// import * as yup from 'yup';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import ru from './locales/ru';
import watchState from './watch';
import app from './app';

/** setLocale({
  string: {
    url: 'errorUlr',
  },
});

const schema = yup.object().shape({
  url: yup
    .string()
    .url()
    .required()
    .test('url', 'invalidRss', (value) => value.match(/.rss$/)),
  // Придумать как протестировать функцию на дубликаты
// .test('url', 'duplicateUrl', (value) => state.posts.includes(value))
});

const app = () => {
  const state = {
    inputUrl: '',
    feeds: [],
    posts: [],
    validate: null,
    textError: '',
  };

  const form = document.querySelector('form');
  const input = document.querySelector('input');
  const validateParagh = document.querySelector('.feedback');
  const watchState = onChange(state, (path, value) => {
    if (path === 'validate') {
      validateParagh.textContent = state.textError;
      if (value === 'invalid') {
        input.classList.add('is-invalid');
        input.value = '';
        validateParagh.classList.remove('text-success');
        validateParagh.classList.add('text-danger');
      } else {
        input.classList.remove('is-invalid');
        input.value = '';
        validateParagh.textContent = i18next.t('isValid');
        validateParagh.classList.remove('text-danger');
        validateParagh.classList.add('text-success');
      }
    }
  });

  input.addEventListener('change', (e) => {
    e.preventDefault();
    watchState.inputUrl = e.target.value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    schema
      .validate({
        url: state.inputUrl,
      })
      .then((valid) => {
        watchState.validate = 'valid';
        watchState.textError = '';
        watchState.posts = [valid.url, ...state.posts];
      })
      // Написать функцию которая будет герерировать ошибки
      .catch((error) => {
        console.log(error.message);
        watchState.textError = i18next.t(error.message);
        watchState.validate = 'invalid';
      });
  });
};
// https://ru.hexlet.io/lessons.rss
*/
const runApp = () => {
  const state = {
    form: {
      inputUrl: '',
      feeds: [],
      posts: [],
      rssLinks: [],
      error: '',
      currentPost: null,
      readRss: [],
    },
    validateForm: null,
  };

  i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  }).then(() => {
    app(state, watchState(state));
  });
};
export default runApp;
