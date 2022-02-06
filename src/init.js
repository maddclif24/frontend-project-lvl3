import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import ru from './locales/ru';
import watchState from './watch';
import app from './app';

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

  const i18nextInstance = i18next.createInstance();

  i18nextInstance.init({
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
