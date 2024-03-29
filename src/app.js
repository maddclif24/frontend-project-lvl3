/* eslint-disable no-param-reassign */
import { setLocale } from 'yup';
import * as yup from 'yup';
import axios from 'axios';
import parserDom from './DOMparser.js';
import generatedId from './generatedID.js';

setLocale({
  string: {
    url: 'errorUlr',
  },
});
const schema = yup.object().shape({
  url: yup
    .string()
    .url()
    .required(),
});
const app = (state, watchState, i18next) => {
  const form = document.querySelector('form');
  const input = document.querySelector('input');
  input.addEventListener('input', (e) => {
    e.preventDefault();
    watchState.form.inputUrl = e.target.value;
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchState.form.disabledUI = true;
    if (state.form.rssLinks.includes(state.form.inputUrl)) {
      watchState.form.error = i18next.t('duplicateUrl');
      watchState.form.disabledUI = false;
      return;
    }
    schema
      .validate({
        url: state.form.inputUrl,
      })
      .then((data) => {
        axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(`${data.url}`)}&disableCache=true)`)
          .then((res) => {
            const parse = parserDom(res.data.contents);
            watchState.validateForm = 'is-valid';
            watchState.form.posts = generatedId([...parse.postsParse, ...state.form.posts]);
            watchState.form.feeds = [parse.feedParse, ...state.form.feeds];
            watchState.form.rssLinks = [state.form.inputUrl, ...state.form.rssLinks];
            const buttonView = document.querySelectorAll('[data-bs-toggle=modal]');
            buttonView.forEach((button) => {
              button.addEventListener('click', (event) => {
                event.preventDefault();
                const currentEl = state.form.posts.find(({ id }) => id === event.target.id);
                watchState.form.currentPost = currentEl;
                watchState.form.readRss = [currentEl, ...state.form.readRss];
              });
            });
            const linksView = document.querySelectorAll('.fw-bold');
            linksView.forEach((link) => {
              link.addEventListener('click', (event) => {
                const currentEl = state.form.posts.find(({ id }) => id === event.target.id);
                watchState.form.currentPost = currentEl;
                watchState.form.readRss = [currentEl, ...state.form.readRss];
              });
            });
            watchState.form.disabledUI = false;
          })
          .catch((errorNetwork) => {
            watchState.form.disabledUI = false;
            if (errorNetwork.name === 'TypeError') {
              watchState.validateForm = 'is-invalid';
              watchState.form.error = i18next.t('invalidRss');
            }
            if (errorNetwork.message === 'Network Error') {
              watchState.validateForm = 'is-invalid';
              watchState.form.error = i18next.t('netWorkError');
            }
          });
      })
      .catch((error) => {
        watchState.form.disabledUI = false;
        watchState.validateForm = 'is-invalid';
        watchState.form.error = i18next.t(error.message);
      });
  });
};
export default app;
