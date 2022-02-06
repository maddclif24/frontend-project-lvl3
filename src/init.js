import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import ru from './locales/ru.js';
import watchState from './watch.js';
import app from './app.js';

const runApp = async () => {
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
