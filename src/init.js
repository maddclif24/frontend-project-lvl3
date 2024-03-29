// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';
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
      disabledUI: false,
    },
    validateForm: null,
  };

  const instance = i18next.createInstance({
    lng: 'ru',
    resources: {
      ru,
    },
  });

  instance.init().then(() => {
    app(state, watchState(state, instance), instance);
  });
};

export default runApp;
