/* eslint-disable no-param-reassign */
import axios from 'axios';
import _ from 'lodash';
import renderPost from './renderPost.js';
import parserDom from '../DOMparser.js';
import generatedId from '../generatedID.js';
import renderModal from './renderModal.js';
import renderReadRss from './renderReadRss.js';

const isEqual = (obj1, obj2) => obj1.title === obj2.title;

const request = (state, rssLinks) => {
  setTimeout(() => {
    rssLinks.forEach((link) => {
      axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(`${link}`)}&disableCache=true)`)
        .then((res) => {
          const parse = parserDom(res.data.contents).postsParse;
          const union = _.unionWith(state.form.posts, parse, isEqual);
          state.form.posts = generatedId(union);
          renderPost(state.form.posts);
          renderReadRss(state.form.readRss);
          const buttonView = document.querySelectorAll('[data-bs-toggle=modal]');
          buttonView.forEach((button) => {
            button.addEventListener('click', (e) => {
              const currentEl = state.form.posts.find(({ id }) => id === e.target.id);
              state.form.currentPost = currentEl;
              state.form.readRss = [currentEl, ...state.form.readRss];
              renderModal(state.form.currentPost);
              renderReadRss(state.form.readRss);
            });
          });
          const linksView = document.querySelectorAll('.fw-bold');
          linksView.forEach((linkView) => {
            linkView.addEventListener('click', (event) => {
              const currentEl = state.form.posts.find(({ id }) => id === event.target.id);
              state.form.currentPost = currentEl;
              state.form.readRss = [currentEl, ...state.form.readRss];
              renderReadRss(state.form.readRss);
            });
          });
        })
        .catch((error) => error);
    });
    request(state, rssLinks);
  }, 5000);
};
export default request;
