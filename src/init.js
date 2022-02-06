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

  const instance = i18next.createInstance({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

  instance.init().then(() => {
    app(state, watchState(state, instance), instance);
  });
};

export default runApp;
