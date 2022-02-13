/* eslint-disable no-param-reassign */
import { setLocale } from 'yup';
import onChange from 'on-change';
import * as yup from 'yup';
import axios from 'axios';
import parserDom from './DOMparser';
import generatedId from './generatedID';
import renderValid from './render/renderValid';
import renderFeeds from './render/renderFeeds';
import renderPost from './render/renderPost';
import request from './render/axiosTimeout';
import renderModal from './render/renderModal';
import renderReadRss from './render/renderReadRss';

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
const app = (state, i18next) => {
  const watchState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.inputUrl':
        break;
      case 'validateForm':
        renderValid(state, path, value, i18next);
        break;
      case 'form.error':
        renderValid(state, path, value);
        break;
      case 'form.posts':
        renderPost(value);
        break;
      case 'form.feeds':
        renderFeeds(value);
        break;
      case 'form.rssLinks':
        request(state, value);
        break;
      case 'form.currentPost':
        renderModal(value);
        break;
      case 'form.readRss':
        renderReadRss(value);
        break;
      default:
        throw Error('Bobo))');
    }
  });

  const form = document.querySelector('form');
  const input = document.querySelector('input');
  input.addEventListener('input', (e) => {
    e.preventDefault();
    watchState.form.inputUrl = e.target.value;
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (state.form.rssLinks.includes(state.form.inputUrl)) {
      watchState.form.error = i18next.t('duplicateUrl');
      return;
    }
    schema
      .validate({
        url: state.form.inputUrl,
      })
      .then((data) => {
        axios.get(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(`${data.url}`)}&disableCache=true)`)
          .then((res) => {
            const type = res.data.status.content_type.substring(0, res.data.status.content_type.indexOf(';'));
            if (type === 'text/html') {
              watchState.validateForm = 'is-invalid';
              watchState.form.error = i18next.t('invalidRss');
            } else {
              const parse = parserDom(res.data.contents);
              watchState.validateForm = 'is-valid';
              watchState.form.posts = generatedId([...parse.postsParse, ...state.form.posts]);
              watchState.form.feeds = [parse.feedParse, ...state.form.feeds];
              watchState.form.rssLinks = [res.data.status.url, ...state.form.rssLinks];
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
            }
          })
          .catch((errorNetwork) => {
            if (errorNetwork.message === "Cannot read properties of null (reading 'textContent')") {
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
        watchState.validateForm = 'is-invalid';
        watchState.form.error = i18next.t(error.message);
      });
  });
};
export default app;
